# 03 — ذخیره/بارگذاری تب فعال — کاتالوگ زنده

**چه چیزی ساخته شود:** ذخیره از تب سفارشی با کاتالوگ زنده (UpdateWhileUsingConnection = true) یک اتصال Opaque بسازد/به‌روز کند (OpaqueJson + Payload بدون جزئیات DataSource پین‌شده). باز کردن اتصال Opaque تب سفارشی را به‌عنوان تب پیش‌فرض باز کند و Payload را بارگذاری کند. ذخیره از تب فرم همچنان فقط اتصال Typed بنویسد.

**مسدودکننده:** 01 — پوسته تب سفارشی + چیدمان + پیش‌نویس تب

**Status:** ready-for-agent

**Parent:** TECSDM-121817  
**Spec:** `.scratch/advanced-connection-mode/spec.md` (TECSDM-121818)  
**Jira:** [TECSDM-121821](https://jira.mohaymen.ir/browse/TECSDM-121821)

- [ ] تب فعال = سفارشی + Live → ذخیره محتوای Opaque بدون جزئیات پین‌شده بنویسد
- [ ] تب فعال = فرم → فقط Typed ذخیره شود (پیش‌نویس سفارشی نادیده گرفته شود)
- [ ] بارگذاری Opaque تب سفارشی را با Payload ذخیره‌شده باز کند
- [ ] بارگذاری Typed تب فرم را باز کند؛ تب سفارشی در دسترس بماند
- [ ] تست facade شکل بدنه ذخیره Live Opaque در برابر Typed را پوشش دهد
