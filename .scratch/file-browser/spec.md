# Spec: FileBrowser visualizer plugin (phases 0–9)

Status: ready-for-agent

## Agent entry

**Ordering source of truth:** [ORDER.md](./ORDER.md) — backend before frontend per wave; do not start an FE ticket until its BE blockers are `done`.

Tickets live under:

- `.scratch/file-browser/issues/backend/` (`BE-01` … `BE-07`)
- `.scratch/file-browser/issues/frontend/` (`FE-01` … `FE-11`)

Domain language and locked decisions live in:

- `Web/WebUI/iap/app/visualizer/visualizer/plugins/file-browser/CONTEXT.md` (glossary + locked decisions)
- `Web/WebUI/iap/app/visualizer/visualizer/plugins/file-browser/docs/file-browser-phases.md`
- ADRs in `…/plugins/file-browser/docs/adr/` (`0001`–`0013`)
- Peer-URL prerequisite (done): shared ADR `iap/docs/visualizer/plugin/adr/0001-plugin-based-view-peer-urls.md`

Use glossary terms exactly: **Document**, **FilePath**, **browse path**, **Virtual Folder**, **session empty folder**, **folder destination collision**, **FileBrowser** (not FileExplorer), **`@mohaymen/file-browser`**. Do not invent Explore-package or LADW GraphQL paths for this feature.

## Problem Statement

Visualizer users need a BDMP-like file manager for **Document** instances on the current tab, separate from Grid Explore and without LADW warehouse search. Today there is no FileBrowser view, no FileViewer display-file open contract for a file-manager host, and no shared browse shell library. Adding files, folders, upload queues, DnD, rename, and clipboard must land on Document/`FilePath` semantics without a BDMP “move to folder” modal and without teaching ontology add-entity UI to file-manager users.

## Solution

Ship **FileBrowser** as a PluginBasedView at `/visualizer/file-browser` (`uniqueName = FileBrowser`) with chrome: no Ribbon / left sidebar / footer; right End Sidebar kept for FileViewer. Reusable shell in **`@mohaymen/file-browser`** emits intents; IAP host owns gateway upload, plugin execute, Document/`FilePath` IO, and tab session. Backend is a dedicated FileBrowser visualizer package (not Explore). Deliver in locked phases 0–9: FileViewer display-file → flat list/view/download → dual-entry Document-from-file add → async upload panel → folders → folder upload → DnD upload → tile DnD move → rename → cut/copy/paste.

## User Stories

