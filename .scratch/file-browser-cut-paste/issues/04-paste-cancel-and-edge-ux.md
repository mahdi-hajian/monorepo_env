# 04 — لغو و لبه‌ها (same-path، Escape، پس‌زمینه، partial)

Jira: TECSDM-122057

**What to build:** Paste در همان پوشهٔ Cut فقط از Cut خارج شود بدون API؛ Escape خارج از input/مودال clipboard را خالی کند؛ Paste روی پس‌زمینهٔ خالی وقتی clipboard پر است؛ Failed>0 گزارش + نگه‌داشتن clipboard؛ Paste با clipboard خالی بی‌اثر/غیرفعال.

**Blocked by:** 03 — Paste جابه‌جایی (TECSDM-122056)

**Status:** done

- [x] Paste روی همان browse path منبع Cut → clear Cut pending، بدون `MoveItems`
- [x] Escape در FileBrowser (خارج از input/مودال) Cut pending و ghost را پاک می‌کند
- [x] وقتی Cut pending غیرخالی است Paste از منوی پس‌زمینهٔ خالی در دسترس است
- [x] نتیجهٔ نیمه‌موفق MoveItems: refresh + گزارش؛ clipboard فقط اگر Failed=0 خالی می‌شود؛ Paste با clipboard خالی کاری نمی‌کند
