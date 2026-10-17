# Handoff: Migrate progress uploads to `HttpClientHandlerService`

## Goal

After commit `8150f265229b5c68b0f9b6bfbaba79762c8e91d0` (`Merged PR 51220: add progress flag to http client handler`), `HttpClientHandlerService.getHttpClient` supports:

- `observe?: 'response' | 'body' | 'events'`
- `reportProgress?: boolean` → passed as `reportProgress: inputValue.reportProgress === true`

**Migrate the two client-side upload-with-progress flows** so they stop calling `HttpClient` / `HttpBackend` directly and instead use `HttpClientHandlerService.getHttpClient` with `{ observe: 'events', reportProgress: true }`.

Related Jira (context for the progress flag PR): [TECSDM-121892](https://jira.mohaymen.ir/browse/TECSDM-121892).

Do **not** re-implement the handler change; it is already merged. This task is consumer migration only.

---

## Prerequisite (already done — do not redo)

| File | Change |
|------|--------|
| `Web/WebUI/base-contract/src/lib/models/http-client-type.ts` | Added `observe: 'events'`, `reportProgress?: boolean` |
| `Web/WebUI/base/src/lib/app/http-client-handler/http-client-handler.service.ts` | Passes `reportProgress: inputValue.reportProgress === true` into `_httpClient.request` |
| `Web/WebUI/base/.../http-client-handler.service.spec.ts` | Specs for `reportProgress: true` and omitted → `false` |

Verify these exist on the working branch before coding consumers.

---

## Targets (exactly these two progress paths)

### 1) BDMP Explore — `FileSystemUploaderService`

| Item | Value |
|------|--------|
| Path | `Web/WebUI/bdmp/app/shared/modules/upload-file/services/file-system-uploader/file-system-uploader.service.ts` |
| Spec | `.../file-system-uploader.service.spec.ts` (if present) |
| Current HTTP | `_httpClient.post(url, formData, { reportProgress: true, observe: 'events', params })` |
| Hardcoded URL | `gateway/MSSE.LADW/filesystem/upload` |
| Engine | `LADW` |
| Call chain | Explore UI → `FileExploreActionsService` → `FileUploaderService.handleBulkCustomStreamUpload` → `FileSystemUploaderService.upload` (when `useFileSystemApi === true`) |
| Progress UI | `UploadProgressesStateService` + `upload-list` in explore |

Public return shape to preserve:

```ts
{
  promise: Promise<string>;
  progress$: Observable<number>; // 0..1 from UploadProgress
  abort: () => void;             // unsubscribes HTTP
}
```

### 2) IAP Visualizer file-browser — `StarFileUploaderService` (via `IapUploaderService`)

| Item | Value |
|------|--------|
| Path | `Web/WebUI/base/src/lib/app/star-file-uploader/star-file-uploader.service.ts` |
| Spec | `.../star-file-uploader.service.spec.ts` |
| Thin wrapper | `Web/WebUI/iap/app/services/iap-uploader/iap-uploader.service.ts` → `uploadFileWithProgress` |
| Current HTTP | Raw `HttpClient` from `HttpBackend` (bypasses interceptors) + `postUploadWithProgress` with `{ reportProgress: true, observe: 'events' }` |
| URL used by IAP | `gateway/${LAPlatform.ServiceName}/upload` (see `IapUploaderService.url`) |
| Engine | `LAPlatform.EngineName` (`LAPortal`) |
| Call chain | File-browser upload → `FileBrowserUploadFacade` / folder coordinator → `AddAttachmentAsyncUploadService` → `IapUploaderService.uploadFileWithProgress` → `StarFileUploaderService.uploadFileWithProgress` |
| Progress UI | `FileBrowserUploadProgressesStateService` → batches → `VisualizerJobView` `frontendExtraEntries` → `app-frontend-upload-job-card` (Visualizer Async Jobs sidebar; opened via `VisualizerJobsOpenerService.open()`) |

Public return shape to preserve: `StarFileUploadWithProgressResult` (`promise`, `progress$`, `abort`).

Also preserve existing MRPC query params and FormData layout (sizes string + file parts with empty field names) — see current `createFormData` / `createUploadHttpParams` in both services.

---

## What “migrate to HttpClientHandler” means

Replace direct:

```ts
this._httpClient.post(url, formData, {
  reportProgress: true,
  observe: 'events',
  params: httpParams,
});
```

with something equivalent to:

```ts
this._httpClientHandlerService.getHttpClient({
  controllerName: /* registered controller */,
  actionName: /* registered action */,
  body: formData,
  queryParams: { /* MRPC + path/warehouse params as plain object */ },
  observe: 'events',
  reportProgress: true,
  hasLoading: false,
  skipErrorModal: true, // prefer: callers already handle fail status / notifications
  responseType: 'text', // verify against current server Content-Type; body is file-id string(s)
});
```

Then keep the same `HttpEventType.UploadProgress` / `HttpEventType.Response` handling that maps to `progress$` + resolve/reject.

`getHttpClient` **requires** `controllerName` + `actionName` resolved by `ApiInformationService.findActionWithHeaders`. Hardcoded gateway strings alone are not enough — **register actions** if missing.

---

## Required API config work (currently missing)

### BDMP — filesystem upload

Today `StarDrive_API_CONFIGS` only registers filesystem **download**:

- Controller: `LadwControllers.FILE_SYSTEM`
- Action enum: `LadwFileSystemControllerActions` (only `DOWNLOAD_FILE`)
- File: `Web/WebUI/bdmp/app/file-manager/home/configs/stardrive-api-configs.ts`
- Prefix: `BDMP_API_PREFIX` = `gateway/MSSE.LADW`

**Add** e.g. `UPLOAD_FILE = 'uploadFile'` (name consistent with existing enum style) with:

- method: `POST`
- url: `filesystem/upload`
- same `api_prefix` as download (`BDMP_API_PREFIX`)

Wire `FileSystemUploaderService` to that controller/action.

Query params currently set in code (must still be sent):

- `W_MultiTech`, `W_InputAsArray`, `W_HandlingMode`
- `Mrpc-EngineName`, `Mrpc-EngineVersion`
- `path`
- optional `warehouseId`

### IAP — portal upload

`IAP_API_CONFIGS` (`Web/WebUI/iap/app/configs/iap-api-configs.ts`) has file-download only — **no upload action**.

**Add** a controller/action for POST `upload` under `gateway/${LAPlatform.ServiceName}` (final URL must remain `gateway/<ServiceName>/upload`).

`StarFileUploaderService` is shared (`@base`) and takes `url` + `engineName` today. Options (pick one, prefer smallest blast radius):

1. **Preferred for IAP progress path:** keep `IapUploaderService` as the product entry, inject `HttpClientHandlerService` there (or a small IAP-specific uploader), call `getHttpClient` with the new IAP action; leave non-progress `StarFileUploaderService.upload` alone if out of scope.
2. **If changing `StarFileUploaderService` itself:** inject `HttpClientHandlerService`, stop using `HttpBackend` for the progress method, and pass controller/action (or resolve action from URL) — update **all** callers/tests of `uploadFileWithProgress`.

Do not break `upload` / `uploadWithCancellation` unless intentionally in scope.

---

## Behavioral constraints (must preserve)

1. **Progress values:** `event.loaded / event.total` on `HttpEventType.UploadProgress` when `total` is set; throttle/state updates stay in existing facades (`FileUploaderService`, `AddAttachmentAsyncUploadService`) — do not move UI logic into the HTTP layer.
2. **Abort:** unsubscribe still cancels the in-flight request; cancel callbacks already registered on progress state services must keep working.
3. **Success body:** BDMP filesystem resolves `event.body` as string; Star uploader takes first comma-separated file id. Keep parsing identical.
4. **No global loading spinner** for these uploads unless product asks: set `hasLoading: false` (default). Progress is shown in explore upload-list / visualizer jobs cards, not the HTTP loading overlay.
5. **Error UX:** today uploaders reject and let upper layers mark `failed` / show notifications. Prefer `skipErrorModal: true` so `HttpClientHandler` does not also open the generic error modal (double error UX). Confirm with existing fail paths before changing.
6. **Interceptor change for Star uploader:** progress path currently uses `HttpBackend` (no interceptors). Switching to `HttpClientHandler` **enables interceptors** (auth, logging, etc.). That is likely desired for consistency, but verify upload still works (especially `Content-Type` / FormData boundary — do not manually set `multipart/form-data` without boundary).
7. **Do not change** Visualizer Jobs merge UI, explore `upload-list`, or batch state machines unless required by DI/test wiring.

---

## Out of scope (unless needed as dependency)

- Re-adding `reportProgress` support on the handler (done).
- `FileStreamUploaderServiceService` in `base-utilities` (`LadwUploaderService` → non-filesystem explore path) — same pattern, but **not** the two progress UIs discussed unless you touch shared code for Star.
- Backend / gateway contract changes.
- Product UI redesign of progress bars.

---

## Implementation checklist

1. Confirm prerequisite commit / types on branch.
2. Register BDMP `filesystem/upload` action + enum.
3. Register IAP `upload` action (new controller/actions enums as needed) + export in `IAP_API_CONFIGS`.
4. Refactor `FileSystemUploaderService.upload` → `getHttpClient` + keep `{ promise, progress$, abort }`.
5. Refactor IAP progress upload path (`StarFileUploaderService.uploadFileWithProgress` and/or `IapUploaderService`) → `getHttpClient` with `observe: 'events'`, `reportProgress: true`.
6. Convert `HttpParams` to `queryParams` object expected by `HttpClientType` (or build object directly).
7. Update unit tests:
   - Mock `HttpClientHandlerService.getHttpClient` returning a controlled events Observable, **or** use `HttpTestingController` through the handler stack as existing handler specs do.
   - Assert `reportProgress: true` and `observe: 'events'` on the input (or on the resulting request).
   - Keep abort / progress / response parsing tests green.
8. Update CT/PW mocks only if they stub `HttpClient.post` directly for these URLs (`explore.ct-register.ts` already stubs `FileSystemUploaderService.prototype.upload` and `FileStreamUploaderServiceService.prototype.upload` — keep contracts stable so CT need not change).

---

## Suggested verification

- Unit: `FileSystemUploaderService`, `StarFileUploaderService` / `IapUploaderService`, and any new API-config wiring tests.
- Manual / existing e2e:
  - BDMP explore: upload file/folder → progress in upload-list → cancel works.
  - IAP visualizer file-browser: upload → Async Jobs sidebar opens → frontend upload job card progress → success/fail → list refresh on batch complete.

Do **not** run full `dotnet` / unrelated suites. For WebUI unit tests, follow repo WebUI testing skill / existing project scripts only if the user asks to run them.

---

## Acceptance criteria

- [ ] Neither target service uses raw `HttpClient.post(..., { reportProgress: true, observe: 'events' })` for the progress path.
- [ ] Both call `HttpClientHandlerService.getHttpClient` with `reportProgress: true` and `observe: 'events'`.
- [ ] API actions registered; no reliance on hardcoded URL for action resolution (URL comes from `ActionConfig`).
- [ ] Public progress APIs and UI chains unchanged from the user’s perspective.
- [ ] Existing unit specs updated and passing for touched services.
- [ ] No duplicate error modal on failed upload (use `skipErrorModal` if needed).

---

## Quick reference — current event handling (keep logic)

```ts
// Pattern to keep after switching the Observable source to getHttpClient(...)
.subscribe({
  next: (event) => {
    if (event.type === HttpEventType.UploadProgress && event.total) {
      progress$.next(event.loaded / event.total);
    } else if (event.type === HttpEventType.Response) {
      resolve(/* body parse */);
    }
  },
  error: (err) => reject(err),
});
```

---

## Skills / conventions for the implementing agent

- WebUI coding: `.agents/skills/webui-coding/SKILL.md`
- WebUI tests: `.agents/skills/webui-testing/SKILL.md`
- IAP visualizer plugins: `.agents/skills/iap-lap-coding/SKILL.md` / `iap-plugin-architecture-frontend` if plugin wiring changes (should not be needed)
- Do not invent new progress UI; only swap the HTTP transport layer.
)
