# FE-10 — Rename modal UI

**Layer:** frontend  
**What to build:** Single-item Rename modal (grid+tile). File → Name-only intent to `BE-06`. Virtual folder → prefix rename via BE. Session empty → session-only. FE collision check + always rely on BE collision. Shared library validator.

**Blocked by:** FE-06; BE-06

**Status:** ready-for-agent

**Wave:** 9 (after `BE-06`)  
**Domain:** CONTEXT Phase 8; ADR 0013

- [ ] Rename modal for exactly one selected item in both views
- [ ] File rename does not edit Extension in UI contract
- [ ] Session empty rename is session-only; Virtual uses BE
- [ ] FE validates collision; BE remains authoritative
- [ ] Do not start until BE-06 is done
