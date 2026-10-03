# Spec: FileBrowser DeleteItems (phase 10)

Status: ready-for-agent

Domain glossary: `Web/WebUI/iap/app/visualizer/visualizer/plugins/file-browser/CONTEXT.md`  
ADR: `docs/adr/0014-file-browser-delete.md`  
Ticket: TECSDM-121170

## Problem Statement

Operators can already confirm Delete in the FileBrowser shell (tile and grid) for files, Virtual Folders, and mixed selections. The IAP host calls `DeleteItems` with `{ InstanceIds, FolderPaths }`, but the FileBrowser backend does not implement that intent yet — so remote delete fails at the plugin boundary. Session empty folders are pruned on the client only; Virtual Folder and file deletes must remove Documents from the tab the same way Graph/Map entity delete does, with clear partial-success counting so the host can refresh and optionally toast outcomes.

## Solution

Ship FileBrowser plugin intent **`DeleteItems`** that:

1. Rejects the whole request before any delete when any `FolderPaths` entry is browse root `/`.
2. Builds a **deduped** set of target Documents from `InstanceIds` plus Documents under each non-root `FolderPaths` prefix (same prefix membership as folder rename: FilePath equals path or under `path + "/"`), including Fade’d.
3. Ignores present non-Document ids; treats already-absent `InstanceIds` as Succeeded (idempotent); treats empty non-root FolderPaths as no-ops.
4. Deletes each present Document with Graph/Map entity-delete meaning (instance leaves tab dataset and Graph/Map display).
5. Allows **partial success** (no whole-batch rollback): continues after a per-Document mid-delete failure.
6. Always returns **`{ Succeeded, Failed }`** Document counts (including `{ 0, 0 }` for empty payload).

Update the IAP host so `deleteItems` consumes that count result: silent list refresh when `Failed === 0`; summary toast with counts when `Failed > 0`.

## User Stories

