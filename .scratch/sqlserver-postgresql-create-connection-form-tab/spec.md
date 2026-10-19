# Spec: SqlServer & PostgreSql Typed Connections on Create Connection Page Form Tab

Status: ready-for-agent

Parent: TECSDM-122148  
Domain: Create Connection Page (`Web/WebUI/bdmp/app/connection/new-database-page/CONTEXT.md`, ADR-0012)

---

## Problem Statement

On the Create Connection Page, a connection author can only pick Oracle and StarRocks as Typed Connection types on the Form Tab. SqlServer and PostgreSql are already supported by the LADW backend (typed `connectionInfo`, Test Connection, GetDataSources, Live vs Pinned catalog via UpdateWhileUsingConnection), but the Form Tab does not expose them, so authors cannot create or edit those Typed Connections from the current product UI the same way they do for Oracle and StarRocks.

## Solution

Add SqlServer and PostgreSql as Typed Connections on the Form Tab of the Create Connection Page. Each type gets its own Per-Type Connection Tree (credentials UI, connection-info store, facade), matching Oracle/StarRocks isolation. Relational Form Fields cover server, port (defaults 1433 / 5432), username, password, free-text database name, FetchAllSchemas (default false), plus the shared UpdateWhileUsingConnection checkbox and Test/Update actions. SslEnabled is never shown and is always sent false. Visibility of both types in the header SourceTypes select is gated by `BDMPSqlServerAndPostgreSqlConnectionTypesEnabled` (code default false; development web.uiconfig true), removed in the final rollout phase. The left-panel viewer reuses the existing tables viewer used by other typed types. Icons reuse existing `sql-server.svg` and `postgre-sql.svg`.

## User Stories

