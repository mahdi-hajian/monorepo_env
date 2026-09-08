# Spec: FileBrowser grid Schema and Data (phase 10)

Status: done

## Agent entry

**Ordering:** [ORDER.md](./ORDER.md) — `BE-08` then `FE-12`. Do not start `FE-12` until `BE-08` is `done`.

**Domain (use these terms exactly):** [CONTEXT.md](../../Web/WebUI/iap/app/visualizer/visualizer/plugins/file-browser/CONTEXT.md) — **FileBrowser tile**, **FileBrowser grid**, **Document extra attribute**, **FileBrowser grid filter and sort**, **browse path**, **Virtual Folder**, **session empty folder**. ADR: [0014-file-browser-grid-schema-data.md](../../Web/WebUI/iap/app/visualizer/visualizer/plugins/file-browser/docs/adr/0014-file-browser-grid-schema-data.md). Phases: [file-browser-phases.md](../../Web/WebUI/iap/app/visualizer/visualizer/plugins/file-browser/docs/file-browser-phases.md) phase 10.

Avoid: Tail; visualizer Grid / Explore as FileBrowser’s list API; FileExplorer; treating FileBrowser grid as Name / Extension / Size only.

Phases 0–9 remain as [spec.md](./spec.md). This spec is only the FileBrowser grid attribute table.

## Problem Statement

In FileBrowser I can browse Documents as tiles, but I cannot use a real table of Document attributes. The old visualizer Grid sent a fat, uncooked payload. Tile already asks only for what it needs. I need a FileBrowser table that shows every Document attribute (including ones added later in the DataModel), with filter and sort like the visualizer Grid, without making tile slower and without turning FileBrowser into Explore.

## Solution

Unlock the FileBrowser tile/grid switch. Tile keeps the three-field list. FileBrowser grid is every Document attribute in the current DataModel, including FilePath, FileContent, and extra attributes. Schema and Data are two FileBrowser contracts: Schema is frozen column display metadata; Data is the mixed folders-then-files window with counts that change with browse path and filter. Filter and sort reuse the visualizer Grid engine; FileBrowser does not call Explore as its list API. Reading mode is included; grouping, pin, and expand are not.

## User Stories

