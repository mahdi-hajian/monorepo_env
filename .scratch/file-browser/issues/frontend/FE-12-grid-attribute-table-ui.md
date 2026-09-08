# FE-12 — FileBrowser grid attribute table UI

**Layer:** frontend  
**What to build:** Unlock IAP tile/grid switch. Tile still LoadListFiles. Grid consumes FileBrowser Schema + Data: map Schema to shell column layout (no FileBrowser GetColumnDisplayStats); map Data to existing mixed listDataSource; reading mode like visualizer Grid; no grouping/pin/expand. FileContent cells view/download like visualizer Grid. Schema cache in visualizer tab session (survive Graph round-trip; clear on tab close/refresh; rebuild on Document attribute-set change).

**Blocked by:** BE-08

**Status:** ready-for-agent

**Wave:** 11  
**Domain:** CONTEXT FileBrowser grid / FileBrowser tile; phase 10; ADR 0014

- [ ] Remove IAP tile-only lock; default remains tile
- [ ] Tile still LoadListFiles; grid never uses the three-field list as its payload
- [ ] Schema once per freeze rules; Data per browse path / filter / sort / page
- [ ] Mixed window + Name filter on folders; reading mode yes; grouping/pin/expand no
- [ ] Host adapter tests: which functions tile vs grid call; mixed-window totalCount; never Explore as list API
