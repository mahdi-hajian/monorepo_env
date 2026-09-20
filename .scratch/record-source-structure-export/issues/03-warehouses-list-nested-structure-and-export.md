# 03 — Warehouses list Nested Structure View and nested Structure Export

**What to build:** On the warehouses list, a Record Source (record or file) expands to Source Structure: always the seven Structure Columns, one Structure Row per Source Column (same set as the schema-definition grid, including hidden). Dual-technology columns stay one row; Technology Type and non-empty Database Names join with the list Type separator and Elastic size phrasing. A source with no columns still expands to an empty nested table. Export All and Export Selected write those Structure Rows under each master in Excel and CSV whether or not the row was expanded. Empty sources appear as a master with no nested rows.

**Blocked by:** 01 — Context menu Structure Export actions and Row Right-Click; 02 — Object Framework Nested Structure View hook

**Status:** ready-for-agent

- [ ] Nested Structure View is on for this list only, with Source Structure supplied by BDMP (not Object Framework).
- [ ] Seven Structure Columns on every nested table and every export block; Database Name is not dropped for Elastic.
- [ ] One Structure Row per Source Column; hidden columns included; file and record warehouses share the mapper.
- [ ] Technology Type uses list Type phrasing including Elastic size; multiple enabled technologies join with the list separator; a technology appears only when that column’s detail is enabled, even if Database Name is empty.
- [ ] Database Name joins only non-empty backing-store names with that separator.
- [ ] Empty Source Column list: expand still works; nested table empty; export has the master row only.
- [ ] Several masters can stay expanded; each nested grid filters/sorts independently.
- [ ] The same two context-menu Structure Exports nest Structure Rows under each exported master via the consumer export params.
- [ ] Tests cover the BDMP Source Structure mapper (public mapping behavior) and wiring of Nested Structure View + nested export on this list, not the full page as the primary seam.
