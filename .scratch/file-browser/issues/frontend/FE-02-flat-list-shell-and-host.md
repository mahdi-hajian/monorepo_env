# FE-02 — FileBrowser flat list shell and host

**Layer:** frontend  
**What to build:** User opens FileBrowser at `/visualizer/file-browser` with chrome (no Ribbon / left sidebar / footer; End Sidebar kept). `@mohaymen/file-browser` shell shows paged flat grid/tile list wired to `BE-01` ListFiles. No folders yet.

**Blocked by:** BE-01 — FileBrowser ListFiles package

**Status:** done

**Wave:** 1 (after `BE-01`)  
**Domain:** CONTEXT Phase 1 / FileBrowser chrome; ADR 0002, 0003, 0008

- [x] PluginBasedView: `uniqueName = FileBrowser`, `urlSegment = file-browser`
- [x] Chrome rules applied; End Sidebar still available
- [x] Shell library `@mohaymen/file-browser` hosts grid/tile list; host calls ListFiles via plugin execute
- [x] Paging + name sort reflected in UI from BE contract
- [x] Host/shell tests cover registration, chrome, and list wiring — do not start before BE-01 is done
