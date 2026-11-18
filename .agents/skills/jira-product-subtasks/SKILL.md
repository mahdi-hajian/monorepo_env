---
name: jira-product-subtasks
description: >-
  Write and update TECSDM/Jira Sub-task text in plain Persian product language
  with clear Definition of Done. Use when creating or rewriting Jira Subtasks,
  publishing /to-tickets to Jira, or when the user asks for محصولی Jira /
  DoD شفاف / کمتر فنی on tickets.
disable-model-invocation: true
---

# Jira product Sub-tasks (Persian)

Audience for Jira body: **PM / QA / humans on the board**, not implementers reading the codebase.

Local `.scratch/.../issues/*.md` may stay more technical. **Jira description must be product-first.**

Also follow `docs/agents/issue-tracker.md` (plain Persian Markdown, no HTML/`dir=rtl`, Sub-task under parent, labels).

## When publishing Sub-tasks

1. Write/approve local tickets first.
2. Create/update Jira via Docker MCP Atlassian (`jira_create_issue` / `jira_update_issue`). TECSDM Sub-task needs Chapter (`customfield_18502` as multi-select, e.g. `[{ "value": "TD" }]`) plus `parent` and labels.
3. Put **product** copy in Jira; keep file paths / API / class names out of the Jira body (link local scratch path only if useful, one line).

## Jira body template (every Sub-task)

Use this structure in the description (Persian):

```markdown
## هدف کاربر
[What the user/product person cares about — outcome, not how we build it]

## چه چیزی تحویل می‌شود
[Demoable / verifiable behaviour after this ticket alone]

## خارج از این تیکت
[Explicit non-goals]

## وابستگی
[None / or sibling Jira keys in product words]

## Definition of Done
- [ ] [Observable check a QA can do without reading code]
- [ ] …
```

## Summary (title) rules

- Prefer user/product wording: «راست‌کلیک جدول اسناد»، «لیست سرویس داده»، «مثل گراف».
- Avoid stack jargon in the title: AG Grid, Termeh, mapper, facade, `menuExecutePlugin`, Host nested menu, async Promise, …
- Numbering `01 —` / `02 —` is fine.

## DoD rules

Each DoD item must be:

- **Observable** from the product UI or an agreed manual scenario
- **Binary** (pass/fail)
- Free of implementation verbs («refactor»، «extract»، «wire»، «provider»)

Good: «Ribbon همچنان صفحهٔ کامل انتخاب سرویس را باز می‌کند»  
Bad: «LoadServiceSelectionStrategyFactory مشترک شود»

## Language rules

- Plain Persian Markdown (headings, lists, backticks only for rare product names the board already uses).
- Keep issue keys (`TECSDM-…`) and product terms from `CONTEXT.md` / glossary when they are **user-facing** (سرویس داده، Parameters-only as «فقط فرم پارامترها» if clearer).
- Do **not** paste architecture essays, file trees, or class lists into Jira.

## Split of concerns

| Place | Tone |
|-------|------|
| Jira Sub-task | Product + DoD |
| `.scratch/.../issues/*.md` | May include technical “What to build” for agents |
| `spec.md` / ADR | Full technical decisions |

When rewriting existing Jira tickets after a “too technical” complaint: **update Jira first**, then optionally soften local issue titles to match; do not delete technical acceptance detail from local files if agents still need it—move it under a short `## Notes for agent` locally only.

## Quick anti-patterns

- Jira body that is a dump of the local technical ticket
- DoD = “unit tests pass” with no user-visible check
- Mixing tile + grid + Termeh migration into one Sub-task without saying so in «خارج از این تیکت»
