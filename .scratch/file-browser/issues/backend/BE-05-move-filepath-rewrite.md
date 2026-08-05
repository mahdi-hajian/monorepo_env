# BE-05 — Move file and folder (FilePath rewrite)

**Layer:** backend  
**What to build:** FileBrowser intents to move one file or one folder tree by rewriting FilePath. File move sets FilePath to target folder path. Folder move validates folder destination collision first, then all-or-nothing prefix rewrite for Documents under that tree. Reject self/descendant targets. Same-named files at destination allowed.

**Blocked by:** BE-04 — FilePath attribute and browse-level API

**Status:** ready-for-agent

**Wave:** 8 (before `FE-09`)  
**Domain:** CONTEXT Phase 7 drag-and-drop move; ADR 0011

- [ ] File move updates that Document’s FilePath to target folder path
- [ ] Folder move: collision validated up front; prefix rewrite all-or-nothing
- [ ] Self and descendant moves rejected
- [ ] Same-named files at destination allowed
- [ ] Package tests cover success, collision fail-before-IO, cycle rejection, all-or-nothing folder move
