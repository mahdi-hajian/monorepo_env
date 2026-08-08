# `.agents` — analytics workspace agent skills

Skills for agents in this monorepo. Full routing index: [`../AGENTS.md`](../AGENTS.md)

## C# — use automatically

| Skill | When |
|-------|------|
| [`csharp-code-style`](skills/csharp-code-style/SKILL.md) | Production `*.cs` |
| [`csharp-test-style`](skills/csharp-test-style/SKILL.md) | `*Tests.cs` / `LAP.Tests` |
| [`build-project`](skills/build-project/SKILL.md) | `dotnet build` |
| [`run-unit-tests`](skills/run-unit-tests/SKILL.md) | `dotnet test` |
| [`lap-feature-flag`](skills/lap-feature-flag/SKILL.md) | Config toggles / `IOptions<T>` |
| [`lap-feature-flag-docs`](skills/lap-feature-flag-docs/SKILL.md) | Admin docs for flags |
| [`azure-devops-pr-followup`](skills/azure-devops-pr-followup/SKILL.md) | Fix ADO PR comments (IAP) |
| [`azure-devops-pr-resolve`](skills/azure-devops-pr-resolve/SKILL.md) | Resolve ADO threads only |

Cursor rules: `.cursor/rules/csharp-*.mdc`

## WebUI frontend — use automatically

Canonical content lives under `Web/WebUI/.agents/`. These skills are entrypoints:

| Skill | When |
|-------|------|
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

Cursor rules: `.cursor/rules/webui-frontend-*.mdc`
