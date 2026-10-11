# TECSDM-121959 — تأخیر فرانت در `app-search-view` قبل از نتیجهٔ جستجو

## وضعیت

- **هدف الان:** تشخیص با لاگ Call Stack مشتری — **هنوز fix رفتاری نده.**
- **مشاهدهٔ مشتری:** درخواست‌های بک‌اند زمان‌بر نیستند؛ زمان روی فرانت (JS / orchestration / پردازش لوکال) می‌سوزد.
- **لاگ تست لوکال** فقط برای اعتبارسنجی instrumentation بوده؛ نتیجهٔ آن را به‌عنوان حقیقت مشتری فرض نکن.

وقتی کاربر `TECSDM-121959` + فایل `call-stack-log.json` فرستاد → این سند را بخوان، JSON را تحلیل کن، فرضیه‌ها را CONFIRMED/REJECTED کن، بعد تازه دربارهٔ fix حرف بزن.

---

## خلاصهٔ مسئله

بعد از submit جستجو در فرم، قبل از حس «نتیجه آماده است»، فرانت کار زیاد می‌کند؛ گاهی لودینگ هست گاهی نه. Network مشتری APIهای بیشتری نسبت به لوکال (مسیر گرم) نشان می‌دهد.

### Network — نمونهٔ گزارش‌شده (نه از Call Stack)

**مشتری (سنگین / cold-ish):**  
`GetAdvancedSearchSuggestions`×N → `GetDWConnections` → `GetSources` → `GetSimorghWarehouses` → `GetModelWrapper` → `GetSimorghWarehouses` → `LoadEventStoreSearchSetting` → `GetSearchSummary` → `GetSimorghData`

**لوکال (گرم):**  
`GetAdvancedSearchSuggestions` → `GetSources` → `GetSimorghWarehouses` → `GetSearchSummary` → `GetSimorghData`

---

## نقشهٔ کد (entry → preload → summary)

| منبع | متد | `reloadSetting` |
|------|------|-----------------|
| Mount هیستوگرام | `SearchResultViewHistogramComponent.ngAfterViewInit` → `search(true)` | **همیشه `true`** |
| جستجو از فرم روی result | `search` / `searchWithFormHandler` → `histogram.search()` | پیش‌فرض **`false`** |

```
SearchBarService.search(reloadSetting)          // clearLogsBefore روی CallStack
  └─ loadHistograms (فقط اگر URL شامل /search/result)
       ├─ getAllConnectionsList → getDWConnections → GetDWConnections (cache miss)
       └─ Promise.all([
            reloadItemsSummary → [getModelWrapper?] → searchAllConnections
              → getSources / getOntology per connection
            reloadRecordsSummary(reloadSetting)
              ├─ if reloadSetting: reloadEventStoreSettings
              │     warehouses=null; reloadEventStoreSearchSetting() NO-OP;
              │     reloadWarehouseStructs → GetSimorghWarehouses
              └─ getAllEventSummaries → getEventSummary
                    → getSummary → getSummaryFromServer
                      → getSearchRequest (createSearchRequest / setCommon… / getRequestClause / getForms)
                      → getWarehouses
                      → fetchInternalGetSearchSummary → GetSearchSummary
                    → convertToEventsHistogramData / …
```

### لودینگ UI

- `#events-histogram-container` / `#items-histogram-container` + `LegacyLoading`
- اگر DOM آماده نباشد، تأخیر بدون لودینگ حس می‌شود.

---

## فرضیه‌ها

| ID | فرضیه |
|----|--------|
| H-A | `search(true)` روی mount مسیر `reloadEventStoreSettings` را باز می‌کند؛ جستجوی بعدی فرم اغلب `false` است. |
| H-B | `GetDWConnections` فقط روی cache miss شبکه می‌زند. |
| H-C | `GetModelWrapper` وقتی `modelWrapper` خالی است / ontology مجبور به fetch است. |
| H-D | `GetAdvancedSearchSuggestions` جدا از submit (autocomplete). |
| H-E | تأخیر از awaitهای ترتیبی + کار JS لوکال است؛ لودینگ کل بازه را پوشش نمی‌دهد. |
| H-F | `reloadSetting=true` → `warehouses=null` باعث `GetSimorghWarehouses` تکراری؛ در حالی که `reloadEventStoreSearchSetting` practically no-op است. |
| H-G | بک‌اند سریع است؛ گلوگاه `duration` متدهای فرانت / فاصلهٔ enter–exit بدون فرزند instrument‌شده است. |

