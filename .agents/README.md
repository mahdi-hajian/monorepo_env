# `.agents` — analytics workspace agent skills

Skills are **manual** (`disable-model-invocation: true`). Invoke with `@skill-name`.  
**Tests:** run only when the user explicitly asks.  
Routing index: [`../AGENTS.md`](../AGENTS.md)

One rule routes everything: [`.cursor/rules/agent-routing.mdc`](../.cursor/rules/agent-routing.mdc) → docs under `MicroService.IAP/.../.cursor/docs/`.

**When to add a rule vs a skill:** [`skills/rules-vs-skills/SKILL.md`](skills/rules-vs-skills/SKILL.md) (`@rules-vs-skills`). Skill craft: [`skills/writing-great-skills/SKILL.md`](skills/writing-great-skills/SKILL.md).

## C#

C# conventions are **docs** (not skills): `csharp-code-style`, `csharp-test-style`, `lap-fluent-validation`, `lap-language-dictionary`.

| Skill | When to invoke |
|-------|----------------|
| [`build-project`](skills/build-project/SKILL.md) | `dotnet build` |
| [`run-unit-tests`](skills/run-unit-tests/SKILL.md) | `dotnet test` |
| [`lap-feature-flag`](skills/lap-feature-flag/SKILL.md) | Config toggles / `IOptions<T>` |
| [`lap-feature-flag-docs`](skills/lap-feature-flag-docs/SKILL.md) | Admin docs for flags |
| [`azure-devops-pr-followup`](skills/azure-devops-pr-followup/SKILL.md) | Fix ADO PR comments (IAP) |
| [`azure-devops-pr-resolve`](skills/azure-devops-pr-resolve/SKILL.md) | Resolve ADO threads only |
| [`lap-pr-action`](skills/lap-pr-action/SKILL.md) | IAP branch vs master → HTML RTL PR summary |
| [`lap-test-master`](skills/lap-test-master/SKILL.md) | Write/update LAP tests for branch vs master |
| [`lap-test-uncommited`](skills/lap-test-uncommited/SKILL.md) | Write/update LAP tests for uncommitted changes |

## WebUI

Canonical content lives under `Web/WebUI/.agents/`. These skills are entrypoints:

| Skill | When to invoke |
|-------|----------------|
| [`webui-coding`](skills/webui-coding/SKILL.md) | `Web/WebUI` TS/HTML/SCSS |
| [`webui-testing`](skills/webui-testing/SKILL.md) | `*.spec.ts` |
| [`webui-cypress`](skills/webui-cypress/SKILL.md) | `*.cy.ts` |
| [`iap-lap-coding`](skills/iap-lap-coding/SKILL.md) | `iap/**` LAP / explore |
| [`iap-plugin-architecture-frontend`](skills/iap-plugin-architecture-frontend/SKILL.md) | Visualizer plugins |
| [`iap-unit-test-run`](skills/iap-unit-test-run/SKILL.md) | Run `iap` Karma specs |
| [`add-web-feature-flag`](skills/add-web-feature-flag/SKILL.md) | New `web.uiconfig` flag |
| [`document-web-feature-flag`](skills/document-web-feature-flag/SKILL.md) | Document web flag |
| [`iap-ogma-decoupling`](skills/iap-ogma-decoupling/SKILL.md) | Ogma decoupling plan |
| [`iap-branch-change-html-doc`](skills/iap-branch-change-html-doc/SKILL.md) | Branch HTML doc |
| [`farsi-rtl-output`](skills/farsi-rtl-output/SKILL.md) | Persian RTL replies |
| [`web-azure-devops-pr-followup`](skills/web-azure-devops-pr-followup/SKILL.md) | ADO PR on **Web** repo |
| [`web-pr-action`](skills/web-pr-action/SKILL.md) | WebUI branch vs master → HTML RTL PR summary |
| [`web-test-master`](skills/web-test-master/SKILL.md) | Write/update WebUI tests for branch vs master |
