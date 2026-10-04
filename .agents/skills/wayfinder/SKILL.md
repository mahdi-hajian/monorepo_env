---
name: wayfinder
description: Plan a huge chunk of work — more than one agent session can hold — as a shared map of decision tickets on your issue tracker, and resolve them one at a time until the way to the destination is clear.
disable-model-invocation: true
---
Loose idea arrive — too big for one agent session, wrapped in fog: way from here to **destination** not visible yet. Wayfinding = finding that way, not charging at destination. Skill chart way as **shared map** on repo's issue tracker, then work its **decision tickets** — questions whose resolution is decision, not slices of build to execute — one at a time until route clear.

Destination vary per effort. Naming it = first act of charting — it shape every ticket. Might be spec to hand off and iterate on, decision to lock before planning start, or change made in place like data-structure migration. Map domain-agnostic — engineering work, course content, whatever fit shape.

## Plan, don't do

Wayfinder is **planning** by default: each ticket resolve decision, map done when way clear — nothing left to decide before someone go do thing. Pull to just do work usually signal you reach edge of map, time to hand off. Effort can override in its **Notes** — carrying execution into map itself — but absent that, produce decisions, not deliverables.

## Refer by name

Every map and ticket is issue, so it has **name** — its title. In everything human reads — narration, map's Decisions-so-far — refer to it by that name, never by bare id, number, or slug. Wall of `#42, #43, #44` illegible; names read at glance. Id and URL not vanish — name wraps its link — but they ride *inside* name, never stand in for it.

## The Map

Map is single issue on this repo's issue tracker, labelled `wayfinder:map` — canonical artifact. Its tickets are child issues of map.

Map is **index**, not store. Lists decisions made, points at tickets holding their detail; decision lives in exactly one place — its ticket — so map never restate it, only gist it and link.

**Where map, its child tickets, blocking, and frontier queries physically live is tracker-specific.** Issue tracker should have been provided to you — run `/setup-matt-pocock-skills` if not. Consult tracker doc's "Wayfinding operations" section for how _this_ repo express them. If no tracker provided, default to local-markdown tracker.

### The map body

Whole map at low resolution, loaded once per session. Open tickets **not** listed — they are open child issues, found by query.

```markdown
## Destination

<what reaching the end of this map looks like — the spec, decision, or change this effort is finding its way to. One or two lines; every session orients to it before choosing a ticket.>

## Notes

<domain; skills every session should consult; standing preferences for this effort>

## Decisions so far

<!-- the index — one line per closed ticket: enough to judge relevance, then zoom the link for the detail the ticket holds -->

- [<closed ticket title>](link) — <one-line gist of the answer>

## Not yet specified

<!-- see "Fog of war": in-scope fog you can't ticket yet; graduates as the frontier advances -->

## Out of scope

<!-- see "Out of scope": work ruled beyond the destination; closed, never graduates -->
```

### Tickets

Each ticket is **child issue** of map; tracker's issue id is its identity. Its body is question, sized to one 100K token agent session:

```markdown
## Question

<the decision or investigation this ticket resolves>
```

