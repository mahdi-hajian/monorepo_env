# FE-05 — Async upload panel and cancel

**Layer:** frontend  
**What to build:** Replace FileBrowser blocking spinner with async queue (progress/cancel). Uploads survive leaving FileBrowser in the same tab. Cancel aborts upload / drops queued; does not cancel mid-create. List refresh once at batch end. No new backend API. Graph stays sync.

**Blocked by:** FE-04

**Status:** ready-for-agent

**Wave:** 4  
**Domain:** CONTEXT Phase 3; ADR 0006

- [ ] FileBrowser-only upload panel with progress and cancel
- [ ] Leaving FileBrowser within tab does not cancel in-flight uploads; panel restores on return
- [ ] Cancel = abort upload / drop queued; not mid Document-create
- [ ] Single list refresh when batch has no in-flight work; no domain concurrency cap
- [ ] Tab-scoped session queue state
