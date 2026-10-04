# CONTEXT.md Format

## Structure

```md
# {Context Name}

{One or two sentence description of what this context is and why it exists.}

## Language

**Order**:
{A one or two sentence description of the term}
_Avoid_: Purchase, transaction

**Invoice**:
A request for payment sent to a customer after delivery.
_Avoid_: Bill, payment request

**Customer**:
A person or organization that places orders.
_Avoid_: Client, buyer, account
```

## Rules

- **Be opinionated.** Many words for same concept? Pick best one. Rest go under `_Avoid_`.
- **Keep definitions tight.** One-two sentences max. Say what it IS, not what it does.
- **Only include terms specific to this project's context.** General programming concepts (timeouts, error types, utility patterns) don't belong, even if project uses them lots. Before adding term, ask: unique to this context, or general concept? Only former belongs.
- **Group terms under subheadings** when natural clusters emerge. All terms in one cohesive area? Flat list fine.

## Single vs multi-context repos

**Single context (most repos):** One `CONTEXT.md` at repo root.

**Multiple contexts:** `CONTEXT-MAP.md` at repo root lists contexts, where they live, how they relate:

```md
# Context Map

## Contexts

- [Ordering](./src/ordering/CONTEXT.md) — receives and tracks customer orders
- [Billing](./src/billing/CONTEXT.md) — generates invoices and processes payments
- [Fulfillment](./src/fulfillment/CONTEXT.md) — manages warehouse picking and shipping

## Relationships

- **Ordering → Fulfillment**: Ordering emits `OrderPlaced` events; Fulfillment consumes them to start picking
- **Fulfillment → Billing**: Fulfillment emits `ShipmentDispatched` events; Billing consumes them to generate invoices
- **Ordering ↔ Billing**: Shared types for `CustomerId` and `Money`
```

Skill infers which structure applies:

- If `CONTEXT-MAP.md` exists, read it to find contexts
- If only a root `CONTEXT.md` exists, single context
- If neither exists, create root `CONTEXT.md` lazily when first term resolved

Multiple contexts? Infer which one current topic relates to. Unclear? Ask.