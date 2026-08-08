---
name: lap-feature-flag-docs
description: >-
  Documents a LAP / MicroService.IAP feature flag in Mohaymen administration
  docs on the user's machine. If the prompt omits the docs file path, ask for it
  before editing. Researches *Config defaults and code usage in MicroService.IAP
  (never LAPortal.config for defaults), writes Persian table rows. Use when the
  user asks to document a feature flag, add Enable* config to admin docs, or
  fill empty rows in 01-la-portal.md.
---

# مستندسازی فیچر فلگ‌های LAP (Admin Docs)

یک ردیف در جدول HTML **«فایل پیکربندی»** (یا جدول معادل در فایلی که کاربر مسیرش را می‌دهد) اضافه یا به‌روز کن.

## دروازهٔ اجباری — مسیر داک در پرامپت

**اگر پرامپت کاربر مسیر مطلق فایل داکیومنت را ندارد، متوقف شو و بپرس.** فایل‌سیستم را برای پیدا کردن ریپوی پیش‌فرض جستجو نکن، مسیر چت‌های قبلی را بدون تکرار کاربر در **همین** پرامپت استفاده نکن، و تا پاسخ کاربر هیچ markdownای ویرایش نکن.

یک پیام فارسی بپرس (هر دو سؤال اگر نام کلید هم نگفته):

> لطفاً مسیر کامل فایل داکیومنت روی سیستم خودتان را بفرستید (مثلاً `E:\projects\Docs\Mohaymen.AnalyticsDocumentation.Administration\02-installation\05-configuration\06-la\01-laportal\01-la-portal.md`).
> {اگر نام فیچر فلگ هم نگفته‌اند:} نام دقیق کلید (`EnableExploreServerSideGroupBy`, `IsIdentifyServiceEnabled`, …) را هم بنویسید.

فقط بعد از دریافت مسیر (و نام کلید) می‌توانی `Read` بزنی و ادامه دهی.

## ورودی‌ها (قبل از ویرایش)

| ورودی | ارائه‌دهنده | توضیح |
|--------|-------------|--------|
| **نام کلید** | کاربر | دقیقاً مثل `LAPortal.config` / binding options (حساس به حروف). |
| **مسیر فایل داک** | کاربر | **مسیر مطلق** روی سیستم خودش به فایل markdown (مثلاً `…/01-la-portal.md`). |

### فقط نام کلید، بدون مسیر

همان **دروازهٔ اجباری** — مسیر را بپرس؛ بدون آن ادامه نده.

### فقط مسیر داک، بدون نام کلید

بپرس کدام **کلید(ها)** را مستند کنی (ترجیحاً یک کلید در هر درخواست مگر لیست صریح داده باشد).

### درخواست گروهی (sync همهٔ کلیدهای config)

1. باز هم **مسیر داک** اجباری است اگر نبود.
2. کلیدهای `LAPortal.config` (یا بازه‌ای که کاربر گفته) را با `<td>{Key}</td>` در همان فایل مقایسه کن.
3. فقط کلیدهای **غایب** را مستند کن (یا ردیف موجود را **به‌روز** کن اگر اصلاح wording خواست).
4. کلید بدون مصرف‌کننده در کد را رد کن مگر کاربر اصرار کند.

## گردش کار

| مرحله | کار |
|--------|-----|
| 0 | **مسیر در پرامپت؟** اگر مسیر مطلق داک نیست → از کاربر بپرس و **متوقف شو** (بدون ویرایش، بدون حدس مسیر). |
| 1 | **نام کلید** و **مسیر مطلق داک** را از همین مکالمه تأیید کن. |
| 2 | `Read` فایل هدف؛ جدول زیر `### فایل پیکربندی` را پیدا کن. |
| 3 | `<td>{Key}</td>` وجود دارد؟ — فقط همان ردیف را **به‌روز** کن، یا `<tr>` جدید **درج** کن. |
| 4 | **تحقیق پیش‌فرض در MicroService.IAP (اجباری)** — [reference/discovery.md](reference/discovery.md). از کد C# بخون، نه از LAPortal.config. اگه کلید توی هیچ Config record نیست → `—` بنویس و به کاربر بگو. |
| 5 | توضیح فارسی: رفتار true/false، پیش‌فرض **از کد** در ستون وسط، توضیح بدون تکرار پیش‌فرض. |
| 6 | `<tr>` را کنار کلیدهای مرتبط (همان prefix / محصول) بگذار. |
| 7 | ریپوی داک را commit نکن مگر کاربر بخواهد. |

