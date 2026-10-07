# Domain Docs

How skills read domain docs when explore repo.

## Before exploring, read these

- **`CONTEXT-MAP.md`** at repo root — points at one `CONTEXT.md` per context. Read each one relevant to the topic.
- Per-context **`CONTEXT.md`** files (e.g. root `CONTEXT.md`, `Connections/CONTEXT.md`).
- **`docs/adr/`** — system-wide ADRs that touch the area. Also check context-local `docs/adr/` if present.

If any file missing, proceed silent. No flag absence. No suggest make. `/domain-modeling` skill (via `/grill-with-docs` and `/improve-codebase-architecture`) make them lazy when terms or decisions resolved.

## File structure

Multi-context (this repo):

```
/
├── CONTEXT-MAP.md
├── CONTEXT.md                 ← one context (e.g. Record Sources)
├── Connections/CONTEXT.md     ← another context
├── docs/adr/                  ← system-wide decisions
└── …
```

## Use the glossary's vocabulary

When output name domain concept (issue title, refactor idea, hypothesis, test name), use term as in the relevant `CONTEXT.md`. No drift to synonyms glossary no like.

Concept not in glossary? Signal — you invent words project no use (rethink) or real gap (note for `/domain-modeling`).

## Flag ADR conflicts

If output contradict ADR, surface it. No silent override:

> _Contradicts ADR-0001 — but worth reopening because…_