1. As a FileBrowser user, I want a tile/grid switch, so that I can pick cards or a table without leaving FileBrowser.
2. As a FileBrowser user, I want tile to stay name, extension, and size only, so that cards stay light and familiar.
3. As a FileBrowser user, I want FileBrowser grid columns to be every Document attribute in the current DataModel, so that I see the same fields the ontology actually has.
4. As a FileBrowser user, I want FilePath as a grid column, so that parent browse path is visible even though I already navigate by folder.
5. As a FileBrowser user, I want FileContent as a grid column with view and download like visualizer Grid, so that I can open or save the binary from the cell.
6. As a FileBrowser user, I want extra attributes added to Document in the DataModel to appear as grid columns, so that I do not wait for a frontend column list to be hardcoded.
7. As a FileBrowser user, I want filter on every Document attribute column including FileContent, so that I can narrow files the same way I do in visualizer Grid.
8. As a FileBrowser user, I want sort on every Document attribute column including FileContent, so that column sort uses the same key as visualizer Grid for that attribute type.
9. As a FileBrowser user, I want default file order by name until I sort a column, so that the table matches tile until I ask for another order.
10. As a FileBrowser user, I want folders to stay in a block above files, so that I can still enter folders while looking at a table of Documents.
11. As a FileBrowser user, I want folder-block order by folder name only, so that sorting files by Length or FileContent does not shuffle folders into the file list.
12. As a FileBrowser user, I want the Name column filter to hide folders whose display name does not match, so that I can find a folder by name in the table.
13. As a FileBrowser user, I want Length, FileContent, and extra-attribute filters to affect files only, so that a file filter does not remove my folder navigation.
14. As a FileBrowser user, I want session empty folders to follow the same Name filter as Virtual Folders, so that empty folders I just created are not a special case in the table.
15. As a FileBrowser user, I want paging to be the same mixed window as tile (folders then files, total count = folders + files), so that the first page can be mostly folders when many exist.
16. As a FileBrowser user, I want Data counts to change when I change browse path or filter, so that pagination matches what I see.
17. As a FileBrowser user, I want Schema without totalCount, so that frozen column metadata is not confused with the current page’s counts.
18. As a FileBrowser user, I want column titles, types, display sizes, and Hidden/Normal/Wrap/Preview to come from Schema, so that I do not need a separate column-size request like GetColumnDisplayStats.
19. As a FileBrowser user, I want Schema display sizes computed from files at the browse path of the first Schema fetch in this visualizer tab, so that opening grid in a folder sizes columns from that folder’s files.
20. As a FileBrowser user, I want those display sizes to stay frozen when I change folders or type filters, so that columns do not jump while I browse or filter.
21. As a FileBrowser user, I want Schema to survive leaving FileBrowser for Graph/Map/Grid in the same tab, so that coming back does not resize columns.
22. As a FileBrowser user, I want Schema cleared on tab close or full page refresh, so that a new tab can size columns from the browse path I first open grid in.
23. As a FileBrowser user, I want Schema rebuilt when the Document attribute set in the DataModel changes, so that a new extra attribute becomes a column without a full product release.
24. As a FileBrowser user, I accept that an extra attribute empty on the first Schema path may stay Hidden until Schema is rebuilt, so that freeze behavior stays simple.
25. As a FileBrowser user, I want PreviewMode eye on long text columns from Schema, so that I can open large text without reading mode wrapping everything.
26. As a FileBrowser user, I want a reading mode toggle like visualizer Grid, so that wrapping long text is optional.
27. As a FileBrowser user, I do not want grouping, pin, or expand/aggregation in FileBrowser grid, so that the table stays a file manager, not Explore.
28. As a FileBrowser user, I want view and download from the row context menu to keep working on files, so that the binary cell is not the only way to open a file.
29. As a FileBrowser user, I want folders to have no file context menu, so that I enter a folder by double-click or breadcrumb only.
30. As a FileBrowser user switching to tile, I want the three-field list, so that grid Schema and full attribute rows are not loaded for cards.
31. As a developer, I want filter and sort to reuse the visualizer Grid engine, so that FileBrowser does not invent a second comparator.
32. As a developer, I want FileBrowser Schema and Data to be FileBrowser package functions, so that FileBrowser does not call Explore as its list API.
33. As a developer, I want tile to keep LoadListFiles, so that card browsing does not pay for Schema or every Document attribute.
34. As a QA engineer, I want tests at the FileBrowser Schema and Data package seam plus the host adapter, so that we lock external behavior without testing AG Grid or Explore internals.

## Implementation Decisions

