---
name: ask-matt
description: Ask which skill or flow fits your situation. A router over the skills in this repo.
disable-model-invocation: true
---
# Ask Matt

You no remember every skill. Ask.

A **flow** = path through skills. Most paths run along one **main flow**. Two **on-ramps** merge onto it. Everything else standalone, or vocabulary layer running underneath.

## The main flow: idea → ship

Route most work travel. You have idea, want it built.

1. **`/grill-with-docs`** — sharpen idea by interview. Start here when you **have codebase**: stateful, keeps what it learn in `CONTEXT.md` and ADRs. (No codebase? Use `/grill-me` — see Standalone. Both run same `/grilling` primitive; `grill-with-docs` the one that leave paper trail.)
2. **Branch — can you settle every question in conversation?** If question need runnable answer (state, business logic, UI you have to see), detour through prototype, bridged by **`/handoff`** in both directions (see Crossing sessions):
   - **`/handoff`** out, then open fresh session against that file,
   - **`/prototype`** to answer question with throwaway code,
   - **`/handoff`** back what you learned, reference it from original idea thread.
3. **Branch — is this a multi-session build?**
   - **Yes** → **`/to-spec`** (turn thread into spec), then **`/to-tickets`** to split into tracer-bullet tickets, each declaring its **blocking edges**. Local tracker: one file per ticket under `.scratch/<feature>/issues/`, worked blockers-first by hand. Real tracker: edges become native blocking links, so any ticket whose blockers done can be grabbed — kick off **`/implement`** per ticket, **clearing context between each one**.
   - **No** → **`/implement`** right here, same context window.

   Either way, **`/implement`** build each issue by driving **`/tdd`** inside — one red-green slice at a time — then close out by running **`/code-review`**, two-axis review (Standards + Spec) of diff, before committing. Reach for **`/tdd`** alone when you just want build concrete behaviour test-first without full spec, and **`/code-review`** alone whenever you want review branch or PR against fixed point.

### Context hygiene

Keep steps 1–3 in **one unbroken context window** — no compact or clear until after `/to-tickets` — so grilling, spec, and tickets all build on same thinking. Each `/implement` then start fresh, work from ticket.

Limit on this: **[smart zone](https://www.aihero.dev/ai-coding-dictionary/smart-zone)** — window (~120k tokens on state-of-the-art models) where model still reason sharp. If session approach it before `/to-tickets`, no push on degraded — `/handoff` and continue in fresh thread.

## On-ramps

Starting situation that generate work, then merge onto main flow.

- **Bugs and requests piling up** → **`/triage`**. It move issues through triage roles and produce agent-ready issues, which **`/implement`** later pick up.

  Triage only for issues **you no create** — bug reports, incoming feature requests, anything that arrive raw. Tickets from `/to-tickets` already agent-ready, so **no triage them**.

- **Something's broken** → **`/diagnosing-bugs`**. For hard ones: bug that resist first glance, intermittent flake, regression that creep in between two known-good states. It refuse to theorise until it have **tight feedback loop** — one command that already go red on *this* bug — then fix with regression test. Its post-mortem hand off to **`/improve-codebase-architecture`** when real finding: no good seam to lock bug down.

- **A huge, foggy effort — a greenfield project or a huge feature build, too big for one session** → **`/wayfinder`**, most cognitively demanding flow here. When way from here to destination no visible yet, it chart **shared map** of **decision tickets** on issue tracker and resolve them one at a time — producing **decisions, not deliverables** — until fog pushed back and way clear. Where **`/grill-with-docs`** sharpen idea you can hold in one session, wayfinder for idea you can't — and it slower and denser, so save it for exactly that, never a well-scoped feature.

  When map clear, **it hand off, it no build**: merge onto main flow at **`/to-spec`**, which collapse map's linked decisions into buildable plan, then `/to-tickets` and `/implement` as usual. Loop map straight into `/implement` skip that collapse and throw linked detail away — go straight to `/implement` only when effort turn out genuinely small.

## Codebase health

Not feature work — upkeep.

- **`/improve-codebase-architecture`** — run whenever you have spare moment to keep codebase good for agents to operate in. It surface **deepening opportunities**; pick one _generate idea_ you can take into main flow at `/grill-with-docs`. It the survey that find candidates; **`/codebase-design`** (below) the bench you design chosen one on.

## Vocabulary underneath

Two model-invoked references that run *beneath* other skills — each the single source of truth for its vocabulary. Reach for them directly when **words**, not process, the problem; or let skills above pull them in.

- **`/domain-modeling`** — sharpen project's *domain* language: challenge fuzzy term, resolve overloaded word ("account" doing three jobs), record hard-to-reverse decision as ADR. It the active discipline `/grill-with-docs` drive to keep `CONTEXT.md` clean glossary.
- **`/codebase-design`** — deep-module vocabulary (module, interface, depth, seam, adapter, leverage, locality) for designing module's *shape*: lot of behaviour behind small interface at clean seam. `/tdd` and `/improve-codebase-architecture` both speak it.

## Crossing sessions

- **`/handoff`** — when thread full or you need branch off (e.g. into `/prototype` session), this compact conversation into markdown file. You no continue in place — you **open new session and reference that file** to carry context across. It the bridge between context windows, either direction. Use it when you want **fresh session** but need **current conversation preserved**.
- **`/compact`** (built-in) — stay in **same conversation**, let earlier turns be summarized. Use it at **intentional breaks between phases**, when you no mind losing verbatim history. No compact mid-phase — agent can lose its way. `/handoff` fork; `/compact` continue.

## Standalone

Off main flow entirely.

- **`/grill-me`** — same relentless interview as `/grill-with-docs`, but for when you have **no codebase**. Stateless: save nothing locally, build no `CONTEXT.md`. Reach for it to sharpen any plan or design that no live in repo.
- **`/prototype`** — small, throwaway program that answer one design question: this state model feel right, or what this UI look like. Throwaway from day one — keep answer, delete code. It the detour in step 2 of main flow, but reach for it any time design question hard to settle on paper.
- **`/research`** — delegate reading legwork to **background agent**: it investigate question against **primary sources**, then leave cited Markdown file in repo. Keep working while it read. File it produce something to take *into* main flow at `/grill-with-docs` — research feed thinking, it no replace it.
- **`/teach`** — learn concept over multiple sessions, use current directory as stateful workspace.
- **`/writing-great-skills`** — reference for writing and editing skills well.

## Precondition

**`/setup-matt-pocock-skills`** — run before first engineering flow to configure issue tracker, triage labels, and doc layout other skills assume. Custom issue trackers also work.