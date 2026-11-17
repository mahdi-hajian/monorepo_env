# 02: View Graph overlay + mapper + toolbar entry

**What to build:** From Data Model Design (entities, links, or attributes), the toolbar opens View Graph as a fullscreen overlay on the current page. The preview is built on the client from the in-memory editor model (including unsaved edits). **بازگشت** closes the overlay and tears down the graph engine. Toolbar copy is View Graph / مشاهده گراف (no immediate ZIP download on that control).

**Blocked by:** 01 — OntologyGraphManager library

**Status:** done

**Jira:** TECSDM-159414

- [x] Toolbar on entities/links/attributes opens the same View Graph overlay instead of downloading a ZIP.
- [x] Overlay is fullscreen (not a modal dialog) and does not use a separate route.
- [x] Preview reflects current in-memory Data Model Design state, including unsaved changes.
- [x] Domain mapper in `dm` feeds OntologyGraphManager; missing icon URLs do not crash the overlay.
- [x] **بازگشت** closes the overlay and disposes the engine; Escape does not close.
- [x] Façade-level tests cover open → preview payload from editor state → close/dispose.
