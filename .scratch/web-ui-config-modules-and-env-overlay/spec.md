# Web UI Config: Module Types + Environment Overlay

Status: ready-for-agent  
Tracker: local only (`.scratch/web-ui-config-modules-and-env-overlay/`) — no Jira  
Domain: [Web UI Config](../../Web/WebUI/base-contract/CONTEXT.md)  
ADR: [0001-web-config-ownership-layout](../../Web/WebUI/base-contract/docs/adr/0001-web-config-ownership-layout.md)

## Implementation tickets (local)

| # | File | Blocked by |
|---|------|------------|
| 01 | [issues/01-module-config-ownership.md](./issues/01-module-config-ownership.md) | — |
| 02 | [issues/02-environment-config-overlay.md](./issues/02-environment-config-overlay.md) | 01 |
| 03 | [issues/03-flag-authoring-and-iac-contract.md](./issues/03-flag-authoring-and-iac-contract.md) | 01, 02 |

## Problem Statement

Product teams and operators struggle with a single shared web UI configuration surface. Adding or changing a module feature flag today forces edits to the general Shell Web Config model, creating cross-team churn and noisy change graphs. Operators who run Web in Docker want to toggle keys via compose or `.env` without editing or remounting a large XML Customer Web UI Config, and without a painful multi-file merge pipeline. Developers still need typo-safe access such as typed module getters (for example `getDiaConfig().featureFlagName`).

## Solution

Keep one Customer Web UI Config file (`web.uiconfig`) in its current place and shape. Split Module Web Config TypeScript shapes and code defaults out of the Shell Web Config class into IMAP, BDMP, PAP, and DIA module types in the shared contract library, exposed through typed getters on the web config service. At runtime, resolve Flat Web Config as: code defaults, then Customer Web UI Config, then an optional Environment Config Overlay from `window.__WEB_ENV__` (env wins). Docker/IaC injects that window object from `WEB__*` variables; local serve without the overlay behaves as today. Do not introduce modular JSON source folders or a mandatory JSON-to-XML merge in this phase.

## User Stories

1. As a BDMP developer, I want module flags typed on a BDMP config surface, so that I do not edit the shell config class for every BDMP toggle.
2. As an IMAP developer, I want an IMAP module config type and `getImapConfig()`, so that LAPortal/IMAP keys are typo-checked like other products.
3. As a PAP developer, I want PAP keys owned by the PAP module config type, so that dashboard flag work stays off the shell class.
4. As a DIA developer, I want DIA keys owned by the DIA module config type, so that dataflow flags stay off the shell class.
5. As a shell/platform developer, I want Shell Web Config to hold only shared website keys, so that product flag PRs stop colliding on the god config class.
6. As an application developer, I want `getImapConfig().SomeFlag` (and BDMP/PAP/DIA equivalents), so that I get compile-time name checking.
7. As an application developer, I want missing module keys to fall back to code defaults on the module class, so that tests and partial configs still behave predictably.
8. As an application developer, I want Flat Web Config to remain a single flat key space, so that existing call sites reading flat properties keep working after the split.
9. As a developer using local `ng serve`, I want config to load from `web.uiconfig` without requiring an environment overlay, so that day-to-day work stays unchanged.
10. As a developer adding a **new** module key, I want to update the module type (and its code default) plus the value in Customer Web UI Config, so that types and deploy file stay aligned.
11. As a developer changing only a **deploy-time** value, I want to prefer Environment Config Overlay, so that I do not churn the shared TypeScript libraries for routine toggles.
12. As a Docker operator, I want to set `WEB__BDMPUseNewDatabaseConnection=true` in compose or `.env`, so that I can override flags without editing XML by hand.
13. As a Docker operator, I want env overrides to win over `web.uiconfig`, so that environment-specific toggles are authoritative.
14. As a Docker operator, I want mounted `web.uiconfig` to remain intact on disk, so that file-based config and env overlay coexist cleanly.
15. As a Docker operator, I want boolean and numeric env strings coerced like XML parsing, so that `=== true` and numeric settings behave correctly.
16. As an IaC maintainer, I want a documented contract for injecting `window.__WEB_ENV__`, so that the Web image and compose entrypoint stay compatible.
17. As a WebUI maintainer, I want the Angular loader to skip env merge when `__WEB_ENV__` is absent, so that non-Docker hosts do not fail.
18. As a WebUI maintainer, I want env bridge via injected script (not a separate fetch), so that we avoid extra HTTP/cache/path coupling.
19. As a release engineer, I want a single customer-facing `web.uiconfig`, so that customers are not asked to manage per-product config files.
20. As a release engineer, I do not want a mandatory modular JSON→XML merge in CI/serve, so that build/serve stay simple.
21. As a QA engineer, I want to assert resolved config after initializer load, so that precedence bugs are caught at one seam.
22. As a QA engineer, I want to verify typed getters return the same flat object slices as today, so that PAP/BDMP/DIA consumers do not regress.
23. As an IMAP QA, I want `getImapConfig()` to expose IMAP and LAPortal module keys (per product docs ownership), so that portal settings are reachable through one getter.
24. As an ops engineer, I want documentation of `WEB__` + exact PascalCase key naming, so that env vars map without lossy snake_case transforms.
25. As a platform architect, I want `web-configs/` deferred, so that we do not take on dual git sources before env overlay proves out.
26. As a developer reading domain docs, I want glossary terms (Shell Web Config, Module Web Config, Flat Web Config, Environment Config Overlay) used consistently, so that design language stays stable.
27. As a consumer of `getWebConfig()`, I want the full flat resolved config, so that shell and module keys remain available together when needed.
28. As a consumer of `getPapConfig()` / `getBdmpConfig()` / `getDiaConfig()`, I want those APIs to keep working, so that existing modules do not need a big-bang migration.
29. As a security-conscious operator, I want only explicitly prefixed `WEB__*` variables applied to the overlay, so that unrelated process env does not leak into UI config.
30. As a future maintainer, I want an ADR recording why env overlay replaced mandatory merge, so that we do not reintroduce merge pain without cause.

