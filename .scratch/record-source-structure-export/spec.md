# Spec: Record Source Nested Structure View and Structure Export

Status: ready-for-agent

Domain glossary: `CONTEXT.md`  
ADR: `docs/adr/0001-object-framework-consumers-own-master-detail.md`  
Related: TECSDM-121107, TECSM-17509

## Problem Statement

On the BDMP warehouses list, right-click Export dumps the whole visible list of Record Sources as a flat spreadsheet. Analysts cannot export only Grid Selection, and the file has no Source Structure (the Source Columns of each Record Source). They also cannot inspect that structure in the list itself. Default Grid Export and Object File Export share the same “خروجی” menu, which makes the wrong export easy to pick.

## Solution

The warehouses list (record and file warehouses on that grid) becomes an Object Framework Consumer of Nested Structure View and Structure Export:

- Each Record Source row expands to Source Structure beneath it.
- Context menu offers «خروجی همه» and «خروجی موارد انتخاب شده», each with Excel and CSV sub-items, both Structure Exports.
- Default Grid Export and Object File Export leave the context menu; Object File Export stays on the Object Framework bar.

Object Framework only exposes hooks. The consumer turns master-detail on and supplies nested content and custom menu actions.

## User Stories

1. As an analyst, I want to expand a Record Source row on the warehouses list, so that I can see its Source Structure without opening the designer.
2. As an analyst, I want every Nested Structure View to show the same seven Structure Columns (column number, column id, display name, database name, type, description, technology type), so that Excel, CSV, and the grid match.
3. As an analyst, I want one Structure Row per Source Column, so that a column stored in two technologies is not duplicated as two nested rows.
4. As an analyst, I want Technology Type on that row to use the same phrasing as the list Type column, including Elastic size, so that list and nested table do not disagree.
5. As an analyst, I want multiple technologies on one Source Column joined with the same separator the list uses, so that dual-tech columns read like the list Type cell.
6. As an analyst, I want Database Name to join only non-empty backing-store names with that separator, so that Internal Elastic does not produce a trailing empty segment.
7. As an analyst, I want a Source Column that exists in Internal Oracle and Internal Elastic to appear as one Structure Row with Oracle’s database name and both technology labels joined, so that I still see Elastic even when it has no database name.
8. As an analyst, I want nested rows to match the schema-definition grid in source edit, including hidden Source Columns, so that export is a full structure dump, not only visible-in-designer fields.
9. As an analyst, I want a Record Source with no Source Columns to still expand to an empty nested table, so that I do not confuse it with a non-expandable row.
10. As an analyst, I want file warehouses on the same list to use the same Nested Structure View and Structure Export as record warehouses, so that mixed lists behave as one grid.
11. As an analyst, I want to expand several Record Sources at once, so that I can compare structures without collapsing the previous one.
12. As an analyst, I want filter and sort on each nested table to be independent, so that inspecting one source’s columns does not reset another.
13. As an analyst, I want right-click «خروجی همه» to Structure-Export every row that remains after grid filter and sort, so that hidden-by-filter sources are not in the file.
14. As an analyst, I want «خروجی همه» to ignore Grid Selection, so that I do not have to deselect rows to export the filtered list.
15. As an analyst, I want «خروجی موارد انتخاب شده» to Structure-Export only Grid Selection, so that I can send a subset.
16. As an analyst, I want both of those actions to offer Excel and CSV, so that I can pick the format the consumer asked for.
17. As an analyst, I want Structure Rows nested under each Record Source in Excel and CSV (content below the master row), so that the file matches the Nested Structure View, including unexpanded masters.
18. As an analyst, I want empty Record Sources to appear in Structure Export as a master row with no Structure Rows beneath, so that the list of sources is complete.
19. As an analyst, I want Default Grid Export gone from this list’s context menu, so that I stop exporting a flat list with no Source Structure.
20. As an analyst, I want Object File Export gone from this list’s context menu, so that “خروجی” is not confused with Structure Export.
21. As an analyst, I want Object File Export still on the Object Framework bar, so that I can still download the object file from this page.
22. As an analyst, I want «خروجی همه» and «خروجی موارد انتخاب شده» at the end of the context menu, each with an Excel and CSV submenu, so that the menu stays two items, not four siblings.
23. As an analyst, I want «خروجی موارد انتخاب شده» available after a Row Right-Click on a data row, so that I am not blocked by a Disabled item when the click itself creates or keeps selection.
24. As an analyst, I want a Row Right-Click on an unselected row to make only that row Grid Selection, so that Export Selected and delete apply to what I just clicked.
25. As an analyst, I want a Row Right-Click on a row that is already selected to keep the whole Grid Selection, so that I can export or delete multiple sources.
26. As an analyst, I want delete from the context menu to use Grid Selection after that Row Right-Click rule, so that delete and Export Selected share one selection model.
27. As an Object Framework Consumer author, I want to opt into master-detail and pass nested columns and detail data, so that my list can show a Nested Structure View without forking the viewer.
28. As an Object Framework Consumer author, I want Object Framework not to hard-code Source Structure, so that other object lists are not forced into warehouse columns.
29. As an Object Framework Consumer author, I want to add named context-menu actions with order, an action that receives the full selected records, and a per-item state of Enable, Disable, or Hide, so that BDMP can attach Structure Export without copying the grid.
30. As an Object Framework Consumer author, I want those custom actions only in AG Grid mode, so that Kendo lists do not grow a second menu API.
31. As an Object Framework Consumer author, I want Default Grid Export and context-menu Object File Export independently suppressible, so that I can hide them on the warehouses list without turning off bar Object File Export or import.
32. As an Object Framework Consumer author, I want custom actions appended after built-in row actions, so that product items do not jump the shared cut/copy/delete block.
33. As a BDMP maintainer, I want Source Structure built from each warehouse object’s Source Columns already loaded on the list, so that expand and export do not require a second round-trip per row.
34. As a BDMP maintainer, I want a Source Column included in a technology’s joined Technology Type when that column’s detail for that technology is enabled, even if Database Name is empty, so that Internal Elastic is not dropped.
35. As a BDMP maintainer, I want a Source Column omitted from a technology’s labels when that column is not stored in that technology, so that Oracle-only columns do not claim Elastic.
36. As a QA engineer, I want Structure Export of mixed Oracle and Elastic sources to keep the same seven Structure Columns on every nested block, so that the sheet/CSV shape is stable.
37. As a QA engineer, I want Export All of a filtered grid to exclude filtered-out masters, so that filter and export stay aligned.
38. As a QA engineer, I want Export Selected after selecting A and B then right-clicking B to include A and B, so that multi-select export is preserved.
39. As a QA engineer, I want Export Selected after selecting A then right-clicking unselected C to include only C, so that exclusive select on an outside row is locked.
40. As a translator, I want menu labels «خروجی همه» and «خروجی موارد انتخاب شده» (and Excel/CSV sub-labels) to go through the existing translate pipeline, so that FA/EN follow other Object Framework strings.

