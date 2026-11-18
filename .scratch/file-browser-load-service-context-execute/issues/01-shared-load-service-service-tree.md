# 01: Prefactor — LoadService service tree مشترک

**What to build:** یک سازندهٔ مشترک برای **LoadService service tree** تا Graph و FileBrowser از یک منبع درخت پوشه/سرویس تغذیه شوند. رفتار راست‌کلیک Graph (context execute) و Ribbon (browse) نباید پسرفت کند؛ FileBrowser هنوز الزاماً منوی تو در تو ندارد، ولی می‌تواند همان درخت را بعداً مصرف کند.

**Blocked by:** None (can start immediately).

**Status:** ready-for-agent

**Jira:** TECSDM-159679

- [ ] یک سازندهٔ مشترک درخت سرویس‌داده وجود دارد و قوانین mapping پوشه/سرویس را متمرکز می‌کند
- [ ] Graph همچنان LoadService context execute را از همین درخت (یا معادل هم‌ارز) انجام می‌دهد بدون پسرفت UX
- [ ] Ribbon همچنان LoadService browse است
- [ ] تست واحد روی رفتار خارجی mapper/tree (نه جزئیات UI منو)
