# 02 — Cut سرتاسری (منو + Ctrl+X + ghost)

Jira: TECSDM-122055

**What to build:** کاربر در grid و tile بتواند انتخاب را با منوی راست‌کلیک یا Ctrl+X وارد Cut pending کند، آیتم‌ها کم‌رنگ (ghost) شوند، Cut جدید جایگزین قبلی شود؛ بدون انتخاب کاری نکند. Copy در منو/شورتکات نباشد.

**Blocked by:** 01 — پایه: کلاینت MoveItems + حافظه Cut pending تب (TECSDM-122054)

**Status:** done

- [x] Cut از context menu روی فایل و پوشه (شامل session empty و Virtual) در هر دو view کار می‌کند
- [x] Ctrl+X همان رفتار Cut را دارد؛ داخل input/مودال rename/create با ویرایش متن تداخل ندارد
- [x] آیتم‌های Cut pending در grid و tile ghost می‌شوند و با replace شدن clipboard به‌روز می‌شوند
- [x] انتخاب خالی Cut را پر نمی‌کند؛ آیتم Copy اضافه نشده است
