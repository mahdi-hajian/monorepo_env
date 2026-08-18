# BE-03 — Shared Document-from-file and dual-entry bulk add

**Layer:** backend  
**What to build:** One shared Document-from-file core: after client upload yields `fileId`(s), create Document(s) on the tab. FileBrowser add entry: `(0,0)`-origin placement, **no Attach**, bulk partial success, 25MB/flag per file. Graph AddAttachment entry: same create core, bulk, viewport center, Attach each successful Document to current non-Document selection. Raw bytes are not the primary execute payload.

**Blocked by:** BE-01 — FileBrowser ListFiles package

**Status:** done

**Wave:** 3 (before `FE-04`)  
**Domain:** CONTEXT Shared Document-from-file / FileBrowser add file; ADR 0005

Per-file 25MB/`LAPortalVisualizerAddAttachmentFileSizeLimitEnabled` stays **client-side** (same as today’s Graph add); `FE-04` enforces it before upload. Backend create is `fileId` → Document.

- [x] Single shared create core used by FileBrowser add and Graph AddAttachment
- [x] Pipeline assumes upload → fileId(s) then create
- [x] FileBrowser path: bulk; (0,0) origin + default spacing; no Attach; partial success; 25MB/flag
- [x] Graph path: bulk; center placement; Attach per successful Document to selected non-Documents
- [x] Package tests lock dual-entry behavior and no-Attach on FileBrowser path
