# 01 — Context menu Structure Export actions and Row Right-Click

**What to build:** On the warehouses list, the context menu no longer offers Default Grid Export or Object File Export. At the end of the menu the analyst sees «خروجی همه» and «خروجی موارد انتخاب شده», each with Excel and CSV. Export All writes every filtered-and-sorted list row; Export Selected writes Grid Selection. A Row Right-Click on an unselected row selects only that row; a right-click on an already selected row keeps the multi-selection. Delete and these exports use that Grid Selection. Object File Export remains on the Object Framework bar. Nested Structure Rows under each master are not required in this ticket; the file may still be master list columns only.

**Blocked by:** None — can start immediately.

**Status:** ready-for-agent

- [ ] Custom context-menu actions (name, order, action with full selected records, Enable / Disable / Hide) work in AG Grid mode only and append at the end of the menu.
- [ ] Default Grid Export and context-menu Object File Export are independently suppressible without turning off bar Object File Export or import.
- [ ] Warehouses list suppresses both of those menu exports and registers «خروجی همه» and «خروجی موارد انتخاب شده» with Excel and CSV submenus.
- [ ] Export All ignores Grid Selection and uses filtered-and-sorted masters; Export Selected uses Grid Selection.
- [ ] Row Right-Click: unselected node → exclusive select; already selected → keep Grid Selection; delete follows the same selection.
- [ ] After a Row Right-Click on a data row, Export Selected is not Disabled.
- [ ] Menu labels go through the translate pipeline.
- [ ] Tests cover the Object Framework Grid/Viewer public menu API (prior art: export menu item provider specs) and the warehouses list as the first consumer of suppression + the two actions.