1. As a FileBrowser user, I want to delete one selected file from the context menu, so that the Document leaves the tab and the list refreshes.
2. As a FileBrowser user, I want to delete many selected files at once, so that I do not repeat confirm for each file.
3. As a FileBrowser user, I want to delete a Virtual Folder, so that every Document under that browse-path prefix is removed from the tab.
4. As a FileBrowser user, I want nested Documents under a Virtual Folder deleted with the folder, so that the tree does not leave orphan children behind.
5. As a FileBrowser user, I want mixed file + Virtual Folder selection delete in one confirm, so that bulk cleanup matches how I select in the shell.
6. As a FileBrowser user, I want delete available in both tile and grid, so that view mode does not change the capability.
7. As a FileBrowser user, I want session empty folders removed only on the client, so that empty UI folders never require a server round-trip.
8. As a FileBrowser user, I want Fade’d Documents under a deleted folder removed too, so that membership rules stay consistent with browse.
9. As a FileBrowser user, I want Graph/Map to reflect deleted Documents after I switch views, so that canvas state does not keep ghost Document nodes.
10. As a FileBrowser user, I want Attach links involving deleted Documents cleaned up like Graph delete, so that the graph does not keep dangling relationships.
11. As a FileBrowser user, I want a quiet refresh when every Document delete succeeds, so that I am not interrupted with a success toast.
12. As a FileBrowser user, I want a short toast with succeeded and failed counts when some deletes fail, so that I know the batch was only partially applied.
13. As a FileBrowser user, I want Documents that already succeeded to stay deleted when later ones fail, so that I do not lose progress on a large selection.
14. As a FileBrowser user, I want deleting an already-gone file to count as success, so that double-submit or race with Graph delete does not look like a failure.
15. As a FileBrowser user, I want deleting a Virtual Folder that currently has no Documents to succeed without error, so that a stale folder tile does not block the rest of the batch.
16. As a FileBrowser user, I want the same Document counted once when it appears both as a selected file and under a selected folder, so that toasts and deletes are not doubled.
17. As a FileBrowser user, I want the server to refuse delete when a FolderPath is browse root `/`, so that I cannot wipe the whole tab through a folder delete by mistake.
18. As a FileBrowser user, I want that root refusal to stop the entire request before any delete, so that mixed payloads containing `/` are not half-applied.
19. As a FileBrowser user, I want non-Document instance ids in the request ignored, so that accidental non-file ids do not delete other ontology entities via FileBrowser.
20. As a FileBrowser user, I want an empty DeleteItems payload to return zero counts, so that hosts can call the intent safely when only session prune was needed.
21. As a FileBrowser user, I want to stay on the current browse level after delete, so that my place in the tree does not jump.
22. As a visualizer plugin consumer, I want `DeleteItems([{ InstanceIds, FolderPaths }])` to return `{ Succeeded, Failed }` every time validation passes, so that hosts share one contract for full and partial outcomes.
23. As a visualizer plugin consumer, I want PascalCase wire names matching other FileBrowser intents, so that camelCase conversion stays consistent.
24. As a backend maintainer, I want package `DeleteItems` to delegate to one orchestrator, so that Graph/Map FileBrowser packages share behavior without duplicating logic.
25. As a backend maintainer, I want FolderPaths expansion to reuse the existing documents-under-folder membership rules used by rename, so that prefix semantics do not drift.
26. As a backend maintainer, I want browse-path normalization/validation reused for FolderPaths, so that slash variants do not create a second path language.
27. As a backend maintainer, I want delete meaning aligned with Graph/Map entity delete for Documents, so that FileBrowser does not invent a second notion of remove.
28. As a backend maintainer, I want mid-delete failures counted in Failed while continuing the remaining targets, so that partial success is observable without aborting the whole batch.
29. As a frontend engineer, I want the host API service to stop treating delete as void, so that count-based UX can be implemented.
30. As a frontend engineer, I want the item-delete host service to refresh the list after DeleteItems returns, so that remaining Documents match server membership.
31. As a frontend engineer, I want a summary toast only when Failed is greater than zero, so that full success stays quiet.
32. As a QA engineer, I want package-level DeleteItems tests for counts and root rejection, so that wire behavior is locked without the UI.
33. As a QA engineer, I want tests that prove overlapping file+folder targets delete once, so that dedupe regressions are caught.
34. As a QA engineer, I want tests that prove absent InstanceId increments Succeeded and non-Document ids do not change counts or delete, so that edge counting stays stable.
35. As a product owner, I want Graph/Ribbon to stay out of FileBrowser DeleteItems, so that only the FileBrowser plugin owns this intent.
36. As a FileBrowser user, I want confirm UX to remain in the shell before the host calls DeleteItems, so that accidental deletes still require confirmation.
37. As a FileBrowser user, I want failed mid-delete Documents to still appear after refresh, so that I can retry them.
38. As a backend maintainer, I want empty FolderPaths arrays and empty InstanceIds arrays both allowed independently, so that file-only and folder-only deletes work.
39. As a FileBrowser user, I want Documents whose FilePath is exactly the folder path deleted when that Virtual Folder is deleted, so that files in that folder are included, not only deeper children.
40. As a documentation consumer, I want CONTEXT and ADR 0014 to describe counts, partial success, and root rejection, so that future agents do not re-litigate domain.

## Implementation Decisions

