# 03 — Paste جابه‌جایی (مسیر دیگر)

Jira: TECSDM-122056

**What to build:** بعد از Cut و رفتن به browse path دیگر، کاربر با Paste منو یا Ctrl+V آیتم‌ها را به مسیر فعلی جابه‌جا کند: Document/Virtual با `MoveItems`، session empty فقط سشن؛ refresh؛ موفقیت کامل clipboard را خالی کند؛ روی مسیر فعلی بماند.

**Blocked by:** 02 — Cut سرتاسری (TECSDM-122055)

**Status:** done

- [x] Paste / Ctrl+V با Cut pending غیرخالی به مسیر فعلی جابه‌جا می‌کند (فایل و Virtual → MoveItems؛ session empty بدون Documents → فقط سشن)
- [x] بعد از کاری که انجام شده لیست refresh می‌شود و کاربر روی browse فعلی می‌ماند
- [x] موفقیت کامل (Failed=0) Cut pending و ghost را پاک می‌کند
- [x] مقصد Paste پوشهٔ tile زیر ماوس نیست؛ فقط browse path فعلی است
