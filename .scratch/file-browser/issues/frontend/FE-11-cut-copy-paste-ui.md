# FE-11 — Cut / copy / paste UI

**Layer:** frontend  
**What to build:** Multi-select Cut/Copy/Paste in both views; internal tab-session clipboard; paste to current browse path only. Host calls `BE-07` for Document IO; session empty handled in session when applicable. Clipboard clear/keep rules per domain.

**Blocked by:** FE-06; FE-09; BE-07

**Status:** ready-for-agent

**Wave:** 10 (after `BE-07`)  
**Domain:** CONTEXT Phase 9; ADR 0012

- [ ] Multi-select Cut/Copy/Paste in grid and tile; internal clipboard
- [ ] Paste to current browse path only (not onto folder tile)
- [ ] Host uses BE-07 for binary copy / relocate; collision validated before paste IO
- [ ] Cut+Paste clears clipboard; Copy+Paste keeps it; session empty supported
- [ ] No destination modal
- [ ] Do not start until BE-07 is done
