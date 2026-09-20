---
name: webui-testing
description: >-
  WebUI Jasmine + TestBed unit-test workflow and writing principles. Use
  automatically when writing or editing Web/WebUI/**/*.spec.ts files.
---

# WebUI unit testing

**Canonical sources (read in this order):**

1. [`Web/WebUI/.agents/RULES/testing/tests-authoring-workflow.md`](../../../Web/WebUI/.agents/RULES/testing/tests-authoring-workflow.md)
2. [`Web/WebUI/.agents/RULES/testing/tests-writing-principles.md`](../../../Web/WebUI/.agents/RULES/testing/tests-writing-principles.md)
3. For `iap/**` only: [`Web/WebUI/.agents/IMAP/ADDITIONAL-RULES/testing/imap-testing-rules.md`](../../../Web/WebUI/.agents/IMAP/ADDITIONAL-RULES/testing/imap-testing-rules.md)

## Instructions

- Public behavior only; one `expect` per behavior; AAA; `data-testid`.
- For `iap/**` specs, also load IMAP `imap-testing-rules.md` and [`iap-unit-test-run`](../iap-unit-test-run/SKILL.md), then run the required Karma command after edits.
