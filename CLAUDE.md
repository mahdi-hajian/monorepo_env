# Claude Code instructions (mono one)

این فایل فقط برای Claude Code است — Cursor آن را نمی‌خواند.

## Codebase memory (auto)

پروژه‌های ایندکس‌شده با `codebase-memory-mcp` (MCP تعریف‌شده در `~/.claude.json`):

| پروژه | مسیر |
|-------|------|
| ETLEngine | `ETLEngine/` |
| LAP.Base | `LAP.Base/` |
| LAP.DataModel | `LAP.DataModel/` |
| MicroService.AccessManagement | `MicroService.AccessManagement/` |
| MicroService.GIS | `MicroService.GIS/` |
| MicroService.IAP | `MicroService.IAP/` |
| MicroService.LAP.DW | `MicroService.LAP.DW/` |
| Mohaymen.LanguageDictionary.Translations | `Mohaymen.LanguageDictionary.Translations/` |
| Web | `Web/` |

**همیشه** به جای `Grep`/`Glob` خام برای جستجوی ساختاری کد، agent مناسب codebase-memory را spawn کن:

| Tier | Agent | کاربرد |
|------|-------|--------|
| 1 | `codebase-memory-scout` | جستجوی سریع provisional (۳-۴ فراخوانی گراف) |
| 2 | `codebase-memory` | اکتشاف وظیفه‌محور پیش‌فرض |
| 3 | `codebase-memory-auditor` | ممیزی کامل با scope مشخص |

**گردش کار استاندارد:**
1. `list_projects` — انتخاب پروژه
2. `index_status` — بررسی تازگی ایندکس
3. `search_graph` / `trace_path` — جستجو
4. `check_index_coverage` — اعتبارسنجی مسیرها
5. fallback به `Read`/`Grep` برای شکاف‌های coverage

**بعد از تغییر فایل‌ها:** `detect_changes` را چک کن و در صورت نیاز `index_repository` بزن.

## Agentهای سفارشی

سه agent سفارشی در `~/.claude/agents/`:

| Agent | فایل |
|-------|------|
| `codebase-memory-scout` | `codebase-memory-scout.md` |
| `codebase-memory` | `codebase-memory.md` |
| `codebase-memory-auditor` | `codebase-memory-auditor.md` |

## ارجاع به AGENTS.md

برای قوانین مشترک (مهارت‌ها، کدنویسی، تست)، فایل [`AGENTS.md`](AGENTS.md) را همیشه بخوان.