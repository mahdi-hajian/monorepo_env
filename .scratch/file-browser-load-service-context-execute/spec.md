# Spec: FileBrowser grid — LoadService context execute

Status: ready-for-agent  
Jira parent: TECSDM-122176  
Domain: `Web/WebUI/iap/app/visualizer/visualizer/plugins/file-browser/CONTEXT.md`  
ADR: `docs/adr/0020-file-browser-load-service-context-execute.md`

## Problem Statement

In FileBrowser (document view), right-click LoadService opens the full service list (LoadService browse), as if the user used the Ribbon. In Graph, right-click LoadService already does LoadService context execute: pick a concrete service from the LoadService service tree, then see the Parameters-only modal (or run immediately when there are no parameters). Users expect FileBrowser grid to behave like Graph.

## Solution

On FileBrowser **grid** only for this effort: keep the AG Grid row context menu; add Host nested menu with async LoadService service tree; leaf selection performs LoadService context execute against the current FileBrowser selection. Ribbon stays LoadService browse. One shared service-tree builder feeds Graph and FileBrowser so tree/execute logic is not duplicated. FileBrowser tile nesting and Termeh unification of Graph/Map visualizer context menu chrome are out of scope follow-ups.

## User Stories

1. As a FileBrowser user in grid view, I want right-click LoadService to show the shared service tree, so that I can pick a concrete service like on Graph.
2. As a FileBrowser user, I want that tree to load asynchronously (with a loading state), so that opening the menu stays responsive.
3. As a FileBrowser user, I want choosing a service with parameters to open the Parameters-only modal, so that I am not forced through the full browse UI.
4. As a FileBrowser user, I want choosing a service with no parameters to execute immediately on my selection, so that empty-parameter services stay one-click like Graph.
5. As a FileBrowser user, I want context execute to use my selected files/folders as execute targets, so that the load applies to what I selected.
6. As a FileBrowser user, I want Ribbon LoadService to keep showing LoadService browse, so that discovering services from the ribbon still works.
7. As a FileBrowser user, I want a Graph-like “more…” overflow when the submenu is truncated, so that I can still open full browse when the tree is long.
8. As a developer, I want one LoadService service tree builder shared with Graph, so that folder/service mapping rules do not diverge.
9. As a FileBrowser user in tile view, I accept that nested LoadService may wait for a later ticket, so that grid behavior can ship first.
10. As a product owner, I want Graph/Map Termeh menu chrome unification deferred, so that the behavior bug is not blocked on chrome migration.

## Implementation Decisions

- Scope of this parent: FileBrowser **grid** LoadService context execute only (ADR 0020).
- AG Grid remains the grid context-menu chrome; express nesting via nested menu rows (submenus), not a Termeh replacement for grid.
- Expand–contract style delivery: shell Host nested menu + async children first (or in parallel with shared tree); then wire LoadService leaf → context execute.
- Shared LoadService service tree builder is the single source for Graph context submenu and FileBrowser grid nested LoadService children.
- Leaf activation must carry the chosen service identity into the existing LoadService context-execute path (parameters-only or immediate execute).
- Selection targets continue to come from the FileBrowser LoadService selection session / strategy (files and folders), not graph element ids.
- Overflow “more…” may open LoadService browse, matching Graph’s truncated-submenu pattern.
- Test seam (approved): highest IAP boundary after a service leaf is chosen — observable Parameters-only vs browse vs immediate execute with FileBrowser selection; shell nested/async contract only if needed as a secondary seam.

## Testing Decisions

- Prefer tests of external behavior at the approved seam (context execute outcome), not AG Grid internals.
- Cover shared service-tree builder mapping rules with focused unit tests (prior art: FolderList mapper / LoadService menu tests).
- Cover FileBrowser host path: leaf → context execute (not browse); Ribbon browse unchanged.
- Shell nested/async menu conversion tested at the public host-menu contract if ticket 02 lands separately.
- Prior art: LoadService `menuExecutePlugin` specs; FileBrowser actions-facade context-menu specs; file-browser grid context-menu provider specs.

## Out of Scope

- FileBrowser tile nested LoadService menu (separate ticket).
- Migrating Graph/Map visualizer context menu chrome to Termeh.
- Extending Termeh for nested SUBMENU as part of this parent.
- Changing Ribbon LoadService to parameters-only by default.
- Map-only or Graph behavior changes beyond consuming the shared tree without UX regression.

## Further Notes

- Glossary terms: LoadService context execute, LoadService browse, LoadService service tree, Host nested menu, Parameters-only modal, Visualizer context menu chrome — in FileBrowser `CONTEXT.md`.
- Implementation tickets: `issues/01`–`03` under this folder.
