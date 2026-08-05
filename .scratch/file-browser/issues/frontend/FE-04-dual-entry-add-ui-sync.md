# FE-04 — Dual-entry add UI (sync spinner)

**Layer:** frontend  
**What to build:** FileBrowser toolbar multi-file add and Graph AddAttachment bulk UI call `BE-03` create core (upload → fileId → create). FileBrowser: sync spinner, no Attach, refresh list after batch. Graph: sync spinner, Attach behavior unchanged per success. Progress/cancel panel is FE-05.

**Blocked by:** FE-02; BE-03

**Status:** ready-for-agent

**Wave:** 3 (after `BE-03`)  
**Domain:** CONTEXT FileBrowser add file; ADR 0005

- [ ] FileBrowser toolbar bulk add with sync spinner; list refresh after batch
- [ ] Graph AddAttachment supports bulk using same upload→create flow
- [ ] Client enforces 25MB/flag before upload when enabled; partial success UX
- [ ] Do not start until BE-03 is done; no async panel yet
