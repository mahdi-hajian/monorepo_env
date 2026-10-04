# Design It Twice

When user want explore alternative interfaces for chosen deepening candidate, use this parallel sub-agent pattern. Based on "Design It Twice" (Ousterhout) — first idea unlikely best.

Use vocabulary in [SKILL.md](SKILL.md) — **module**, **interface**, **seam**, **adapter**, **leverage**.

## Process

### 1. Frame the problem space

Before spawn sub-agents, write user-facing explanation of problem space for chosen candidate:

- Constraints any new interface must satisfy
- Dependencies it rely on, + which category they fall into (see [DEEPENING.md](DEEPENING.md))
- Rough illustrative code sketch to ground constraints — not proposal, just way to make constraints concrete

Show to user, then immediately proceed to Step 2. User reads + thinks while sub-agents work in parallel.

### 2. Spawn sub-agents

Spawn 3+ sub-agents in parallel using Agent tool. Each must produce **radically different** interface for deepened module.

Prompt each sub-agent with separate technical brief (file paths, coupling details, dependency category from [DEEPENING.md](DEEPENING.md), what sits behind seam). Brief independent of user-facing problem-space explanation in Step 1. Give each agent different design constraint:

- Agent 1: "Minimize interface — aim 1–3 entry points max. Maximize leverage per entry point."
- Agent 2: "Maximize flexibility — support many use cases + extension."
- Agent 3: "Optimize for most common caller — make default case trivial."
- Agent 4 (if applicable): "Design around ports & adapters for cross-seam dependencies."

Include [SKILL.md](SKILL.md) vocabulary + CONTEXT.md vocabulary in brief so each sub-agent names things consistent with architecture language + project domain language.

Each sub-agent outputs:

1. Interface (types, methods, params — plus invariants, ordering, error modes)
2. Usage example showing how callers use it
3. What implementation hides behind seam
4. Dependency strategy + adapters (see [DEEPENING.md](DEEPENING.md))
5. Trade-offs — where leverage high, where thin

### 3. Present and compare

Present designs sequentially so user can absorb each, then compare in prose. Contrast by **depth** (leverage at interface), **locality** (where change concentrates), + **seam placement**.

After compare, give own recommendation: which design strongest + why. If elements from different designs combine well, propose hybrid. Be opinionated — user wants strong read, not menu.