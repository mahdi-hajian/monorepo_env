# Agent instructions (analytics workspace)

When working on **C# / MicroService.IAP / LAP** or **WebUI frontend**, follow the standards and skills below automatically. Do not wait for the user to `@`-mention them.

**Canonical bodies (do not duplicate at repo root):** floor rule [`.cursor/rules/canonical-skills-and-rules.mdc`](.cursor/rules/canonical-skills-and-rules.mdc).

| Area | Canonical folder |
|------|------------------|
| C# rules + IAP skills | `MicroService.IAP/MicroService.IAP/.cursor/` (`rules/`, `skills/`) |
| WebUI RULES + IMAP skills | `Web/WebUI/.agents/` (`RULES/`, `IMAP/SKILLS/`) |

Root [`.cursor/rules/`](.cursor/rules/) and [`.agents/skills/`](.agents/skills/) are **thin wrappers** that point at those folders. New SKILL/RULE files go in the product repo; here only a pointer + an `AGENTS.md` row.

## Auto-apply for C#

| Context | Apply |
|---------|--------|
| Production `*.cs` | Wrapper [`.cursor/rules/csharp-code-style.mdc`](.cursor/rules/csharp-code-style.mdc) → canonical [`MicroService.IAP/MicroService.IAP/.cursor/rules/csharp-code-style.mdc`](MicroService.IAP/MicroService.IAP/.cursor/rules/csharp-code-style.mdc) + skill [`.agents/skills/csharp-code-style/SKILL.md`](.agents/skills/csharp-code-style/SKILL.md) |
| Test `*Tests.cs` / `LAP.Tests` | Wrapper [`.cursor/rules/csharp-test-style.mdc`](.cursor/rules/csharp-test-style.mdc) → canonical [`MicroService.IAP/MicroService.IAP/.cursor/rules/csharp-test-style.mdc`](MicroService.IAP/MicroService.IAP/.cursor/rules/csharp-test-style.mdc) + skill [`.agents/skills/csharp-test-style/SKILL.md`](.agents/skills/csharp-test-style/SKILL.md) |

**IAP project root:** `MicroService.IAP/MicroService.IAP` (SDK 8.0.x). Prefer `--no-restore` for `dotnet build` / `dotnet test`.

## Auto-apply for WebUI frontend

| Context | Apply |
|---------|--------|
| `Web/WebUI/**/*.ts` (production) | [`.cursor/rules/webui-frontend-coding.mdc`](.cursor/rules/webui-frontend-coding.mdc) → read `convention.md` + coding RULES + [`webui-coding`](.agents/skills/webui-coding/SKILL.md) |
| `Web/WebUI/**/*.html` | [`.cursor/rules/webui-frontend-html.mdc`](.cursor/rules/webui-frontend-html.mdc) |
| `Web/WebUI/**/*.spec.ts` | [`.cursor/rules/webui-frontend-testing.mdc`](.cursor/rules/webui-frontend-testing.mdc) → [`webui-testing`](.agents/skills/webui-testing/SKILL.md) |
| `Web/WebUI/**/*.cy.ts` | [`.cursor/rules/webui-frontend-cypress.mdc`](.cursor/rules/webui-frontend-cypress.mdc) → [`webui-cypress`](.agents/skills/webui-cypress/SKILL.md) |

**WebUI root:** `Web/WebUI`. Nested routing: [`Web/WebUI/AGENTS.md`](Web/WebUI/AGENTS.md).

### Frontend skills usage guide

When the prompt matches a trigger, **read the full skill / canonical file before acting**.