## Implementation Decisions

- Keep Customer Web UI Config at the existing assets/install path and XML appSettings shape.
- Shell Web Config class body contains only shared shell keys; module keys move to Module Web Config types/classes with code defaults (IMAP, BDMP, PAP, DIA).
- Add `BaseImapConfigurations` and `getImapConfig()` alongside existing BDMP/PAP/DIA getters.
- IMAP module ownership includes `IMAP*` / `LAPortal*` keys and other portal-owned keys already agreed in domain discussion (for example Semantic Search and GIS-related portal keys as documented); exact key lists follow product web configuration docs plus keys present in code.
- Runtime Flat Web Config merge order: module/shell code defaults ← parsed `web.uiconfig` ← `window.__WEB_ENV__` (env wins).
- Environment Config Overlay: IaC entrypoint injects a script setting `window.__WEB_ENV__` as a flat object; WebUI initializer merges it after file load.
- Env var naming: `WEB__` + exact PascalCase config key (example `WEB__BDMPUseNewDatabaseConnection`).
- Env value coercion matches existing XML parse rules (`true`/`false` → boolean, pure numeric → number, else string).
- WebUI owns loader/contract/tests; IaC owns sample entrypoint/compose wiring (may ship in a follow-up outside this repo).
- Do not make Environment Config Overlay an Nx library; do not add `web-configs/` or JSON→XML merge in this phase.
- Typing strategy must keep dependents compiling: shell class remains the familiar export name where needed, with module shapes available through getters; avoid `base-contract` importing product apps.
- Update the add-web-feature-flag skill/docs so new module keys land on the module type + `web.uiconfig` (and document optional `WEB__` name), not on the shell class body.
- Domain glossary and ADR already started under the base-contract context; keep them in sync with delivery.

## Testing Decisions

### Primary seam (prefer only this)

**Config resolution at web config initialization** (the load path that today builds `BaseConfiguration.webConfig` from defaults + `web.uiconfig`).

External behavior to assert:

- Given code defaults, file keys, and optional `window.__WEB_ENV__`, the resolved Flat Web Config respects precedence (env wins, then file, then defaults).
- Absent `__WEB_ENV__` → same outcome as file + defaults only (serve path).
- Coercion of env string values matches XML coercion for booleans/numbers.
- Typed getters (`getImapConfig`, `getBdmpConfig`, `getPapConfig`, `getDiaConfig`, `getWebConfig`) expose the expected keys after resolution.

Prefer existing test styles around initializer / `BaseConfig` / `WebConfigService` over new deep mocks of product features.

### Seams to avoid

- Per-product UI tests for every flag.
- Testing private parse helpers in isolation if the initializer seam already covers coercion and precedence (add a small pure helper test only if extraction is required for clarity).

### Prior art

- Existing unit tests that stub or assert `BaseConfiguration.webConfig` / `WebConfigService` usage in WebUI libraries.
- XML parsing behavior already encoded in `BaseConfig` parse rules — reuse the same expectations for env coercion.

## Out of Scope

- Creating `Web/WebUI/web-configs/` or any mandatory JSON→XML merge pipeline.
- Rewriting mounted `web.uiconfig` via envsubst as the primary bridge.
- Migrating all call sites off flat property access to getters (optional follow-up).
- Changing nginx backend URL configuration (separate from Customer Web UI Config).
- Implementing the full IaC StarPackage entrypoint inside this analytics monorepo (contract + WebUI loader are in scope; IaC sample may be docs-only here).
- PAP server-side `PAPortal.config` flags.
- Splitting Customer Web UI Config into multiple customer-facing files.

## Further Notes

- Glossary and ADR live with the Web UI Config context under `base-contract`.
- Earlier grilling considered modular JSON sources and build merge; that was deliberately dropped in favor of Environment Config Overlay to reduce merge operational pain.
- If git-side per-module value files are needed later, treat as a new spec; do not quietly reintroduce merge into this delivery.
