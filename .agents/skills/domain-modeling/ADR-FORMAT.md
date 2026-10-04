# ADR Format

ADRs live in `docs/adr/`, sequential numbering: `0001-slug.md`, `0002-slug.md`, etc.

Create `docs/adr/` lazily — only when first ADR needed.

## Template

```md
# {Short title of the decision}

{1-3 sentences: what's the context, what did we decide, and why.}
```

That's it. ADR can be single paragraph. Value: record *that* decision made + *why* — not fill sections.

## Optional sections

Only include when add genuine value. Most ADRs don't need.

- **Status** frontmatter (`proposed | accepted | deprecated | superseded by ADR-NNNN`) — useful when decisions revisited
- **Considered Options** — only when rejected alternatives worth remembering
- **Consequences** — only when non-obvious downstream effects worth calling out

## Numbering

Scan `docs/adr/` for highest number, increment by one.

## When to offer an ADR

All three must be true:

1. **Hard to reverse** — cost of changing mind later meaningful
2. **Surprising without context** — future reader wonder "why on earth did they do it this way?"
3. **Result of a real trade-off** — real alternatives existed, picked one for specific reasons

Easy to reverse? Skip — you'll just reverse it. Not surprising? Nobody wonder why. No real alternative? Nothing to record beyond "we did the obvious thing."

### What qualifies

- **Architectural shape.** "We're using a monorepo." "The write model is event-sourced, the read model is projected into Postgres."
- **Integration patterns between contexts.** "Ordering and Billing communicate via domain events, not synchronous HTTP."
- **Technology choices that carry lock-in.** Database, message bus, auth provider, deployment target. Not every library — just ones that take a quarter to swap out.
- **Boundary and scope decisions.** "Customer data is owned by the Customer context; other contexts reference it by ID only." Explicit no-s as valuable as yes-s.
- **Deliberate deviations from obvious path.** "We're using manual SQL instead of an ORM because X." Anything where reasonable reader would assume opposite. Stop next engineer from "fixing" something deliberate.
- **Constraints not visible in code.** "We can't use AWS because of compliance requirements." "Response times must be under 200ms because of the partner API contract."
- **Rejected alternatives when rejection non-obvious.** Considered GraphQL, picked REST for subtle reasons? Record it — else someone suggests GraphQL again in six months.