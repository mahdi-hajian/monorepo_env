# BE-03 — Shared Document-from-file and dual-entry bulk add

**Layer:** backend  
**What to build:** One shared Document-from-file core: after client upload yields `fileId`(s), create Document(s) on the tab. FileBrowser add entry: `(0,0)`-origin placement, **no Attach**, bulk partial success, 25MB/flag per file. Graph AddAttachment entry: same create core, bulk, viewport center, Attach each successful Document to current non-Document selection. Raw bytes are not the primary execute payload.

**Blocked by:** BE-01 — FileBrowser ListFiles package

**Status:** ready-for-agent

**Wave:** 3 (before `FE-04`)  
**Domain:** CONTEXT Shared Document-from-file / FileBrowser add file; ADR 0005

- [ ] Single shared create core used by FileBrowser add and Graph AddAttachment
- [ ] Pipeline assumes upload → fileId(s) then create
- [ ] FileBrowser path: bulk; (0,0) origin + default spacing; no Attach; partial success; 25MB/flag
- [ ] Graph path: bulk; center placement; Attach per successful Document to selected non-Documents
- [ ] Package tests lock dual-entry behavior and no-Attach on FileBrowser path
