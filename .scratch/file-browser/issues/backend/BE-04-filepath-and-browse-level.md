# BE-04 — FilePath attribute and browse-level API

**Layer:** backend  
**What to build:** Document `FilePath` (parent folder path only; missing/empty = `/`; no backfill). Browse-level API for a browse path returns child folders (`name` + `path`, unpaged) and files (paged) whose parent FilePath equals the browse path. Folder destination collision validation available for later mutations. FileBrowser add writes destination browse path as `FilePath` by extending **`AddAttachmentConfig`** (not a new `FileBrowser.AddFiles` function); Graph `AddAttachment` remains root (omit / empty `FilePath`). **No** Create folder backend API. **No** `FileBrowser.AddFiles`.

**Blocked by:** BE-01; BE-03 (add must be able to write FilePath)

**Status:** done

**Wave:** 5 (before `FE-06`)  
**Domain:** CONTEXT Phase 4 / FilePath / browse path / Virtual Folder / folder destination collision; ADR 0007

- [x] FilePath on Document is parent path only; missing/empty treated as `/`; no migration backfill
- [x] Browse path normalized: `/` root; else leading `/`, no trailing `/`
- [x] Browse level: direct child folders + files at path; folders unpaged; files paged; folders-then-files by name
- [x] FileBrowser add sets FilePath from browse path via `AddAttachmentConfig` (same plugin as Graph); Graph add stays root
- [x] No Create folder API and no `FileBrowser.AddFiles`
- [x] Folder destination collision helper/validation exists for sibling folder name clashes (used by later BE tickets)
- [x] Package tests cover browse membership and FilePath on FileBrowser vs Graph create
