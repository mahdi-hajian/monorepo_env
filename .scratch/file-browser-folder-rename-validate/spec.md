# Spec: FileBrowser ValidateFolderName + RenameFolder (backend + create wiring)

Status: ready-for-agent

Domain glossary: `Web/WebUI/iap/app/visualizer/visualizer/plugins/file-browser/CONTEXT.md`  
ADRs: `0013-file-browser-rename.md`, `0014-validate-folder-name-vs-rename.md`

## Problem Statement

Folder tile rename for Virtual Folders is already wired on the frontend to `RenameFolder`, but the FileBrowser backend does not implement that intent yet — so renaming a Virtual Folder fails at the plugin boundary. Create folder still writes a session empty folder after client-only checks, with no server re-check of folder name rules. Operators need Virtual Folder rename that rewrites Document `FilePath` prefixes safely, and create-folder that only adds a session empty folder after both client validation and a name-only server validate succeed.

## Solution

Ship two FileBrowser plugin intents and wire create-folder to the validate path:

1. **`ValidateFolderName({ Name })`** — server checks charset/trim only; empty success body; used by create after client validation passes; no browse path; no folder destination collision.
2. **`RenameFolder({ Path, NewName })`** — server validates name rules, rejects missing Virtual Folder Path, rejects unchanged segment, rejects ordinal sibling folder destination collision, then all-or-nothing rewrites `FilePath` for every Document under that prefix (including Fade’d). Frontend rename keeps calling only this intent (no separate validate call). Failures surface language-dictionary messages; the client toasts the raw plugin exception and keeps the rename modal open.

Create-folder order: client folder-name rules + sibling collision → `ValidateFolderName` → on OK add session empty folder and refresh list.

## User Stories

1. As a FileBrowser user, I want to rename a Virtual Folder from the tile context menu, so that the browse path segment matches the name I chose.
2. As a FileBrowser user, I want every Document under that folder (including Fade’d) to move with the rename, so that the tree stays consistent.
3. As a FileBrowser user, I want rename to fail entirely if anything goes wrong mid-update, so that I never see a half-renamed tree.
4. As a FileBrowser user, I want rename to fail when the destination sibling Virtual Folder name already exists (case-sensitive), so that I do not merge or overwrite folders by accident.
5. As a FileBrowser user, I want rename to fail when the new name equals the current segment, so that I get a clear error instead of a fake success.
6. As a FileBrowser user, I want rename to fail when the Path is not a Virtual Folder on the server, so that stale or session-only paths are not silently accepted.
7. As a FileBrowser user, I want rename failure messages in Persian from the server dictionary, so that the toast is understandable.
8. As a FileBrowser user, I want the rename modal to stay open on failure, so that I can fix the name and retry.
9. As a FileBrowser user, I want a successful Virtual Folder rename to mark the visualizer tab unsaved, so that I know I must save.
10. As a FileBrowser user, I want related session empty paths under the renamed prefix updated on the client after a successful server rename, so that empty folders stay aligned.
11. As a FileBrowser user, I want to stay on the current browse level after a successful rename, so that my place in the tree does not jump.
12. As a FileBrowser user, I want `Report` and `report` to remain distinct folders, so that case-only differences behave like listing and create-folder today.
13. As a FileBrowser user, I want creating a folder to still live only in tab session, so that empty folders are not persisted as entities.
14. As a FileBrowser user, I want create-folder to run client validation first, so that obvious charset and sibling clashes fail without a round-trip.
15. As a FileBrowser user, I want create-folder to call `ValidateFolderName` only after client validation succeeds, so that the server re-checks name rules before session write.
16. As a FileBrowser user, I want create-folder to skip adding a session empty folder when server validate fails, so that invalid names never enter session.
17. As a FileBrowser user, I want create-folder sibling collision (Virtual + session empty) to stay on the client, so that uniqueness includes session empties the server cannot see.
18. As a FileBrowser user, I want file rename, grid folder rename, F2, and breadcrumb rename left alone in this delivery, so that scope stays folder-tile Virtual rename plus create validate.
19. As a visualizer plugin consumer, I want `ValidateFolderName` success to be an empty/null body, so that hosts treat it like other void FileBrowser intents.
20. As a visualizer plugin consumer, I want `RenameFolder` success to be an empty/null body, so that hosts do not parse a result payload.
21. As a backend maintainer, I want rename to build the new path from parent(Path) + trimmed NewName, so that clients cannot invent absolute destination paths.
22. As a backend maintainer, I want name charset rules on the server to match Folder name rules, so that API callers cannot bypass the shell validator.
23. As a backend maintainer, I want shared server validation used inside both validate and rename, so that charset rules do not drift between intents.
24. As a QA engineer, I want package-level tests for both intents, so that wire behavior is locked without relying on UI.
25. As a frontend engineer, I want the create host path tested for the ordered validate-then-session flow, so that regressions are caught at the IAP host seam.
26. As a FileBrowser user, I want same-named files after a folder rename to remain allowed, so that file uniqueness rules do not change.
27. As a FileBrowser user, I want Graph/Ribbon to stay out of folder rename and create validate, so that only the FileBrowser plugin owns these intents.

