# BE-08 — FileBrowser grid Schema and Data

**Layer:** backend  
**What to build:** FileBrowser Schema and Data contracts for FileBrowser grid. Schema = every Document attribute in the current DataModel (including FilePath, FileContent, extras) with titles, types, display sizes, Hidden/Normal/Wrap/Preview; display sizes from files at the browse path of the first Schema fetch, frozen until tab close/full refresh or Document attribute-set change; no counts on Schema. Data = mixed folders-then-files window with filter/sort via the visualizer Grid engine (not Explore as list API); default file order by name; Name filter also applies to folder display names; other attribute filters files-only; totalCount = folders + files after filter. Binary FileContent uses the same sort/filter key as visualizer Grid.

**Blocked by:** BE-01; BE-04

**Status:** ready-for-agent

**Wave:** 11  
**Domain:** CONTEXT FileBrowser grid / FileBrowser grid filter and sort; phase 10; ADR 0014

- [ ] Schema lists every current Document attribute including FilePath, FileContent, and extra attributes
- [ ] Schema has no totalCount; display sizes from first Schema browse-path files; freeze/invalidation rules as ADR 0014
- [ ] Data mixed window: folders then files; from/size; totalCount = folders + files
- [ ] Filter/sort reuse visualizer Grid engine; no Explore package as list API; default file sort by name
- [ ] Name filter applies to Virtual Folder names; other attribute filters files only
- [ ] Package tests at Schema/Data seam (same style as LoadListFiles package tests)
