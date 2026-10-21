# Spec: SqlServer & PostgreSql Exclusive External Technologies in Warehouse Design

Status: ready-for-agent

Parent: TECSDM-122084  
Domain: Warehouse Design (`CONTEXT.md` + ADR 0001 hybrid StarRocks shell / Oracle Schema-Then-Table Picker)

Tickets:
- TECSDM-122144 — 01 exclusive tech plumbing
- TECSDM-122145 — 02 SqlServer create
- TECSDM-122146 — 03 PostgreSQL create
- TECSDM-122269 — 04 nav refactor + share exclusive/relational warehouse-design logic
- TECSDM-122147 — 05 list enabled technologies

---

## Problem Statement

When designing a Record Warehouse in BDMP Warehouse Design, a designer can already attach Elastic, Oracle, and StarRocks. SqlServer and PostgreSql Warehouses are supported on the backend create path, but the Warehouse Design UI has no Technology Details Tabs for them, so designers cannot create those Warehouses from the frontend the same way they create a StarRocks Warehouse.

## Solution

Add two Technology Details Tabs (SqlServer and PostgreSql) for Record Warehouse create. Each tab behaves as an Exclusive External Technology (StarRocks-like shell: alone-on, external-only, Saved Connection Selection default, create-time editable only). Inside the tab, after choosing a saved Connection, the designer uses a Schema-Then-Table Picker (Oracle-like: schema, then table), then maps columns and can save the Warehouse through the existing create flow.

## User Stories

