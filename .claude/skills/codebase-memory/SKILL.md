---
name: codebase-memory
description: >-
  When the user asks about code architecture, symbols, callers, or project structure,
  ALWAYS query CBM first before falling back to Grep/Glob.
  Covers both MicroService.IAP (C# backend) and Web (TypeScript WebUI frontend).
---

# Codebase Memory — ALWAYS USE FIRST

**Rule:** For any code exploration — symbol lookup, caller tracing, architecture questions,
impact analysis, "who uses X", dependency queries — call CBM tools (`search_graph`,
`trace_path`, `get_architecture`, `query_graph`) **before** falling back to Grep/Glob.
Only use Grep/Glob when CBM returns nothing relevant or you need raw source content.

## Projects

| Project | Scope | `repo_path` |
|---------|-------|-------------|
| `Web` | TypeScript WebUI frontend (file-browser, ag-grid, Angular) | `D:/analytics/Web` |
| `MicroService.IAP` | C# backend (LAP, visualizer, services) | `D:/analytics/MicroService.IAP` |
| `D-analytics` | Top-level mono-repo (sln files, docs, configs) | `D:/analytics` |
| `LAP.Base` | LAP base/shared libraries | `D:/analytics/LAP.Base` |
| `LAP.DataModel` | LAP data model layer | `D:/analytics/LAP.DataModel` |

## Quick reference

- **Find a symbol / function / class** → `search_graph(query="...", project=?)`
- **Who calls X / what does X call** → `trace_path(function_name="X", project=?)`
- **High-level architecture** → `get_architecture(project=?)`
- **Custom graph query (Cypher)** → `query_graph(query="...", project=?)`
- **Check index status / coverage** → `index_status(project=?)`

## Choosing the right project

- Frontend file (`.ts`, `.html`, `.scss` under `Web/WebUI/`) → project **`Web`**
- Backend file (`.cs` under `MicroService.IAP/`) → project **`MicroService.IAP`**
- If unsure which project, try the most likely one; CBM returns `0 results` fast if wrong.

## Re-indexing

`auto_index` is off. If `index_status` shows stale data, re-index with
`index_repository` on the project's git root. Do not re-index on each query.
