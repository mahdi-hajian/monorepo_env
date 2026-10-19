# 02 — Environment Config Overlay روی resolve

**What to build:** بعد از بارگذاری Customer Web UI Config، اگر `window.__WEB_ENV__` ست شده باشد روی Flat Web Config merge شود (env برنده)؛ coerce مقادیر مثل parse XML؛ اگر overlay نباشد رفتار تیکت ۰۱ حفظ شود.

**Blocked by:** 01 — مالکیت ماژولی کانفیگ + getImapConfig

**Status:** done

- [x] با `__WEB_ENV__`، کلیدهای env روی نتیجهٔ فایل/default می‌نشینند و در تداخل env برنده است
- [x] رشته‌های `true`/`false` و عدد خالص مثل XML به boolean/number coerce می‌شوند
- [x] نبودن `__WEB_ENV__` خطا نمی‌دهد و نتیجه همان default + فایل است
- [x] تست روی همان seam resolve: precedence، absent، coerce