1. As a visualizer user, I want FileBrowser in the view-mode list, so that I can open a document file manager without using Explore.
2. As a visualizer user, I want FileBrowser at `/visualizer/file-browser`, so that the address is a peer of Graph/Map/Grid.
3. As a visualizer user, I want no Ribbon / left sidebar / footer in FileBrowser, so that the UI feels like a file manager, not the graph chrome.
4. As a visualizer user, I want the right End Sidebar available, so that FileViewer can show a file while I browse.
5. As a visualizer user, I want to see all Documents on the current tab including faded ones, so that membership matches the board, not canvas selection.
6. As a visualizer user, I want a paged flat list of files with name, extension, and size, so that I can browse documents before folders exist.
7. As a visualizer user, I want grid and tile layouts, so that I can choose how files are presented.
8. As a visualizer user, I want default sort by name, so that the list is predictable.
9. As a visualizer user, I want to open a file in FileViewer from the list, so that I can preview content.
10. As a visualizer user, I want to download a file from the list, so that I can save it locally.
11. As a visualizer user coming from Explore, I want FileViewer to open with the same display-file shape FileBrowser uses, so that preview behavior is consistent.
12. As a visualizer user, I want to add one or many files from the FileBrowser toolbar, so that new Documents appear on the tab without an ontology form.
13. As a visualizer user adding from FileBrowser, I want files placed at graph origin spacing without Attach links, so that add does not bind to selection.
14. As a graph user, I want bulk AddAttachment using the same create core, so that each successful Document still Attaches to current non-Document selection.
15. As a visualizer user, I want partial success on bulk add, so that one failure does not roll back successful Documents.
16. As a visualizer user, I want oversize files rejected per the existing 25MB flag rule before upload, so that other files in the batch can continue.
17. As a FileBrowser user, I want an async upload queue with progress and cancel, so that I can keep browsing while uploads run.
18. As a FileBrowser user, I want in-flight uploads to survive switching to Graph/Map/Grid in the same tab, so that leaving the view does not cancel work.
19. As a FileBrowser user, I want cancel to abort byte upload or drop queued items, but not tear down Document create once it started, so that cancel semantics stay safe.
20. As a FileBrowser user, I want the file list to refresh once when a batch finishes, so that successful files appear together.
21. As a FileBrowser user, I want to navigate folders with a breadcrumb, so that I can organize Documents by browse path.
22. As a FileBrowser user, I want Virtual Folders derived from Document FilePath values, so that folders appear without a Folder entity.
23. As a FileBrowser user, I want to create an empty folder in session only, so that I can prepare a path before any Document exists.
24. As a FileBrowser user, I want session empty folders to survive switching views in the same tab, so that empty folders are not lost until tab close or full refresh.
25. As a FileBrowser user adding a file in a folder, I want the Document FilePath set to the current browse path, so that the file lands in that folder.
26. As a graph user using AddAttachment, I want new Documents to stay at root FilePath, so that Graph add does not inherit FileBrowser folder context.
27. As a FileBrowser user, I want to upload a local folder tree under the current browse path, so that relative structure is preserved like BDMP Explore.
28. As a FileBrowser user, I want folder destination collision to fail before upload starts, so that same-named sibling folders are not merged or auto-nested.
29. As a FileBrowser user, I want same-named files at a destination to be allowed, so that file name clashes do not block upload.
30. As a FileBrowser user, I want to drop OS files/folders onto the list area into the current browse path, so that DnD upload matches BDMP (not drop-onto-folder-tile).
31. As a FileBrowser user, I want internal item drag disabled until move ships, so that upload DnD is not confused with relocate.
32. As a FileBrowser user in tile view, I want to drag one file or folder onto a folder tile to move it, so that I can reorganize without a move modal.
33. As a FileBrowser user, I want move to reject self/descendant targets and colliding folder names up front, so that cycles and sibling clashes fail safely.
34. As a FileBrowser user moving a folder, I want all-or-nothing FilePath prefix rewrite, so that the tree does not partially move.
35. As a FileBrowser user, I want to rename one file or folder via a Rename modal from grid or tile, so that rename is explicit and consistent.
36. As a FileBrowser user renaming a file, I want only the Document Name to change, so that Extension stays fixed.
37. As a FileBrowser user renaming a Virtual Folder, I want subtree paths rewritten all-or-nothing on the server, so that the tree stays consistent.
38. As a FileBrowser user renaming a session empty folder, I want only session paths updated, so that no backend call is required.
39. As a FileBrowser user, I want multi-select cut/copy/paste in grid and tile, so that I can relocate or duplicate multiple items.
40. As a FileBrowser user, I want Copy to create new Documents with copied binary content, so that copy is not a shortcut/link.
41. As a FileBrowser user, I want Paste to apply to the current browse path only, so that I navigate then paste instead of using a destination modal.
42. As a FileBrowser user, I want Cut+Paste to clear the clipboard and Copy+Paste to keep it, so that clipboard behavior matches common file managers.
43. As a developer, I want the browse shell in `@mohaymen/file-browser`, so that IAP/BDMP hosts share UI behavior without copying LADW services.
44. As a developer, I want the shell to emit intents only, so that product APIs and gateway upload stay in the host.
45. As a developer, I want FileBrowser backend membership to ignore Selected scope, so that canvas selection never filters the file list.
46. As a developer, I want one shared folder/file name validator in the library, so that create-folder and rename rules stay aligned with BDMP Explore charset rules.
47. As a QA engineer, I want tests at the highest seams (opener, shell facade, host adapter, FileBrowser package), so that regressions lock external behavior without Explore package coupling.
48. As a product owner, I want no BDMP move-to-folder modal anywhere in this feature, so that relocation stays DnD and cut/paste only.

## Implementation Decisions