**قبل از نوشتن ردیف، این سوالات رو از خودت بپرس:**
- این پیش‌فرض رو از `*Config.cs` خوندم یا از `LAPortal.config` حدس زدم؟
- `[ConfigurationKeyName]` داره؟ نام XML با C# property name فرق می‌کنه؟
- اگه `—` نوشتم، واقعاً توی کد C# هم Config record نداره یا فقط پیدا نکردم؟

## هدف معمول (مسیر پیش‌فرض نیست)

مستندات ادمین اغلب این ساختار را دارند:

| سرویس / config | مسیر نسبی داخل ریپوی داک (مثال) |
|----------------|----------------------------------|
| LAPortal | `02-installation/05-configuration/06-la/01-laportal/01-la-portal.md` — جدول HTML **نام** / **توضیحات** |
| Cache LAPortal | همان فایل، بخش `## تنظیمات مربوط به Cache` — سه ستون با **مقدار پیش‌فرض (دقیقه)** |
| LADW و سایر LA | `02-installation/05-configuration/06-la/*.md` |
| PA | `02-installation/05-configuration/07-pa/03-feature-flag.md` — جدول markdown |

**همیشه** از مسیری که کاربر داده استفاده کن؛ مثال‌های بالا فقط راهنما هستند.

## محل درج در فایل

- پیش‌فرض: جدول HTML زیر `### فایل پیکربندی`، قبل از `</table>`.
- ردیف جدید را **کنار کلیدهای مرتبط** بگذار (مثلاً OpenTelemetry، سایر `Enable*`)، نه لزوماً انتهای کل جدول.
- frontmatter، بخش‌های nginx/docker و ردیف‌های نامرتبط را دست نزن.
- اگر کاربر فایل/بخش دیگری گفت، همان ساختار جدول آن بخش را رعایت کن.

## قالب ردیف (LAPortal — HTML — سه ستونه با پیش‌فرض)

جدول فایل پیکربندی LAPortal الان **سه ستونه**: نام | مقدار پیش‌فرض | توضیحات

```html
<tr>
    <td>EnableYourFeature</td>
    <td>true</td>
    <td>اگر مقدار برابر با true باشد، [قابلیت X برای کاربر]. اگر false باشد، [رفتار جایگزین].</td>
</tr>
```

- ستون دوم (**مقدار پیش‌فرض**) فقط مقدار از کد (عدد، true، false، —، یا `""`).  
- **متن «مقدار پیش‌فرض در کد X است» را در توضیحات تکرار نکن** — پیش‌فرض فقط در ستون خودش باشد.  
- اگر کلید پیش‌فرض ندارد: ستون دوم `—`، و اگر لازم است در توضیحات توضیح بده *چرا*.

### سبک فارسی

- برای boolean: `true` / `false` لاتین؛ اثر را فارسی توضیح بده.
- **مقدار پیش‌فرض در کد** — نه «مقدار در فایل config نمونه».
- نام کلید وابسته در backtick: `` `EnableExploreServerSideGroupBy` ``.
- برای اپراتور بنویس، نه برای توسعه‌دهنده (`IOptions`, namespace در متن داک نیاور).
- نام محصول فارسی + انگلیسی در پرانتز در صورت نیاز: «پلاگین کاوش (Explore)».
- پاسخ چت به کاربر: [farsi-rtl-output](../farsi-rtl-output/SKILL.md).

## مقدار پیش‌فرض — **فقط از کد، هرگز از LAPortal.config**

**این مهم‌ترین قانون این skill است. پیش‌فرض را فقط و فقط از کد C# استخراج کن.**

`MicroService.IAP/.../LAPortal.config` فایل **نمونهٔ deploy** است. مقادیر داخل آن **نمونه/override** هستند و با پیش‌فرض واقعی کد فرق دارند (مثال واقعی: `DSMaxNodesCount`: کد `10000`، نمونه config `1000000`). **هرگز** از این فایل برای مستندسازی پیش‌فرض استفاده نکن. فقط برای تأیید **وجود** کلید قابل استفاده است.

### روش پیدا کردن پیش‌فرض (به ترتیب):

