# Spec: Data Model Design — View Graph

Status: ready-for-agent  
Jira: TECSDM-159350  
Domain glossary: `GLOSSARY.md` (Data Model Design / View Graph / OntologyGraphManager / Get Graph / Graph Export Package)

## Problem Statement

In Data Model Design, the toolbar action that users know as graph export only downloads a Graph Export Package (ZIP). Users cannot inspect the ontology graph inside the product while editing—especially with unsaved changes still in memory. They must download, unzip, and open a static HTML viewer offline, which is slow and does not reflect the in-progress editor state.

## Solution

Replace the toolbar’s immediate download with **View Graph**: open a fullscreen **overlay** (not a modal dialog, not a separate route for now) on the current entities/links/attributes page. The overlay renders the ontology with a thin **OntologyGraphManager** (new `mohaymen-ontology-ogma` library). Graph data is built on the client from the in-memory Data Model Design model (including unsaved edits). **Get Graph** remains available on the overlay via an arrow popup and still downloads the persisted Graph Export Package through existing backend `ExportGraph`. Closing the overlay is only via **بستن** (not Escape).

## User Stories

1. As a Data Model Design user, I want a toolbar View Graph action that opens the overlay (instead of that control immediately downloading a ZIP), so that I can inspect the ontology in-product—while Get Graph download remains available (toolbar interim; overlay in the Get Graph slice).
2. As a Data Model Design user, I want View Graph available from entities, links, and attributes pages, so that I can preview regardless of which design tab I am on.
3. As a Data Model Design user, I want View Graph as a fullscreen overlay on the current page, so that I do not lose my editor context or navigate to a new route.
4. As a Data Model Design user, I want View Graph not to be a centered modal dialog, so that the experience matches the design (full-bleed canvas overlay).
5. As a Data Model Design user, I want the overlay to show my unsaved in-memory ontology changes, so that I can validate work before saving.
6. As a Data Model Design user, I want View Graph to build its graph on the client from the editor model, so that the app does not round-trip my model to the backend just to preview.
7. As a Data Model Design user, I want hierarchical and grid layout controls on the overlay (top-start), so that I can rearrange the overview like the export viewer.
8. As a Data Model Design user, I want search on the overlay (top-end), so that I can find nodes/edges by label and locate them.
9. As a Data Model Design user, I want tooltips on nodes/edges showing attribute names (and edge tooltips where applicable), so that I can inspect details without leaving the canvas.
10. As a Data Model Design user, I want a **بستن** control to close the overlay, so that I return to the exact editor state underneath.
11. As a Data Model Design user, I do not want Escape to close View Graph, so that accidental key presses do not dismiss the overlay.
12. As a Data Model Design user, I want Get Graph on the View Graph overlay via an arrow popup, so that download is available without leaving the preview.
13. As a Data Model Design user, I want Get Graph to download the persisted Graph Export Package (existing ExportGraph), so that offline ZIP behavior stays familiar even if preview showed unsaved edits.
14. As a Data Model Design user, I want to understand that Get Graph may differ from the unsaved preview, so that I am not surprised when the ZIP reflects only saved ontology.
15. As a Data Model Design user, I want nodes without a resolvable icon URL to still render (without image), so that missing icons do not break the whole preview.
16. As a Data Model Design user, I want View Graph to use a thin Ogma host without visualizer wiring/editing chrome, so that the preview is not confused with pattern-drawing or investigation GraphManager features.
17. As a developer, I want OntologyGraphManager in `mohaymen-ontology-ogma`, so that ontology overview stays decoupled from visualizer GraphManager baggage.
18. As a developer, I want DataModelWrapper→graph mapping to live in `dm`, so that domain editor shape stays out of the Ogma library.
19. As a developer, I want a single high-level View Graph façade in `dm` as the primary test seam, so that overlay open/close, unsaved preview data, and Get Graph orchestration are tested as external behavior.
20. As a developer, I want the OntologyGraphManager input contract as a secondary seam, so that layout/search/setGraph can be tested without Angular page chrome.
21. As a Data Model Design user, I want toolbar labeling for the entry action to mean View Graph (مشاهده گراف), so that the action matches what happens.
22. As a Data Model Design user, I want closing View Graph to destroy the graph engine cleanly, so that reopening starts fresh without leaked WebGL/resources.
23. As a Data Model Design user, I want opening View Graph while already open to be a no-op or refresh per façade rules, so that double-clicks do not stack overlays.
24. As a Data Model Design user, I want RTL-friendly chrome placement (layout controls vs search/back) per design, so that the overlay matches Figma.

## Implementation Decisions