## Implementation Decisions

- Extend Object Framework Viewer/Grid (AG Grid mode only) with consumer-owned inputs:
  - optional Nested Structure View: whether master-detail is on, nested grid column definitions, how to load detail rows for a master, and custom Excel/CSV export params that nest Structure Rows under each master (`getCustomContentBelowRow` as in the AG Grid master-detail export sample).
  - custom context-menu actions: name, order, action receiving full selected records, and a function of menu params returning Context Menu Action State (Enable, Disable, Hide).
  - independent flags to suppress Default Grid Export and to suppress Object File Export on the context menu only.
- Do not reuse the existing import/export enable flag to hide context-menu Object File Export; that flag would also take Object File Export off the bar.
- On context-menu open, apply Row Right-Click: if the clicked node is not selected, select only that node; if it is already selected, leave Grid Selection unchanged. Delete and custom actions then read Grid Selection.
- Custom actions render at the end of the menu. Hide omits the item; Disable shows it disabled; Enable is the default after Row Right-Click on a row for Export Selected on this list.
- Warehouses list is the first Object Framework Consumer: it enables Nested Structure View, supplies Source Structure, suppresses Default Grid Export and context-menu Object File Export, and registers «خروجی همه» / «خروجی موارد انتخاب شده» with Excel and CSV submenus. Bar Object File Export remains.
- Source Structure mapping lives in BDMP, not in Object Framework (ADR 0001). Input is the warehouse object as loaded for the list (JSON content already includes Source Columns). Output is Structure Rows for the nested grid and the same rows for export-below-master.
- Structure Columns are always the seven glossary headers. Nested and export layouts do not drop Database Name for Elastic.
- One Structure Row per Source Column (schema-definition grid set, including hidden). Column number is the Source Column order; type is the column type title; Technology Type and Database Name follow the join rules in the glossary.
- A technology appears in Technology Type when that Source Column has an enabled detail for that database type. Internal Elastic may have an empty Database Name and still appear in Technology Type.
- Export All: AG Grid export of filtered and sorted master rows, not `onlySelected`. Export Selected: selected masters only. Both always emit Structure Rows under each master, whether or not the detail is expanded.
- No new toolbar buttons for Structure Export. No backend API change; no new list payload contract beyond using columns already on the object.
- Row grouping / sidebar / existing list columns stay; Nested Structure View is additive via `agGroupCellRenderer` on the name (or equivalent master expand) without replacing Object Framework list columns.

