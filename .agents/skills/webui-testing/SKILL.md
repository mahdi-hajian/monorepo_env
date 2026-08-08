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

## Instructions

- Public behavior only; one `expect` per behavior; AAA; `data-testid`.
- For `iap/**` specs, also load [`iap-unit-test-run`](../iap-unit-test-run/SKILL.md) and run the required Karma command after edits.
