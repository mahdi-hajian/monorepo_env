# `.agents` — analytics workspace agent skills

Skills default **manual** (`disable-model-invocation: true`); invoke with `@skill-name`.  
**Model-invoked** stubs — Web: `farsi-rtl-output`, `iap-unit-test-run`, `iap-lap-coding`, `iap-plugin-architecture-frontend`, `add-web-feature-flag`, `webui-coding`, `webui-testing`.  
IAP: `farsi-rtl-output`, `lap-fluent-validation`, `lap-language-dictionary`, `lap-feature-flag`, `build-project`, `run-unit-tests`.  
**LAP `dotnet test` / build run:** only when user explicitly ask (IAP Karma follow `iap-unit-test-run`).  
Routing index: [`../AGENTS.md`](../AGENTS.md)

One rule route everything: [`.cursor/rules/agent-routing.mdc`](../.cursor/rules/agent-routing.mdc) → docs under `MicroService.IAP/.../.cursor/docs/`.

Skill craft: [`skills/writing-great-skills/SKILL.md`](skills/writing-great-skills/SKILL.md).

## C#

C# style convention be **docs**: `csharp-code-style`, `csharp-test-style`, and siblings. Validation / i18n workflow be **skills** that point at those docs.

| Skill | When to invoke |
|-------|----------------|
| [`build-project`](skills/build-project/SKILL.md) | `dotnet build` |
| [`run-unit-tests`](skills/run-unit-tests/SKILL.md) | `dotnet test` |
| [`lap-feature-flag`](skills/lap-feature-flag/SKILL.md) | Config toggles / `IOptions<T>` |
| [`lap-feature-flag-docs`](skills/lap-feature-flag-docs/SKILL.md) | Admin docs for flags |
| [`lap-fluent-validation`](skills/lap-fluent-validation/SKILL.md) | FluentValidation / `IValidator<T>` |
| [`lap-language-dictionary`](skills/lap-language-dictionary/SKILL.md) | Translations / dictsource / fa-IR |
| [`azure-devops-pr-followup`](skills/azure-devops-pr-followup/SKILL.md) | Fix ADO PR comment (IAP) |
| [`azure-devops-pr-resolve`](skills/azure-devops-pr-resolve/SKILL.md) | Resolve ADO threads only |
| [`lap-pr-action`](skills/lap-pr-action/SKILL.md) | IAP branch vs master → HTML RTL PR summary |

## WebUI

Canonical content live under `Web/WebUI/.agents/`. These skills be entrypoints:

| Skill | When to invoke |
|-------|----------------|
| [`webui-coding`](skills/webui-coding/SKILL.md) | `Web/WebUI` TS/HTML/SCSS |
| [`webui-testing`](skills/webui-testing/SKILL.md) | `*.spec.ts` |
| [`iap-lap-coding`](skills/iap-lap-coding/SKILL.md) | `iap/**` LAP / explore |
| [`iap-plugin-architecture-frontend`](skills/iap-plugin-architecture-frontend/SKILL.md) | Visualizer plugins |
| [`iap-unit-test-run`](skills/iap-unit-test-run/SKILL.md) | Run `iap` Karma specs |
| [`add-web-feature-flag`](skills/add-web-feature-flag/SKILL.md) | New `web.uiconfig` flag |
| [`document-web-feature-flag`](skills/document-web-feature-flag/SKILL.md) | Document web flag |
| [`iap-ogma-decoupling`](skills/iap-ogma-decoupling/SKILL.md) | Ogma decoupling plan |
| [`iap-branch-change-html-doc`](skills/iap-branch-change-html-doc/SKILL.md) | Branch HTML doc |
| [`farsi-rtl-output`](skills/farsi-rtl-output/SKILL.md) | Persian RTL replies (every heading/paragraph/list, not only opener) |
| [`web-azure-devops-pr-followup`](skills/web-azure-devops-pr-followup/SKILL.md) | ADO PR on **Web** repo |
| [`web-pr-action`](skills/web-pr-action/SKILL.md) | WebUI branch vs master → HTML RTL PR summary |