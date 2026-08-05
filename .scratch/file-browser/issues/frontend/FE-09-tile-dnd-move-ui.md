# FE-09 — Tile drag-and-drop move UI

**Layer:** frontend  
**What to build:** Tile-only DnD move onto folder tile; shell emits move intent; host calls `BE-05`. No move modal. Align session empty paths after folder move success. Stay on current level.

**Blocked by:** FE-06; BE-05

**Status:** ready-for-agent

**Wave:** 8 (after `BE-05`)  
**Domain:** CONTEXT Phase 7; ADR 0011

- [ ] Tile-only; drop only on folder tile; reject self/descendant in UI
- [ ] Host calls BE move; collision errors surfaced; stay on level
- [ ] Session empty paths aligned after successful folder move
- [ ] No move modal / Move menu; grid has no internal move DnD
- [ ] Do not start until BE-05 is done
