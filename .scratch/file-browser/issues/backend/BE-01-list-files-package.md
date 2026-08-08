# BE-01 — FileBrowser ListFiles package

**Layer:** backend  
**What to build:** Dedicated FileBrowser visualizer package can return a paged flat list of all Documents on the current tab (including Fade’d), sorted by name, with id / name←Name / extension←Extension / size←Length. Membership ignores Selected scope. No Explore package APIs.

**Blocked by:** None — can start immediately.

**Status:** done

**Wave:** 1 (before `FE-02`)  
**Domain:** CONTEXT Phase 1 browse / File list item; ADR 0002

- [x] FileBrowser backend package exists and does not call Explore package methods
- [x] ListFiles supports `from`/`size` + total count; default order by name
- [x] Membership = all Documents on current tab including Fade’d; selection ignored
- [x] Fields: instanceId (tab Document identity / BaseInstance.Guid), name, extension, size; empty Name/Extension/Length pass through
- [x] Package tests (BaseVisualizerTests-style) lock membership and list contract
