# 04 — کاتالوگ پین‌شده + probe با شناسه + پذیرش facade

**چه چیزی ساخته شود:** با خاموش بودن UpdateWhileUsingConnection، نویسنده پیش‌نمایش بگیرد، جدول‌ها را در پنل چپ انتخاب کند و ذخیره DataSource پین‌شده را بنویسد. بعد از ذخیره، Test/Preview با شناسه اتصال ذخیره‌شده کار کنند. تست‌های پذیرش facade پوشش Active Tab، Tab Draft، Live در برابر Pinned و مسیریابی probe را بدهند.

**مسدودکننده:** 02 — Opaque REST Probe + نمایشگر مبتنی بر کاتالوگ؛ 03 — ذخیره/بارگذاری تب فعال — کاتالوگ زنده

**Status:** ready-for-agent

**Parent:** TECSDM-121817  
**Spec:** `.scratch/advanced-connection-mode/spec.md` (TECSDM-121818)  
**Jira:** [TECSDM-121822](https://jira.mohaymen.ir/browse/TECSDM-121822)

- [ ] حالت پین: پیش‌نمایش → انتخاب پنل چپ → ذخیره شامل DataSource Opaque
- [ ] حالت زنده همچنان جزئیات پین را در ذخیره نگذارد
- [ ] بعد از ذخیره Opaque، Test/Preview مسیر REST با شناسه را ترجیح دهند
- [ ] تست facade ذخیره تب فعال، ماندن پیش‌نویس، Live/Pinned و payload در برابر id را پوشش دهد
- [ ] رگرسیون تب فرم برای Test/Update/Save تایپ‌شده سبز بماند
