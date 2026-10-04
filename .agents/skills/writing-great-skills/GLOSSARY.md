# Glossary — Building Great Skills

Domain model for what makes a skill great. A skill exists to wrangle determinism out of a stochastic system; root virtue is **Predictability**, every term below is a lever on it. Disclosed reference for [`writing-great-skills`](SKILL.md).

Terms grouped by axis: **Invocation** (how a skill is reached), **Information Hierarchy** (how its content is arranged), **Steering** (how agent's runtime behaviour is shaped), **Pruning** (how kept lean). Each **failure mode** lives beside the lever that cures it, tagged _failure mode_.

**Bold terms** in any definition are themselves defined in this glossary; find them by their heading.

## Predictability

Degree to which a skill makes agent behave the same _way_ every run — same process, not same output (a brainstorming skill should _predictably_ diverge; tokens vary, behaviour doesn't). Root virtue every other term serves — cost and maintainability are symptoms of it, not rivals.

_Avoid_: consistency, reliability, robustness, output-determinism

## Invocation

How a skill is reached — and the two loads you pay for the choice.

### Model-Invoked

Skill that keeps its **description** field, so agent sees it and fires it autonomously — and human can still type its name, so model-invocation always _includes_ user reach. No model-only state: description only ever _adds_ agent discovery, never removes human's. Pays permanent **context load** every turn in exchange for that discoverability. Reachable by other skills, because description that makes it agent-discoverable makes it invocable. A model-invoked skill whose content is all **reference** is also one home for shared reference: another skill can invoke it, so reference needed by several skills lives in one place. Pick model-invocation only when agent must reach skill on its own; if it never fires except by hand, drop description, pay no context load.

_Avoid_: ability, tool, capability

### User-Invoked

Skill with **description** stripped — invisible to agent, reachable only by human typing its name (user-_only_, where **model-invoked** is user-_and-agent_). Trades agent-discoverability for zero **context load**. No description → nothing but human can reach it: no other skill can fire it.

_Avoid_: procedure, workflow, command

### Description

Skill's machine-readable trigger, and the one **context pointer** a **model-invoked** skill is forced to keep loaded at all times. Mere presence _is_ the invocation axis: keep it → skill is model-invoked (and reachable by other skills); delete it → skill is **user-invoked**, reachable only by human. Source of a model-invoked skill's **context load**.

_Avoid_: frontmatter, summary

### Context Pointer

Reference held in agent's context that names some out-of-context material and encodes the condition for reaching it. **Description** is top-level context pointer (context window → skill); pointers to disclosed files are same object one level down. Its wording, not the target, decides _when_ agent reaches — and _how reliably_. Must-have target behind weakly worded pointer is a variance bug: fix wording first, inline material only if sharpening fails.

_Avoid_: link, reference, import

### Context Load

Cost a **model-invoked** skill imposes on agent's context window — its **description**, always loaded, spending tokens and attention. What **user-invoked** skills escape by having no description; brake on splitting into more model-invoked skills.

_Avoid_: token cost, context bloat

### Cognitive Load

Cost a **user-invoked** skill imposes on human — what they must hold in head: which skills exist and when to reach for each (human is the index). What **model-invocation** removes by being agent-discoverable; brake on splitting into more user-invoked skills. Not a cost to minimise: price of human agency, reason some skills stay user-invoked. Spend it where human judgement matters; remove it where it does not.

_Avoid_: human index, burden, overhead

### Router Skill

A **user-invoked** skill whose job is to point at your other user-invoked skills — naming each and when to reach for it — so human has one skill to remember instead of many. Can only hint, never fire them: user-invoked skills have no **description**, so nothing but human can reach them. Cure for **cognitive load** when user-invoked skills multiply.

_Avoid_: dispatcher, menu, registry, index, router procedure

### Granularity

How finely you divide skills. Finer division spends one of the two loads: more **model-invoked** skills spend **context load** (more descriptions crowding window, competing for attention); more **user-invoked** skills spend **cognitive load** (more for human to remember and reach for). Two cuts guide division. By **invocation**, split off a model-invoked skill where you have a distinct **leading word** to trigger it — a trigger word you actually use in your prompts. By **sequence**, split a run of **steps** where a step's **post-completion steps** need hiding, since isolating it in its own context clears what follows. Beware the reverse: merging sequences exposes each step's post-completion steps to what follows, inviting premature completion.

_Avoid_: chunking, modularity

## Information Hierarchy

How a skill's content is arranged, and how far down the ladder each piece sits.

### Information Hierarchy

A skill's content ranked by how immediately agent needs it — a single ladder, produced by two cuts: in-file or behind a pointer, and step or reference. Rungs:

- **Steps** — in-file, primary
- **Reference**, in-file — secondary
- **Reference**, disclosed — behind a **context pointer**

Skill with no **steps** uses just the bottom two rungs — often a legitimately flat peer-set (e.g. every rule of a review on one rung), which is a fine arrangement, not a smell. Hierarchy is independent of invocation: a skill can be model- or user-invoked whether it is all steps, all reference, or both. When a skill has steps, in-file reference that should be disclosed buries them and turns attending to them into a coin-flip — a variance lever, not just a legibility one. Keep top of ladder legible; push down it whatever you can.

_Avoid_: structure, organization, layout

### Steps

Ordered actions agent performs — when a skill has them, the primary tier of its content, and the part that earns its place in SKILL.md. Not every skill has steps: a skill can be all steps (`tdd`), all **reference** (a review), or both, independent of invocation. Every step ends on a **completion criterion**, clear or vague.

_Avoid_: workflow, instructions, choreography

### Reference

Material agent refers to on demand — definitions, facts, parameters, examples, conditional instructions. When a skill has **steps** it is secondary to them; when a skill has none it is the entire content; or it lives outside any skill entirely — see **External Reference**. Reached via **context pointers**; prime candidate for **progressive disclosure**.

_Avoid_: supporting material, docs, background

### External Reference

**Reference** that lives outside skill system — a plain file, no **description**, no **steps**, not invocable — that any skill can point at. Home for shared reference that needn't fire on its own; only shared home two **user-invoked** skills can use, since neither has a description and so neither can fire the other.

_Avoid_: doc, resource, knowledge base

### Progressive Disclosure

Moving **reference** down the ladder — out of SKILL.md and behind a **context pointer** — so top stays legible. Not primarily a token optimisation; it is how the **information hierarchy** is protected. Licensed by **branching**: disclose what only some branches need, inline what every path needs, and if a pointer fires unreliably on must-have material, sharpen its wording, and pull it back inline only if that fails.

_Avoid_: lazy loading, chunking

### Co-location

Keeping the material an agent needs at once in one place — a concept's definition, rules, and caveats under a single heading, not scattered across the file — so reading one part brings its neighbours with it. Within-file companion to the **Information Hierarchy**: hierarchy ranks _how far down_ a piece sits; co-location decides _what sits beside it_ once there. No formula for the right format of a body of **reference**; test: a skill should read like documentation written for the agent, and grouped material reads that way where scattered material does not. Distinct from **Duplication**: that repeats one meaning in two places, where scattering fragments a single meaning across many.

_Avoid_: grouping, clustering, cohesion

### Sprawl

_Failure mode._ Skill that is simply too long — too many lines in SKILL.md — independent of whether stale or repeated. Even an all-live, all-unique skill can sprawl. Costs readability (agent wades through more before it can act; attention thins across the excess), maintainability (every extra line is one more to keep **relevant**), and tokens. Cure is the **information hierarchy**: push **reference** down behind **context pointers**, and split by **branch** or sequence so each path carries only what it needs. Distinct from **sediment** (length from stale accumulation) and **duplication** (length from repeated meaning) — sprawl is length itself, whatever its cause.

_Avoid_: bloat, length, size, verbosity

## Steering

Levers that shape agent's runtime behaviour toward **Predictability**.

### Branch

Distinct way a skill can be invoked — a case the skill handles — so different runs take different paths through it. A skill with many steps may carry many branches; a linear one has none.

_Avoid_: path, case, fork

### Leading Word

Compact concept — also called a _Leitwort_ — already living in model's pretraining, that agent thinks with while running the skill. Encodes a behavioural principle in the fewest possible tokens by invoking priors the model already holds (e.g. _lesson_, _proximal zone of development_, _fog of war_, _tracer bullets_). Repeated as a token, never as a sentence, it accumulates a distributed definition across the skill and anchors a whole region of behaviour. Coining your own works if you define it clearly, but a made-up word recruits no priors — you pay in definition tokens what a pretrained word gives free. Reach for an existing word first.

A leading word serves **predictability** twice. In the body it anchors **execution** — agent reaches for same behaviour every time the concept appears, and inside flat reference it focuses attention on a class of thing to look for, recruiting the right checks each run. In the **description** it anchors **invocation** — and not only within the skill: when the same word lives in your prompts, your docs, and your codebase, agent links that shared language to the skill and fires it more reliably. Word a description with the leading words you actually use when you want the skill.

_Avoid_: keyword, term, motif

### Completion Criterion

Condition that tells agent a unit of work is done — the target it judges against. Two properties make it a lever, not just a quality. Its **clarity** (can agent tell done from not-done?) resists **premature completion** — a vague bound ("understanding reached") lets agent declare done and slip to the next step; this axis needs _steps_ to bite, since premature completion is a between-steps failure. Its **demand** (how much it requires) sets **legwork** — "every modified model accounted for" forces thorough work where "produce a change list" does not — and this axis is _not_ step-bound: it can bind a body of flat reference too, which is how a skill with no steps still carries an exhaustiveness bar ("every rule applied"). Strongest criteria are both checkable and exhaustive.

_Avoid_: done condition, exit condition, stopping rule

### Legwork

Work an agent does behind the scenes within a single step — reading files, exploring the codebase, making changes, digging up what it needs rather than offloading to the user. Lives below the step structure: never written as its own step, latent in the wording, controlled by the agent rather than the skill. Within-step counterpart to **post-completion steps**' across-step pull. Raised by a **leading word** (_comprehensive_, _thorough_) or a **completion criterion** that demands work be exhaustive — including demand axis applied to flat reference, which is what drives a skill of flat reference to cover all its rungs. Goes thin either when that demand is missing or when **premature completion** cuts the step short.

_Avoid_: scope, effort, diligence, coverage

### Post-Completion Steps

The **steps** that follow the current step. Visible, they pull agent forward into **premature completion** — the more it sees, the stronger the tug; defence is to hide them by splitting the sequence of steps into two.

_Avoid_: horizon, fog of war, lookahead

### Premature Completion

_Failure mode._ Ending the current step before it is genuinely done, because agent's attention slips to being done rather than to the work. A between-steps failure: needs **steps** to occur — a skill with no steps that quits early isn't premature completion but thin **legwork** under an unmet demand. A tug-of-war between two forces: visible **post-completion steps** (the pull forward) and **completion criterion**'s clarity (the resistance — a sharp, checkable bar holds; a vague one gives way). Fuzziness is the necessary condition: a sharp bound resists the pull no matter how many later steps are visible, so a step that never rushes needs no defending. Two levers hold a step that does, but reach for them in order: **sharpen the bound first** — it is local and cheap. Only when criterion is irreducibly fuzzy _and_ you actually observe the rush do you **hide the later steps** — and hiding only works across a real context boundary (a user-invoked hand-off or a subagent dispatch; an inline model-invoked call leaves the later steps in context and clears nothing). One cause of thin legwork, but distinct from it: legwork can be thin even when a step runs to full completion.

_Avoid_: premature closure, the rush, rushing, shortcutting

### Negation

_Failure mode._ Steering by prohibition — telling agent what _not_ to do — which drags the forbidden behaviour into context and makes it _more_ available, not less. _Don't think of an elephant_, and the elephant is all there is; _never write verbose comments_, and verbosity is the pattern agent has just read. The negation is a weak modifier the strongly-activated concept overruns, so the ban half-reads as an instruction to do the thing. Its **leading word** is the _elephant_: whatever a prohibition names into the frame. Cure: prompt the **positive** — describe target behaviour ("write one-line comments") so the banned one is never spoken. A prohibition earns its place only as a hard guardrail on a behaviour you cannot phrase positively; even then, pair it with the positive target so attention lands on what to do.

_Avoid_: ironic rebound, don't-prompting, the pink elephant

## Pruning

Keeping a skill lean — each remedy paired with the failure it cures.

### Single Source of Truth

Desired state where each meaning lives in exactly one authoritative place, so a change to the skill's behaviour is a change in one place. **Duplication** is its violation.

_Avoid_: home, canonical location

### Duplication

_Failure mode._ Same meaning given more than one **single source of truth**. Costs maintenance (change one place, you must change the others), costs tokens, and inflates prominence — repeating a meaning weights it on the ladder past its real rank. Accidental inverse of a **leading word**, which raises attention on purpose by repeating a token, never the meaning.

_Avoid_: repetition, redundancy

### Relevance

Whether a line still bears on what the skill does — the lens for what to keep. A line loses relevance either by never bearing on the task (mere exposition, or a **branch** that should be disclosed) or by going stale: drifting out of date as the behaviour or world it describes changes. Shorter skills are easier to keep relevant, because each line is cheaper to check. Distinct from **no-op**: relevance asks whether a line bears on the task, not whether it changes behaviour.

_Avoid_: load-bearing, staleness, freshness

### Sediment

_Failure mode._ Layers of old content that settle in a skill and are never cleared, because adding feels safe and removing feels risky — so stale and irrelevant lines accumulate and you must core down through them to find what is still live. Default fate of any skill without a pruning discipline; slow erosion of **relevance**, as opposed to **duplication**'s repeated meaning.

_Avoid_: accretion, bloat, cruft, rot

### No-Op

_Failure mode._ An instruction that changes nothing because the model already does it by default — you pay load to tell agent what it would do anyway. Test: does a line change behaviour versus the default? A line can be perfectly **relevant** and still be a no-op. Same priors that make a **leading word** free make a no-op worthless.

A leading word is a _technique_; No-Op is a _verdict_ on a line — and they cross. A leading word too weak to beat the default is a no-op (_be thorough_ when agent is already thorough-ish), and the fix is a stronger word that passes the verdict (_relentless_), not a different technique. So the No-Op test — does it change behaviour versus the default? — is also how you grade whether a leading word is earning its repetitions. This is model-relative, not reader-relative: two people disagreeing over whether a line is a no-op disagree about the default, and settle it by running the skill, not by debate.

_Avoid_: redundant instruction, restating the obvious, belaboring