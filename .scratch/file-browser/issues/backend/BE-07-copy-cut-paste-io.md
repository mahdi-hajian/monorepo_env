# BE-07 — Copy / cut / paste IO

**Layer:** backend  
**What to build:** Host-facing FileBrowser operations for paste: **Copy** creates new Documents with **copied binary** content and destination FilePaths (folder copy recreates tree). **Cut** relocates like move (FilePath rewrite / folder prefix). Paste destination is a browse path supplied by the client (current path). Folder destination collision validated for all folder items before Paste IO. Copy multi = partial success per file; each Cut folder = all-or-nothing. No Attach on copied Documents (FileBrowser placement rules).

**Blocked by:** BE-04; BE-05 (cut reuses move semantics)

**Status:** ready-for-agent

**Wave:** 10 (before `FE-11`)  
**Domain:** CONTEXT Phase 9 cut/copy/paste; ADR 0012

- [ ] Copy creates new Documents with binary copy and destination FilePaths; folder recreates tree
- [ ] Cut relocates via FilePath / prefix rewrite (all-or-nothing per cut folder)
- [ ] Folder destination collision validated for all folder items before paste IO starts
- [ ] Copy multi allows partial success; no Attach on FileBrowser copies
- [ ] Package tests cover copy-vs-cut, collision pre-check, and partial copy success