- Add `DeleteItems` on the shared FileBrowser plugin package (Graph and Map shells inherit the base method).
- Wire request: `{ InstanceIds: string[]/Guid[], FolderPaths: string[] }`; response: `{ Succeeded: number, Failed: number }` (Document counts). Always return this shape when the request is accepted; empty arrays → `{ 0, 0 }`.
- If any normalized FolderPath is browse root `/`, reject the entire request before resolving targets or deleting (exception / validation failure — no count body required for this hard reject).
- Resolve targets: for each InstanceId, if absent → Succeeded++; if present non-Document → ignore; if present Document → add to unique target set. For each non-root FolderPath, expand Documents under that prefix (equal path or `path + "/"` prefix), including Fade’d; empty expansion → no-op. Dedupe by Document identity before delete/count of attempts.
- Delete each present Document with the same tab entity-delete meaning as Graph/Map Delete for instances (remove from dataset membership and from Graph/Map display / related cleanup already used by entity delete). Do not invent FilePath-only unlink or Fade-as-delete.
- Partial success: on per-Document delete failure, Failed++, keep prior successes, continue remaining targets. Do not roll back the batch.
- Absent InstanceId after dedupe resolution counts as Succeeded (idempotent). Non-Document present ids never enter Succeeded/Failed.
- Package method only delegates to one orchestrator collaborator (same style as folder rename changer); no CancellationToken on the public execute signature; tracing/cancellation inside the collaborator; Scoped tab data access via existing DI patterns.
- Reuse documents-under-folder membership and browse-path normalize/validate already used by rename/list where applicable; do not call Explore package APIs.
- Frontend host: change delete API from void to count result; after return, refresh FileBrowser list; if Failed > 0 show summary toast with Succeeded/Failed counts; if Failed === 0 refresh silently. Session empty prune remains client-only before/alongside remote call as today.
- Update FileBrowser backend agent notes / phase docs so DeleteItems is listed as a public API.
- Domain docs already updated in CONTEXT and ADR 0014; keep them authoritative if implementation details drift — fix code to match domain, not the reverse, unless a new grilling revisits a decision.

## Testing Decisions

- Good tests assert external behavior of the chosen seams (returned counts, whether Documents remain on the tab, hard reject when root FolderPath is present, no double-delete on overlap), not private helper call graphs.
- **Backend primary seam:** public package method `DeleteItems` (prior art: FileBrowser `RenameFolder` / `ValidateFolderName` / list package tests).
- **Backend supporting seam:** delete orchestrator tests where package tests alone cannot express partial mid-failure continuation and Graph/Map display cleanup cleanly (prior art: `FolderNameChanger` and FileBrowser provider tests under LAP.Tests).
- **Reuse:** documents-under-folder expansion behavior already covered for rename — only add delete-focused cases that assert count/delete outcomes, not a second prefix engine.
- **Frontend primary seam:** IAP host delete path — DeleteItems result counts → refresh; Failed > 0 → summary toast; Failed === 0 → silent refresh (prior art: `FileBrowserItemDeleteService` / `FileBrowserApiService` specs).
- Prefer existing NSubstitute/FluentAssertions (BE) and Jasmine/TestBed (FE) patterns; do not invent a second harness.
- Cover at least: empty payload zeros; single file success; multi-file success; Virtual Folder recursive Documents; mixed selection; dedupe overlap; absent InstanceId → Succeeded; non-Document ignored; empty FolderPath no-op; root FolderPath rejects whole request with no deletes; partial mid-failure increments Failed and continues; Fade’d Documents under folder included.

## Out of Scope

- Redesigning shell confirm copy or context-menu placement (already on Web branch).
- Per-Document failure lists or detailed error codes in the wire result (counts only).
- All-or-nothing rollback for the whole DeleteItems batch.
- Server APIs for session empty folder create/delete.
- Soft-delete, Fade-as-delete, or FilePath wipe that leaves Documents on Graph/Map.
- Allowing FolderPaths = `/` as a bulk clear.
- Deleting non-Document entities through DeleteItems.
- Binary warehouse GC beyond whatever Graph/Map entity delete already does.
- Move / rename / cut / copy / paste changes.
- Graph or Ribbon entry points for FileBrowser delete.
- Explore package APIs for FileBrowser data.
- Changing browse listing or membership rules unrelated to delete.

## Further Notes

- Web feature branch already ships shell + host call with void `deleteItems`; this spec requires aligning that host contract to counts.
- IAP feature branch name exists for TECSDM-121170 but had no DeleteItems implementation vs master at grilling time.
- Glossary terms to prefer: Document, FilePath, browse path, Virtual Folder, session empty folder, FileBrowser membership, FileBrowser delete, Folder mutation (delete is removal, not path rewrite).
- Issue tracker: local markdown under `.scratch/file-browser-delete-items/` (Status line uses triage role `ready-for-agent`).