کاندیدهای کار لوکال (از کد، نه fix): صف `getSources`→`getOntology`، `await getAllConnectionsList` قبل از `Promise.all`، پاک کردن warehouses، `camelcaseKeys`/`cloneDeep`/ساخت هیستوگرام، parse `localStorage` مدل، تعداد connection بیشتر روی مشتری.

---

## Instrumentation فعلی (آمادهٔ لاگ مشتری)

### شکل خروجی JSON

هر entry تقریباً فقط:

| فیلد | معنی |
|------|------|
| `order` | شمارهٔ فراخوانی (enter/exit یک order دارند) |
| `timestamp` | **رشتهٔ ISO-8601 UTC** مثل `2026-10-11T13:28:00.123Z` |
| `className` | پیشوند `TECSDM-121959.` + نام سرویس |
| `methodName` | نام متد |
| `event` | `enter` / `exit` / `error` |
| `duration` | فقط روی exit/error — **میلی‌ثانیه** (`performance.now` diff) |
| `scopeId` | گاهی (مثلاً connectionId) |

**عمداً حذف شده برای این تیکت:** `arguments`, `stackTrace`, `result`  
(`omitArguments` / `omitStackTrace` + `buildResult: tecsdm121959OmitResult`)

Helper:  
`iap/.../events-search-result-view/call-stack-log/tecsdm-121959-omit-result.ts`

Infra flags در `@mohaymen/base-utilities`: `CallStackTraceOptions.omitArguments` / `omitStackTrace`.

### Entry و پاک‌سازی بافر

- `SearchBarService.search` → `clearLogsBefore: true` (هر جستجو بافر تمیز)
- توجه: اگر والد `SearchResultViewHistogramComponent.search` قبل از آن enter زده باشد، آن enter ممکن است با clear پاک شود؛ exit والد ممکن است بماند — برای تحلیل duration روی `SearchBarService.*` تمرکز کن.

### متدهای instrument‌شده (className = `TECSDM-121959.*`)

| Class | Methods (مهم) |
|-------|----------------|
| `SearchResultViewHistogramComponent` | `search` |
| `SearchBarService` | `search`, `loadHistograms`, `reloadItemsSummary`, `reloadRecordsSummary`, `getModelWrapper`, `reloadEventStoreSettings` |
| `BaseHistogramService` | `getAllConnectionsList` |
| `LADWConnectionSelectorService` | `getDWConnections` |
| `ItemsSearchService` | `searchAllConnections` |
| `OntologyService` | `getSources`, `getOntology`, `getModelWrapper`, `getLastModelWrapper`, `checkLastModelAndSettingId` |
| `SearchEventsHistogramService` | `getEventSummary`, `getAllEventSummariesForAllConnections`, `getSummaryFromServer`, `getSearchRequest`, `getInternalWarehousesSummaryFromServer`, **`fetchInternalGetSearchSummary` (= GetSearchSummary)**, external summary helpers, `reloadWarehouseStructs`, `getVirtualWarehouseItems` |
| `EventsHistogramService` | `getWarehouses`, `getSummary`, `changeHistogramResult`, `setHistogramItemsMap`, `convertToEventsHistogramData` |
| `BaseEventsExploreService` | `getSimorghWarehouses`, `getRequestClause` |
| `EventsExploreTextSearchService` | `createSearchRequest` |
| `EventsExploreSearchService` | `setCommonSearchSettings`, `setWarehouseSettingDtOs` |
| `EventStoreSearchSettingService` | `getEventStoreSearchSetting`, `getChangedEventSearchSetting` |
| `SearchFormService` | `getForms` |
| `SearchableConnectionsService` | `canSearchConnection` |

