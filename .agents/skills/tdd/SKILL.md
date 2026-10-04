---
name: tdd
description: Test-driven development. Use when the user wants to build features or fix bugs test-first, mentions "red-green-refactor", or wants integration tests.
disable-model-invocation: true
---
# Test-Driven Development

TDD = red → green loop. This skill makes that loop produce tests worth keeping: what good test is, where tests go, anti-patterns, rules of loop. Every section applies every cycle — consult before + during loop, not after.

When exploring codebase, read `CONTEXT.md` (if exists) so test names + interface vocabulary match project's domain language, respect ADRs in area you're touching.

## What a good test is

Tests verify behavior through public interfaces, not implementation details. Code can change entirely; tests shouldn't. Good test reads like spec — "user can checkout with valid cart" tells exactly what capability exists — survives refactors, doesn't care about internal structure.

See [tests.md](tests.md) for examples, [mocking.md](mocking.md) for mocking guidelines.

## Seams — where tests go

**Seam** = public boundary you test at: interface where you observe behavior without reaching inside. Tests live at seams, never against internals.

**Test only at pre-agreed seams.** Before writing any test, write down seams under test, confirm with user. No test written at unconfirmed seam. Can't test everything — agreeing seams up front lands testing effort on critical paths + complex logic, not every edge case.

Ask: "What's the public interface, and which seams should we test?"

## Anti-patterns

- **Implementation-coupled** — mocks internal collaborators, tests private methods, or verifies through side channel (query database instead of using interface). Tell: test breaks when you refactor but behavior unchanged.
- **Tautological** — assertion recomputes expected value same way as code (`expect(add(a, b)).toBe(a + b)`, snapshot derived by hand same way, constant asserted equal to itself), so passes by construction, can never disagree with code. Expected values must come from independent source of truth — known-good literal, worked example, spec.
- **Horizontal slicing** — write all tests first, then all implementation. Bulk tests verify _imagined_ behavior: test _shape_ of things rather than user-facing behavior, tests go insensitive to real changes, commit to test structure before understanding implementation. Work in **vertical slices** instead — one test → one implementation → repeat, each test a **tracer bullet** responding to what last cycle taught.

## Rules of the loop

- **Red before green.** Write failing test first, then only enough code to pass. Don't anticipate future tests or add speculative features.
- **One slice at a time.** One seam, one test, one minimal implementation per cycle.
- **Refactoring is not part of the loop.** Belongs to review stage (see `code-review` skill), not red → green implementation cycle.