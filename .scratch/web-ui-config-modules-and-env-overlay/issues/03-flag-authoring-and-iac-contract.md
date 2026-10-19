# 03 — قرارداد نویسندگان فلگ + IaC

**What to build:** مسیر افزودن فلگ ماژول برای نویسندگان (ماژول type + `web.uiconfig` + نام اختیاری `WEB__…`) در skill/مستند هم‌خوان با رفتار پیاده‌شده باشد؛ قرارداد inject برای `window.__WEB_ENV__` از متغیرهای `WEB__*` برای ops/IaC مستند شود (بدون الزام پیاده‌سازی کامل StarPackage در این ریپو).

**Blocked by:** 01 — مالکیت ماژولی کانفیگ + getImapConfig؛ 02 — Environment Config Overlay روی resolve

**Status:** ready-for-agent

- [ ] skill/مستند افزودن فلگ وب دیگر Shell را برای کلید ماژول هدف نمی‌گیرد
- [ ] نام‌گذاری `WEB__` + عین کلید PascalCase و اولویت merge در قرارداد ops آمده است
- [ ] نمونه/قرارداد inject `__WEB_ENV__` (اسکریپت یا شبه-کد entrypoint) طوری است که IaC بتواند بدون حدس پیاده کند
- [ ] CONTEXT/ADR با رفتار نهایی هم‌خوان است
