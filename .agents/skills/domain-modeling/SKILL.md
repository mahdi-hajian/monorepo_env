---
name: domain-modeling
description: Build and sharpen a project's domain model. Use when the user wants to pin down domain terminology or a ubiquitous language, record an architectural decision, or when another skill needs to maintain the domain model.
disable-model-invocation: true
---
# Domain Modeling

Build + sharpen project domain model while designing. This be active discipline — challenge terms, invent edge-case scenarios, write glossary + decisions down moment they crystallise. (Merely reading `CONTEXT.md` for vocabulary not this skill — that one-line habit any skill can do. This skill for when changing model, not just consuming it.)

## File structure

Most repos have single context:

```
/
├── CONTEXT.md
├── docs/
│   └── adr/
│       ├── 0001-event-sourced-orders.md
│       └── 0002-postgres-for-write-model.md
└── src/
```

If `CONTEXT-MAP.md` exists at root, repo has multiple contexts. Map points to where each lives:

```
/
├── CONTEXT-MAP.md
├── docs/
│   └── adr/                          ← system-wide decisions
├── src/
│   ├── ordering/
│   │   ├── CONTEXT.md
│   │   └── docs/adr/                 ← context-specific decisions
│   └── billing/
│       ├── CONTEXT.md
│       └── docs/adr/
```

Create files lazily — only when have something to write. If no `CONTEXT.md` exists, create when first term resolved. If no `docs/adr/` exists, create when first ADR needed.

## During the session

### Challenge against the glossary

User uses term conflicting with existing language in `CONTEXT.md` → call out immediately. "Your glossary defines 'cancellation' as X, but you seem mean Y — which is it?"

### Sharpen fuzzy language

User uses vague or overloaded terms → propose precise canonical term. "You say 'account' — mean Customer or User? Different things."

### Discuss concrete scenarios

Domain relationships discussed → stress-test with specific scenarios. Invent scenarios probing edge cases, force user precise about boundaries between concepts.

### Cross-reference with code

User states how something works → check code agrees. Contradiction found → surface it: "Your code cancels entire Orders, but you just said partial cancellation possible — which is right?"

### Update CONTEXT.md inline

Term resolved → update `CONTEXT.md` right there. Don't batch — capture as they happen. Use format in [CONTEXT-FORMAT.md](./CONTEXT-FORMAT.md).

`CONTEXT.md` totally devoid of implementation details. Don't treat `CONTEXT.md` as spec, scratch pad, or repository for implementation decisions. Glossary and nothing else.

### Offer ADRs sparingly

Only offer ADR when all three true:

1. Hard to reverse — cost of changing mind later meaningful
2. Surprising without context — future reader wonder "why this way?"
3. Result of real trade-off — genuine alternatives existed, picked one for specific reasons

Any of three missing → skip ADR. Use format in [ADR-FORMAT.md](./ADR-FORMAT.md).