---
name: webui-testing
description: WebUI Jasmine + TestBed unit-test workflow and writing principles.
disable-model-invocation: false
---

# WebUI unit testing

**Canonical sources (read in this order):**

1. [`Web/WebUI/.agents/RULES/testing/tests-authoring-workflow.md`](../../../Web/WebUI/.agents/RULES/testing/tests-authoring-workflow.md)
2. [`Web/WebUI/.agents/RULES/testing/tests-writing-principles.md`](../../../Web/WebUI/.agents/RULES/testing/tests-writing-principles.md)
3. For `iap/**` only: [`Web/WebUI/.agents/IMAP/ADDITIONAL-RULES/testing/imap-testing-rules.md`](../../../Web/WebUI/.agents/IMAP/ADDITIONAL-RULES/testing/imap-testing-rules.md)

## Instructions

- Public behavior only; one `expect` per behavior; AAA; `data-testid`.
- For `iap/**` specs, also load IMAP `imap-testing-rules.md`. To **run** Karma, use [`iap-unit-test-run`](../iap-unit-test-run/SKILL.md) **only** when the user explicitly asks to run tests.
