# 04: Get Graph on View Graph overlay

**What to build:** On the View Graph overlay, an arrow popup offers Get Graph / دریافت گراف and downloads the persisted Graph Export Package via existing backend ExportGraph (saved ontology only)—not the unsaved preview state.

**Blocked by:** 02 — View Graph overlay + mapper + toolbar entry

**Status:** ready-for-agent

**Jira:** TECSDM-159417

- [ ] Get Graph is available from the overlay via arrow popup (not from the design-page toolbar as immediate download).
- [ ] Download uses existing ExportGraph + file download flow for the persisted model.
- [ ] Façade/tests show Get Graph does not require preview≈ZIP when unsaved edits exist.