```
1. کلاس *Config.cs در MicroService.IAP/.../Configuration/ یا Configs/ زیر پلاگین:
   public int MaxNodesCount { get; init; } = 10000;   ← پیش‌فرض قطعی

2. [ConfigurationKeyName("KeyName")] روی property:
   نام XML (که توی داک مینویسی) ممکن است با C# property name فرق کنه
   مثال: [ConfigurationKeyName("DSMaxNodesCount")] روی MaxNodesCount

3. GetValue("Key", default) در FeatureFlagها:
   _configuration.GetValue("UseAspRuntime", true)   ← true میشه
   _configuration.GetValue("OpenTelemetry_Tracing_IsEnable", false)   ← false میشه

4. ?? fallback در مصرف‌کننده (سطح آخر):
   binaryBulkConfig?.Value?.EventStoreBinaryBulkSize ?? 100   ← 100 میشه
   _serviceScope...UseBulkApiForAddBinaryAttributes ?? true   ← true میشه

5. اگه هیچ‌کدوم نبود:
   → کلید فقط توی LAPortal.config نمونه هست، توی کد C# نیست
   → یعنی orphan یا raw config value بدون backing class
   → توی داک پیش‌فرض رو — بذار
```

### نمایش پیش‌فرض در جدول:

| وضعیت | نمایش |
|--------|--------|
| `= false` در Config record | `false` |
| `= true` در Config record | `true` |
| `= 10000` در Config record | `10000` |
| `GetValue("Key", true)` | `true` |
| `?? 100` در کد مصرف‌کننده | `100` |
| `= null` (مقدار اجباری مثل رشته اتصال) | `—` |
| بدون Config record در کد | `—` |
| توی کد اصلاً استفاده نشده | مستند نکن |

**نمونهٔ اشتباه (واقعی):** `DSMaxNodesCount` توی `LAPortal.config` مقدار `1000000` داره ولی توی `DatasetLimitationConfig.cs` مقدار `= 10000`. داک باید `10000` بنویسه.

**نمونهٔ درست:** `EnableExploreServerSideGroupBy` توی `EnableExploreServerSideGroupByConfig.cs` مقدار `= true`. توی `LAPortal.config` هم `true` هست — ولی داک `true` رو به خاطر کد می‌نویسه، نه config.

### چک‌لیست تحقیق (MicroService.IAP)

```
- [ ] Grep نام کلید در MicroService.IAP — نه فقط توی LAPortal.config
- [ ] *Config.cs پیدا شد؟ → init = … مقدار رو بردار
- [ ] *Config.cs پیدا نشد؟ → GetValue("Key", default) رو بگرد
- [ ] هیچکدوم؟ → مصرف‌کننده رو بگرد: options.Value.X ?? fallback
- [ ] اگه توی کد C# نیست → — بنویس (و به کاربر بگو که این کلید کد backing نداره)
- [ ] LAPortal.config فقط برای تأیید وجود، نه برای «پیش‌فرض»
- [ ] نام کلید XML ([ConfigurationKeyName]) با C# property name فرق داره؟ اونوقت داک اسم XML رو بنویس
- [ ] مسیر داک از کاربر؛ کلید تکراری در جدول نیست
```

جزئیات grep و فایل‌ها: [reference/discovery.md](reference/discovery.md).  
نمونهٔ خوب/بد: [reference/examples.md](reference/examples.md).

## نمونهٔ خوب / بد

**خوب** — `EnableExploreServerSideGroupBy`: گروه‌بندی چندسطحی کاوش روی سرور؛ false → بارگذاری تخت؛ پیش‌فرض در کد `true` (`EnableExploreServerSideGroupByConfig`).

**بد**

- فقط «فیچر فلگ گروه‌بندی» بدون true/false/پیش‌فرض.
- پیش‌فرض از `LAPortal.config` بدون چک `*Config.cs`.
- حدس رفتار بدون پیدا کردن مصرف‌کننده در کد.
- ویرایش داک بدون مسیر مطلق از کاربر.

## خارج از scope (مگر کاربر بخواهد)

- پیاده‌سازی فیچر فلگ در کد ([lap-feature-flag](../lap-feature-flag/SKILL.md)).
- commit/push ریپوی مستندات.
- داک انگلیسی یا فایل خارج از مسیری که کاربر داده.

## پیوند با پیاده‌سازی

پس از اضافه کردن کلید در کد، با همین skill ردیف جدول را پر کن تا برای نصب‌کننده خالی نماند.
