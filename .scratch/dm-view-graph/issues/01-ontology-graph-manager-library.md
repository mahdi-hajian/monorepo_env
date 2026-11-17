# 01: OntologyGraphManager library

**What to build:** Ship the thin `mohaymen-ontology-ogma` library with OntologyGraphManager so callers can set an ontology graph, run hierarchical/grid layout, search-and-locate by label, show simple tooltips, and destroy the engine—without visualizer GraphManager or pattern-drawing.

**Blocked by:** None (can start immediately).

**Status:** done

**Jira:** TECSDM-159413

- [x] Library is wired into the WebUI workspace like sibling Mohaymen libs and exports OntologyGraphManager plus its thin graph DTO.
- [x] Manager supports setGraph, hierarchical layout, grid layout, search-and-locate, tooltips, clear/destroy without wiring/markers/fade/grouping APIs.
- [x] Unit tests cover the public contract / pure DTO→Ogma mapping at the secondary seam (no requirement for full WebGL CI canvas).
