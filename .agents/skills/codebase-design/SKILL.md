---
name: codebase-design
description: Shared vocabulary for designing deep modules. Use when the user wants to design or improve a module's interface, find deepening opportunities, decide where a seam goes, make code more testable or AI-navigable, or when another skill needs the deep-module vocabulary.
disable-model-invocation: true
---
# Codebase Design

Design **deep modules**: much behaviour behind small interface, at clean seam, test through that interface. Use this words and these rules wherever code designed or restructured. Aim: leverage for callers, locality for keepers, tests for everyone.

## Glossary

Use words exact — no swap "component," "service," "API," or "boundary." Same words is whole point.

**Module** — anything with interface and implementation. Any size on purpose: function, class, package, or whole slice. _No say_: unit, component, service.

**Interface** — everything caller must know to use module right: type signature, plus invariants, order rules, error modes, config needed, speed. _No say_: API, signature (too small — only type-level surface).

**Implementation** — what inside module, its code body. Not same as **Adapter**: thing can be small adapter with big implementation (Postgres repo) or big adapter with small implementation (memory fake). Say "adapter" when seam is topic; "implementation" other times.

**Depth** — leverage at interface: how much behaviour caller (or test) gets per unit of interface to learn. Module is **deep** when much behaviour sits behind small interface, **shallow** when interface nearly as big as implementation.

**Seam** _(Michael Feathers)_ — place where you change behaviour without edit that place; the *location* where module interface lives. Where seam goes is own design choice, separate from what behind it. _No say_: boundary (busy word from DDD bounded context).

**Adapter** — concrete thing that satisfies interface at seam. Tells *role* (which slot it fills), not stuff (what inside).

**Leverage** — what callers get from depth: more power per unit of interface learned. One implementation pays back across N call sites and M tests.

**Locality** — what keepers get from depth: change, bugs, knowledge, checking all sit in one place, not spread across callers. Fix once, fixed everywhere.

## Deep vs shallow

**Deep module** = small interface + much implementation:

```
┌─────────────────────┐
│   Small Interface   │  ← Few methods, simple params
├─────────────────────┤
│                     │
│  Deep Implementation│  ← Complex logic hidden
│                     │
└─────────────────────┘
```

**Shallow module** = big interface + little implementation (avoid):

```
┌─────────────────────────────────┐
│       Large Interface           │  ← Many methods, complex params
├─────────────────────────────────┤
│  Thin Implementation            │  ← Just passes through
└─────────────────────────────────┘
```

When design interface, ask:

- Can I cut number of methods?
- Can I make params simpler?
- Can I hide more mess inside?

## Principles

- **Depth is property of interface, not implementation.** Deep module can be built from small, mockable, swappable parts inside — they just not part of interface. Module can have **internal seams** (private to implementation, used by own tests) plus **external seam** at its interface.
- **The deletion test.** Imagine delete module. If mess vanishes, it was pass-through. If mess comes back in N callers, it earned keep.
- **The interface is the test surface.** Callers and tests cross same seam. If you want test *past* interface, module probably wrong shape.
- **One adapter means pretend seam. Two adapters means real one.** No make seam unless something actually varies across it.

## Designing for testability

Good interfaces make testing easy:

1. **Accept dependencies, don't create them.**

   ```typescript
   // Testable
   function processOrder(order, paymentGateway) {}

   // Hard to test
   function processOrder(order) {
     const gateway = new StripeGateway();
   }
   ```

2. **Return results, don't produce side effects.**

   ```typescript
   // Testable
   function calculateDiscount(cart): Discount {}

   // Hard to test
   function applyDiscount(cart): void {
     cart.total -= discount;
   }
   ```

3. **Small surface area.** Fewer methods = fewer tests needed. Fewer params = simpler test setup.

## Relationships

- A **Module** has exactly one **Interface** (surface it shows to callers and tests).
- **Depth** is property of **Module**, measured against its **Interface**.
- A **Seam** is where **Module**'s **Interface** lives.
- An **Adapter** sits at **Seam** and satisfies **Interface**.
- **Depth** makes **Leverage** for callers and **Locality** for keepers.

## Rejected framings

- **Depth as ratio of implementation-lines to interface-lines** (Ousterhout): rewards padding implementation. We use depth-as-leverage instead.
- **"Interface" as TypeScript `interface` word or class public methods**: too narrow — interface here means every fact caller must know.
- **"Boundary"**: busy word from DDD bounded context. Say **seam** or **interface**.

## Going deeper

- **Deepening a cluster given its dependencies** — see [DEEPENING.md](DEEPENING.md): dependency categories, seam discipline, and replace-don't-layer testing.
- **Exploring alternative interfaces** — see [DESIGN-IT-TWICE.md](DESIGN-IT-TWICE.md): spin up parallel sub-agents to design interface several different ways, then compare on depth, locality, and seam placement.