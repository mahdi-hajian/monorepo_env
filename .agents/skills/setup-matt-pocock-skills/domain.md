# Domain Docs

How skills read domain docs when explore repo.

## Before exploring, read these

- **`CONTEXT.md`** at repo root, or
- **`CONTEXT-MAP.md`** at repo root if exists — it point at one `CONTEXT.md` per context. Read each one relevant to topic.
- **`docs/adr/`** — read ADRs that touch area you work in. Multi-context repo? Also check `src/<context>/docs/adr/` for context ADRs.

If any file missing, proceed silent. No flag absence. No suggest make. `/domain-modeling` skill (via `/grill-with-docs` and `/improve-codebase-architecture`) make them lazy when terms or decisions resolved.

## File structure

One-context repo (most repos):

```
/
├── CONTEXT.md
├── docs/adr/
│   ├── 0001-event-sourced-orders.md
│   └── 0002-postgres-for-write-model.md
└── src/
```

Multi-context repo (have `CONTEXT-MAP.md` at root):

```
/
├── CONTEXT-MAP.md
├── docs/adr/                          ← system-wide decisions
└── src/
    ├── ordering/
    │   ├── CONTEXT.md
    │   └── docs/adr/                  ← context-specific decisions
    └── billing/
        ├── CONTEXT.md
        └── docs/adr/
```

## Use the glossary's vocabulary

When output name domain concept (issue title, refactor idea, hypothesis, test name), use term as in `CONTEXT.md`. No drift to synonyms glossary no like.

Concept not in glossary? Signal — you invent words project no use (rethink) or real gap (note for `/domain-modeling`).

## Flag ADR conflicts

If output contradict ADR, surface it. No silent override:

> _Contradicts ADR-0007 (event-sourced orders) — but worth reopening because…_