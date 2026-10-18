# 01 — آماده‌سازی قوانین انتخاب تکنولوژی در طراحی منبع داده

Jira: TECSDM-122144  
Parent: TECSDM-122084  
Status: ready-for-agent

**What to build:** قوانین انتخاب تکنولوژی در طراحی منبع داده طوری آماده شود که بعداً SQL Server و PostgreSQL مثل StarRocks تک‌تکنولوژی اضافه شوند، بدون خراب شدن Elastic/Oracle/StarRocks. تب جدید هنوز دیده نمی‌شود.

**Blocked by:** None — can start immediately.

## Definition of Done

- [ ] وقتی StarRocks روشن است، تکنولوژی‌های ناسازگار خاموش می‌مانند و تب‌های Elastic/Oracle مثل قبل غیرفعال‌اند
- [ ] وقتی Elastic یا Oracle روشن می‌شود، تکنولوژی‌های انحصاری با هم قاطی نمی‌شوند
- [ ] Elastic و Oracle همچنان می‌توانند با هم روشن باشند
- [ ] نوع اتصال‌های ذخیره‌شده SQL Server و PostgreSQL برای مراحل بعد شناخته می‌شود
- [ ] رفتار Record / فایل / مجازی از نظر قوانین فعلی StarRocks حفظ شده
- [ ] تست‌های مرتبط با انحصار و ناوبری پوشش داده شده‌اند
