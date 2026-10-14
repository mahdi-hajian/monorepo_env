# 01 — پایه: کلاینت MoveItems + حافظه Cut pending تب

Jira: TECSDM-122054

**What to build:** هاست FileBrowser بتواند payload مربوط به Cut pending را در سشن تب نگه دارد / خالی کند و متد `MoveItems` را از API پلاگین صدا بزند؛ بدون UX کامل منو/شورتکات در این تیکت — قابل تأیید با تست واحد.

**Blocked by:** None — can start immediately.

**Status:** done

- [x] کلاینت API برای `MoveItems` با شکل درخواست/پاسخ هم‌تراز بک‌اند موجود است و تست واحد دارد
- [x] حافظهٔ تب‌اسکوپ Cut pending می‌تواند set / clear / replace شود و با بستن تب از بین می‌رود
- [x] Copy / OS clipboard در این تیکت اضافه نشده است
