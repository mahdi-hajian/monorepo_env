# BE-02 — PrepareView and PrepareDownload

**Layer:** backend  
**What to build:** FileBrowser package prepares view and download payloads from a list item `instanceId` only: PrepareView → `{ fileId, link, name, extension }` (fileId = content id for FileViewer); PrepareDownload → `{ downloadUrl }` (optional fileName).

**Blocked by:** BE-01 — FileBrowser ListFiles package

**Status:** done

**Wave:** 2 (before `FE-03`)  
**Domain:** CONTEXT Phase 1 view vs download; ADR 0004  
**Impl notes:** `MicroService.IAP/.../Visualizer/Plugin/FileBrowser/AGENTS.md`

- [x] PrepareView(instanceId) returns view shape usable by FileViewer opener
- [x] PrepareDownload(instanceId) returns downloadUrl (optional fileName)
- [x] Requests identify the Document only by FileBrowser list `instanceId`
- [x] Package tests cover both prepares for tab Documents
- [x] Prepare view/download split into `IFileBrowserPrepareViewProvider` + `IFileBrowserPrepareDownloadProvider`
