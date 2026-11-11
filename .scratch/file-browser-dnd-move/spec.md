# Spec: FileBrowser tile DnD move (phase 7 reopen)

Status: done  
Jira parent: TECSDM-121879  
Domain: `Web/WebUI/iap/.../plugins/file-browser/CONTEXT.md`  
ADR: 0011 (updated — multi-select tile DnD; backend owns folder destination collision)

## Problem Statement

In FileBrowser tile view, users still cannot drag items onto a folder to relocate them. Cut/Paste works, but drag-and-drop move (phase 7) is missing in the shell. Relocating by navigating then Paste is slower when the destination folder is already visible as a tile.

## Solution

Enable **internal list-item DnD move on tile only**: drop onto a folder tile (Virtual or session empty). Move the current selection (multi-select). Shell emits one batched move intent; host relocates via `MoveItems` + session empty relocate (same as Paste, destination = drop folder path). No frontend folder-name collision pre-check; backend errors surface like Paste. Full success clears Cut pending; partial keeps it. Stay on current browse level. Gated by `enableCutPaste`. No Copy via DnD; no OS upload DnD in this work; no grid internal move.

## Test seams

Primary host seam: actions facade / relocate collaborator (same family as Paste → `MoveItems`). Secondary thin shell: `canDrop`, not-allowed feedback, one batched intent when `enableCutPaste`.

## Out of Scope

- Copy / Ctrl-drag copy
- Phase 6 OS drag-and-drop upload
- Grid internal move DnD
- Move modal / Move context-menu entry
- Frontend folder destination collision pre-check
- Changing `MoveItems` backend contract

## Tickets

Published under [TECSDM-121879](https://jira.mohaymen.ir/browse/TECSDM-121879):

- [TECSDM-158871](https://jira.mohaymen.ir/browse/TECSDM-158871) — 01 جابه‌جایی یک آیتم با کشیدن روی پوشه
- [TECSDM-158872](https://jira.mohaymen.ir/browse/TECSDM-158872) — 02 جابه‌جایی چندتایی با کشیدن روی پوشه
- [TECSDM-158873](https://jira.mohaymen.ir/browse/TECSDM-158873) — 03 راهنمای درگ ممنوع و هم‌ترازی با Cut

Local: `.scratch/file-browser-dnd-move/issues/`