- Prerequisite peer PluginBasedView URLs are already shipped; FileBrowser registers like Writings: PluginBasedView, `urlSegment = file-browser`, peer path only.
- Wire `uniqueName = FileBrowser`. Do not add a new `ViewMode` enum member.
- Chrome: empty / none of Ribbon, left Sidebar, Footer in `visibleChrome`; End Sidebar remains for FileViewer.
- Shared shell library `@mohaymen/file-browser` from phase 1 onward (ADR 0008). Consumes Termeh/`trp-upload-zone`; does not absorb `mohaymen-file-viewer`; does not live in `mohaymen-share-components`.
- Shell owns: grid/tile chrome, breadcrumb, add/create-folder actions, name validation, browse-path helpers, upload-zone on both views, external DnD upload on both views, internal move DnD on **tile only**, rename modal UX, multi-select cut/copy/paste UX. Host owns: data access, gateway upload, Document/`FilePath`/binary-copy IO, tab session orchestration.
- Phase 0 **(done):** FileViewer opener accepts `FileViewerDisplayFile` `{ fileId, link, name, extension }`. Explore/profile prepare via `FileViewerDisplayFilePreparer`, then `open(displayFile)`. No forever dual fat+display-file opener contracts.
- Phase 1 APIs: ListFiles (paged, sort by name; id, name←Name, extension←Extension, size←Length) + PrepareView + PrepareDownload `{ downloadUrl }` (optional fileName). Empty Name/Extension/Length pass through as-is.
- Membership: all Documents on current tab including Fade’d; selection ignored. List `id` is tab Document identity. No Explore package methods; no `InstancesData` as public FileBrowser wire shape; no LADW GraphQL file search.
- Phase 2: shared Document-from-file core — upload bytes → `fileId`(s) → create Document(s). FileBrowser toolbar + Graph `AddAttachment` both bulk; FileBrowser `(0,0)` origin placement, no Attach; Graph viewport center + Attach per successful Document to selected non-Documents; partial success; 25MB/flag per file; sync spinner until phase 3.
- Phase 3: FileBrowser-only async panel; cancel = abort upload / drop queued (not mid-create); uploads survive leaving FileBrowser within tab; list refresh once at batch end; no domain concurrency cap; Graph keeps sync spinner.
- Phase 4: introduce Document `FilePath` (parent folder path only; missing/empty = `/`; no backfill migration). Browse level = child folders (unpaged) + files (paged); display folders-by-name then files-by-name. Virtual Folders from path prefixes; session empty folders in FileBrowser tab session; Create folder has **no** backend API. FileBrowser add writes current browse path; Graph add stays root. Out of scope in phase 4: rename/delete/move, folder-tree upload.
- Browse path wire form: root `/`; otherwise leading `/`, no trailing `/`; normalize both sides.
- Folder name / file Name rules: BDMP Explore charset `/^[\p{L}\p{N}\-_.\s()]+$/u`; trim; reject whitespace-only; duplicate folder name at same level rejected UI and server. Shared validator in library.
- Folder destination collision: validate before folder upload / folder move / folder paste; fail up front; no merge; no auto-nest as clash resolution; same-named files allowed.
- Phase 5: toolbar folder upload only; client maps `webkitRelativePath` under current browse path; reuse create core + phase 3 queue; no UploadFolderTree backend API; no empty-folder reconstruction; stay on current level; no Graph entry.
- Phase 6: OS drop onto list → current browse path only; same rules as toolbar; internal drag disabled until phase 7.
- Phase 7: tile-only internal move; one item onto folder tile; no move modal / Move menu; file move rewrites FilePath; folder move all-or-nothing prefix rewrite + session empty alignment; stay on current level.
- Phase 8: rename single item both views via modal; file Name only; folder session-only or server all-or-nothing prefix; FE **and** BE folder collision; stay on current level; FileBrowser only.
- Phase 9: multi-select; internal clipboard in tab session; Copy = new Documents + binary copy (folder recreates tree); Cut relocates like move via navigate+Paste; paste to current browse path only; collision validate before paste IO; Copy multi partial OK; each Cut folder all-or-nothing; after Cut+Paste clear clipboard; after Copy+Paste keep for re-paste; session empty cut/copy in session when no Documents.
- FileBrowser session state (empty folders, browse path, upload queue, clipboard) is tab-scoped; survives Graph/Map/Grid switch; cleared on tab close or full page refresh — not `localStorage` as primary home.
- Prefer existing seams over new ones (see Testing Decisions).

## Testing Decisions

- Good tests assert **external behavior**: opener contracts, list/view/download results, create/membership side effects, browse-path outcomes, collision failures, intent payloads from the shell — not private helpers or DOM trivia.
- **Seams (one primary per layer):**
  1. `FileViewer` display-file opener (+ `FileViewerDisplayFilePreparer` for Explore/profile) — phase 0 **done**
  2. `@mohaymen/file-browser` shell facade (validators, path helpers, intent emission, DnD/clipboard UX) — from phase 1
  3. FileBrowser host PluginBasedView adapter (intents → execute / upload / display-file open / session) — from phase 1
  4. FileBrowser backend visualizer package (+ shared Document-from-file core) — from phase 1/2; use BaseVisualizerTests-style package tests; **never** BaseExplorePackage
- Prior art: Writings PluginBasedView specs; FileViewer/Explore opener specs; AddAttachment package/CT patterns; BDMP folder-name/path/DnD unit suites for shell rules; Termeh tiled-explorer specs for presentation primitives.
- Domain docs do not require Cypress/integration suites; keep optional/thin. Prefer unit/package tests at the seams above.
- Do not hang FileBrowser correctness on Explore Selected-scope or LADW filesystem tests.

## Out of Scope

- Peer PluginBasedView URL infrastructure (already done)
- Graph/Ribbon folder upload, Graph DnD upload, Graph rename/move/clipboard entries
- BDMP-style move-to-folder / destination modals
- Folder delete product phase (not in 0–9 locked list)
- Reconstructing browser-omitted empty directories on folder upload
- Merging same-named folders or auto-nesting to resolve collisions
- OS clipboard requirement for cut/copy/paste
- New `ViewMode` enum member; Ribbon-only FileBrowser entry
- Using Explore package APIs or LADW GraphQL for FileBrowser data
- Putting the browse shell in `mohaymen-share-components`
- FilePath one-shot backfill migration
- Dual forever fat+FileViewer display-file opener contracts
- Integration/Cypress as a required delivery gate for these tickets

## Further Notes

- Phases 0–9 domain grilling is closed; do not re-open product rules in implementation tickets without an explicit ADR/`CONTEXT.md` update.
- Complexity estimates (Persian): `…/docs/file-browser-complexity-fa.html` — planning aid only, not acceptance.
- Ticket sequencing source of truth: [ORDER.md](./ORDER.md). Backend before frontend per wave; **FE-01 done** — next frontier `BE-01` then `FE-02`.
- When in doubt, `CONTEXT.md` Avoid lines win over improvisation.