`fetchInternalGetSearchSummary` / `GetSearchSummary-external` برای جدا کردن انتظار شبکه از کار لوکال اطراف آن است.

---

## جمع‌آوری لاگ روی مشتری

1. `web.uiconfig`: `<add key="EnableCallStackLog" value="true"/>` (پیش‌فرض ریپو `false`)
2. دیپلوی branch دارای دکوراتورهای `TECSDM-121959.*` + hard refresh
3. **یک‌بار** سناریوی کند (ترجیحاً همان مسیر مشکل‌دار)
4. Platform Info → دانلود Call Stack Log → `call-stack-log.json`
5. فایل را در چت بفرست و بگو **`TECSDM-121959`**

---

## پلی‌بوک تحلیل وقتی JSON مشتری رسید

1. فقط entryهای `className` شامل `TECSDM-121959` را در نظر بگیر.
2. `exit`ها را بر اساس `duration` (ms) مرتب کن — top parents:  
   `search` → `loadHistograms` → `reloadRecordsSummary` / `reloadItemsSummary` → `getEventSummary` → …
3. تایم‌لاین بساز: `enter`/`exit` با `timestamp` ISO و تورفتگی تودرتو.
4. برای هر والد کند: مجموع / پوشش فرزندان instrument‌شده را ببین.
   - اگر `duration(parent) ≫` زمان فرزندان شناخته‌شده → یا شبکهٔ فرزند (مثل `fetchInternalGetSearchSummary`) یا کار لوکال بدون دکوراتور.
5. مخصوصاً چک کن:
   - آیا `reloadEventStoreSettings` صدا شده؟ (نشانهٔ `reloadSetting=true` / mount)
   - `fetchInternalGetSearchSummary` چند ms؟ (اگر زیاد → برخلاف ادعای «بک‌اند سریع»؛ با Network مشتری تطبیق بده)
   - فاصلهٔ enter→exit بدون فرزند در `getSummary` / `getSummaryFromServer` / `convertToEventsHistogramData` / `createSearchRequest` / …
6. فرضیه‌های H-A…H-G را با شاهد از همان JSON علامت بزن.
7. **fix ننویس** مگر کاربر صریح بخواهد؛ اول خلاصهٔ فارسی از گلوگاه بده.

### نکته دربارهٔ لاگ تست لوکال (فقط مرجع روش تحلیل)

در یک JSON تستی قبلی، غالب زمان داخل `getEventSummary` بود و قبل از instrument شدن `GetSearchSummary` یک خلأ ~۱s دیده شد. بعد از instrument فعلی، همان خلأ باید به متد مشخص (شبکه یا لوکال) شکسته شود. آن اعداد را به‌عنوان دادهٔ مشتری استفاده نکن.

---

## فایل‌های کلیدی کد

| نقش | مسیر |
|-----|------|
| ارکستراسیون | `iap/app/search-view/services/search-bar.service.ts` |
| هیستوگرام entry | `iap/.../search-result-view-histogram.component.ts` |
| Summary events | `iap/.../search-events-histogram.service.ts` |
| Warehouses | `iap/app/services/explore/base-events-explore.service.ts` |
| Ontology / Sources | `iap/app/services/ontology-service/ontology.service.ts` |
| Call stack service | `base-utilities/.../call-stack-log/call-stack-log.service.ts` |
| Doc infra | `base-utilities/.../call-stack-log/doc/CALL-STACK-LOG.md` |

---

## قواعد برای ایجنت

1. با `TECSDM-121959` اول همین فایل را بخوان.
2. تا تحلیل لاگ مشتری: **fix رفتاری نده**؛ instrumentation را بی‌دلیل عوض نکن مگر برای پوشش خلأ جدید در لاگ.
3. زیرساخت Call Stack عمومی را حذف نکن؛ دکوراتورهای `TECSDM-121959.*` را فقط وقتی کاربر بگوید پاک کن.
4. کاندید fixهای قبلی (مثلاً skip `warehouses=null` وقتی settings reload no-op است) فقط ایده هستند تا با لاگ مشتری اثبات شوند.
