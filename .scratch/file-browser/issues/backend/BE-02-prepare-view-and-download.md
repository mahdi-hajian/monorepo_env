# BE-02 — PrepareView and PrepareDownload

**Layer:** backend  
**What to build:** FileBrowser package prepares view and download payloads from a list item `instanceId` only: PrepareView → `{ fileId, link, name, extension }` (fileId = content id for FileViewer); PrepareDownload → `{ downloadUrl }` (optional fileName).

**Blocked by:** BE-01 — FileBrowser ListFiles package

**Status:** ready-for-agent

**Wave:** 2 (before `FE-03`)  
**Domain:** CONTEXT Phase 1 view vs download; ADR 0004

- [ ] PrepareView(instanceId) returns view shape usable by FileViewer opener
- [ ] PrepareDownload(instanceId) returns downloadUrl (optional fileName)
- [ ] Requests identify the Document only by FileBrowser list `instanceId`
- [ ] Package tests cover both prepares for tab Documents
