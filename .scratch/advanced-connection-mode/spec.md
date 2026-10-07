# Advanced Connection Mode (Opaque Custom Tab)

Status: ready-for-agent

Jira: none (spec is local-only; TECSDM-121818 was cancelled — it was not an implementation ticket)

Domain: [Connections/CONTEXT.md](../../Connections/CONTEXT.md)  
ADRs: [Connections/docs/adr/](../../Connections/docs/adr/)  
Figma: [مود پیشرفته اتصال](https://www.figma.com/design/nPCTIkotM0luhtdADTe2VU/%25D9%2585%25D9%2588%25D8%25AF-%25D9%25BE%25DB%258C%25D8%25B4%25D8%25B1%25D9%2581%25D8%25AA%25D9%2587-%25D8%25A7%25D8%25AA%25D8%25B5%25D8%25A7%25D9%2584?node-id=3-735)

## Problem Statement

Connection authors who need a QEM-style JSON Payload cannot configure an Opaque Connection on the Create Connection Page. Today the page only supports Typed Connection forms (Oracle / StarRocks). There is no Custom Tab, no Monaco Payload editor, and no Opaque REST Probe path for Test Connection or data-source Preview before or after save.

## Solution

Add Advanced Connection Mode to the Create Connection Page: keep the Form Tab for Typed Connection, add a Custom Tab that edits Opaque Connection Payload in Monaco, persist only the Active Tab, keep Tab Drafts across switches, drive the left panel via Catalog-Driven Viewer after Opaque REST Probe Preview, and follow Custom Tab Layout from Figma (Monaco fills height; actions and UpdateWhileUsingConnection under the editor; settings pane resizable 400–500px).

## User Stories

1. As a connection author, I want a Custom Tab beside the Form Tab, so that I can configure an Opaque Connection without leaving the Create Connection Page.
2. As a connection author, I want the Form Tab to keep working as today, so that Typed Connection create/edit is unchanged.
3. As a connection author creating a new connection, I want both tabs available from the start, so that I can choose typed or Opaque without a separate flow.
4. As a connection author opening a Typed Connection, I want Default Tab to be the Form Tab, so that I land on the matching editor.
5. As a connection author opening an Opaque Connection, I want Default Tab to be the Custom Tab, so that I land on the Payload editor.
6. As a connection author, I want the non-default tab still available, so that I can switch persistence format via Active Tab Save later.
7. As a connection author on Custom Tab, I want Monaco to show Empty Payload Seed `{}` for a new connection, so that I am not misled by a sample connector template.
8. As a connection author on Custom Tab, I want Monaco to load the stored Payload when editing an Opaque Connection, so that I can change what was saved.
9. As a connection author, I want Monaco to fill the remaining settings height, so that I can edit JSON comfortably (Custom Tab Layout).
10. As a connection author, I want Test Connection and Update (Preview) buttons only under Monaco, so that the action row matches Figma and existing control meaning.
11. As a connection author on Custom Tab, I want only the UpdateWhileUsingConnection checkbox under Monaco, so that I am not shown Oracle-only options that Opaque content cannot store.
12. As a connection author, I want IncludeAllSources and IncludeSynonyms absent from Custom Tab, so that Advanced Connection Mode stays free of typed Oracle fields.
13. As a connection author, I want the settings pane width resizable between the current default and +100px (400–500px today), so that I can widen slightly for JSON without crushing the viewer.
14. As a connection author, I want switching tabs to keep each Tab Draft in memory, so that my Typed and Opaque edits do not disappear.
15. As a connection author, I want Save to write only the Active Tab, so that I am not surprised by merging both drafts.
16. As a connection author saving from Form Tab, I want a Typed Connection persisted, so that structured connectionInfo remains the source of truth for that save.
17. As a connection author saving from Custom Tab, I want an Opaque Connection persisted (`contentFormat` OpaqueJson + Payload), so that Monaco content becomes the stored connection.
18. As a connection author with Live Catalog (UpdateWhileUsingConnection true), I want Save without a pinned DataSource catalog, so that tables are fetched when the connection is used.
19. As a connection author with Pinned Catalog (UpdateWhileUsingConnection false), I want Update to Preview data sources into the left panel, so that I can select tables before Save.
20. As a connection author with Pinned Catalog, I want my left-panel selection to become DataSource on Save, so that the pinned catalog matches what I chose.
21. As a connection author before the connection exists, I want Test Connection via Opaque REST Probe with raw Payload, so that I can validate credentials without saving first.
22. As a connection author after the connection exists, I want Test Connection via Opaque REST Probe with connection id, so that I can re-test the stored Opaque Connection.
23. As a connection author before save, I want data-source Preview via Opaque REST Probe with raw Payload, so that the Catalog-Driven Viewer can populate.
24. As a connection author after save, I want Preview/GetDataSources via the Opaque path appropriate to stored id, so that the left panel refreshes for an existing Opaque Connection.
25. As a connection author, I want the left-panel viewer chosen from the catalog response (Catalog-Driven Viewer), so that Opaque does not depend on form connectionType.
26. As a connection author, I want Backend Probe Error messages shown as returned by the server, so that multi-database and other rejections stay accurate.
27. As a connection author, I do not want the UI to invent its own multi-database counting rule, so that client and server do not disagree.
28. As a connection author on Form Tab, I want existing Test/Update/Save behavior preserved, so that Typed Connection workflows do not regress.
29. As a connection author, I want invalid or empty Payload failures to surface through normal probe/save errors, so that I know why the operation failed.
30. As a connection author switching from Form Tab draft to Custom Tab and saving, I want only Opaque content written, so that the unused Form Tab draft is ignored for persistence.
31. As a connection author switching from Custom Tab draft to Form Tab and saving, I want only Typed content written, so that the unused Payload draft is ignored for persistence.
32. As a connection author, I want Oracle-specific checkboxes to remain on the Form Tab credentials area only, so that typed Oracle configuration stays where it belongs.
33. As a product engineer, I want domain language and ADRs under Connections respected, so that agents and humans share one vocabulary.
34. As a QA engineer, I want facade-level tests for Active Tab save/load/probe, so that behavior is checked without depending on Monaco internals.

## Implementation Decisions

- Feature lives on the Create Connection Page (`new-database-page` shell): settings pane gains Form Tab + Custom Tab; left panel remains the data-source viewer host.
- Respect Connections ADRs 0001–0011 (Active Tab persistence, both tabs available, Catalog-Driven Viewer, Custom Tab Layout, UpdateWhileUsingConnection-only footer, Pinned/Live flows, Opaque REST Probe, Tab Draft, Empty Payload Seed, Backend Probe Error).
- Extend the main connection facade (and its supporting stores) so Active Tab decides whether build/save/load/test/fetch use Typed Connection sub-facades or Opaque Payload + Opaque REST Probe.
- Introduce Opaque Tab Draft state for Payload string/JSON and UpdateWhileUsingConnection; keep existing general/typed stores as Form Tab Draft.
- Custom Tab UI: Monaco fills remaining height; footer = existing Test + Update actions + UpdateWhileUsingConnection only; no IncludeAllSources / IncludeSynonyms.
- Settings splitter: enable resize; min = current default width; max = current + 100px.
- Opaque create/update content shape: `extraMetadata.contentFormat = OpaqueJson`; `content.payload` from Monaco; `content.updateWhileUsingConnection`; `content.dataSource` only when Pinned Catalog has selection.
- Opaque REST Probe contracts (pre-save): Test and Preview POST bodies use null typed fields and null connection id, with Payload from Monaco; version header as in Connections Bruno collection.
- Opaque REST Probe (post-save): prefer id-based test/preview (or stored variants) when connection id exists.
- Catalog-Driven Viewer: after successful Preview, map catalog type/shape to the viewer strategy already used for table lists; do not key off Monaco `connectorName` alone.
- Typed Form Tab continues to use existing MRPC-oriented design-object APIs; do not force Typed onto Opaque REST unless already shared.
- No backend schema change required for this frontend spec; rely on existing Opaque APIs documented under Connections.
- Product copy for tab titles may follow Figma; glossary keeps Form Tab / Custom Tab until copy is frozen.

### Primary test seam (confirm)

- **Highest seam: main connection facade** — assert load Default Tab, Tab Draft survival, Active Tab Save payload shape (Typed vs Opaque), Live vs Pinned DataSource rules, and that Test/Preview call Opaque REST Probe with payload vs id as appropriate (API client mocked).
- Prefer not adding a second cross-cutting seam. Thin Custom Tab component tests only for layout/footer checkbox visibility if facade tests cannot cover them.

## Testing Decisions

- Test external behavior through the facade seam: given stores + mocked connection API/REST client, observable outcomes are which tab is active, what save/test/preview sends, and what viewer store receives.
- Do not assert Monaco editor implementation details, encryption, or pixel-perfect CSS beyond behavioral layout contracts where needed.
- Modules under test: main connection facade (primary); Opaque draft/store and REST probe client as collaborators mocked or thinly tested; Custom Tab host only for “only UpdateWhileUsingConnection visible” if required.
- Prior art: existing `main-connection-facade.service.spec.ts`, general-connection-info store specs, typed facade specs, action-button specs on the Create Connection Page.
- Good tests: Active Tab Save sends Opaque vs Typed body; switch tabs does not clear drafts; new Custom Tab seed is `{}`; Live Save omits pinned details; Pinned Save includes selected DataSource; probe errors pass through server messages; Form Tab regression for Oracle/StarRocks save/test still green.

## Out of Scope

- Redesigning Test/Update button chrome beyond placement under Monaco.
- Per-connector Monaco templates or non-`{}` Empty Payload Seed.
- Client-side multi-database validation beyond Backend Probe Error display.
- Rewriting Typed Connection Form Tab credentials or Oracle synonym/schema checkboxes.
- Migrating Typed Test/Update off their current APIs in this feature.
- Backend changes to Opaque validators, encryption, or QEM (assumed already available).
- Legacy `create-connection-page` feature work.
- Neutral-only viewer (superseded by Catalog-Driven Viewer).
- Feature-flag product decision (not locked in grill; default is ship on the page unless a later ticket adds a flag).

## Further Notes

- Bruno/OpenCollection under `Connections/` is the contract reference for Opaque REST Probe and create/update examples.
- Confluence design page and Figma are UX sources; glossary terms win over informal Persian synonyms in agent work.
- After this spec, `/to-tickets` can slice implementation; keep facade seam as the acceptance spine.
