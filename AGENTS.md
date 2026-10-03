# Agent instructions (analytics workspace)

**One Cursor rule** routes work: [`.cursor/rules/agent-routing.mdc`](.cursor/rules/agent-routing.mdc) — if you need to do X, read doc/skill Y.  
**Skills** are **manual** (`disable-model-invocation: true`) — invoke with `@skill-name`.  
**Tests:** only when the user explicitly asks.

| Area | Canonical folder |
|------|------------------|
| C# docs + IAP skills | `MicroService.IAP/MicroService.IAP/.cursor/` (`docs/`, `rules/agent-routing.mdc`, `skills/`) |
| WebUI RULES + IMAP skills | `Web/WebUI/.agents/` |

## Docs (C#) — via agent-routing

| Topic | Doc |
|-------|-----|
| Production C# | [`…/docs/csharp-code-style.md`](MicroService.IAP/MicroService.IAP/.cursor/docs/csharp-code-style.md) |
| Unit tests | [`…/docs/csharp-test-style.md`](MicroService.IAP/MicroService.IAP/.cursor/docs/csharp-test-style.md) |
| FluentValidation | [`…/docs/lap-fluent-validation.md`](MicroService.IAP/MicroService.IAP/.cursor/docs/lap-fluent-validation.md) |
| Translations | [`…/docs/lap-language-dictionary.md`](MicroService.IAP/MicroService.IAP/.cursor/docs/lap-language-dictionary.md) |

**IAP project root:** `MicroService.IAP/MicroService.IAP` (SDK 8.0.x). Prefer `--no-restore`.

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
| `build-project` | Build / compile | `…/skills/build-project/` |
| `run-unit-tests` | Run LAP.Tests | `…/skills/run-unit-tests/` |
| `lap-feature-flag` | Backend `Enable*` / `IOptions<T>` | `…/skills/lap-feature-flag/` |
| `lap-feature-flag-docs` | Document backend flag | `…/skills/lap-feature-flag-docs/` |
| `azure-devops-pr-followup` | ADO PR on **MicroService.IAP** | `…/skills/azure-devops-pr-followup/` |
| `azure-devops-pr-resolve` | Resolve IAP PR threads only | `…/skills/azure-devops-pr-resolve/` |

## Related docs

- Nested IAP agents: `MicroService.IAP/MicroService.IAP/AGENTS.md`
- WebUI routing: `Web/WebUI/AGENTS.md`
