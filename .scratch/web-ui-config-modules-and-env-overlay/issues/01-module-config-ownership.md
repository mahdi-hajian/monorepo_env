# 01 — مالکیت ماژولی کانفیگ + getImapConfig

**What to build:** کلیدهای کانفیگ ماژول‌های IMAP، BDMP، PAP و DIA از Shell Web Config جدا شوند و روی Module Web Config با default کد بنشینند؛ `getImapConfig` کنار getters موجود در دسترس باشد؛ با `web.uiconfig` و بدون Environment Overlay، اپ مثل امروز بالا بیاید و دسترسی flat و typed سالم بماند.

**Blocked by:** None — can start immediately.

**Status:** ready-for-agent

- [ ] Shell Web Config فقط کلیدهای مشترک وب را در بدنهٔ کلاس دارد؛ کلیدهای ماژول روی کلاس/تایپ ماژول با code default هستند
- [ ] `getImapConfig` / `getBdmpConfig` / `getPapConfig` / `getDiaConfig` کلیدهای ماژول مربوط را با type می‌دهند
- [ ] Resolve اولیه: defaultهای کد ← Customer Web UI Config؛ بدون `__WEB_ENV__` رفتار serve مثل قبل است
- [ ] تست روی seam resolve (default + فایل) و getters؛ compile مصرف‌کننده‌های موجود سبز می‌ماند
