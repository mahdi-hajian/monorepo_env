# FileBrowser — ترتیب اجرا (منبع حقیقت)

**این فایل منبع ترتیب کار است.** تیکت‌های `issues/backend/` و `issues/frontend/` را فقط طبق همین ترتیب بردار.

## قانون اصلی

1. **برای هر قابلیت: اول بک‌اند، بعد فرانت.**  
   تیکت فرانت را شروع نکن مگر همهٔ `Blocked by`های بک‌اندش `done` باشند.
2. **فرانت را جلو نینداز** تا بک «بعداً» برسد — اگر بک همان موج آماده نیست، فرانت آن موج را شروع نکن.
3. **استثنا:** `FE-01` (FileViewer display-file) بک جدید لازم نداشت — **انجام شده (`done`)**.
4. فازهای ۳ / ۵ / ۶ API بک جدید ندارند؛ بعد از آماده بودن هستهٔ create / browse، فقط فرانت‌اند.

وضعیت هر تیکت داخل خود فایل (`Status:`). وقتی تمام شد بگذار `done`.

## Frontier فعلی

موج ۱ تمام است (`BE-01` + `FE-02` done). بعدی: **`BE-02` PrepareView/Download** سپس `FE-03`.

## موج‌ها (Wave)

| موج | اول بک                                | بعد فرانت                       | فاز دامنه | وضعیت    |
| --- | ------------------------------------- | ------------------------------- | --------- | -------- |
| 0   | —                                     | `FE-01` FileViewer display-file | 0         | **done** |
| 1   | `BE-01` ListFiles                     | `FE-02` لیست تخت + شِل          | 1         | **done** |
| 2   | `BE-02` PrepareView/Download          | `FE-03` مشاهده + دانلود         | 1         | next     |
| 3   | `BE-03` Document-from-file + add بالک | `FE-04` UI افزودن sync          | 2         |
| 4   | — (بدون BE جدید)                      | `FE-05` پنل آپلود async         | 3         |
| 5   | `BE-04` FilePath + browse level       | `FE-06` پوشه / session empty    | 4         |
| 6   | —                                     | `FE-07` آپلود پوشه              | 5         |
| 7   | —                                     | `FE-08` DnD آپلود               | 6         |
| 8   | `BE-05` Move FilePath                 | `FE-09` DnD جابجایی تایل        | 7         |
| 9   | `BE-06` Rename Name/prefix            | `FE-10` مودال Rename            | 8         |
| 10  | `BE-07` Copy/Cut/Paste IO             | `FE-11` Cut/Copy/Paste UI       | 9         |

## ترتیب خطی پیشنهادی برای یک agent

```
FE-01 ✓ done
BE-01 → FE-02
BE-02 → FE-03
BE-03 → FE-04 → FE-05
BE-04 → FE-06 → FE-07 → FE-08
BE-05 → FE-09
BE-06 → FE-10
BE-07 → FE-11
```

`FE-09` و `FE-10` بعد از `FE-06` می‌توانند موازی باشند **فقط اگر** بک مربوطه (`BE-05` / `BE-06`) تمام شده باشد.

## مسیر فایل‌ها

- بک: `.scratch/file-browser/issues/backend/`
- فرانت: `.scratch/file-browser/issues/frontend/`
- Spec: `.scratch/file-browser/spec.md`
- دامنه: `plugins/file-browser/CONTEXT.md` + ADRها
