# Spec: FileBrowser Paste into folder (context menu)

Status: ready-for-agent  
Jira parent: TECSDM-121879  
Domain: `Web/WebUI/iap/.../plugins/file-browser/CONTEXT.md`  
ADRs: 0012 (phase 9 paste to current path), 0015 (host context menu), 0018 (Cut+Paste wave), 0019 (phase 11 paste into folder)

## Problem Statement

Users can Cut then Paste into the **current browse path** (background / file menu / Ctrl+V), and can move onto a folder by tile DnD. They cannot finish a Cut by right-clicking a visible folder and choosing Paste into that folder. That forces either navigating into the folder then Pasting, or switching to tile DnD.

## Solution

Phase 11: when Cut pending is non-empty, show **Paste** on the **folder** context menu (grid and tile). Paste destination is the **right-clicked folder path**. Background, file-menu, and Ctrl+V Paste stay on the current browse path (phase 9). Reuse `MoveItems` / session relocate, collision and partial-success rules, and DnD-like forbid for self/descendant folder targets.

## User Stories

1. As a FileBrowser user, I want Paste on a folder’s right-click menu when I have Cut items, so that I can drop them into that folder without navigating into it.
2. As a FileBrowser user, I want that Paste to put items **inside** the folder I clicked, so that destination matches the menu target.
3. As a FileBrowser user, I want the same Paste in grid and tile folder menus, so that view mode does not change the behavior.
4. As a FileBrowser user, I want Paste hidden or inert on a folder when Cut pending is empty, so that the menu does not offer a no-op.
5. As a FileBrowser user, I want Paste into a Cut folder or its descendant blocked, so that I cannot create a cycle.
6. As a FileBrowser user, I want Paste into a folder that already holds all Cut items (same parent) to only clear Cut pending, so that accidental same-parent Paste cancels without IO.
7. As a FileBrowser user, I want background / file / Ctrl+V Paste unchanged (current browse path), so that phase 9 behavior stays predictable.
8. As a FileBrowser user, I want to stay on my current browse level after a successful folder Paste, so that I am not forced into the destination.

## Out of scope

- Copy / Ctrl+C
- Move modal
- Changing OS DnD upload destination
- Grid internal move DnD
- Navigating into the destination after Paste
- Paste onto a folder **tile drop** (that remains phase 7 DnD)

## Implementation tickets

- `issues/01-paste-on-folder-context-menu.md`
