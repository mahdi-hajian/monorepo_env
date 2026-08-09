# FE-03 — View and download wiring

**Layer:** frontend  
**What to build:** From the FileBrowser list, view opens FileViewer via PrepareView → `FileViewerDisplayFileMetadata` + opener; download uses PrepareDownload.

**Blocked by:** FE-01; FE-02; BE-02

**Status:** done

**Wave:** 2 (after `BE-02`)  
**Domain:** CONTEXT Phase 1 view vs download  
**Impl notes:** `iap/.../plugins/file-browser/AGENTS.md` + `mohaymen-file-browser/AGENTS.md`

- [x] View action: PrepareView(instanceId) → FileViewer open-file open
- [x] Download action: PrepareDownload(instanceId) → download URL
- [x] Only list `instanceId` sent on requests
- [x] Do not start until BE-02 is done
