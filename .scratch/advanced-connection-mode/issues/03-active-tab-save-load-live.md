# 03 — ذخیره و باز کردن اتصال سفارشی با به‌روزرسانی خودکار

**چه چیزی ساخته شود:** وقتی کاربر در تب اتصال سفارشی است و گزینه به‌روزرسانی خودکار روشن است، با ذخیره یک اتصال سفارشی ساخته یا به‌روز می‌شود؛ فهرست جداول در این حالت ذخیره نمی‌شود و موقع استفاده خوانده می‌شود. باز کردن چنین اتصالی، تب اتصال سفارشی را با همان JSON ذخیره‌شده باز می‌کند. اگر کاربر از تب اتصال ساده ذخیره کند، فقط همان اتصال ساده نوشته می‌شود و پیش‌نویس اتصال سفارشی نادیده گرفته می‌شود.

**مسدودکننده:** TECSDM-121819 — نمایش تب‌های اتصال ساده و اتصال سفارشی

**Status:** done

**Progress:** completed — Active Tab save (Live Opaque / Typed), Default Tab load via Load + LoadUpdateSettings, Object Framework Create/Update for Opaque

**Parent:** TECSDM-121817  
**Spec:** `.scratch/advanced-connection-mode/spec.md`  
**Jira:** [TECSDM-121821](https://jira.mohaymen.ir/browse/TECSDM-121821)

## معیار پذیرش

- [x] ذخیره از اتصال سفارشی با به‌روزرسانی خودکار، اتصال سفارشی را بدون فهرست جداول ذخیره‌شده بنویسد
- [x] ذخیره از اتصال ساده فقط اتصال ساده را بنویسد
- [x] باز کردن اتصال سفارشی، تب اتصال سفارشی را با JSON ذخیره‌شده نشان دهد
- [x] باز کردن اتصال ساده، تب اتصال ساده را باز کند و تب اتصال سفارشی همچنان در دسترس بماند

## Comments

- 2026-10-12: فاز ۳ پیاده‌سازی شد — `MainConnectionFacadeService` برای Active Tab بین Typed و Opaque انشعاب می‌گیرد؛ Create مودال از طریق `ConnectionDesignObjectFrameworkService` با `OpaqueConnectionContent` / `OpaqueConnectionExtraMetadata`؛ لود Opaque با `Load` + `LoadUpdateSettings` و Default Tab.
