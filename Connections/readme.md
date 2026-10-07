من یه توضیحی در مورد اینکه تو هر سکشن کدوم ریکوئست بدردتون می‌خوره برای Opaque می‌دم.

1. Create
   1.1. Create OpaqueJson
   این برای ساخت اتصال با updateWhileUsingConnection = true هست.
   1.۲. Create OpaqueJson Pinned AtidPeople
   این برای ساخت اتصال با updateWhileUsingConnection = false و یک‌ تیبل انتخاب شده توسط کاربر هست.

2. Get Connections
   2.1 GET Opaque Connections v2
   مربوط به ای‌پی‌آی نسخه ۲ی api/v2/connections/ هست. که قراره تغییر رفتار بده و هرنوع اتصالی رو برگردونه. (لگاسی و Opaque)

2.2 GET Opaque Connection By Id v2
آیدی اتصال Opaque رو میگیره و اطلاعاتش رو برمی‌گردونه.

2.3 LoadList All Connections
تمام اتصال‌ها از هر نوعی رو برمی‌گردونه.

3. Load By ID
   3.1 Load OpaqueJson
   ای پی آی قدیمی که آیدی اتصال می‌گیره و اطلاعاتش رو برمی‌گردونه. هر آیدی‌ای بهش بدید، اتصال مرتبط بهش رو برمی‌گردونه.

3.2 LoadWithFolderList OpaqueJson
مثل بالایی ولی کانتنت (Payload) هم لود می‌کنه

4. Delete
   4.1 Delete OpaqueJson
   اتصال Opaque رو پاک می‌کنه.

5. Update
   ۵.۱ LoadUpdateSettings OpaqueJson
   مشابه ریکوئست 3.2 عمل می‌کنه با کمی اطلاعات بیشتر راجع به نقش‌های دسترسی و...

5.2 UpdateMetadata OpaqueJson
با این می‌تونید Payload یه اتصال Opaque که قبلا ساخته شده رو کامل تغییر بدید. هرچیزی که بذارید کامل جایگزین قبلی می‌شه.

6. Test Connection
   6.1 TestConnection OpaqueJson
   تست اتصال با استفاده از Payload درحالی که اتصال هنوز ذخیره نشده

6.2 TestConnection OpaqueJson Stored
تست اتصال با آیدی اتصالی که در گذشته ذخیره شده

7. Data Sources
   7.1 GetDataSources OpaqueJson
   آیدی اتصالی که در گذشته ساخته شده رو می‌گیره، دیتاسورس‌هاش بر اساس اینکه کاربر موقع ساخت اتصال updateWhileUsingConnection رو چه مقداری داده برمی‌گرده.

10 REST Test Connection
10.1 POST Test REST OpaqueJson Payload
این ای‌پی‌آی جدید تست اتصال‌ هست که بصورت کنترلر asp ساخته شده و mrpc نیست. هردو نوع اتصال رو پشتیبانی می‌ده و می‌شه ازش بعنوان تست اتصال، اتصال‌های قدیمی و جدید-Opaque استفاده کرد.
ورودی آن Payload خام هست که بدون نیاز به ذخیره شدن، اتصال رو تست می‌کنه.

10.2 POST Test REST OpaqueJson Stored
آیدی اتصالی که در گذشته ذخیره شده رو بعنوان ورودی می‌دید و تست اتصال اون رو می‌گیره.

11 REST Preview Data Sources
11.1 POST Preview REST OpaqueJson Payload
مشابه مورد ۷ (Data Sources) اما قبل از اینکه اتصال ذخیره شده باشد استفاده می‌شود. Payload بصورت خام به آن ورودی داده می‌شود و دیتاسورس‌های آن را برمی‌گرداند.
