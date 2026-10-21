# 04 — ریفکتور ناوبری + اشتراک منطق exclusive / relational

Jira: TECSDM-122269  
Parent: TECSDM-122084  
Status: ready-for-agent

**What to build:** بعد از مرج PR فیچر SqlServer/PostgreSQL، منطق تکراری را جمع کنیم بدون تغییر رفتار UI. این کار عمداً از PR فیچر جدا شد تا سایز PR بزرگ نشود.

**Blocked by:** 02 / TECSDM-122145 ؛ 03 / TECSDM-122146 (بعد از مرج PR فیچر)

## Scope

### A — ناوبری طراحی منبع

1. **Disable → سرویس**
   - `isOracleDetailsDisabled` → `OracleSchemaDetailsNavDisableService.isDisabled()`
   - `isStarRocksDetailsDisabled` → `StarrocksSchemaDetailsNavDisableService.isDisabled()`
   - `isSqlServerDetailsDisabled` → `SqlserverSchemaDetailsNavDisableService.isDisabled()`
   - `isPostgreSqlDetailsDisabled` → `PostgresqlSchemaDetailsNavDisableService.isDisabled()`
   - `hasElasticOrOracle` → `WarehouseHasElasticOrOracleService.hasElasticOrOracle()`
   - ثبت providers در `WarehouseDesignNavigationModule`
   - تست واحد برای هر سرویس؛ به‌روزرسانی spec کامپوننت

2. **title → pipe**
   - getterی `title` حذف شود
   - pipeی standaloneی `warehouseDesignNavigationTitle` با ورودی‌های `warehouseUsageType` و `isNewDesign`
   - تمپلیت: `{{ design.warehouse?.warehouseUsageType | warehouseDesignNavigationTitle: design.isNewDesign }}`
   - تست واحد pipe؛ import در ماژول و spec کامپوننت

### B — اشتراک relational (SqlServer + PostgreSQL)

الان دو ماژول تقریباً کلون هم‌دیگرند؛ فقط `DatabaseType` و `LadwConnectionType` (و i18n/route) فرق می‌کند. استخراج پارامتریک بدون یکی کردن تب/route محصولی:

| بخش | کار |
|-----|-----|
| شل تب (enable/disable انحصار، external-only، saved-connection) | پایهٔ مشترک یا همان APIی `enableExclusiveExternalTechnology` روی کامپوننت/سرویس نازک |
| Connection-config: اتصال → schema → جدول + resetها | کامپوننت/سرویس مشترک schema-then-table با type/connection-type پارامتر |
| `tableName` به شکل `schema.table` | در همان لایهٔ مشترک بماند |
| Warehouse resource (`GetConnections` + schemas/tables از resource) | یک سرویس با `LadwConnectionType` تزریقی/پارامتری |
| Table resource finder (`schema` + `name`) | یک سرویس مشترک (الان دو کپی یکسان) |
| detailsV2 upsert/get | generic روی `DatabaseType` |
| Column mapping adapter روی `detailsV2` | generic روی `DatabaseType` |
| Schema mapping + validate + populateColumns | پایهٔ مشترک؛ کلیدهای i18n و type پارامتر |

**عمداً مشترک نشوند:** کلیدهای i18n محصولی جدا، route/nav جدا (`sqlserver` / `postgresql`)، فیلتر connection type.

**Oracle:** با این دو یکی نشود مگر لایهٔ نازک «schema سپس جدول» جدا از شل exclusive؛ Oracle هنوز internal + declare-new + `detail.externalOracleDetail` دارد.

### C — اشتراک exclusiveها (StarRocks + SqlServer + PostgreSQL)

| بخش | کار |
|-----|-----|
| قانون انحصار (clear همه → add خودش + saved connection) | یک سرویس/هلپر پایه (بخشی در `WarehouseStruct` از قبل هست؛ شل UI را هم یکدست کن) |
| create-time-only edit | مشترک |
| external-only + غیرفعال بودن declare-new | مشترک در شل exclusive |
| detailsV2 + column adapter | generic روی `DatabaseType` جایی که با StarRocks هم‌شکل است |
| nav disable (virtual / file / elastic-oracle / exclusive دیگر) | همان بخش A |

**تفاوت StarRocks که مشترک نشود:** picker بدون مرحلهٔ schema جدا (یا catalog.table در یک select)، migration نام جدول قدیمی، finder/builder مخصوص خودش.

### D — خارج از این فاز (همهٔ techها)

لایهٔ سراسری Elastic/Oracle/StarRocks/SqlServer/PostgreSQL عمداً abstraction بزرگ نشود (مثل Out of Scope اسپیف). از قبل مشترک بماند: `ExternalSchemaMappingService`، `SchemaExternalMappingComponent`، connection resource provider، unique-key API، create از Object Framework.

## اولویت پیشنهادی داخل همین فاز

1. A (nav disable + title pipe) — کم‌ریسک، مستقل
2. B (relational parameterized) — بیشترین تکرار
3. C (شل exclusive مشترک با StarRocks) — در حدی که picker StarRocks را خراب نکند

## Definition of Done

- [ ] متدهای disable خصوصی از کامپوننت ناوبری حذف و به سرویس‌های بالا منتقل شده‌اند
- [ ] helperی `hasElasticOrOracle` سرویس جداست و سه سرویس انحصاری از آن استفاده می‌کنند
- [ ] عنوان ناوبری فقط از طریق pipe ساخته می‌شود؛ getterی `title` نیست
- [ ] تکرار SqlServer/PostgreSQL در resource / schema-then-table / detailsV2 mapping / finder به لایهٔ مشترک پارامتریک کاهش یافته (تب و route جدا مانده)
- [ ] شل exclusive (enable/disable، external-only، saved-connection، edit lock) بین StarRocks و relational یکدست‌تر شده بدون عوض کردن رفتار picker StarRocks
- [ ] رفتار UI (disable تب‌ها، عنوان، create/edit SqlServer/PostgreSQL/StarRocks) نسبت به قبل تغییر نکرده
- [ ] تست سرویس‌ها، pipe، و seamهای تب پوشش داده شده‌اند
