# 02: Expand شل — Host nested menu روی AG Grid (+ async)

**What to build:** قرارداد **Host nested menu** در شل file-browser طوری گسترش یابد که منوی راست‌کلیک **grid** (همان AG Grid) بتواند زیرمنو نشان دهد و فرزندان را در صورت نیاز **async** لود کند؛ فعال‌سازی برگ هویت قابل‌اجرا را به host برگرداند. این تیکت لزوماً رفتار نهایی LoadService محصول را کامل نمی‌کند، ولی قرارداد لازم برای تیکت ۳ را سبز می‌کند.

**Blocked by:** None (can start immediately; parallel with 01).

**Status:** ready-for-agent

**Jira:** TECSDM-159680

- [ ] مدل منوی host از حالت فقط‌تخت خارج می‌شود و children / resolve async را پشتیبانی می‌کند
- [ ] در FileBrowser grid، زیرمنو با chrome فعلی AG Grid دیده می‌شود (نه تعویض به Termeh)
- [ ] فرزندان می‌توانند بعد از باز شدن منو/والد لود شوند (حالت loading قابل مشاهده)
- [ ] کلیک روی برگ، درخواست فعال‌سازی با هویت برگ را به host می‌دهد (نه فقط id والد مبهم)
- [ ] تست روی قرارداد عمومی منوی host / تبدیل به منوی grid، بدون الزام به کل فلو LoadService
