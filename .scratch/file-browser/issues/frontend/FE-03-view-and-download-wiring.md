# FE-03 — View and download wiring

**Layer:** frontend  
**What to build:** From the FileBrowser list, view opens FileViewer via PrepareView → `FileViewerDisplayFileMetadata` + opener; download uses PrepareDownload.

**Blocked by:** FE-01; FE-02; BE-02

**Status:** ready-for-agent

**Wave:** 2 (after `BE-02`)  
**Domain:** CONTEXT Phase 1 view vs download

- [ ] View action: PrepareView(instanceId) → FileViewer open-file open
- [ ] Download action: PrepareDownload(instanceId) → download URL
- [ ] Only list `instanceId` sent on requests
- [ ] Do not start until BE-02 is done