## Testing Decisions

- Good tests assert public behavior at the seams below: menu contents and item state, Grid Selection after right-click, nested row model given warehouse objects, and export params (which masters, nested content below each). They do not assert private helpers, AG Grid internals, or screenshot layout.
- **Primary seam (library):** Object Framework Grid/Viewer public API — consumer inputs for master-detail, custom menu actions, and export suppression. Prior art: `ObjectFrameworkExportMenuItemProviderService` specs (default vs suppressed csv/excel, object-file item placement); extend that style rather than a new harness. Cover: custom items appended; Hide/Disable/Enable; Default Grid Export omitted when suppressed; Object File Export omitted from the menu when suppressed but not implied as bar-off; Row Right-Click selection rules; master-detail options forwarded only when the consumer enables them; Kendo mode ignores the new AG Grid-only inputs.
- **Primary seam (consumer):** BDMP Source Structure mapping from a warehouse object to Structure Rows (and thus export-below-row cells). Prefer a focused mapper/service with Jasmine specs (little prior art under the warehouses-list folder; follow existing BDMP object-framework service specs and WebUI public-behavior rules). Cover: seven headers; one row per Source Column; hidden columns included; empty column list → empty rows; dual-tech join of Technology Type with list separator and size; Database Name joins non-empty names only; Elastic-only empty Database Name still listed in Technology Type when enabled; Oracle-only column does not claim Elastic; file vs record objects use the same mapper.
- Do not TestBed the full warehouses page as the primary seam. Do not require a real Excel/CSV file parse if export params/`getCustomContentBelowRow` output can be asserted.
- One `expect` per behavior; no private member access.

## Out of Scope

- Structure Export buttons on the Object Framework bar.
- Removing Object File Export or import from the bar.
- Changing Kendo (non-AG Grid) warehouses list behavior when the object-framework list flag is off.
- Server-side Structure Export or a new columns API.
- Forcing Nested Structure View on other Object Framework lists (dashboards, DIA, recycle bin, and so on).
- Two Structure Rows per Source Column (rejected).
- Per-source nested header sets (rejected).
- Stateless filter persistence (TECSDM-121106).
- Default Grid Export remaining as a third export on this list.

## Further Notes

- Glossary terms to prefer: Record Source, Source Structure, Source Column, Structure Column, Structure Row, Technology Type, Database Name, Nested Structure View, Object Framework Consumer, Structure Export, Export All, Export Selected, Default Grid Export, Object File Export, Grid Selection, Row Right-Click, Context Menu Action State.
- AG Grid reference the team cited: Excel/CSV export master-detail via `getCustomContentBelowRow` (single sheet, content below each master). CSV has no Excel outline level; indent with a leading empty cell like the sample.
- List Type separator and Elastic size labels must reuse the same strings the warehouses list Type column already shows (`warehouseTypeString` / per-type names), not a new vocabulary.
- Issue tracker: local markdown under `.scratch/record-source-structure-export/`.
