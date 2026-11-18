# 03: FileBrowser grid — LoadService context execute

**What to build:** در نمای **grid**ی FileBrowser، راست‌کلیک LoadService زیرمنوی async از **LoadService service tree** را نشان دهد؛ انتخاب سرویس → **LoadService context execute** (Parameters-only modal یا اجرای بی‌پارامتر) روی selection فعلی فایل/پوشه. آیتم «بیشتر…» (در صورت truncation مثل Graph) می‌تواند **LoadService browse** را باز کند. Ribbon دست‌نخورده می‌ماند. Tile خارج از این تیکت است.

**Blocked by:** 01 (shared LoadService service tree), 02 (Host nested menu AG Grid async).

**Status:** ready-for-agent

**Jira:** TECSDM-159681

- [ ] راست‌کلیک LoadService در FileBrowser grid درخت سرویس را async نشان می‌دهد (نه مودال browse به‌عنوان مسیر پیش‌فرض)
- [ ] انتخاب سرویس دارای پارامتر → Parameters-only modal
- [ ] انتخاب سرویس بدون پارامتر → اجرا روی selection بدون مودال لیست سرویس
- [ ] هدف اجرا همان selection فایل/پوشهٔ FileBrowser است
- [ ] Ribbon همچنان LoadService browse است
- [ ] در صورت truncation، «بیشتر…» می‌تواند browse را باز کند (الگوی Graph)
- [ ] تست seam اصلی: بعد از انتخاب برگ سرویس، outcome برابر context execute است نه browse
