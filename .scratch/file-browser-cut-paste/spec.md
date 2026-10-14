# Spec: FileBrowser Cut + Paste (FE wave)

Status: ready-for-agent  
Jira: TECSDM-121879  
Domain: `Web/WebUI/iap/.../plugins/file-browser/CONTEXT.md`  
ADRs: 0012 (phase 9), 0015 (host context menu), 0018 (Cut+Paste before Copy)

## Problem Statement

In FileBrowser (نمای اسناد), users can browse Documents as files and folders but cannot relocate a multi-selection by Cut then Paste. They must rely on tile-only single-item drag-and-drop move (phase 7) or leave items where they are. There is no Cut/Paste in the context menu and no Ctrl+X / Ctrl+V, so moving several files or folders into another browse path is slow and easy to get wrong.

## Solution

Add **Cut** and **Paste** in both grid and tile: context menu entries and Ctrl+X / Ctrl+V. Cut stores a tab-session clipboard (not the OS clipboard) and shows a ghost (dimmed) Cut pending state. Paste always targets the **current browse path**. Relocate uses backend `MoveItems` for Documents and Virtual Folders; session empty folders move in session only. Copy is out of this wave. Same-browse-path Paste and Escape clear Cut pending without relocate IO.

## User Stories

1. As a FileBrowser user, I want to Cut one selected file from the context menu, so that I can paste it into another folder later.
2. As a FileBrowser user, I want to Cut multiple selected files from the context menu, so that I can move a batch in one Paste.
3. As a FileBrowser user, I want to Cut a Virtual Folder from the context menu, so that its Document tree relocates under the paste browse path.
4. As a FileBrowser user, I want to Cut a session empty folder from the context menu, so that I can relocate an empty folder I created without a backend call.
5. As a FileBrowser user, I want to Cut a mixed selection of files and folders, so that one clipboard holds the whole selection.
6. As a FileBrowser user, I want Cut available in tile view, so that I am not forced into grid for relocate.
7. As a FileBrowser user, I want Cut available in grid view, so that I can relocate from the attribute table.
8. As a FileBrowser user, I want Ctrl+X to Cut the current selection, so that I can work without opening the menu.
9. As a FileBrowser user, I want Cut disabled or inert when nothing is selected, so that I do not empty or corrupt the clipboard by accident.
10. As a FileBrowser user, I want Cut items to look ghosted (dimmed) after Cut, so that I can see what is pending relocate.
11. As a FileBrowser user, I want ghosting in both grid and tile, so that Cut pending is visible regardless of view mode.
12. As a FileBrowser user, I want a new Cut to replace the previous Cut pending payload, so that the clipboard always matches my latest Cut.
13. As a FileBrowser user, I want Escape to clear Cut pending when focus is in FileBrowser, so that I can cancel without Pasting.
14. As a FileBrowser user, I want Escape while typing in rename or create-folder inputs to edit text instead of clearing Cut pending, so that shortcuts do not fight forms.
15. As a FileBrowser user, I want Paste from the selection context menu when Cut pending is non-empty, so that I can finish relocate after navigating.
16. As a FileBrowser user, I want Paste from the empty-background context menu when Cut pending is non-empty, so that I can Paste without selecting a row (Windows-like).
17. As a FileBrowser user, I want Ctrl+V to Paste without needing a selection when Cut pending is non-empty, so that keyboard flow matches the menu.
18. As a FileBrowser user, I want Paste to target only the current browse path, so that I am not surprised by paste-onto-folder-tile behavior.
19. As a FileBrowser user, I want Paste on the same browse path I Cut from to clear Cut pending and do nothing else, so that accidental same-folder Paste cancels Cut without calling the server.
20. As a FileBrowser user, I want Paste after navigating to another browse path to relocate Cut items there, so that Cut+Paste works like a deferred move.
21. As a FileBrowser user, I want Document and Virtual Folder Paste to call `MoveItems`, so that FilePath updates persist on the tab.
22. As a FileBrowser user, I want session empty folder Paste to update only session state when there are no Documents under it, so that empty folders stay client-only.
23. As a FileBrowser user, I want the list to refresh after a relocating Paste that did work, so that I see the new browse level contents.
24. As a FileBrowser user, I want a clear report when `MoveItems` partially fails, so that I know what succeeded and what failed.
25. As a FileBrowser user, I want Cut pending kept when Paste has Failed > 0, so that I can fix the destination or retry without re-Cutting.
26. As a FileBrowser user, I want Cut pending cleared when Paste has Failed = 0, so that a finished move does not leave ghost items.
27. As a FileBrowser user, I want folder destination collision failures from the server to surface in the failure report, so that I understand why a folder did not move.
28. As a FileBrowser user, I want to stay on the current browse level after Paste, so that navigation is not yanked away after relocate.
29. As a FileBrowser user, I want Cut pending to survive switching away to Graph/Map/Grid and back within the same tab, so that clipboard is tab session state.
30. As a FileBrowser user, I want Cut pending cleared when the visualizer tab closes or the page fully refreshes, so that clipboard does not leak across tabs/sessions.
31. As a FileBrowser user, I do not want a Copy menu item in this wave, so that I am not offered an action the product cannot complete yet.
32. As a FileBrowser user, I do not want Ctrl+C for FileBrowser Copy in this wave, so that keyboard Copy is not a half-built feature.
33. As a FileBrowser user, I do not want a BDMP-style “move to folder” modal, so that relocate stays Cut/Paste and DnD only.
34. As a FileBrowser user, I want Cut and Paste host menu items to apply to folders as well as files where appropriate, so that folder relocate is reachable from the menu.
35. As a host engineer, I want the shell to emit cut/paste intents (and shortcut equivalents) without calling `executeFunction`, so that IO stays in the IAP host.
36. As a host engineer, I want tab clipboard state owned by the host session, so that other hosts can reuse the same shell UX with their own IO.
37. As a FileBrowser user, I want Paste hidden or disabled when Cut pending is empty, so that empty Paste does nothing confusing.
38. As a FileBrowser user, I want multi-select Cut to include only the current selection at Cut time, so that later selection changes do not alter the pending payload.
39. As a FileBrowser user, I want ghost appearance removed immediately when Cut pending clears (Escape, same-path Paste, successful Paste, or new Cut), so that visuals match clipboard state.
40. As a FileBrowser user, I want Ctrl+X / Ctrl+V ignored while focus is in rename/create inputs, so that text editing keeps standard shortcuts.
41. As a QA engineer, I want same-browse-path Paste to be testable without mocking `MoveItems`, so that cancel-in-place behavior is isolated.
42. As a QA engineer, I want partial-failure Paste to assert clipboard retained, so that retry UX stays correct.
43. As a product owner, I want this wave tracked under TECSDM-121879, so that FileBrowser relocate FE has a single Story home.
44. As a FileBrowser user, I want Delete and other existing menu actions to keep working alongside Cut/Paste, so that relocate does not regress current menus.
45. As a FileBrowser user, I want Paste on background not to open the browser’s native menu when our background menu is shown, so that Paste is reachable cleanly.

