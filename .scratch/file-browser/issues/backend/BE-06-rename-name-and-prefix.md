# BE-06 — Rename file Name and folder prefix

**Layer:** backend  
**What to build:** Rename one file (Document **Name** only; Extension unchanged) or one Virtual Folder (all-or-nothing FilePath prefix rewrite for subtree). Folder destination collision always validated on server before IO. Name charset/trim rules match create-folder (shared rule with FE validator). Session empty folders have no API (FE-only).

**Blocked by:** BE-04 — FilePath attribute and browse-level API

**Status:** ready-for-agent

**Wave:** 9 (before `FE-10`)  
**Domain:** CONTEXT Phase 8 rename; ADR 0013

- [ ] File rename updates Name only; Extension unchanged
- [ ] Virtual folder rename = all-or-nothing subtree FilePath prefix rewrite
- [ ] Server always validates folder destination collision before folder rename IO
- [ ] No session-empty rename API (client-only)
- [ ] Package tests cover Name-only rename, prefix rewrite, and server collision
