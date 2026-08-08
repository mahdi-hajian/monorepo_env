# LAP feature flag — code discovery

Research in repo `MicroService.IAP` (not the docs repo).

## 1. Find the key

```text
Grep "{KeyName}" in MicroService.IAP/
```

Note: XML key may differ from C# property via `[ConfigurationKeyName("...")]`.

## 2. Default value — **NEVER from LAPortal.config**

**LAPortal.config فقط برای تأیید وجود کلید، نه برای پیش‌فرض.**

| Pattern | Where | Example | Priority |
|---------|--------|---------|----------|
| `init = value` | `Configuration/*Config.cs`, plugin `Configs/*Config.cs` | `IdentifyServiceConfig.IsIdentifyServiceEnabled = false` | **اول** |
| `[ConfigurationKeyName("XMLKey")]` | روی property | نام XML با C# فرق داره — داک اسم XML رو بنویس | **همراه بالا** |
| `GetValue("Key", default)` | `*FeatureFlag.cs`, startup, Program.cs | `UseAspRuntime` default `true` | **دوم** |
| `?? fallback` at use site | loaders, packages | `EventStoreBinaryBulkSize ?? 100` | **سوم** |
| DB seed | migrations / DbContext | `IsObjectRecognitionEnabled` seed `false` | **چهارم** |
| No config record found | — | کلید فقط توی `LAPortal.config` هست، کد C# backing نداره | **`—` بنویس** |

### الگوریتم تحقیق:

```bash
# 1) Grep for the key in .cs files
rg "KeyName" MicroService.IAP/ --glob "*.cs"

# 2) If found in a *Config.cs, read the init value
rg "public.*KeyName.*=" MicroService.IAP/ --glob "*Config*.cs"

# 3) If NOT in any Config class, search for GetValue pattern
rg 'GetValue\("KeyName"' MicroService.IAP/

# 4) If still not found, search for ?? fallback
rg "KeyName.*\?\?" MicroService.IAP/ --glob "*.cs"

# 5) If NOTHING found in .cs files → the key has NO code default
#    → show — in the default column
#    → tell the user this key has no C# backing class
```

**نمونهٔ غلط:** `DSMaxNodesCount` — مقدار `1000000` در `LAPortal.config`. کد: `DatasetLimitationConfig.MaxNodesCount = 10000`. داک باید `10000` بنویسه.

**نمونهٔ کلید بدون کد:** `MaxNodesCountLabel` — توی `LAPortal.config` هست ولی تو هیچ فایل `.cs` پیدا نمیشه. یعنی کلاس Config نداره. داک باید `—` بنویسه.

## 3. Options registration

`Configuration/DI/ServiceCollectionExtensions.cs` → `AddOptions<YourConfig>().Bind(configuration)`.

## 4. Consumer behavior

Follow `IOptions<YourConfig>` or static config wrappers to describe **operator-visible** behavior only.

Common areas:

- `MicroService.IAP.Plugin.PortalConfig` — flags exposed to web client via `GetConfigs()`
- `Visualizer/` — graph/map plugins, automated actions
- `Facade/` — search, export, APIs

## 5. Cache keys

`CacheConfig.cs` holds minute defaults. Property names may differ from legacy XML keys (e.g. `DWConnectionCacheExpirationMinutes` vs `ConnectionCacheExpirationMinutes` in sample config).

## 6. Target docs table

After research, edit only the file path the user provided. Typical LAPortal table columns: **نام** | **توضیحات** (cache section adds **مقدار پیش‌فرض (دقیقه)** from code `init`, not from sample config).