- **Shell:** Fullscreen overlay on the current Data Model Design page (entities / links / attributes). No dedicated `graph-preview` route in this iteration. Not `app-termeh-modal` / nz-modal.
- **Entry:** Shared toolbar on all three design pages: add View Graph / مشاهده گراف that opens the overlay. Until Get Graph moves onto the overlay (issue 04), keep Get Graph / دریافت گراف as a separate toolbar button next to View Graph (existing ExportGraph download)—do not leave users without ZIP download between slices.
- **Close:** Only **بستن**. Do not bind Escape to close.
- **Engine:** New library `mohaymen-ontology-ogma` exposing `OntologyGraphManager` over raw Ogma 4.x. Capabilities limited to setGraph, hierarchical layout, grid layout, search-and-locate, tooltips, clear, destroy. No GraphManager, no pattern-drawing, no wiring/markers/fade/grouping.
- **Domain mapping:** In `dm`, map in-memory editor model (`DataModelWrapper` and related types) to the thin graph DTO consumed by OntologyGraphManager (port the rules embodied by backend GraphGenerator/GraphNodeGenerator/GraphEdgeGenerator semantics as needed for preview). Do not put this mapper inside the Ogma library.
- **Icons:** Prefer editor-ready icon URLs for preview; do not require base64 packaging like ZIP export. Missing URL → node without image; do not fail the whole overlay.
- **Get Graph:** Final UX: on the overlay, arrow-popup control; invoke existing persisted `ExportGraph` + download link flow (saved system ontology only). Preview may show unsaved; ZIP does not have to match unsaved state. Interim (pre-issue 04): same ExportGraph download remains on the design toolbar next to View Graph.
- **Primary test seam:** One `dm` View Graph façade coordinating overlay visibility, building preview graph from current editor state, and Get Graph download. Prefer testing this seam’s external behavior over internal Ogma details.
- **Secondary seam:** OntologyGraphManager public contract (+ pure DTO→Ogma raw mapper in the library if present).
- **DI:** Keep DataModelDataManagerService scoping as today for this iteration (component-provided on design pages); overlay lives on those pages so in-memory state remains available without hoisting. Route-based preview (and service hoist) explicitly deferred.
- **Design reference:** Figma IMAP new features file; View Graph overlay frames (full-bleed canvas, layout toggles, search, بستن, Get Graph on overlay)—not modal chrome.

### Approved test seams (from design review)

1. **Primary:** `dm` View Graph façade (overlay open/close, unsaved preview payload, Get Graph orchestration).
2. **Secondary:** `OntologyGraphManager` contract in `mohaymen-ontology-ogma`.

## Testing Decisions

- Prefer tests of **external behavior** at the façade: given editor state (including unsaved), opening View Graph exposes expected graph input; بستن hides overlay and releases the engine; Get Graph triggers persisted export/download without requiring preview parity.
- Test pure mapping functions (editor model → graph DTO; graph DTO → Ogma raw) as deterministic units where feasible; avoid brittle WebGL/Ogma integration in CI unless the repo already has a stable harness.
- Library: unit-test OntologyGraphManager contract where it can be faked; do not require full canvas rendering for acceptance of the façade.
- Prior art: existing DM toolbar export tests/stubs; backend GraphGenerator unit tests as semantic reference for mapper expectations; Termeh dropdown patterns elsewhere for Get Graph popup (UI smoke only if project norms require).

## Out of Scope

- Separate Angular route for View Graph (`dm/graph-preview` or similar)
- Hoisting `DataModelDataManagerService` to module/AppComponent scope (unless a later ticket requires route navigation)
- Embedding or iframe of the static Graph Export Package HTML for in-app viewing
- Using GraphManager or pattern-drawing as the View Graph host
- Backend API that accepts the unsaved editor model and returns graph JSON for preview
- Making Get Graph ZIP reflect unsaved editor state
- Porting Get Graph ZIP packaging to the client
- Escape-to-close
- Visualizer ExportGraph / investigation graph features
- Changing `.dm` model download/upload toolbar actions

## Further Notes

- Vocabulary: use **View Graph**, **Get Graph**, **Graph Export Package**, **OntologyGraphManager**, **Data Model Design** as in `GLOSSARY.md`.
- Figma node `200:5263` / `197:5254` are flat screenshots; fuller board context (e.g. parent frames showing **بستن**) is authoritative for chrome.
- Intentionally accept preview≠ZIP when the user has unsaved edits; call that out in UX copy only if product later asks—out of scope to add copy unless already required by design.
- No product code in the grill/spec phase; implementation starts only when an agent/human picks up this ready-for-agent spec (and/or follow-on tickets).
