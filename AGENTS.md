# Agent instructions (analytics workspace)

When working on **C# / MicroService.IAP / LAP** or **WebUI frontend**, follow the standards and skills below automatically. Do not wait for the user to `@`-mention them.

## Auto-apply for C#

| Context | Apply |
|---------|--------|
| Production `*.cs` | Cursor rule [`.cursor/rules/csharp-code-style.mdc`](.cursor/rules/csharp-code-style.mdc) + skill [`.agents/skills/csharp-code-style/SKILL.md`](.agents/skills/csharp-code-style/SKILL.md) |
| Test `*Tests.cs` / `LAP.Tests` | Cursor rule [`.cursor/rules/csharp-test-style.mdc`](.cursor/rules/csharp-test-style.mdc) + skill [`.agents/skills/csharp-test-style/SKILL.md`](.agents/skills/csharp-test-style/SKILL.md) |

**IAP project root:** `MicroService.IAP/MicroService.IAP` (SDK 8.0.x). Prefer `--no-restore` for `dotnet build` / `dotnet test`.

## Auto-apply for WebUI frontend

| Context | Apply |
|---------|--------|
| `Web/WebUI/**/*.ts` (production) | [`.cursor/rules/webui-frontend-coding.mdc`](.cursor/rules/webui-frontend-coding.mdc) → read `convention.md` + coding RULES + [`webui-coding`](.agents/skills/webui-coding/SKILL.md) |
| `Web/WebUI/**/*.html` | [`.cursor/rules/webui-frontend-html.mdc`](.cursor/rules/webui-frontend-html.mdc) |
| `Web/WebUI/**/*.spec.ts` | [`.cursor/rules/webui-frontend-testing.mdc`](.cursor/rules/webui-frontend-testing.mdc) → [`webui-testing`](.agents/skills/webui-testing/SKILL.md) |
| `Web/WebUI/**/*.cy.ts` | [`.cursor/rules/webui-frontend-cypress.mdc`](.cursor/rules/webui-frontend-cypress.mdc) → [`webui-cypress`](.agents/skills/webui-cypress/SKILL.md) |

**Canonical bodies** stay under `Web/WebUI/.agents/` (RULES + IMAP skills). Root `.agents/skills/*` are thin wrappers that point there.

**WebUI root:** `Web/WebUI`. Nested routing: [`Web/WebUI/AGENTS.md`](Web/WebUI/AGENTS.md).

### Frontend skills usage guide

When the prompt matches a trigger, **read the full skill / canonical file before acting**.

| Skill | Trigger | Path |
|-------|---------|------|
| `webui-coding` | Any WebUI TS/HTML/SCSS coding | `.agents/skills/webui-coding/SKILL.md` |
| `webui-testing` | WebUI `*.spec.ts` | `.agents/skills/webui-testing/SKILL.md` |
| `webui-cypress` | WebUI `*.cy.ts` | `.agents/skills/webui-cypress/SKILL.md` |
| `iap-lap-coding` | `iap/**` visualizer / explore / AG Grid | `.agents/skills/iap-lap-coding/SKILL.md` |
| `iap-plugin-architecture-frontend` | Visualizer plugins / MountPoint | `.agents/skills/iap-plugin-architecture-frontend/SKILL.md` |
| `iap-unit-test-run` | Add/edit `iap/**/*.spec.ts` | `.agents/skills/iap-unit-test-run/SKILL.md` |
| `add-web-feature-flag` | New `web.uiconfig` flag | `.agents/skills/add-web-feature-flag/SKILL.md` |
| `document-web-feature-flag` | Document web feature flag | `.agents/skills/document-web-feature-flag/SKILL.md` |
| `iap-ogma-decoupling` | Ogma decoupling plan phases | `.agents/skills/iap-ogma-decoupling/SKILL.md` |
| `iap-branch-change-html-doc` | Branch changes → HTML doc | `.agents/skills/iap-branch-change-html-doc/SKILL.md` |
| `farsi-rtl-output` | Persian / RTL replies | `.agents/skills/farsi-rtl-output/SKILL.md` |
| `web-azure-devops-pr-followup` | ADO PR on **Web** repo | `.agents/skills/web-azure-devops-pr-followup/SKILL.md` |

Canonical RULES:

- `Web/WebUI/.agents/RULES/coding/coding-principles.md`
- `Web/WebUI/.agents/RULES/testing/tests-authoring-workflow.md`
- `Web/WebUI/.agents/RULES/testing/tests-writing-principles.md`
- `Web/WebUI/.agents/RULES/cypress/cypress-writing-principles.md`

## Skills usage guide (C# / LAP)

| Skill | Trigger | Path |
|-------|---------|------|
| `csharp-code-style` | Production C# | `.agents/skills/csharp-code-style/SKILL.md` |
| `csharp-test-style` | C# unit tests | `.agents/skills/csharp-test-style/SKILL.md` |
| `build-project` | Build / compile | `.agents/skills/build-project/SKILL.md` |
| `run-unit-tests` | Run LAP.Tests | `.agents/skills/run-unit-tests/SKILL.md` |
| `lap-feature-flag` | Backend `Enable*` / `IOptions<T>` | `.agents/skills/lap-feature-flag/SKILL.md` |
| `lap-feature-flag-docs` | Document backend flag | `.agents/skills/lap-feature-flag-docs/SKILL.md` |
| `azure-devops-pr-followup` | ADO PR on **MicroService.IAP** | `.agents/skills/azure-devops-pr-followup/SKILL.md` |
| `azure-devops-pr-resolve` | Resolve IAP PR threads only | `.agents/skills/azure-devops-pr-resolve/SKILL.md` |

## Related docs

- Visualizer backend: `MicroService.IAP/MicroService.IAP/MicroService.IAP/Visualizer/Plugin/docs/plugin-architecture-backend.md`
- Visualizer frontend: `Web/WebUI/iap/docs/visualizer/plugin/plugin-architecture-frontend.md`
- Nested IAP agents: `MicroService.IAP/MicroService.IAP/AGENTS.md`