- Phase 10 unlocks the IAP tile/grid switch. Default view stays tile. Tile continues to use LoadListFiles (instanceId, name, extension, size as byte length, folders, file totalCount) and the existing mixed-window host adapter.
- FileBrowser grid is not visualizer Grid and not Explore. Columns are every attribute on Document in the current DataModel, including FilePath, FileContent, and Document extra attributes.
- Two FileBrowser contracts, not one response: Schema (column titles, data types, display sizes, Hidden/Normal/Wrap/Preview and related display traits) and Data (mixed window of folder rows then file rows, plus counts).
- Schema must not carry totalCount or other counts that change with browse path or filter.
- Data request includes browse path, from/size for the mixed window, and the same filter/sort descriptors the visualizer Grid engine already understands. Until the user sorts, files are ordered by name (same rule as LoadListFiles). Folder block is sorted by folder name only.
- Data paging is the mixed window tile already shows: from/size walk folders-then-files; totalCount is folder count after Name filter plus file count after Document attribute filter/sort.
- Name column filter also applies to Virtual Folder and session empty folder display names. Other Document attribute filters apply only to files at the current browse path.
- Filter and sort reuse the visualizer Grid engine and sort keys (including FileContent / binary attributes). FileBrowser must not reimplement comparators and must not call Explore package methods as the list API. Shared engine behind FileBrowser Schema/Data is required.
- FileContent and other binary Document attributes in the grid use the same view/download cell as visualizer Grid.
- Schema display sizes are computed from files at the browse path of the first Schema fetch in the visualizer tab, then frozen across folder navigation, grid filter, and leaving FileBrowser for Graph/Map/Grid. Schema clears on tab close or full page refresh, and rebuilds if the Document attribute set in the DataModel changes.
- FileBrowser grid includes visualizer Grid reading mode (frontend-only, same as Explore). It does not include grouping, pin, or expand/aggregation.
- Host maps Schema into the existing file-browser shell column layout (not GetColumnDisplayStats as a FileBrowser call). Host maps Data into the existing shell listDataSource mixed items (instanceId, name, extension, size, itemKind, path, plus attribute values needed for Schema columns on file rows). Folder rows do not invent Document attribute values.
- Visualizer tab injector lifetime for Schema cache matches other FileBrowser session state (browse path, session empty folders, upload queue).
- Prefer the existing FileBrowser package + host adapter seams. Do not add an Explore-shaped InstancesData public wire. Do not make tile consume Schema or full attribute rows.

## Testing Decisions

- Good tests assert external behavior only: package results, host adapter outputs, which FileBrowser functions are called for tile vs grid, filter/sort descriptors passed into the shared engine, Schema freeze/invalidation, mixed-window items and totalCount — not AG Grid internals, not Explore UI, not private helpers.
- **Primary seam (one):** FileBrowser **Schema** and **Data** package contracts (same style as existing LoadListFiles package tests). That is the behavior the rest of the product depends on.
- **Existing host seam (no new protocol):** the FileBrowser view adapter that already builds the mixed window for the shell. Extend it so tile still calls LoadListFiles and grid calls Schema (once per freeze rules) + Data; assert it never calls Explore as the list API.
- Do not add a third seam in the shared browse shell unless Schema cannot be expressed as column layout + list items the shell already consumes. Prefer extending host mapping over a new shell list shape.
- Do not re-test the visualizer Grid filter/sort engine. FileBrowser tests assert it is invoked with the expected descriptors and that FileBrowser membership (Documents at browse path, folders-then-files) is preserved.
- Prior art: FileBrowser LoadListFiles package tests; FileBrowser list-window host specs (mixed folders-then-files, totalCount = folders + files); FileBrowser API service specs; Explore binary cell is prior art for rendering only, not a FileBrowser list seam.
- Domain docs do not require Cypress as a delivery gate. Prefer unit/package tests at the seams above.

## Out of Scope

- Phases 0–9 product rules (add, async upload, folder upload, DnD, move, rename, cut/copy/paste) except that grid must keep using the same browse session, view/download, and mixed folder-then-file membership
- Calling Explore / LoadInstanceValues / GetColumnDisplayStats as FileBrowser’s list or column-size API
- Explore grouping, pin, expand, aggregations
- Graph/Ribbon FileBrowser grid entry
- Hardcoding FileBrowser grid to Name / Extension / Size only
- Putting Schema and Data in one FileBrowser response
- Putting totalCount on Schema
- Refetching Schema on every folder change or filter keystroke
- Making tile load Schema or every Document attribute
- New ViewMode enum member
- FilePath backfill migration
- Reconstructing browser-omitted empty directories
- Cypress/integration as a required gate

## Further Notes

- Phase 10 domain grilling is closed (ADR 0014). Do not reopen column membership, Schema freeze, or mixed-window paging in implementation tickets without updating CONTEXT.md and the ADR.
- Consequence already accepted: HiddenMode from the first Schema path can hide an extra attribute that later folders have values for, until Schema is invalidated.
- IAP currently locks the shell to tile; phase 10 removes that lock.
- Ticket sequencing: [ORDER.md](./ORDER.md) wave after FE-11 — `BE-08` then `FE-12`.
