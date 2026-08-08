---
name: lap-feature-flag
description: >-
  Adds boolean feature toggles backed by LAPortal.config (appSettings) for LAP
  / MicroService.IAP: sealed record options type, AddOptions().Bind in
  AddApplicationConfigs, IOptions injection in consumers, LAPortal keys, and
  tests with Options.Create. Use when the user asks for a feature flag, config
  toggle, Enable* config, or wiring IOptions for new behavior in this repo.
---

# LAP feature flags (configuration-backed toggles)

## When this applies

Use this workflow for **on/off behavior** controlled by **`LAPortal.config`** (or the same XML `appSettings` keys loaded into `IConfiguration`), not for remote feature services unless the project already uses another pattern.

## Steps (canonical pattern)

1. **Options type** — Add a `public sealed record` in an appropriate folder (e.g. plugin `Configs/`, or alongside related code). One boolean property per flag; name the record and property consistently (e.g. record `EnableExploreServerSideGroupByConfig`, property `EnableExploreServerSideGroupBy`).
2. **Default in code** — Set `init` default to match the desired behavior when the key is **absent** from config after bind (often `false` for new opt-in features, or `true` to preserve legacy behavior until operators set `False`).
3. **Bind configuration** — In `MicroService.IAP/Configuration/DI/ServiceCollectionExtensions.cs`, inside `AddApplicationConfigs`, add:
   - `serviceCollection.AddOptions<YourConfigRecord>().Bind(configuration);`
   - Add the corresponding `using` for the config type’s namespace.
4. **LAPortal.config** — Under `<appSettings>`, add `<add key="YourPropertyName" value="True"/>` (or `False`) so deployments see the key; align `key` with the **property name** so options binding maps correctly.
5. **Consumer** — Inject `IOptions<YourConfigRecord>` (constructor: `options ?? throw new ArgumentNullException(nameof(options));`). Read `_options.Value.YourProperty` at the decision point; keep branching small and explicit.
6. **Tests** — Use `Microsoft.Extensions.Options.Options.Create(new YourConfigRecord { YourProperty = true })` (or `false`) per [csharp-test-style](../csharp-test-style/SKILL.md) / [`.cursor/rules/csharp-test-style.mdc`](../../../.cursor/rules/csharp-test-style.mdc) section 10. Add at least one test for enabled and one for disabled when behavior diverges.

## Reference examples in this repo

- **Profile photo automation:** `LAP.Visualizer.Plugin.PreMerge.configs.EnableAutoApplyProfilePhotoConfig` + `EnableAutoApplyProfilePhoto` property; bound in `AddApplicationConfigs`; used from `IOptions<EnableAutoApplyProfilePhotoConfig>` in automated actions.
- **Explore server-side group-by:** `LAP.MicroService.IAP.Plugin.DatasetManagement.Configs.EnableExploreServerSideGroupByConfig` + `InstanceValuesLoadCoordinator`.

## Naming

- Prefer **`Enable{Feature}Config`** for the record and **`Enable{Feature}`** for the bool property so keys stay readable in `LAPortal.config` and match typical .NET options binding.

## Do not

- Do not duplicate this full checklist inside `.cursor/rules`; keep the canonical steps here and link from `CLAUDE.md` / `AGENTS.md` if needed.
- Do not register the options type in a random `AddTransient` without `AddOptions().Bind(configuration)` unless there is a documented exception.
