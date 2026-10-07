# Agent instructions (analytics workspace)

**One Cursor rule** routes work: [`.cursor/rules/agent-routing.mdc`](.cursor/rules/agent-routing.mdc) — if you need to do X, read doc/skill Y.  
**Skills:** default **manual** (`disable-model-invocation: true`) via `@skill-name`.  
**Model-invoked (auto read):**  
- Web: `farsi-rtl-output`, `iap-unit-test-run`, `iap-lap-coding`, `iap-plugin-architecture-frontend`, `add-web-feature-flag`, `webui-coding`, `webui-testing`  
- IAP: `farsi-rtl-output`, `lap-fluent-validation`, `lap-language-dictionary`, `lap-feature-flag`, `build-project`, `run-unit-tests`  
**Build / LAP `dotnet test` execution:** only when the user explicitly asks (IAP Karma may auto-run per `iap-unit-test-run`).

| Area | Canonical folder |
|------|------------------|
| C# docs + IAP skills | `MicroService.IAP/MicroService.IAP/.cursor/` (`docs/`, `rules/agent-routing.mdc`, `skills/`) |
| WebUI RULES + IMAP skills | `Web/WebUI/.agents/` |

## Docs (C#) — via agent-routing

| Topic | Doc |
|-------|-----|
| Production C# (index) | [`…/docs/csharp-code-style.md`](MicroService.IAP/MicroService.IAP/.cursor/docs/csharp-code-style.md) → `csharp-basics`, `csharp-di-structure`, `csharp-async-tracing`, `csharp-dtos-collections`, `csharp-tabservice` |
| Unit tests | [`…/docs/csharp-test-style.md`](MicroService.IAP/MicroService.IAP/.cursor/docs/csharp-test-style.md) |
| FluentValidation | [`…/skills/lap-fluent-validation`](MicroService.IAP/MicroService.IAP/.cursor/skills/lap-fluent-validation/SKILL.md) → docs |
| Translations | [`…/skills/lap-language-dictionary`](MicroService.IAP/MicroService.IAP/.cursor/skills/lap-language-dictionary/SKILL.md) → docs |

**IAP project root:** `MicroService.IAP/MicroService.IAP` (SDK 8.0.x). Prefer `--no-restore`.

## Manual skills index (WebUI)

| Skill | When to `@` invoke | Path |
|-------|-------------------|------|
| `webui-coding` | WebUI TS/HTML/SCSS | `.agents/skills/webui-coding/SKILL.md` |
| `webui-testing` | WebUI `*.spec.ts` | `.agents/skills/webui-testing/SKILL.md` |
| `iap-lap-coding` | `iap/**` visualizer / explore | `.agents/skills/iap-lap-coding/SKILL.md` |
| `iap-plugin-architecture-frontend` | Visualizer plugins / MountPoint | `.agents/skills/iap-plugin-architecture-frontend/SKILL.md` |
| `iap-unit-test-run` | Run `iap/**` Karma specs | `.agents/skills/iap-unit-test-run/SKILL.md` |
| `add-web-feature-flag` | New `web.uiconfig` flag | `.agents/skills/add-web-feature-flag/SKILL.md` |
| `document-web-feature-flag` | Document web feature flag | `.agents/skills/document-web-feature-flag/SKILL.md` |
| `iap-ogma-decoupling` | Ogma decoupling plan | `.agents/skills/iap-ogma-decoupling/SKILL.md` |
| `iap-branch-change-html-doc` | Branch → HTML doc | `.agents/skills/iap-branch-change-html-doc/SKILL.md` |
| `farsi-rtl-output` | Persian / RTL replies | `.agents/skills/farsi-rtl-output/SKILL.md` |
| `web-azure-devops-pr-followup` | ADO PR on **Web** | `.agents/skills/web-azure-devops-pr-followup/SKILL.md` |
| `web-pr-action` | WebUI branch vs master → HTML RTL PR summary | `.agents/skills/web-pr-action/SKILL.md` |

## Manual skills index (C# / LAP)

| Skill | When to `@` invoke | Canonical |
|-------|-------------------|-----------|
| `build-project` | Build / compile | `…/skills/build-project/` |
| `run-unit-tests` | Run LAP.Tests | `…/skills/run-unit-tests/` |
| `lap-feature-flag` | Backend `Enable*` / `IOptions<T>` | `…/skills/lap-feature-flag/` |
| `lap-feature-flag-docs` | Document backend flag | `…/skills/lap-feature-flag-docs/` |
| `lap-fluent-validation` | FluentValidation / `IValidator<T>` | `…/skills/lap-fluent-validation/` |
| `lap-language-dictionary` | Translations / dictsource / fa-IR | `…/skills/lap-language-dictionary/` |
| `azure-devops-pr-followup` | ADO PR on **MicroService.IAP** | `…/skills/azure-devops-pr-followup/` |
| `azure-devops-pr-resolve` | Resolve IAP PR threads only | `…/skills/azure-devops-pr-resolve/` |
| `lap-pr-action` | IAP branch vs master → HTML RTL PR summary | `…/skills/lap-pr-action/` |

## Authoring

| Skill | When to `@` invoke | Path |
|-------|-------------------|------|
| `writing-great-skills` | Edit skill quality (invocation, hierarchy, pruning) | `.agents/skills/writing-great-skills/SKILL.md` |

## Agent skills

### Issue tracker

Dual: local markdown under `.scratch/` plus Jira Subtasks via MCP (`user-MCP_DOCKER`), default parent [TECSDM-121817](https://jira.mohaymen.ir/browse/TECSDM-121817). See `docs/agents/issue-tracker.md`.

### Triage labels

Default five-role vocabulary (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`). See `docs/agents/triage-labels.md`.

### Domain docs

Multi-context: root `CONTEXT-MAP.md` points at per-context `CONTEXT.md` files; system ADRs in `docs/adr/`. See `docs/agents/domain.md`.

## Related docs

- Nested IAP agents: `MicroService.IAP/MicroService.IAP/AGENTS.md`
- WebUI routing: `Web/WebUI/AGENTS.md`
