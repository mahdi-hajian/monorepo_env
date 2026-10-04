---
name: rules-vs-skills
description: >-
  Decide and author Cursor rules vs skills (and docs/RULES) for this workspace.
  Use when adding or migrating .mdc rules, SKILL.md files, slash commands, or
  asking what should be a rule vs a skill.
disable-model-invocation: true
---

# Rules vs skills

Cursor split: **rules** = always-on (or path-scoped) constraints; **skills** = on-demand multi-step workflows. Official migrate hint: dynamic "Apply Intelligently" rules and slash commands → skills; keep `alwaysApply` and `globs` rules as rules.

For skill *quality* after you choose skill, also read [`writing-great-skills`](../writing-great-skills/SKILL.md).

## Decision test

Ask in order:

1. **Must this bind every turn (or every matching file) without `@`?** → **Rule**
2. **Is it a short constraint / convention (not a procedure)?** → **Rule** (`alwaysApply` or `globs`)
3. **Is it a multi-step workflow, checklist, or occasional task?** → **Skill**
4. **Is it a long style/reference body loaded only when coding that area?** → **Doc / RULES scope** (not always-on rule; not a fat skill body). Point at it from a thin rule or thin skill wrapper.

```text
every turn / matching files + short  →  .cursor/rules/*.mdc
long reference for a domain          →  docs/ or .agents/RULES/ (+ thin pointer)
repeatable procedure / command       →  **/skills/<name>/SKILL.md
```

## What must stay a rule

Write `.mdc` under `.cursor/rules/` when:

| Kind | Frontmatter | Examples in this workspace |
|------|-------------|----------------------------|
| Always-on guardrail | `alwaysApply: true` | Build/test only when user asks; terminal log discipline; Persian RTL |
| Thin router | `alwaysApply: true` | `agent-routing.mdc` → which doc/skill to open |
| Path-scoped convention | `globs:` + `alwaysApply: false` | Short rules that apply only for `**/*Tests.cs`, `**/*.ts`, etc. |

**Rule shape:** keep the `.mdc` body short. Put long checklists behind a pointer (doc or skill). One meaning → one source of truth.

**Do not** put 100+ line style guides in `alwaysApply` rules.

## What must be a skill

Write `SKILL.md` under `.agents/skills/` or nested `.cursor/skills/` when:

| Kind | Invocation | Examples |
|------|------------|----------|
| Multi-step workflow | Usually `disable-model-invocation: true` here | `build-project`, `lap-feature-flag`, `azure-devops-pr-followup` |
| Slash-command replacement | `disable-model-invocation: true` | PR HTML summaries, DAP chart/dashboard flows |
| Domain procedure with scripts / reference files | Manual unless another skill must reach it | Feature-flag docs with `reference/` |

**Skill shape:** steps with checkable completion criteria; progressive disclosure to sibling `.md` files; no duplication of rule/doc bodies — **point**, don't copy.

Default in this workspace: **`disable-model-invocation: true`** (manual `@skill-name`). Omit only when the agent must auto-discover the skill.

## Docs / RULES (middle layer)

This monorepo uses a third home — not a Cursor `.mdc`, not a full skill body:

| Home | Use for | Loaded by |
|------|---------|-----------|
| `MicroService.IAP/.../.cursor/docs/` | C# conventions | `agent-routing` → open matching doc before coding |
| `Web/WebUI/.agents/RULES/<scope>/` | Shared coding / testing / integration workflows | `skills-lock.json` scopes + thin skills (`webui-coding`, `webui-testing`, …) |
| `Web/WebUI/.agents/<TEAM>/ADDITIONAL-RULES/` | Team overlays | Context lock after team keyword |

**Do not** convert these wholesale into skills. Prefer thin skill **wrappers** that list canonical paths to read (see `webui-coding`).

## Migrate / do-not-migrate

| From | To | Notes |
|------|----|-------|
| Slash command (`.cursor/commands/*.md`) | Skill, `disable-model-invocation: true` | Preserve explicit invoke |
| "Apply Intelligently" rule (no globs, not alwaysApply) | Skill | Cursor `/migrate-to-skills` target |
| `alwaysApply: true` rule | **Stay rule** | |
| Rule with `globs` | **Stay rule** | |
| Fat alwaysApply style guide | Thin rule/router + doc or skill | Cut context load |
| Duplicated text in rule + skill | Single canonical file + pointers | |

## Authoring checklist

When adding guidance, complete every item:

- [ ] Chose **rule / skill / doc|RULES** via the decision test above
- [ ] Canonical home matches area: C# → `MicroService.IAP/.../.cursor/`; WebUI → `Web/WebUI/.agents/`; analytics root only for **routing** and thin skill entrypoints
- [ ] No second copy of the same rules elsewhere
- [ ] If skill: `name` kebab-case; `description` present; `disable-model-invocation: true` unless auto-invoke is required
- [ ] If rule: prefer thin body; set `alwaysApply` or `globs` explicitly
- [ ] Index updated: root [`AGENTS.md`](../../../AGENTS.md) and/or area `AGENTS.md` / `.agents/README.md`

## Anti-patterns

- RTL / "don't run tests unless asked" only as a user-invoked skill → forgotten when not `@`'d
- Entire C# or Angular guide pasted into `alwaysApply`
- Skill that restates a RULES/doc file instead of linking it
- New alwaysApply rule that only names a workflow → make a skill; keep router one-liners in `agent-routing`
