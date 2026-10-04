---
name: to-tickets
description: Break a plan, spec, or the current conversation into a set of tracer-bullet tickets, each declaring its blocking edges, published to the configured tracker — edges as text in one file per ticket locally, or native blocking links on a real tracker.
disable-model-invocation: true
---
# To Tickets

Break plan, spec, or talk into **tickets** — tracer-bullet vertical slices. Each ticket say which tickets **block** it.

Tracker and triage label words should be given to you — run `/setup-matt-pocock-skills` if not.

## Process

### 1. Gather context

Work from what already in conversation. If user pass reference (spec path, issue number or URL) as argument, fetch it. Read full body and comments.

### 2. Explore the codebase (optional)

If you not explore codebase yet, do it. Understand code now. Ticket titles and descriptions use project domain words, respect ADRs in area you touch.

Look for chance to prefactor code, make implementation easier. "Make change easy, then make easy change."

### 3. Draft vertical slices

Break work into **tracer bullet** tickets.

<vertical-slice-rules>

- Each slice cut narrow but COMPLETE path through every layer (schema, API, UI, tests) — vertical, NOT horizontal slice of one layer
- Finished slice demoable or checkable on its own
- Each slice sized to fit in one fresh context window
- Any prefactoring done first

</vertical-slice-rules>

Give each ticket its **blocking edges** — other tickets that must finish before it can start. Ticket with no blockers can start now.

**Wide refactors are exception to vertical slicing.** A **wide refactor** is one mechanical change — rename column, retype shared symbol — whose **blast radius** fans across whole codebase. One edit breaks thousands of call sites at once. No vertical slice can land green. Don't force into tracer bullet. Sequence as **expand–contract**. First expand: add new form beside old, nothing breaks. Then migrate call sites over in batches sized by blast radius (per package, per directory). Each batch own ticket, blocked by expand. CI stay green batch to batch because old form still there. Finally contract: delete old form once no caller left, in ticket blocked by every migrate batch. If even batches can't stay green alone, keep sequence but let them share integration branch. All block final integrate-and-verify ticket — green promised only there.

### 4. Quiz the user

Show proposed breakdown as numbered list. For each ticket, show:

- **Title**: short descriptive name
- **Blocked by**: which other tickets (if any) must finish first
- **What it delivers**: end-to-end behaviour this ticket make work

Ask the user:

- Granularity feel right? (too coarse / too fine)
- Blocking edges correct — each ticket only depend on tickets that truly gate it?
- Any tickets to merge or split more?

Iterate until user approve breakdown.

### 5. Publish the tickets to the configured tracker

Publish approved tickets. **How** depends on tracker `/setup-matt-pocock-skills` configured — tickets same either way, only shape of blocking edges changes:

- **Local files** → write one file per ticket under `.scratch/<feature-slug>/issues/<NN>-<slug>.md`, numbered from `01` in dependency order (blockers first). Each file "Blocked by" list numbers/titles it depends on. Use per-ticket file template below — one ticket per file, never one combined file.
- **A real issue tracker (GitHub, Linear, …)** → publish one issue per ticket in dependency order (blockers first) so each ticket's blocking edges can reference real identifiers. Use platform's native blocking / sub-issue relationship where it has one; otherwise set each ticket's "Blocked by" to blocking issues. Apply `ready-for-agent` triage label unless told otherwise — tickets agent-grabbable by construction.

Work the **frontier**: any ticket whose blockers all done. For pure linear chain, that means top to bottom.

Do NOT close or modify any parent issue.

<local-ticket-template>

# <NN> — <Ticket title>

**What to build:** end-to-end behaviour this ticket make work, from user's view — not layer-by-layer implementation list.

**Blocked by:** numbers/titles of tickets that gate this one, or "None — can start immediately".

**Status:** ready-for-agent

- [ ] Acceptance criterion 1
- [ ] Acceptance criterion 2

</local-ticket-template>

<issue-template>

## Parent

Reference to parent issue on tracker (if source was existing issue, otherwise omit this section).

## What to build

End-to-end behaviour this ticket make work, from user's view — not layer-by-layer implementation.

## Acceptance criteria

- [ ] Criterion 1
- [ ] Criterion 2

## Blocked by

- Reference to each blocking ticket, or "None — can start immediately".

</issue-template>

In either form, avoid specific file paths or code snippets — they go stale fast. Exception: if prototype produced snippet that encodes decision more precisely than prose can (state machine, reducer, schema, type shape), inline it and note briefly it came from prototype. Trim to decision-rich parts — not working demo, just important bits.