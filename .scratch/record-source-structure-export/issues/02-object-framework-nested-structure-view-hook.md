# 02 — Object Framework Nested Structure View hook

**What to build:** An Object Framework Consumer can turn on master-detail and pass nested grid columns, detail row data, and Excel/CSV params that nest content below each master. Object Framework does not hard-code Source Structure. Other object lists stay flat unless they opt in. This ticket is verifiable from the library API and tests; the warehouses list does not yet show warehouse columns.

**Blocked by:** 01 — Context menu Structure Export actions and Row Right-Click

**Status:** ready-for-agent

- [ ] Nested Structure View is optional and only in AG Grid mode; Kendo mode ignores the new inputs.
- [ ] The consumer supplies whether master-detail is on, nested column definitions, how to load detail rows for a master, and `getCustomContentBelowRow` for Excel and CSV.
- [ ] Object Framework does not contain Record Source / warehouse Structure Columns (ADR 0001).
- [ ] When the consumer does not opt in, the grid behaves as today (no expand chevron, no nested export content).
- [ ] Tests assert the Object Framework Grid/Viewer public master-detail and export-param forwarding, not private helpers.
