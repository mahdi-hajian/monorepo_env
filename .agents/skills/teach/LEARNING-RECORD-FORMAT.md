# Learning Record Format

Learning records live in `./learning-records/`, use sequential numbering: `0001-slug.md`, `0002-slug.md`, etc. Create dir lazily — only when first record written.

Teaching equivalent of ADRs: capture non-obvious lessons, key insights, stated prior knowledge steering future sessions. Used to calculate zone of proximal development.

## Template

```md
# {Short title of what was learned or established}

{1-3 sentences: what was learned (or what prior knowledge was established), and why it matters for future sessions.}
```

That is whole format. Record can be single paragraph. Value is recording _that_ this is now known + _why_ it changes what to teach next — not filling sections.

## Optional sections

Only include when add genuine value. Most records won't need them.

- **Status** frontmatter (`active | superseded by LR-NNNN`) — use when earlier understanding turns out wrong, replaced.
- **Evidence** — how user demonstrated understanding (question answered, exercise completed, prior experience cited). Use when claim might be revisited.
- **Implications** — what this unlocks or rules out for future sessions. Worth recording when non-obvious.

## Numbering

Scan `./learning-records/` for highest existing number, increment by one.

## When to write a learning record

Write when any of these true:

1. **User demonstrated genuine understanding of something non-trivial** — not just exposure, evidence they can use concept correctly. Sets new floor for what to teach next.
2. **User disclosed prior knowledge** — "I already know X." Record so future sessions don't re-teach. Also record _depth_ claimed.
3. **Misconception corrected** — user believed something wrong, now sees why. High-value: predict future stumbling blocks for related topics.
4. **Mission shifted in response to learning** — user discovered they care about something different than thought. Cross-link to [[MISSION.md]] and update it.

### What does _not_ qualify

- Material merely covered. Coverage not learning. Wait for evidence.
- Anything already captured tersely in [[GLOSSARY.md]] as term definition. Don't duplicate.
- Session-by-session activity logs. Learning records not a journal — they are decision-grade insights.

## Supersession

When later record contradicts earlier (understanding deepened or corrected), mark old record `Status: superseded by LR-NNNN`, not delete. History of how understanding evolved is itself useful signal.