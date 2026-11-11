# 01 — Paste روی منوی راست‌کلیک پوشه (ورود به داخل پوشه)

Jira: TECSDM-159026

**What to build:** وقتی Cut pending غیرخالی است، Paste در منوی راست‌کلیک **پوشه** (grid و tile) دیده شود و آیتم‌ها را به **مسیر همان پوشه** ببرد (`DestinationPath` = path پوشه)، نه browse path فعلی. ممنوعیت self/descendant مثل DnD؛ same-parent فقط clear بدون API؛ پس‌زمینه/فایل/Ctrl+V همان فاز ۹.

**Blocked by:** None (Cut+Paste موج قبلی انجام شده).

**Status:** ready-for-agent

- [ ] Paste روی منوی پوشه وقتی clipboard پر است در tile و grid ظاهر می‌شود
- [ ] مقصد Paste = path پوشهٔ راست‌کلیک‌شده (ورود به داخل پوشه)
- [ ] Paste روی پوشه‌ای که خودش یا فرزندش در Cut است ممنوع/غیرفعال است
- [ ] اگر والد همهٔ آیتم‌های Cut همان مقصد باشد → clear Cut pending بدون `MoveItems`
- [ ] موفقیت: refresh، ماندن روی browse فعلی، clear clipboard فقط اگر Failed=0
- [ ] Paste پس‌زمینه / فایل / Ctrl+V همچنان به browse path فعلی می‌رود
