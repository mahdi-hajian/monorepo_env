---
name: writing-great-skills
description: Reference for writing and editing skills well — the vocabulary and principles that make a skill predictable.
disable-model-invocation: true
---
A skill exists to wrangle determinism out of stochastic system. **Predictability** — agent take same _process_ every run, not produce same output — is root virtue. Every lever below serve it.

**Bold terms** defined in [`GLOSSARY.md`](GLOSSARY.md); look there for full meaning.

## Invocation

Two choice. Trade different cost:

- **Model-invoked** skill keep **description**, so agent fire it alone _and_ other skills reach it (you still type name too). It add **context load** — description sit in window every turn. Mechanics: omit `disable-model-invocation`, write model-facing description with rich trigger words ("Use when user want…, mention…").
- **User-invoked** skill strip description from agent reach: only you, typing name, invoke it — no other skill can. Zero context load, but it spend **cognitive load**: _you_ are index that must remember it exist. Mechanics: set `disable-model-invocation: true`; `description` become human-facing — one-line summary, trigger list stripped.

Pick model-invocation only when agent must reach skill alone, or other skill must. If it only fire by hand, make user-invoked, pay no context load.

When user-invoked skills multiply past what you remember, piled-up cognitive load cured by **router skill**: one user-invoked skill that name others and when to reach each.

## Writing the description

Model-invoked **description** do two job — say what skill is, list **branches** that trigger it. Every word increase **context load**, so description earn harder pruning than body:

- **Front-load skill leading word** — description is where it do invocation work.
- **One trigger per branch.** Synonym that rename single branch is **duplication** — "build features using TDD … asks for test-first development" is one branch written twice. Collapse; keep only distinct branches.
- **Cut identity already in body.** Keep description to triggers, plus any "when other skill need…" reach clause.

## Information hierarchy

Skill built from two content type — **steps** and **reference** — mix freely: all steps, all reference, or both. Core decision: which to use, where each sit on **information hierarchy**, ladder ranked by how soon agent need material:

1. **In-skill step** — ordered action in `SKILL.md`, primary tier: what agent do, in order. Each step end on **completion criterion** — condition telling agent work done. Make _checkable_ (agent tell done from not-done?) and, where it matter, _exhaustive_ ("every modified model accounted for", not "produce change list") — vague criterion invite **premature completion**.
2. **In-skill reference** — definition, rule, fact in `SKILL.md`, consulted on demand. Often fine flat peer-set (every rule of review on one rung) — good arrangement, not smell. _This skill is all reference._
3. **External reference** — reference pushed out of `SKILL.md` into separate file, reached by **context pointer**, loaded only when pointer fire. (Span _disclosed_ reference — sibling file like `GLOSSARY.md`, still part of skill — through fully **external reference** that live outside skill system, any skill can point at.)

Demanding completion criterion drive thorough **legwork** — digging agent do within work — whether skill has steps or not, since "every rule applied" bind flat reference just as "every step done" bind sequence.

Push too little down, top bloat. Push too much, hide material agent actually need. That tension is whole decision.

**Progressive disclosure** is move down ladder — out of `SKILL.md` into linked file — so top stay legible. Mechanics: linked `.md` file in skill folder, named for what it hold (this skill disclose full definitions to `GLOSSARY.md`). Some skills used more than one way; each distinct way is **branch** — different runs take different path through skill. Branching is cleanest disclosure test: inline what every branch need, push behind pointer what only some branches reach. **Context pointer** _wording_, not target, decide when and how reliably agent reach material.

Where ladder decide _how far down_ piece sit, **co-location** decide _what sit beside it_ once there: keep concept definition, rules, caveats under one heading, not scattered — reading one part bring neighbours with it.

## When to split

**Granularity** is how fine you divide skills. Each cut spend one of two loads, so split only when cut earn it. Two cut:

- **By invocation** — split off **model-invoked** skill when you have distinct **leading word** that should trigger it alone, or other skill must reach it. You pay **context load** for new always-loaded **description**, so independent reach must be worth it.
- **By sequence** — split run of **steps** when steps still ahead (step's **post-completion steps**) tempt agent to rush one in front (**premature completion**). Keep out of view, encourage more **legwork** on current task.

## Pruning

Keep each meaning in **single source of truth**: one authoritative place, so changing behaviour is one-place edit.

Check every line for **relevance**: does it still bear on what skill does?

Then hunt **no-ops** sentence by sentence, not just line by line: run no-op test on each sentence alone; when one fail, delete whole sentence, not trim words. Be aggressive — most prose that fail should go, not be rewritten.

## Leading words

**Leading word** is compact concept already living in model pretraining, agent think with while running skill (e.g. _lesson_, _fog of war_, _tracer bullets_). Repeated through text (not necessarily — strong word might only need once), it accumulate distributed definition and anchor whole region of behaviour in fewest tokens, by recruiting priors model already hold.

It serve predictability twice. In body, anchor _execution_: agent reach for same behaviour every time word appear. In description, anchor _invocation_: same word in your prompts, docs, code → agent link shared language to skill, fire it more reliably.

Hunt for chance to refactor skills to use leading words. Triad spelled out at three sites (**duplication**), description spending sentence to gesture at one idea — each is passage begging to **collapse** into single token. Examples:

- "fast, deterministic, low-overhead" -> _tight_ — one quality restated across phase — into single pretrained word (_tight_ loop).
- "a loop you believe in" -> _red_ — fuzzy gate become binary observable state (loop go _red_ on bug, or not).

You win twice: fewer tokens, _and_ sharper hook for agent thinking. Assume every skill carry restatement that leading words retire — go find them.

## Failure modes

Use to diagnose issues user may have with skill.

- **Premature completion** — end step before genuinely done, attention slip to _being done_. Defence, in order: sharpen completion criterion first (cheap, local); only if irreducibly fuzzy _and_ you observe rush, hide post-completion steps by splitting (sequence cut).
- **Duplication** — same meaning in more than one place. Cost maintenance and tokens, inflate meaning prominence on ladder past real rank.
- **Sediment** — stale layers settle because adding feel safe, removing feel risky. Default fate of any skill without pruning discipline.
- **Sprawl** — skill simply too long, even when every line live and unique. Hurt readability, maintainability, waste tokens. Cure is ladder: disclose **reference** behind pointers, split by **branch** or sequence so each path carry only what it need.
- **No-op** — line model already obey by default, so you pay load to say nothing. Test: does it change behaviour versus default? Weak leading word (_be thorough_ when agent already thorough-ish) is no-op; fix is stronger word (_relentless_), not different technique.
- **Negation** — steering by prohibition backfire: _don't think of an elephant_ name the elephant, make it more available, not less. Prompt the **positive** — state target behaviour so banned one never spoken; keep prohibition only as hard guardrail you can't phrase positively, and even then pair with what to do instead.