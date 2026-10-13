# 04 — انتخاب و ذخیره جداول برای اتصال سفارشی

**چه چیزی ساخته شود:** وقتی به‌روزرسانی خودکار خاموش است، کاربر ابتدا پیش‌نمایش بگیرد، جداول مورد نظر را در پنل جداول انتخاب کند و با ذخیره، همان انتخاب همراه اتصال سفارشی نگه داشته شود. بعد از ذخیره، آزمایش اتصال و پیش‌نمایش با شناسه اتصال ذخیره‌شده کار کنند. رفتار اتصال ساده و حالت به‌روزرسانی خودکار همچنان درست بماند.

**مسدودکننده:** TECSDM-121820 — آزمایش اتصال و پیش‌نمایش جداول در اتصال سفارشی؛ TECSDM-121821 — ذخیره و باز کردن اتصال سفارشی با به‌روزرسانی خودکار

**Status:** ready-for-agent

**Progress:** implementation landed — Pinned Catalog save, Live omits dataSource, post-save Test with id, loader hydrates viewer; awaiting optional Karma run / QA sign-off

**Parent:** TECSDM-121817  
**Spec:** `.scratch/advanced-connection-mode/spec.md`  
**Jira:** [TECSDM-121822](https://jira.mohaymen.ir/browse/TECSDM-121822)

## معیار پذیرش

- [x] با خاموش بودن به‌روزرسانی خودکار: پیش‌نمایش ← انتخاب جداول ← ذخیره همراه با فهرست انتخاب‌شده
- [x] با روشن بودن به‌روزرسانی خودکار، فهرست جداول در ذخیره نیاید
- [x] بعد از ذخیره اتصال سفارشی، آزمایش و پیش‌نمایش با شناسه اتصال کار کنند
- [x] رفتار اتصال ساده برای آزمایش، به‌روزرسانی و ذخیره مثل قبل درست بماند _(Simple strategy untouched; unchanged path)_

## Comments

- 2026-10-12: پیاده‌سازی شروع شد — `OpaqueConnectionDataSourceCatalogBuilderService` کاتالوگ را از پنل جداول می‌سازد؛ `OpaqueConnectionObjectBuilderService` فقط در Pinned Catalog آن را به محتوا اضافه می‌کند؛ Live بدون `dataSource` ذخیره می‌شود؛ `testConnection` در Custom Tab با `useStoredIdOnly` پس از ذخیره شناسه را می‌فرستد؛ لود Opaque کاتالوگ پین‌شده را به viewer برمی‌گرداند.
