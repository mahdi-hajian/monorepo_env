---
name: diagnosing-bugs
description: Diagnosis loop for hard bugs and performance regressions. Use when the user says "diagnose"/"debug this", or reports something broken/throwing/failing/slow.
disable-model-invocation: true
---
# Diagnosing Bugs

Discipline for hard bugs. Skip phases only when explicitly justified.

Exploring codebase: read `CONTEXT.md` (if exists) for mental model of modules; check ADRs in area you touch.

## Phase 1 — Build a feedback loop

**This is the skill.** Rest mechanical. **Tight** pass/fail signal — goes red on _this_ bug — you find cause; bisection, hypothesis-testing, instrumentation all just consume it. No signal? no amount of code staring saves you.

Spend disproportionate effort here. **Be aggressive. Be creative. Refuse to give up.**

### Ways to construct one — try them in roughly this order

1. **Failing test** at seam that reaches bug — unit, integration, e2e.
2. **Curl / HTTP script** against running dev server.
3. **CLI invocation** with fixture input, diff stdout against known-good snapshot.
4. **Headless browser script** (Playwright / Puppeteer) — drives UI, asserts on DOM/console/network.
5. **Replay captured trace.** Save real network request / payload / event log to disk; replay through code path in isolation.
6. **Throwaway harness.** Spin up minimal subset of system (one service, mocked deps) exercising bug code path with single function call.
7. **Property / fuzz loop.** Bug = "sometimes wrong output"? Run 1000 random inputs, look for failure mode.
8. **Bisection harness.** Bug appeared between two known states (commit, dataset, version)? Automate "boot at state X, check, repeat" so you can `git bisect run` it.
9. **Differential loop.** Same input through old-version vs new-version (or two configs), diff outputs.
10. **HITL bash script.** Last resort. Human must click? Drive _them_ with `scripts/hitl-loop.template.sh` so loop still structured. Captured output feeds back to you.

Build right feedback loop, bug 90% fixed.

### Tighten the loop

Treat loop as product. Have _a_ loop? **Tighten** it:

- Faster? (Cache setup, skip unrelated init, narrow test scope.)
- Sharper signal? (Assert specific symptom, not "didn't crash".)
- More deterministic? (Pin time, seed RNG, isolate filesystem, freeze network.)

30-second flaky loop barely better than no loop; 2-second deterministic one tight — debugging superpower.

### Non-deterministic bugs

Goal: not clean repro, but **higher reproduction rate**. Loop trigger 100×, parallelise, add stress, narrow timing windows, inject sleeps. 50%-flake debuggable; 1% not — raise rate until debuggable.

### When you genuinely cannot build a loop

Stop, say so explicitly. List what you tried. Ask user for: (a) access to reproducing environment, (b) captured artifact (HAR file, log dump, core dump, screen recording with timestamps), or (c) permission for temporary production instrumentation. Do **not** hypothesise without a loop.

### Completion criterion — a tight loop that goes red

Phase 1 done when loop **tight** + **red-capable**: name **one command** — script path, test invocation, curl — **already run at least once** (paste invocation + output), and it is:

- [ ] **Red-capable** — drives actual bug code path, asserts **user's exact symptom**; goes red on this bug, green when fixed. Not "runs without erroring" — must _catch this specific bug_.
- [ ] **Deterministic** — same verdict every run (flaky: pinned high reproduction rate, see above).
- [ ] **Fast** — seconds, not minutes.
- [ ] **Agent-runnable** — runs unattended; human in loop only via `scripts/hitl-loop.template.sh`.

Catch yourself reading code to build theory before this command exists? **Stop — jumping straight to hypothesis is exact failure this skill prevents.** No red-capable command, no Phase 2.

## Phase 2 — Reproduce + minimise

Run loop. Watch it go red — bug appears.

Confirm:

- [ ] Loop produces failure mode **user** described — not different failure nearby. Wrong bug = wrong fix.
- [ ] Reproducible across multiple runs (or, non-deterministic: high enough rate to debug against).
- [ ] Captured exact symptom (error message, wrong output, slow timing) so later phases verify fix addresses it.

### Minimise

Once red, shrink repro to **smallest scenario that still goes red**. Cut inputs, callers, config, data, steps **one at a time**, re-run loop after each cut — keep only load-bearing elements.

Why: minimal repro shrinks hypothesis space in Phase 3 (fewer moving parts to suspect), becomes clean regression test in Phase 5.

Done when **every remaining element load-bearing** — remove any one, loop goes green.

Do not proceed until reproduced **and** minimised.

## Phase 3 — Hypothesise

Generate **3–5 ranked hypotheses** before testing any. Single hypothesis anchors on first plausible idea.

Each hypothesis must be **falsifiable**: state prediction it makes.

> Format: "If <X> is the cause, then <changing Y> will make the bug disappear / <changing Z> will make it worse."

Cannot state prediction? hypothesis is a vibe — discard or sharpen.

**Show ranked list to user before testing.** They often have domain knowledge that re-ranks instantly ("we just deployed a change to #3"), or know hypotheses already ruled out. Cheap checkpoint, big time saver. Don't block — proceed with your ranking if user AFK.

## Phase 4 — Instrument

Each probe maps to specific prediction from Phase 3. **Change one variable at a time.**

Tool preference:

1. **Debugger / REPL inspection** if env supports it. One breakpoint beats ten logs.
2. **Targeted logs** at boundaries that distinguish hypotheses.
3. Never "log everything and grep".

**Tag every debug log** with unique prefix, e.g. `[DEBUG-a4f2]`. Cleanup at end becomes single grep. Untagged logs survive; tagged logs die.

**Perf branch.** Performance regressions: logs usually wrong. Instead: establish baseline measurement (timing harness, `performance.now()`, profiler, query plan), then bisect. Measure first, fix second.

## Phase 5 — Fix + regression test

Write regression test **before fix** — but only if **correct seam** exists for it.

Correct seam = test exercises **real bug pattern** as it occurs at call site. Only seam too shallow (single-caller test when bug needs multiple callers, unit test can't replicate chain that triggered bug)? Regression test there gives false confidence.

**No correct seam exists? that itself is the finding.** Note it. Codebase architecture prevents bug from being locked down. Flag for next phase.

If correct seam exists:

1. Turn minimised repro into failing test at that seam.
2. Watch it fail.
3. Apply fix.
4. Watch it pass.
5. Re-run Phase 1 feedback loop against original (un-minimised) scenario.

## Phase 6 — Cleanup + post-mortem

Required before declaring done:

- [ ] Original repro no longer reproduces (re-run Phase 1 loop)
- [ ] Regression test passes (or absence of seam documented)
- [ ] All `[DEBUG-...]` instrumentation removed (`grep` the prefix)
- [ ] Throwaway prototypes deleted (or moved to clearly-marked debug location)
- [ ] Correct hypothesis stated in commit / PR message — so next debugger learns

**Then ask: what would have prevented this bug?** Answer involves architectural change (no good test seam, tangled callers, hidden coupling)? Hand off to `/improve-codebase-architecture` skill with specifics. Make recommendation **after** fix is in, not before — more information now than at start.