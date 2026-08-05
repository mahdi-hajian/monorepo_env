# FE-07 — Upload folder tree UI

**Layer:** frontend  
**What to build:** Toolbar folder pick; client maps tree under current browse path; uses existing create + FE-05 queue. Folder destination collision validated before batch (client + any BE helper). No new backend API. Stay on current level.

**Blocked by:** FE-05; FE-06

**Status:** ready-for-agent

**Wave:** 6  
**Domain:** CONTEXT Phase 5; ADR 0009

- [ ] FileBrowser toolbar folder upload only (no Graph entry)
- [ ] Path mapping preserves tree including selected root folder name
- [ ] Collision fail-before-batch; duplicate file names OK; no empty-folder reconstruction
- [ ] Uses phase 3 queue; stay on current level