## Implementation Decisions

- Deliver backend `ValidateFolderName` and `RenameFolder` on the FileBrowser plugin package (Graph/Map shells share the base package methods).
- Deliver frontend create-folder host wiring: after existing client validation succeeds, call `ValidateFolderName({ Name })`; only on success call session empty folder add + list refresh.
- Frontend rename remains: call `RenameFolder` only (already shipped); do not add a separate `ValidateFolderName` call on the rename path.
- Wire contracts (PascalCase JSON as today):
  - `ValidateFolderName([{ Name }])` → empty success; exception on invalid name.
  - `RenameFolder([{ Path, NewName }])` → empty success; exception on validation/collision/missing Virtual Folder/IO failure.
- `Name` / `NewName`: trimmed segment only; server re-trims and applies Folder name rules (required, not whitespace-only, allowed charset, no `/` in segment).
- `Path`: normalized browse path of the Virtual Folder being renamed; server normalizes; missing Virtual Folder (no Document with FilePath equal to Path or under `Path + "/"`) → error, no IO.
- Unchanged rename: trimmed/normalized NewName equals current path segment → error, no IO.
- Folder destination collision on rename only: ordinal (case-sensitive) equality against direct child Virtual Folder names under parent(Path), excluding the folder being renamed; fail before any FilePath write.
- Rewrite set: every Document on the tab whose normalized FilePath equals Path or starts with `Path + "/"`, including Fade’d; replace that prefix with the new folder path; Document Name/Extension unchanged.
- All-or-nothing: no partial prefix updates as a successful outcome.
- User-visible exception messages via LanguageDictionary (Persian); frontend toasts raw exception text.
- Session empty folders: never persisted by these APIs; create validate does not check collision; rename client continues to rewrite related session empty descendants after successful `RenameFolder` and marks the tab unsaved.
- Architecture: package methods only delegate to providers; no CancellationToken on public execute signatures; tracing/cancellation inside providers; follow existing FileBrowser DI registration patterns.
- Reuse browse-path normalize/validate utilities already used by LoadListFiles where applicable.
- Shared server folder-name rule checker reused by `ValidateFolderName` and the rename path (rename adds path-aware checks on top).
- Update FileBrowser backend agent notes / phase docs as needed so “move/rename not here yet” is no longer stale for folder rename.
- ADR `0014` records why validate is name-only and collision lives in rename; ADR `0013` remains the rename product contract.

## Testing Decisions

- Good tests assert observable behavior of the chosen seams (success/failure outcomes, which Documents’ FilePaths change, no IO on validation failure), not private helpers or incidental call graphs.
- **Backend primary seam:** public package methods `ValidateFolderName` and `RenameFolder` (prior art: Graph FileBrowser package list/view/download tests).
- **Backend supporting seam:** provider-level tests for name validation and folder prefix rewrite / collision where package tests alone cannot express all-or-nothing Document updates cleanly (prior art: existing FileBrowser provider tests under LAP.Tests FileBrowser suite).
- **Frontend primary seam:** IAP FileBrowser view create path — client validation success → `ValidateFolderName` → session empty add; validate failure → no session add (prior art: FileBrowser view component specs; rename flow already covered).
- Prefer extending existing FileBrowser test fixtures and NSubstitute/FluentAssertions (BE) and Jasmine/TestBed (FE) patterns; do not invent a second test harness.
- Cover: invalid charset/empty name; validate success; rename missing Virtual Folder; same-segment NewName; sibling collision case-sensitive; successful multi-Document prefix rewrite including Fade’d; no rewrite when validation fails.

## Out of Scope

- File rename (Document Name only).
- Grid context-menu folder rename, F2, breadcrumb rename.
- Persisting empty folders or any CreateFolder API that writes Documents.
- Server-side collision checks on `ValidateFolderName`.
- Separate validate round-trip from the rename UI.
- Move / copy / cut / paste / delete folder APIs.
- Graph or Ribbon entry points for these intents.
- Changing browse listing case semantics (already ordinal-distinct).
- BDMP Explore parity beyond Folder name rules already agreed.

## Further Notes

- Frontend rename UX and `RenameFolder` client call are largely already on branch `feature/TECSDM-120891-folder-rename`; this spec completes the backend and create validate wiring.
- Glossary terms to prefer: Virtual Folder, session empty folder, browse path, FilePath, folder destination collision, Folder name rules, FileBrowser membership (includes Fade’d).
- Issue tracker for this workspace: local markdown under `.scratch/file-browser-folder-rename-validate/` (repo `docs/agents/issue-tracker.md` not configured; local convention used).
