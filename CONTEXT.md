# Record Sources

Glossary for the BDMP record-sources list and exporting each source's structure.

## Language

**Record Source**:
A tabular data source shown as one row on the BDMP record-sources list.
_Avoid_: Warehouse, table, انبار

**Source Structure**:
The nested table under a Record Source, made of Structure Rows.
_Avoid_: schema, call records, callRecords

**Source Column**:
One field defined on a Record Source. The nested table has one Structure Row per Source Column. The set matches the schema-definition grid in source edit, including hidden fields.
_Avoid_: Structure Column

**Structure Column**:
A header of every nested table. Always these seven, on every master-detail: column number, column id, display name, database name, type, description, technology type.
_Avoid_: Source Column, dropping headers per database type, a database-name header per technology, two nested rows per Source Column

**Structure Row**:
One nested-table row, one-to-one with a Source Column, even when that column is stored in more than one technology.
_Avoid_: one nested row per technology

**Technology Type**:
The Type-column phrasing from the record-sources list, including Elastic size. When a Source Column is stored in more than one technology, those labels are joined with the same separator the list uses.
_Avoid_: one technology per Structure Row, dropping size

**Nested Structure View**:
The expanded Record Source row in the grid, with Source Structure beneath it. Structure Export uses the same nested data.
_Avoid_: master-detail that exists only in Excel

**Structure Export**:
An Excel file of Record Sources with each source's Structure Rows indented one level beneath it.
_Avoid_: Export, csvExport, excelExport, Object File Export, Default Grid Export

**Default Grid Export**:
AG Grid's own CSV/Excel of visible list columns, with no Source Structure. It is off on the record-sources list.
_Avoid_: Export, Export All, Export Selected

**Export All**:
A Structure Export of every grid row that remains after filter and sort, ignoring Grid Selection. It lives only on the context menu, not on the toolbar.
_Avoid_: Export, excelExport, unfiltered rows, toolbar button

**Grid Selection**:
The rows that delete, Object File Export, and Export Selected apply to.
_Avoid_: the right-clicked row apart from Grid Selection

**Row Right-Click**:
If the clicked row is already in Grid Selection, that selection stays; otherwise only that row is selected.
_Avoid_: always a single row, adding to selection without clearing the rest

**Export Selected**:
A Structure Export of Grid Selection. After a Row Right-Click it is not Disabled.
_Avoid_: Export, Disable when the click is on a row

**Object File Export**:
Object Framework's file export of the object itself, not Structure Export.
_Avoid_: Export, Export as file meaning Structure Export

**Context Menu Action State**:
Enable, Disable, or Hide for a custom menu item at the moment the menu opens.
_Avoid_: visible, hidden alone, Hide without Disable
