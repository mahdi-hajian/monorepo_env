# Analytics / Data Model Design (working)

Shared product language for DM graph view/export work. Implementation details stay out of this file.

## Language

**Data Model Design**:
The in-app screens for editing the ontology (entities, links, attributes).
_Avoid_: DM page (ambiguous), ontology editor (unless speaking abstractly)

**View Graph**:
The in-product ontology graph preview opened as a fullscreen overlay (not a modal dialog) on the current Data Model Design page (entities/links/attributes)—not a separate route for now. Layout controls top-start; search and **بازگشت** (close/back) top-end; graph canvas full-bleed; Get Graph lives on this overlay. Closing is via **بازگشت** only (not Escape). Uses a thin Angular host over OntologyGraphManager (not GraphManager, not pattern-drawing). Graph data is built on the client from the in-memory Data Model Design model, including unsaved edits—no backend round-trip for view JSON.
_Avoid_: Get Graph, download graph (for this screen), visualizer graph, saved-only preview, iframe Export HTML viewer, server-built view payload, pattern-drawing host, GraphManager host, graph-preview route (deferred), Termeh/nz modal shell

**OntologyGraphManager**:
The planned thin Ogma wrapper in library `mohaymen-ontology-ogma` for ontology overview: set graph, hierarchical/grid layout, search, tooltips—without visualizer wiring, markers, fade, or grouping. Mapping from Data Model Design editor state into graph input lives in `dm`, not in this library.
_Avoid_: GraphManager, GraphCore (as the View Graph host), putting DataModelWrapper mapping inside the Ogma library

**Get Graph**:
The user action that downloads the Graph Export Package (ZIP) of the persisted system ontology via existing backend ExportGraph (not the unsaved in-memory editor state). Lives in the arrow popup on View Graph.
_Avoid_: View Graph, export model (`.dm`), download of unsaved preview

**Graph Export Package**:
The self-contained ZIP (HTML + legacy Ogma viewer + embedded graph data) used as the downloadable offline artifact for the persisted model. Not the in-app View Graph host.
_Avoid_: DataModelGraph (folder/sample name only), HTML download (incomplete — it is a ZIP), visualizer ExportGraph, in-app iframe host
