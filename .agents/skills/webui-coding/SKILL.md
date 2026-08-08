---
name: webui-coding
description: >-
  WebUI shared Angular/TypeScript coding principles (convention.md + coding-principles).
  Use automatically whenever writing or editing frontend code under Web/WebUI
  (*.ts, *.html, *.scss) that is not a Cypress file.
---

# WebUI coding

**Canonical sources (read in full before coding):**

1. [`Web/WebUI/convention.md`](../../../Web/WebUI/convention.md)
2. [`Web/WebUI/.agents/RULES/coding/coding-principles.md`](../../../Web/WebUI/.agents/RULES/coding/coding-principles.md)

## Instructions

- Apply scaffolding rules (co-located `*.spec.ts` for every new unit).
- Constructor DI, Termeh wrappers, Signals/`input()`/`output()`, `data-testid`, no drive-by NgModule migrations.
- For `iap/**` LAP/visualizer work, also read [`iap-lap-coding`](../iap-lap-coding/SKILL.md).
- For visualizer plugins, also read [`iap-plugin-architecture-frontend`](../iap-plugin-architecture-frontend/SKILL.md).
