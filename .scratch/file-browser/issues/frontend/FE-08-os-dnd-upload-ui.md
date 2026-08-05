# FE-08 — OS drag-and-drop upload UI

**Layer:** frontend  
**What to build:** OS drop onto list (both views) → current browse path only. Same rules as toolbar file/folder upload. Internal move drag still disabled. Shell intent / host IO. No new backend API.

**Blocked by:** FE-05; FE-06; FE-07

**Status:** ready-for-agent

**Wave:** 7  
**Domain:** CONTEXT Phase 6; ADR 0010

- [ ] Drop onto list uploads to current browse path only (not onto folder tile)
- [ ] File/folder drops reuse toolbar rules including collision validation
- [ ] Internal item drag for move remains disabled
- [ ] No Graph DnD upload entry