## Implementation Decisions

- Deliver phase 9 **Cut+Paste FE wave** only; Copy deferred per ADR 0018.
- Shell (`@mohaymen/file-browser`): context-menu Cut/Paste entries (host-ordered), keyboard Ctrl+X / Ctrl+V, Escape clear Cut pending (outside inputs/modals), ghost Cut-pending presentation, background menu when Paste is available; emit intents only.
- Host (IAP FileBrowser plugin): tab-scoped Cut pending clipboard in FileBrowser session state; map clipboard units to `MoveItems` request (`InstanceIds` + `FolderPaths`) with `DestinationPath` = current browse path; session empty folders handled in session without API when applicable.
- Wire: existing `executeFunction('FileBrowser', 'MoveItems', …)` — no new backend method in this wave.
- Same-browse-path Paste: clear Cut pending; no `MoveItems`.
- Partial `MoveItems` result: refresh when any work happened; toast/summary like Delete partial; clear clipboard only if Failed = 0.
- Full success Cut+Paste: clear clipboard + remove ghost; stay on current browse path.
- Host context menu order extended with Cut and Paste (files and folders as product rules require); no Copy id in this wave.
- No OS clipboard requirement; no move modal; no Paste-onto-folder-tile destination.
- Respect existing host context-menu architecture (ADR 0015): host supplies order, titles, appliesTo, disabled, icons.

### Test seams (proposed)

Prefer **one primary host seam**: the FileBrowser actions facade that already routes context-menu activations (same pattern as Delete). Treat cut / paste / keyboard / Escape clear as inputs to that facade (or a thin clipboard collaborator it owns). Assert external behavior: clipboard filled/cleared, `MoveItems` called or not, refresh, notifications, ghost flags exposed to the shell.

Secondary (only if needed): shell unit tests for shortcut → intent and ghost class binding; API wrapper tests for `MoveItems` payload shape — keep thin; do not duplicate facade scenarios.

## Testing Decisions

- Test external behavior only (intents in → clipboard / API / refresh / toast / ghost out). Do not assert private helper structure.
- Primary coverage on the host actions/clipboard seam (facade + MoveItems collaborator), mirroring `FileBrowserActionsFacade` / `FileBrowserItemDelete` specs.
- Cases to cover: Cut fills clipboard; Paste other path calls MoveItems; same-path Paste no API; Escape clears; partial failure keeps clipboard; full success clears; session empty without API; empty selection Cut no-op; Paste with empty clipboard no-op.
- Shell: minimal tests that shortcuts/menu emit the expected intents and ghost state binds when host marks items Cut pending.
- Prior art: delete confirm + partial toast + `refreshList` in actions facade specs; context menu order service specs; file-browser API service specs.

## Out of Scope

- Copy / Ctrl+C / binary duplicate Documents
- New backend Copy APIs
- BDMP-style move-to-folder modal
- Paste onto a folder tile as destination
- OS clipboard integration
- Grid internal DnD move (still tile-only phase 7)
- Changing `MoveItems` backend contract
- Graph Ribbon entry for FileBrowser relocate
- File rename / folder rename changes (phase 8 already separate)

## Further Notes

- Parent Story: [TECSDM-121879](https://jira.mohaymen.ir/browse/TECSDM-121879)
- Local durable spec: `.scratch/file-browser-cut-paste/spec.md`
- Glossary updates landed in CONTEXT (Cut pending, Same-browse-path Paste, Cut+Paste partial success, Background Paste menu) plus ADR 0018
- Implementation tickets (published):
  - [TECSDM-122054](https://jira.mohaymen.ir/browse/TECSDM-122054) — 01 پایه MoveItems + Cut pending store
  - [TECSDM-122055](https://jira.mohaymen.ir/browse/TECSDM-122055) — 02 Cut منو + Ctrl+X + ghost
  - [TECSDM-122056](https://jira.mohaymen.ir/browse/TECSDM-122056) — 03 Paste جابه‌جایی مسیر دیگر
  - [TECSDM-122057](https://jira.mohaymen.ir/browse/TECSDM-122057) — 04 لغو و لبه‌ها
  - Local: `.scratch/file-browser-cut-paste/issues/`