1. As a connection author, I want SqlServer as a Typed Connection on the Form Tab, so that I can create SqlServer connections without Opaque JSON.
2. As a connection author, I want PostgreSql as a Typed Connection on the Form Tab, so that I can create PostgreSql connections without Opaque JSON.
3. As a connection author, I want SqlServer and PostgreSql listed in the header SourceTypes select when the feature flag is on, so that I can choose them like Oracle and StarRocks.
4. As a connection author, I want SqlServer and PostgreSql hidden from SourceTypes when the feature flag is off, so that incomplete rollout does not expose those types in production configs without the key.
5. As a connection author with development web.uiconfig, I want the flag on by default, so that I can try the new types while developing.
6. As an operator deploying without the new config key, I want the code default to hide those SourceTypes, so that missing config stays safe.
7. As a product owner, I want the flag removed in the final phase, so that SqlServer and PostgreSql are always visible after GA.
8. As a connection author creating SqlServer, I want to enter server name, so that the connection targets the right host.
9. As a connection author creating PostgreSql, I want to enter server name, so that the connection targets the right host.
10. As a connection author creating SqlServer, I want a port field defaulting to 1433, so that I rarely need to change the standard port.
11. As a connection author creating PostgreSql, I want a port field defaulting to 5432, so that I rarely need to change the standard port.
12. As a connection author, I want username and password fields for both types, so that authentication works like other typed connections.
13. As a connection author, I want a free-text database name field, so that I can name the database without a fetched dropdown.
14. As a connection author, I want a “show all schemas” checkbox mapped to FetchAllSchemas, so that I can choose all schemas vs the technology default schema.
15. As a connection author on a new SqlServer connection, I want FetchAllSchemas default false, so that the catalog starts limited to `dbo`.
16. As a connection author on a new PostgreSql connection, I want FetchAllSchemas default false, so that the catalog starts limited to `public`.
17. As a connection author with FetchAllSchemas false on SqlServer, I want only the default schema catalog behavior from the backend, so that I do not get every schema.
18. As a connection author with FetchAllSchemas true, I want all schemas fetched, so that I can pick tables across schemas.
19. As a connection author, I want the shared UpdateWhileUsingConnection checkbox, so that I can choose Live Catalog vs Pinned Catalog like other typed connections.
20. As a connection author, I want Test Connection on the Form Tab, so that I can validate credentials before save.
21. As a connection author, I want Update / refresh of data sources on the Form Tab, so that I can load tables into the viewer.
22. As a connection author, I want the same tables viewer as other typed connections, so that selecting tables for a pinned catalog feels familiar.
23. As a connection author, I do not want an Ssl checkbox, so that the form matches the agreed Relational Form Fields.
24. As a connection author, I want SslEnabled always persisted as false, so that QEM receives a defined SSL flag without UI noise.
25. As a connection author, I do not want Oracle synonym checkboxes on SqlServer or PostgreSql, so that the form stays relational-only.
26. As a connection author, I do not want a StarRocks catalog field on SqlServer or PostgreSql, so that the form does not imply catalog APIs that do not exist.
27. As a connection author, I want SqlServer and PostgreSql wire types to match backend `SqlServer` and `PostgreSql`, so that Create / Test / GetDataSources succeed.
28. As a connection author saving from the Form Tab, I want Active Tab persistence rules unchanged, so that Typed vs Opaque behavior stays consistent.
29. As a connection author on Custom Tab, I want SqlServer/PostgreSql Form Tab work not to change Opaque Monaco behavior, so that Advanced Connection Mode stays intact.
30. As a connection author switching SourceTypes to SqlServer, I want the SqlServer credentials form and defaults, so that I do not see Oracle or StarRocks-only fields.
31. As a connection author switching SourceTypes to PostgreSql, I want the PostgreSql credentials form and defaults, so that ports and labels match PostgreSql.
32. As a developer, I want separate Per-Type Connection Trees for SqlServer and PostgreSql, so that a future field change on one type does not force the other.
33. As a developer, I want each type registered as its own facade on the multi facade token, so that Simple Connection Mode dispatches like Oracle/StarRocks.
34. As a connection author, I want SourceTypes icons from existing sql-server and postgre-sql assets, so that branding matches the rest of the product.
35. As a connection author editing general connection name and UpdateWhileUsingConnection, I want those shared controls to keep working for the new types, so that I do not lose common Form Tab chrome.
36. As a warehouse designer, I do not need warehouse DatabaseType tabs from this work, so that Create Connection Page shipping is not blocked on Warehouse Design.
37. As a bulk-register user, I do not need bulk-register changes from this work, so that connection create can ship independently.
38. As a connection author, I want password stored/changed semantics to follow existing typed connection patterns, so that edit flows do not break password handling.
39. As a connection author loading a saved SqlServer Typed Connection (when the type is available in UI), I want Form Tab fields restored from connectionInfo, so that edit matches create.
40. As a connection author loading a saved PostgreSql Typed Connection (when the type is available in UI), I want Form Tab fields restored from connectionInfo, including FetchAllSchemas, so that edit matches create.
41. As a connection author with Live Catalog, I want Save not to require a pinned table selection, so that UpdateWhileUsingConnection true behaves like other typed types.
42. As a connection author with Pinned Catalog, I want Update then table selection then Save to persist DataSource, so that pinned mode matches existing typed flow.
43. As a translator, I want SourceTypes and field labels for SqlServer and PostgreSql, so that the Form Tab is localized like Oracle and StarRocks.
44. As a QA engineer, I want unit tests at the facade and SourceTypes-flag seams, so that regressions are caught without full E2E for every field.
45. As a future maintainer, I want ADR-0012 and glossary terms respected, so that shared Relational modules are not “refactored in” against the decision.

## Implementation Decisions

