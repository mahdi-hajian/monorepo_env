---
name: webui-testing
description: WebUI Jasmine + TestBed unit-test workflow + writing principles.
disable-model-invocation: false
---

# WebUI unit testing

**Main sources. Read in this order:**

1. [`Web/WebUI/.agents/RULES/testing/tests-authoring-workflow.md`](../../../Web/WebUI/.agents/RULES/testing/tests-authoring-workflow.md)
2. [`Web/WebUI/.agents/GLOBAL/SKILLS/tests-writing-principles/SKILL.md`](../../../Web/WebUI/.agents/GLOBAL/SKILLS/tests-writing-principles/SKILL.md)
3. Only for `iap/**`: [`Web/WebUI/.agents/IMAP/ADDITIONAL-RULES/testing/imap-testing-rules.md`](../../../Web/WebUI/.agents/IMAP/ADDITIONAL-RULES/testing/imap-testing-rules.md)

## Instructions

- Test public behavior only. One `expect` per behavior. AAA. Use `data-testid`.
- `iap/**` specs: also load IMAP `imap-testing-rules.md`. To **run** Karma, use [`iap-unit-test-run`](../iap-unit-test-run/SKILL.md) **only** when user explicitly asks.