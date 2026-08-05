# FE-06 — Folders UI, session empty, FilePath on add

**Layer:** frontend  
**What to build:** Breadcrumb + browse navigation using `BE-04` browse-level API. Show Virtual Folders + session empty folders + files. Create folder = session-only (no API). Shared name validator in `@mohaymen/file-browser`. FileBrowser add passes current browse path (BE writes FilePath). Stay on level after create.

**Blocked by:** FE-02; FE-04; BE-04

**Status:** ready-for-agent

**Wave:** 5 (after `BE-04`)  
**Domain:** CONTEXT Phase 4; ADR 0007, 0008

- [ ] Navigate by browse path with breadcrumb; mixed folder+file list from BE
- [ ] Session empty folders in tab session; Create folder has no backend call
- [ ] Shared folder-name validator in library
- [ ] FileBrowser add sends current browse path; stay on level after create
- [ ] Do not start until BE-04 is done; no rename/move/folder-upload in this ticket