1. As a Warehouse designer, I want a SqlServer Technology Details Tab, so that I can create a SqlServer Warehouse without leaving Warehouse Design.
2. As a Warehouse designer, I want a PostgreSql Technology Details Tab, so that I can create a PostgreSql Warehouse the same way.
3. As a Warehouse designer, I want each of those tabs listed under Schema Details navigation, so that I can find them next to Elastic, Oracle, and StarRocks.
4. As a Warehouse designer on a Record Warehouse, I want SqlServer and PostgreSql available, so that relational exclusive techs match product scope.
5. As a Warehouse designer on a File Warehouse, I want SqlServer and PostgreSql unavailable, so that I do not configure unsupported combinations.
6. As a Warehouse designer on a virtual Warehouse, I want SqlServer and PostgreSql unavailable, so that virtual Warehouses stay consistent with StarRocks rules.
7. As a Warehouse designer creating a new Warehouse, I want to enable SqlServer, so that the Warehouse becomes SqlServer-only.
8. As a Warehouse designer creating a new Warehouse, I want to enable PostgreSql, so that the Warehouse becomes PostgreSql-only.
9. As a Warehouse designer, when I enable SqlServer, I want every other technology cleared, so that Exclusive External Technology rules are enforced.
10. As a Warehouse designer, when I enable PostgreSql, I want every other technology cleared, so that Exclusive External Technology rules are enforced.
11. As a Warehouse designer, when SqlServer is on, I want Elastic and Oracle tabs disabled, so that I cannot form an invalid Compatible Pair with an exclusive tech.
12. As a Warehouse designer, when PostgreSql is on, I want Elastic and Oracle tabs disabled, so that I cannot mix them with PostgreSql.
13. As a Warehouse designer, when SqlServer is on, I want StarRocks and PostgreSql unavailable/off, so that only one Exclusive External Technology is active.
14. As a Warehouse designer, when PostgreSql is on, I want StarRocks and SqlServer unavailable/off, so that only one Exclusive External Technology is active.
15. As a Warehouse designer, when I enable StarRocks, I want SqlServer and PostgreSql cleared, so that exclusivity stays symmetric.
16. As a Warehouse designer, when I enable Oracle or Elastic, I want SqlServer, PostgreSql, and StarRocks cleared, so that Compatible Pair does not collide with Exclusive External Technology.
17. As a Warehouse designer, I want Elastic and Oracle still able to be on together when no exclusive tech is selected, so that Compatible Pair is preserved.
18. As a Warehouse designer, I want SqlServer to be external-only, so that I am not offered an internal SqlServer origin.
19. As a Warehouse designer, I want PostgreSql to be external-only, so that I am not offered an internal PostgreSql origin.
20. As a Warehouse designer, I want Saved Connection Selection to be the default when I enable SqlServer, so that I start from existing Connections.
21. As a Warehouse designer, I want Saved Connection Selection to be the default when I enable PostgreSql, so that I start from existing Connections.
22. As a Warehouse designer, I want declare-new / inline connection disabled for SqlServer, so that I only use Saved Connection Selection in this flow.
23. As a Warehouse designer, I want declare-new / inline connection disabled for PostgreSql, so that I only use Saved Connection Selection in this flow.
24. As a Warehouse designer, I want the SqlServer connection list filtered to SqlServer Connections, so that I do not pick the wrong Connection type.
25. As a Warehouse designer, I want the PostgreSql connection list filtered to PostgreSql Connections, so that I do not pick the wrong Connection type.
26. As a Warehouse designer, after choosing a SqlServer Connection, I want to pick a schema, so that I can narrow tables correctly.
27. As a Warehouse designer, after choosing a PostgreSql Connection, I want to pick a schema, so that I can narrow tables correctly.
28. As a Warehouse designer, after choosing a schema on SqlServer, I want to pick a table in that schema, so that the Warehouse targets one table.
29. As a Warehouse designer, after choosing a schema on PostgreSql, I want to pick a table in that schema, so that the Warehouse targets one table.
30. As a Warehouse designer, when I change SqlServer Connection, I want schema, table, and column mapping reset, so that stale selections disappear.
31. As a Warehouse designer, when I change PostgreSql Connection, I want schema, table, and column mapping reset, so that stale selections disappear.
32. As a Warehouse designer, when I change SqlServer schema, I want table and column mapping reset, so that tables stay schema-scoped.
33. As a Warehouse designer, when I change PostgreSql schema, I want table and column mapping reset, so that tables stay schema-scoped.
34. As a Warehouse designer, after selecting a SqlServer table, I want column mapping populated, so that I can map Warehouse columns to database columns.
35. As a Warehouse designer, after selecting a PostgreSql table, I want column mapping populated, so that I can map Warehouse columns to database columns.
36. As a Warehouse designer, I want persisted table identity as `schema.table` for SqlServer, so that create matches the existing backend contract.
37. As a Warehouse designer, I want persisted table identity as `schema.table` for PostgreSql, so that create matches the existing backend contract.
38. As a Warehouse designer, I want to save a new SqlServer Warehouse through the existing Warehouse create path, so that Object Framework create stays the single create entry.
39. As a Warehouse designer, I want to save a new PostgreSql Warehouse through the existing Warehouse create path, so that Object Framework create stays the single create entry.
40. As a Warehouse designer editing an existing Warehouse, I want SqlServer technology and connection settings locked, so that create-time-only edit rules match StarRocks.
41. As a Warehouse designer editing an existing Warehouse, I want PostgreSql technology and connection settings locked, so that create-time-only edit rules match StarRocks.
42. As a Warehouse designer, I want navigation titles/labels for SqlServer and PostgreSql, so that the UI is understandable in the product language.
43. As a Warehouse designer, I want `hasExternalSchema` / exclusive-only helpers to treat SqlServer and PostgreSql correctly, so that mapping and nav disable rules stay consistent.
44. As a maintainer, I want Warehouse `DatabaseType` values aligned with the contract (`SqlServer`, `PostgreSql`), so that wire payloads deserialize correctly.
45. As a maintainer, I want connection-type enum values for SqlServer and PostgreSql on the client, so that `GetConnections` filtering works.
46. As a Warehouse designer, I want disabling SqlServer to remove that technology from the Warehouse, so that I can switch away cleanly.
47. As a Warehouse designer, I want disabling PostgreSql to remove that technology from the Warehouse, so that I can switch away cleanly.
48. As a Warehouse designer with StarRocks already on, I want enabling SqlServer to replace StarRocks, so that exclusivity is obvious.
49. As a Warehouse designer with Oracle+Elastic on, I want enabling PostgreSql to clear both, so that Exclusive External Technology wins.
50. As a Warehouse designer, I want list/enabled-technology displays to recognize SqlServer and PostgreSql when present, so that list views do not lie about enabled techs (where those displays already enumerate technologies).

## Implementation Decisions