Each ticket carry `wayfinder:<type>` label — one of `research`, `prototype`, `grilling`, `task` (see [Ticket Types](#ticket-types)).

Session **claims** ticket by assigning it to dev driving map, **first**, before any work, so concurrent sessions skip it. That assignee _is_ claim: open, unassigned ticket = unclaimed.

Blocking use tracker's **native** dependency relationship — essential because it render frontier _visually_ in tracker's own UI, so human see what's takeable without opening map. Only tracker lacking native blocking fall back to body convention. Ticket **unblocked** when every ticket blocking it closed; **frontier** is open, unblocked, unclaimed children — edge of known.

Answer not part of body — recorded on resolution (see [Work through the map](#work-through-the-map)). Assets created while resolving ticket linked from issue, not pasted in.

## Ticket Types

Every ticket either **HITL** — human in loop, worked *with* human who speak for themselves — or **AFK**, driven by agent alone. HITL ticket only resolve through that live exchange; agent never stand in for human's side of it (grilling agent that answer its own questions has broken this).

- **Research** (AFK): Reading documentation, third-party APIs, or local resources like knowledge bases to surface fact decision wait on. Resolved by `/research` **subagent**. Use when knowledge outside current working directory required.
- **Prototype** (HITL): Raise fidelity of discussion by making cheap, rough, concrete artifact to react to — outline, rough take, stub, or UI/logic code via /prototype skill. Link prototype as asset. Use when "how should it look" or "how should it behave" is key question.
- **Grilling** (HITL): Conversation via /grilling and /domain-modeling skills, one question at a time. Default case.
- **Task** (HITL or AFK): Manual work that must happen before *decision* can be made — nothing to decide, prototype, or research, but discussion blocked until done. Signing up for service so its API can be judged, provisioning access, moving data so its shape can be seen. One type that *does* rather than decides — earn its place by unblocking decision, not by delivering destination. Agent drive it alone where it can (AFK); otherwise hand human precise checklist (HITL). Resolved when work done; answer record what was done and any resulting facts (credentials location, new URLs, row counts) later tickets depend on.

## Fog of war

Map _deliberately_ incomplete: don't chart what you can't yet see. Beyond live tickets lies **fog of war** — dim view of decisions and investigations you can tell coming but can't yet pin down, because they hang on questions still open. Resolving ticket clear fog ahead of it, graduating whatever now specifiable into fresh tickets — one at a time, until way to destination clear and no tickets remain.

Map's **Not yet specified** section is where dim view written down: suspected question, area to revisit later. Undiscovered frontier _toward_ destination — everything here in scope, just not sharp enough to ticket. Write as loosely or as fully as view allows; double as signpost for collaborators reading where effort headed.

**Fog or ticket?** Test is whether you can state question precisely now — _not_ whether you can answer it now.

- **Ticket when** question already sharp — even if blocked and you can't act on it yet.
- **Not yet specified when** you can't yet phrase it that sharply. Don't pre-slice fog into ticket-sized pieces: coarser than ticket, and one patch may graduate into several tickets, or none, once frontier reach it.

**Not yet specified** exclude what already decided (Decisions so far), what already live ticket, and what out of scope (next section).

## Out of scope

Fog only ever gather _toward_ destination. Destination fix scope, so work beyond it **out of scope** — not fog, and not belong in **Not yet specified**. It get own **Out of scope** section on map: work you consciously ruled out of _this_ effort. Scope, not sharpness, land it here.

Out-of-scope work never graduate — frontier stop at destination — so it return only if destination redrawn, and then as fresh effort, not resumption.

Ruling something out of scope is scoping act, not step on route. When ticket that already exist turn out to sit past destination — mis-scoped in while charting, or exposed by resolution — **close it** (closed ticket unambiguously off frontier) and leave one line in **Out of scope** section: gist plus why it out of scope, linking closed ticket. It stay out of **Decisions so far**, which record route actually walked — scope boundary not step on it.

## Invocation

Two modes. Either way, **never resolve more than one ticket per session** — exception: research tickets.

### Chart the map

User invoke with loose idea.

1. **Name the destination.** Run `/grilling` and `/domain-modeling` session to pin down what this map finding its way to — spec, decision, or change. Destination fix scope, so settled first.
2. **Map the frontier.** Grill again, **breadth-first** this time: fan out across whole space rather than deep on any one thread, surface open decisions and first steps takeable now. **If this surface no fog** — way to destination already clear, whole journey small enough for one session — you don't need map. Stop and ask user how they'd like to proceed.
3. **Create the map** (label `wayfinder:map`): Destination and Notes filled in, Decisions-so-far empty, fog sketched into **Not yet specified**.
4. **Create the tickets you can specify now** as child issues of map — then wire blocking edges in **second pass** (issues need ids before they can reference each other). Wiring sort them into frontier and blocked; everything you can't yet specify stay in fog — **Not yet specified** section.
5. **Fire the research subagents.** For each `research` ticket you just created, spin up `/research` subagent to resolve it in parallel, capturing findings on throwaway `research/<name>` branch with context pointer from ticket.
6. Stop — charting is one session's work; it hand-resolve nothing.

### Work through the map

User invoke with map (URL or number). Ticket **optional** — without one, you pick next decision, not user.

1. Load **map** — low-res view, not every ticket body.
2. Choose ticket. If user named one, use it. Otherwise take first frontier ticket in order. **Claim it**: assign it to yourself before any work.
3. Resolve it — **zoom as needed**: fetch full body of any related or closed ticket on demand; invoke skills `## Notes` block names. If in doubt, use `/grilling` and `/domain-modeling`.
4. Record resolution: post answer as **resolution comment**, **close** issue, and **append context pointer** to map's Decisions-so-far.
5. Add newly-surfaced tickets (create-then-wire); graduate any fog answer has made specifiable, clearing each graduated patch from **Not yet specified** so it live only as new ticket. If answer reveal ticket — this one or another — sit beyond destination, **rule it out of scope** rather than resolving it on route. If decision invalidate other parts of map, update or delete those tickets.

User may run unblocked tickets in parallel, so expect other sessions editing tracker concurrently.