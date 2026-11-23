# Claude Code instructions (mono one)

This file is for Claude Code only — Cursor does not read it.

## Codebase memory (auto)

Projects indexed with `codebase-memory-mcp` (MCP defined in `~/.claude.json`):

| Project | Path |
|---------|------|
| ETLEngine | `ETLEngine/` |
| LAP.Base | `LAP.Base/` |
| LAP.DataModel | `LAP.DataModel/` |
| MicroService.AccessManagement | `MicroService.AccessManagement/` |
| MicroService.GIS | `MicroService.GIS/` |
| MicroService.IAP | `MicroService.IAP/` |
| MicroService.LAP.DW | `MicroService.LAP.DW/` |
| Mohaymen.LanguageDictionary.Translations | `Mohaymen.LanguageDictionary.Translations/` |
| Web | `Web/` |

**Always** spawn the appropriate codebase-memory agent instead of raw `Grep`/`Glob` for structural code search:

| Tier | Agent | Use |
|------|-------|-----|
| 1 | `codebase-memory-scout` | Fast provisional search (3–4 graph calls) |
| 2 | `codebase-memory` | Default task-driven exploration |
| 3 | `codebase-memory-auditor` | Full audit with a defined scope |

**Standard workflow:**
1. `list_projects` — select project
2. `index_status` — check index freshness
3. `search_graph` / `trace_path` — search
4. `check_index_coverage` — validate paths
5. Fall back to `Read`/`Grep` for coverage gaps

**After changing files:** check `detect_changes` and run `index_repository` if needed.

## Auto-reindex workflow (mandatory)

Git watch is only enabled on the root project `E-mono-one`. The 9 separate projects are not watched.
**Before every graph query** on a project other than `E-mono-one`, always:

1. Check **only that project** with `detect_changes` — do not check all of them
2. If stale, refresh that one project with `index_repository(mode="full")`
3. Then run the main query

Refresh only the project you need — not all 9. Do not ask the user.

## Custom agents

Three custom agents live in `~/.claude/agents/`:

| Agent | File |
|-------|------|
| `codebase-memory-scout` | `codebase-memory-scout.md` |
| `codebase-memory` | `codebase-memory.md` |
| `codebase-memory-auditor` | `codebase-memory-auditor.md` |

## Reference to AGENTS.md

For shared rules (skills, coding, tests), always read [`AGENTS.md`](AGENTS.md).
