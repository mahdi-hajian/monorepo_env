# BE-04 — FilePath attribute and browse-level API

**Layer:** backend  
**What to build:** Document `FilePath` (parent folder path only; missing/empty = `/`; no backfill). Browse-level API for a browse path returns child folders (`name` + `path`, unpaged) and files (paged) whose parent FilePath equals the browse path. Folder destination collision validation available for later mutations. FileBrowser create/add can accept destination browse path as FilePath; Graph AddAttachment remains root. **No** Create folder backend API.

**Blocked by:** BE-01; BE-03 (add must be able to write FilePath)

**Status:** ready-for-agent

**Wave:** 5 (before `FE-06`)  
**Domain:** CONTEXT Phase 4 / FilePath / browse path / Virtual Folder / folder destination collision; ADR 0007

- [ ] FilePath on Document is parent path only; missing/empty treated as `/`; no migration backfill
- [ ] Browse path normalized: `/` root; else leading `/`, no trailing `/`
- [ ] Browse level: direct child folders + files at path; folders unpaged; files paged; folders-then-files by name
- [ ] FileBrowser add can set FilePath from browse path; Graph add stays root
- [ ] No Create folder API
- [ ] Folder destination collision helper/validation exists for sibling folder name clashes (used by later BE tickets)
- [ ] Package tests cover browse membership and FilePath on FileBrowser vs Graph create
