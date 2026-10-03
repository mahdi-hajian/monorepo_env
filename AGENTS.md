# Agent instructions (analytics workspace)

**Rules** are tiny pointers: when a glob matches, read the linked doc/skill before acting.  
**Skills** are **manual** (`disable-model-invocation: true`) — invoke with `@skill-name`; they do not auto-fire from description.  
**Tests:** do **not** run after code changes by default — only when the user explicitly asks (see [`.cursor/rules/tests-user-requested-only.mdc`](.cursor/rules/tests-user-requested-only.mdc)).

**Canonical bodies (do not duplicate at repo root):** floor rule [`.cursor/rules/canonical-skills-and-rules.mdc`](.cursor/rules/canonical-skills-and-rules.mdc).

| Area | Canonical folder |
|------|------------------|
| C# rules + IAP skills | `MicroService.IAP/MicroService.IAP/.cursor/` (`rules/`, `skills/`) |
| WebUI RULES + IMAP skills | `Web/WebUI/.agents/` (`RULES/`, `IMAP/SKILLS/`) |

Root [`.cursor/rules/`](.cursor/rules/) and [`.agents/skills/`](.agents/skills/) are **thin wrappers**. New SKILL/RULE bodies go in the product repo; here only a pointer + an `AGENTS.md` row.

## Rule pointers (C#)

| Context | Rule → doc |
|---------|------------|
| Production `*.cs` | [`.cursor/rules/csharp-code-style.mdc`](.cursor/rules/csharp-code-style.mdc) → [`…/docs/csharp-code-style.md`](MicroService.IAP/MicroService.IAP/.cursor/docs/csharp-code-style.md) |
| Test `*Tests.cs` | [`.cursor/rules/csharp-test-style.mdc`](.cursor/rules/csharp-test-style.mdc) → [`…/docs/csharp-test-style.md`](MicroService.IAP/MicroService.IAP/.cursor/docs/csharp-test-style.md) |

**IAP project root:** `MicroService.IAP/MicroService.IAP` (SDK 8.0.x). Prefer `--no-restore` for `dotnet build` / `dotnet test`.

## Rule pointers (WebUI)

| Context | Rule → skill |
|---------|--------------|
| `Web/WebUI/**/*.ts` | [`.cursor/rules/webui-frontend-coding.mdc`](.cursor/rules/webui-frontend-coding.mdc) → [`webui-coding`](.agents/skills/webui-coding/SKILL.md) |
| `Web/WebUI/**/*.html` | [`.cursor/rules/webui-frontend-html.mdc`](.cursor/rules/webui-frontend-html.mdc) → [`webui-coding`](.agents/skills/webui-coding/SKILL.md) |
| `Web/WebUI/**/*.spec.ts` | [`.cursor/rules/webui-frontend-testing.mdc`](.cursor/rules/webui-frontend-testing.mdc) → [`webui-testing`](.agents/skills/webui-testing/SKILL.md) |
| `Web/WebUI/**/*.cy.ts` | [`.cursor/rules/webui-frontend-cypress.mdc`](.cursor/rules/webui-frontend-cypress.mdc) → [`webui-cypress`](.agents/skills/webui-cypress/SKILL.md) |

**WebUI root:** `Web/WebUI`. Nested routing: [`Web/WebUI/AGENTS.md`](Web/WebUI/AGENTS.md).

## Manual skills index (WebUI)

| Skill | When to `@` invoke | Path |
|-------|-------------------|------|
| `webui-coding` | WebUI TS/HTML/SCSS | `.agents/skills/webui-coding/SKILL.md` |
| `webui-testing` | WebUI `*.spec.ts` | `.agents/skills/webui-testing/SKILL.md` |
| `webui-cypress` | WebUI `*.cy.ts` | `.agents/skills/webui-cypress/SKILL.md` |
| `iap-lap-coding` | `iap/**` visualizer / explore | `.agents/skills/iap-lap-coding/SKILL.md` |
| `iap-plugin-architecture-frontend` | Visualizer plugins / MountPoint | `.agents/skills/iap-plugin-architecture-frontend/SKILL.md` |
| `iap-unit-test-run` | Run `iap/**` Karma specs | `.agents/skills/iap-unit-test-run/SKILL.md` |
| `add-web-feature-flag` | New `web.uiconfig` flag | `.agents/skills/add-web-feature-flag/SKILL.md` |
| `document-web-feature-flag` | Document web feature flag | `.agents/skills/document-web-feature-flag/SKILL.md` |
| `iap-ogma-decoupling` | Ogma decoupling plan | `.agents/skills/iap-ogma-decoupling/SKILL.md` |
| `iap-branch-change-html-doc` | Branch → HTML doc | `.agents/skills/iap-branch-change-html-doc/SKILL.md` |
| `farsi-rtl-output` | Persian / RTL replies | `.agents/skills/farsi-rtl-output/SKILL.md` |
| `web-azure-devops-pr-followup` | ADO PR on **Web** | `.agents/skills/web-azure-devops-pr-followup/SKILL.md` |

## Manual skills index (C# / LAP)

| Skill | When to `@` invoke | Canonical |
|-------|-------------------|-----------|
| `csharp-code-style` | Production C# | `MicroService.IAP/MicroService.IAP/.cursor/docs/csharp-code-style.md` |
| `csharp-test-style` | C# unit tests | `MicroService.IAP/MicroService.IAP/.cursor/docs/csharp-test-style.md` |
| `codebase-memory` | Index / graph search | IAP skill + Web `codebase-memory.md` |
| `iap-plugin-architecture-backend` | Visualizer plugin backend | `…/skills/iap-plugin-architecture-backend/` |
| `build-project` | Build / compile | `…/skills/build-project/` |
| `run-unit-tests` | Run LAP.Tests | `…/skills/run-unit-tests/` |
| `lap-feature-flag` | Backend `Enable*` / `IOptions<T>` | `…/skills/lap-feature-flag/` |
| `lap-feature-flag-docs` | Document backend flag | `…/skills/lap-feature-flag-docs/` |
| `lap-fluent-validation` | FluentValidation | `…/skills/lap-fluent-validation/` |
| `lap-language-dictionary` | LAP translations | `…/skills/lap-language-dictionary/` |
| `azure-devops-pr-followup` | ADO PR on **MicroService.IAP** | `…/skills/azure-devops-pr-followup/` |
| `azure-devops-pr-resolve` | Resolve IAP PR threads only | `…/skills/azure-devops-pr-resolve/` |

## Related docs

- Nested IAP agents: `MicroService.IAP/MicroService.IAP/AGENTS.md`
- Codebase Memory: [`.cursor/rules/codebase-memory.mdc`](.cursor/rules/codebase-memory.mdc)
- Web excludes: [`Web/.cbmignore`](Web/.cbmignore)