- Scope is Create Connection Page only: Form Tab Per-Type Connection Trees, Ladw connection models/enums, header SourceTypes (flag-gated), wiring into Simple Connection Mode and credentials providers. Not warehouse DatabaseType, not bulk-register.
- Backend already exposes `ConnectionType.SqlServer` and `ConnectionType.PostgreSql` with `RelationalConnectionInfo` (`Server`, `Port`, `Username`, `Password`, `DataBaseName`, `FetchAllSchemas`, `SslEnabled`). No new connection Create/Test/GetDataSources APIs required for this frontend work.
- There is no SqlServer/PostgreSql helper API to list databases (unlike `StarRocksHelperApi`). Database name is free-text input.
- Wire enum values on the LADW connection type must be `SqlServer` and `PostgreSql` (not “Postgres”). Map UI `ConnectionTypeEnum` ↔ `LadwConnectionType` the same way Oracle/StarRocks are mapped; add PostgreSql to the shared connection-type enum if missing.
- SslEnabled: never shown on Form Tab; always send `false` on save/test/update payloads.
- FetchAllSchemas: Form Tab checkbox “show all schemas”; default `false` on new connections. False → technology default schema (`dbo` / `public`) per backend relational profiles.
- UpdateWhileUsingConnection, Test Connection, and Update remain shared Form Tab chrome (general connection info + action buttons), not duplicated per type beyond what Oracle/StarRocks already do.
- Viewer: reuse existing Connection Tables Viewer / shared typed viewer path (same as other Form Tab typed types). Catalog shape follows relational/table details already handled by that viewer path.
- Architecture: Per-Type Connection Tree for SqlServer and for PostgreSql (credentials component, connection-info store, facade implementing the existing facade connection service contract). Register both on the multi facade injection token. Do not introduce a shared Relational Form module (ADR-0012).
- Feature flag key: `BDMPSqlServerAndPostgreSqlConnectionTypesEnabled`. Gates only SourceTypes options for these two types. Code default `false`; development `web.uiconfig` `true`. Final phase removes the flag and always shows the options.
- Opening an existing SqlServer/PostgreSql connection while the flag is off is out of scope (not an expected product path).
- Icons: `bundles/assets/img/database/sql-server.svg` and `bundles/assets/img/database/postgre-sql.svg`.
- Custom Tab / Opaque Connection behavior unchanged.
- Domain glossary: Connections CONTEXT terms Typed Connection, Form Tab, Relational Form Fields, Per-Type Connection Tree, Relational SourceTypes Flag.

### Testing seam (single preferred seam)

Highest existing seam: **typed Form Tab facade dispatch** — each new type’s facade implements the same facade connection service contract (`verifyConnection`, load/get connectionInfo, viewer store load/get) and is selected by Simple Connection Mode via the multi facade token, exactly like Oracle and StarRocks.

Secondary seam (flag only): SourceTypes option list construction — when the flag is true, SqlServer and PostgreSql options appear with correct icons/labels; when false, they do not. Prefer not inventing a new abstraction layer for the flag beyond how other BDMP web.uiconfig flags are read.

Do not make the HTTP client or QEM the unit-test seam for this UI work; prior art mocks the design-object / facade layer.

## Testing Decisions

- Good tests assert external behavior of facades and SourceTypes visibility, not private store field names or template structure trivia.
- Test SqlServer facade and PostgreSql facade the way Oracle/StarRocks facade specs do: `verifyConnection` true only for the matching engine; `getConnectionInfo` reflects store updates including defaults (port, FetchAllSchemas false, SslEnabled not exposed / false on payload build); load/viewer wiring where those types already test it.
- Test SourceTypes provider (or header consumer) with flag on/off for presence of the two options.
- Test connection-info stores for default port and FetchAllSchemas default false.
- Prior art: Oracle/StarRocks facade specs, connection-info store specs, `DatabasePageStaticOptionsProviderService` usage in header specs, `SimpleConnectionModeStrategy` map coverage when extending types.
- Prefer Jasmine + TestBed patterns from existing `new-database-page` specs; do not require LAP.DW integration tests for this frontend-only scope.

## Out of Scope

- Warehouse Design Technology Details Tabs / `DatabaseType` enablement (separate effort under warehouse-sqlserver-postgres-design).
- Bulk warehouse registration UI changes.
- New backend helper APIs to list SqlServer/PostgreSql databases.
- Showing or toggling SslEnabled in the Form Tab UI.
- Oracle-style IncludeSynonyms on these types.
- StarRocks catalog/database fetched selects for these types.
- Changing Custom Tab / Opaque Connection / Advanced Connection Mode behavior.
- Designing edit UX for existing SqlServer/PostgreSql objects when the SourceTypes flag is off.
- Leaving the feature flag permanently after GA (final phase removes it).
- Backend changes to RelationalConnectionInfo or ConnectionType enum (already present).

## Further Notes

- Confirmed grilling decisions and glossary/ADR updates live under `Connections/` (CONTEXT + ADR-0012).
- Parent Jira story also tracks Advanced Connection Mode; this spec is a separate Form Tab typed-types slice under the same Create Connection Page parent unless product moves it.
- Related but separate: `.scratch/warehouse-sqlserver-postgres-design` for Warehouse Design exclusive techs.