1. **ADR 0001 hybrid:** Technology Details Tab shell and exclusivity like StarRocks; Schema-Then-Table Picker like Oracle; no shared generic exclusive-tech abstraction in this change.
2. **Two tabs:** Separate SqlServer and PostgreSql Technology Details Tabs and routes under Schema Details (not one shared relational tab).
3. **Scope of Warehouse usage:** Only Record Warehouse; disabled for File Warehouse and virtual Warehouse.
4. **Edit lock:** Technology toggle and connection/schema/table controls editable only on new design (`isNewDesign` and not virtual), same as StarRocks.
5. **Exclusivity model:** Enabling SqlServer or PostgreSql clears all `databaseTypes` then adds itself; sets Saved Connection Selection. Enabling StarRocks continues to clear all (including the new types). Enabling Oracle or Elastic deletes Exclusive External Technologies (StarRocks, SqlServer, PostgreSql). Nav disables Elastic/Oracle when any exclusive-only technology is active (generalize StarRocks-only helper).
6. **Connection UI:** External radio fixed on; inline/declare-new disabled; Saved Connection Selection selected and defaulted on enable.
7. **Connection listing:** Extend client connection-type vocabulary with SqlServer and PostgreSql string values matching backend `ConnectionType`; filter `GetConnections` per tab.
8. **Picker flow:** Connection → schema list → table list → column mapping via existing external schema mapping patterns used by Oracle.
9. **Wire shape:** Warehouse detail uses SqlServer/PostgreSql external warehouse detail types; `tableName` stored as `schema.table`; connection id on detail connection infos like other external techs.
10. **DatabaseType enum:** Expose `SqlServer = 3` and `PostgreSql = 6` to match EventStore contract ordering (ExternalOracle=0 … ExternalStarRocks=5, PostgreSql next).
11. **Create path:** Reuse existing Warehouse create service / Object Framework create; no new create API.
12. **Out of this change’s modules:** Connection create/edit pages; backend create already supports these techs.
13. **Code organization:** Clone StarRocks-style module layout per tech for the shell; implement connection-config interaction closer to Oracle’s schema/table services rather than StarRocks table-only resource service.
14. **i18n:** Add dictionary keys for tab titles, use-technology labels, and detail legends analogous to StarRocks/Oracle.
15. **List/enabled technologies:** Extend any Warehouse list “enabled technologies” enumeration that currently hard-codes Elastic/Oracle/StarRocks so SqlServer/PostgreSql appear when enabled.

## Testing Decisions

### What makes a good test here

- Assert observable Warehouse Design behavior: which technologies are on/off, which controls enabled/disabled, which connection type is requested, schema/table selection order, persisted `tableName` shape, mapping reset on upstream change.
- Do not assert private helpers, exact service class graphs, or duplicate coverage of backend create validation.

### Primary test seam (proposed — confirm before build)

**Single highest seam: Exclusive External Technology Details Tabs (SqlServer and PostgreSql).**

Exercise behavior through the Technology Details Tab components and their connection-config (same altitude as existing StarRocks schema-details + Oracle connection-config specs). Mock connection/schema/table/column providers at the boundary those tabs already use. Prefer one behavioral seam covering exclusivity + Schema-Then-Table Picker + mapping reset rather than many low-level service-only suites.

### Modules under that seam

- SqlServer Technology Details Tab (enable/disable, exclusivity, edit lock, external-only, saved-connection default)
- PostgreSql Technology Details Tab (same)
- Connection-config / Schema-Then-Table Picker for each (filter connections, schema then table, resets, `schema.table`)
- Navigation disable rules when exclusive tech is on (via design state the tabs already notify)
- `DatabaseType` / connection-type enum wiring only as needed for the above behaviors

### Prior art

- StarRocks: schema-details component specs, connection-config specs, warehouse-resource / detail / mapping service specs
- Oracle: connection-config specs, data-resource schema/table/columns service specs
- Warehouse nav / exclusivity patterns already implied by StarRocks-only disable flags

## Out of Scope

- Creating or editing SqlServer/PostgreSql Connection objects (Connection pages / Advanced Connection Mode)
- Backend Warehouse create/update APIs (already capable)
- Iceberg or other technologies not agreed in grilling
- Enabling inline/declare-new connection for SqlServer/PostgreSql
- Internal SqlServer/PostgreSql Warehouse origin
- File Warehouse and virtual Warehouse support for these techs
- Large shared abstraction refactor of StarRocks/Oracle/SqlServer/PostgreSql into one generic module
- Changing Compatible Pair rules for Elastic+Oracle beyond clearing exclusive techs when those exclusive techs turn on
- E2E browser suite as the primary delivery gate for this change

## Further Notes

- Domain glossary: Warehouse Design `CONTEXT.md` (Exclusive External Technology, Schema-Then-Table Picker, Saved Connection Selection, Technology Details Tab, Compatible Pair).
- Decision record: ADR 0001 hybrid StarRocks exclusivity shell + Oracle Schema-Then-Table Picker.
- Parent Jira: TECSDM-122084 (spec is not a Subtask; overview lives on the parent Story).
- Implementation Subtasks: TECSDM-122144 … TECSDM-122147 under `.scratch/warehouse-sqlserver-postgres-design/issues/`.
