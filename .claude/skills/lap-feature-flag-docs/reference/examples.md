# LAP feature flag docs — examples

## Good row — سه ستونه با پیش‌فرض در ستون جدا

```html
<tr>
    <td>EnableExploreServerSideGroupBy</td>
    <td>true</td>
    <td>اگر مقدار برابر با true باشد، گروه‌بندی چندسطحی در پلاگین کاوش (Explore) روی سرور انجام می‌شود؛ یعنی سطوح تجمیع، شمارش هر bucket و صفحه‌بندی سطرها از سمت LAPortal محاسبه و به کلاینت برگردانده می‌شود. اگر false باشد، همان مسیر قدیمی بارگذاری تخت دادگان (بدون پردازش گروه‌بندی سمت سرور) استفاده می‌شود.</td>
</tr>
```

Source: `EnableExploreServerSideGroupByConfig { init = true }` — not `LAPortal.config`.

**توجه:** پیش‌فرض فقط در ستون وسط. توضیحات دیگر شامل «مقدار پیش‌فرض در کد true است» نیست.

## Good — default differs from sample config

Key `RecordHasPriority`:

- Code: `PortalViewConfig.RecordHasPriority = false`
- Sample `LAPortal.config` may say `true`

Doc must say: **مقدار پیش‌فرض در کد false است.**

## Bad

| Problem | Why |
|---------|-----|
| «مقدار پیش‌فرض 1000000» for `DSMaxNodesCount` copied from LAPortal.config | Code default is `10000` in `DatasetLimitationConfig` |
| «پیش‌فرض فعال نیست» for `UseAspRuntime` | `GetValue("UseAspRuntime", true)` → default **true** |
| «فیچر فلگ Office Online» one line, no true/false | Operator cannot configure safely |
| Editing `D:\Docs\...` without user path in prompt | Path is machine-specific; must ask |

## Cache row template

```html
<tr>
    <td>AccessCacheExpirationMinutes</td>
    <td>دقایقی که تنظیمات دسترسی کاربر در کش می‌ماند. مقدار پیش‌فرض در کد 15 است.</td>
    <td>15</td>
</tr>
```

Third column = code default minutes (`AccessCacheConfig`), not sample XML value.
