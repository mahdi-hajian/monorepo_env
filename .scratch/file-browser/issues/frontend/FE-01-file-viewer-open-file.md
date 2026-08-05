# FE-01 — FileViewer display-file open (phase 0)

**Layer:** frontend  
**What to build:** FileViewer opens from `FileViewerDisplayFile` (`{ fileId, link, name, extension }`). Explore/profile keep ItemsFileRequest load chain via `FileViewerDisplayFilePreparer`, then open that shape. No new backend ticket required.

**Blocked by:** None — can start immediately (parallel with `BE-01` OK).

**Status:** done

**Wave:** 0  
**Domain:** CONTEXT Phase 0; ADR 0004

- [x] FileViewer opener accepts `FileViewerDisplayFile` (`{ fileId, link, name, extension }`)
- [x] Explore/profile prepare via `FileViewerDisplayFilePreparer.prepareFromItemsRequest`, then `FileViewerPluginOpenerService.open(displayFile, extraData?)`
- [x] Share-view binds `[displayFile]`; plugin data is `{ displayFile, extraData }` (types in `*.model.ts`)
- [x] Existing Explore/profile preview flows still work (flag off → legacy `viewFile`)
- [x] Opener seam tests lock display-file contract; no permanent dual fat+display-file opener API
- [x] On prepare failure: toast + throw (Explore/profile propagate)