| Skill | Trigger | Path |
|-------|---------|------|
| `webui-coding` | Any WebUI TS/HTML/SCSS coding | `.agents/skills/webui-coding/SKILL.md` → `Web/WebUI/.agents/RULES/coding/` |
| `webui-testing` | WebUI `*.spec.ts` | `.agents/skills/webui-testing/SKILL.md` → `Web/WebUI/.agents/RULES/testing/` |
| `webui-cypress` | WebUI `*.cy.ts` | `.agents/skills/webui-cypress/SKILL.md` → `Web/WebUI/.agents/RULES/cypress/` |
| `iap-lap-coding` | `iap/**` visualizer / explore / AG Grid | `.agents/skills/iap-lap-coding/SKILL.md` → `Web/WebUI/.agents/IMAP/SKILLS/reference/` |
| `iap-plugin-architecture-frontend` | Visualizer plugins / MountPoint | `.agents/skills/iap-plugin-architecture-frontend/SKILL.md` |
| `iap-unit-test-run` | Add/edit `iap/**/*.spec.ts` | `.agents/skills/iap-unit-test-run/SKILL.md` |
| `add-web-feature-flag` | New `web.uiconfig` flag | `.agents/skills/add-web-feature-flag/SKILL.md` |
| `document-web-feature-flag` | Document web feature flag | `.agents/skills/document-web-feature-flag/SKILL.md` |
| `iap-ogma-decoupling` | Ogma decoupling plan phases | `.agents/skills/iap-ogma-decoupling/SKILL.md` |
| `iap-branch-change-html-doc` | Branch changes → HTML doc | `.agents/skills/iap-branch-change-html-doc/SKILL.md` |
| `farsi-rtl-output` | Persian / RTL replies | `.agents/skills/farsi-rtl-output/SKILL.md` → `Web/WebUI/.agents/IMAP/SKILLS/reference/farsi-rtl-output/` |
| `web-azure-devops-pr-followup` | ADO PR on **Web** repo | `.agents/skills/web-azure-devops-pr-followup/SKILL.md` |

Canonical RULES:

- `Web/WebUI/.agents/RULES/coding/coding-principles.md`
- `Web/WebUI/.agents/RULES/testing/tests-authoring-workflow.md`
- `Web/WebUI/.agents/RULES/testing/tests-writing-principles.md`
- `Web/WebUI/.agents/RULES/cypress/cypress-writing-principles.md`

## Skills usage guide (C# / LAP)

| Skill | Trigger | Canonical (via root wrapper) |
|-------|---------|------------------------------|
| `csharp-code-style` | Production C# | `MicroService.IAP/MicroService.IAP/.cursor/rules/csharp-code-style.mdc` |
| `csharp-test-style` | C# unit tests | `MicroService.IAP/MicroService.IAP/.cursor/rules/csharp-test-style.mdc` |
| `build-project` | Build / compile | `MicroService.IAP/MicroService.IAP/.cursor/skills/build-project/SKILL.md` |
| `run-unit-tests` | Run LAP.Tests | `MicroService.IAP/MicroService.IAP/.cursor/skills/run-unit-tests/SKILL.md` |
| `lap-feature-flag` | Backend `Enable*` / `IOptions<T>` | `MicroService.IAP/MicroService.IAP/.cursor/skills/lap-feature-flag/SKILL.md` |
| `lap-feature-flag-docs` | Document backend flag | `MicroService.IAP/MicroService.IAP/.cursor/skills/lap-feature-flag-docs/SKILL.md` |
| `azure-devops-pr-followup` | ADO PR on **MicroService.IAP** | `MicroService.IAP/MicroService.IAP/.cursor/skills/azure-devops-pr-followup/SKILL.md` |
| `azure-devops-pr-resolve` | Resolve IAP PR threads only | `MicroService.IAP/MicroService.IAP/.cursor/skills/azure-devops-pr-resolve/SKILL.md` |

## Related docs

- Visualizer backend: `MicroService.IAP/MicroService.IAP/MicroService.IAP/Visualizer/Plugin/docs/plugin-architecture-backend.md`
- Visualizer frontend: `Web/WebUI/iap/docs/visualizer/plugin/plugin-architecture-frontend.md`
- Nested IAP agents: `MicroService.IAP/MicroService.IAP/AGENTS.md`
- Codebase Memory: wrapper [`.cursor/rules/codebase-memory.mdc`](.cursor/rules/codebase-memory.mdc) → [`Web/WebUI/.cursor/rules/codebase-memory.mdc`](Web/WebUI/.cursor/rules/codebase-memory.mdc) + [`MicroService.IAP/MicroService.IAP/.cursor/rules/codebase-memory.mdc`](MicroService.IAP/MicroService.IAP/.cursor/rules/codebase-memory.mdc); Web excludes in [`Web/.cbmignore`](Web/.cbmignore)
