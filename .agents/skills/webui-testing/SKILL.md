---
name: webui-testing
description: WebUI Jasmine + TestBed unit-test workflow + writing principles.
disable-model-invocation: false
---

# WebUI unit testing

**Main sources. Read in this order:**

1. [`Web/WebUI/.agents/RULES/testing/tests-authoring-workflow.md`](../../../Web/WebUI/.agents/RULES/testing/tests-authoring-workflow.md)
2. [`Web/WebUI/.agents/RULES/testing/tests-writing-principles.md`](../../../Web/WebUI/.agents/RULES/testing/tests-writing-principles.md) — **Standalone SUT + non-standalone child → `MockModule`**; hand stubs **only** for template/`TemplateRef` rendering
3. Only for `iap/**`: [`Web/WebUI/.agents/IMAP/ADDITIONAL-RULES/testing/imap-testing-rules.md`](../../../Web/WebUI/.agents/IMAP/ADDITIONAL-RULES/testing/imap-testing-rules.md)

## Instructions

- Test public behavior only. One `expect` per behavior. AAA. Use `data-testid`.
- Standalone SUT depending on a non-standalone (NgModule) child: import `MockModule(ChildModule)` via ng-mocks — not `MockComponent(ChildComponent)` and not a local empty stub.
- Hand-written stubs only when the child must render a template (`TemplateRef` / `ng-content`). Plain Input/Output → ng-mocks only.
- `iap/**` specs: also load IMAP `imap-testing-rules.md`. To **run** Karma, use [`iap-unit-test-run`](../iap-unit-test-run/SKILL.md) **only** when user explicitly asks.