# 04: Get Graph next to View Graph toolbar

**What to build:** Next to the toolbar **View Graph / مشاهده گراف** control, an arrow popup offers **Get Graph / دریافت گراف** and downloads the persisted Graph Export Package via existing backend ExportGraph (saved ontology only)—not the unsaved preview state. Do **not** put Get Graph on the View Graph overlay chrome (Figma overlay shows layout + search + بستن only).

**Blocked by:** 02 — View Graph overlay + mapper + toolbar entry

**Status:** done

**Jira:** TECSDM-159417

- [x] Get Graph is available from an arrow popup beside the View Graph toolbar button.
- [x] Overlay chrome does not host Get Graph / download.
- [x] Download uses existing ExportGraph + file download flow for the persisted model.
- [x] Façade/tests show Get Graph does not require preview≈ZIP when unsaved edits exist.
