---
name: code-review
description: Review the changes since a fixed point (commit, branch, tag, or merge-base) along two axes — Standards (does the code follow this repo's documented coding standards?) and Spec (does the code match what the originating issue/PRD asked for?). Runs both reviews in parallel sub-agents and reports them side by side. Use when the user wants to review a branch, a PR, work-in-progress changes, or asks to "review since X".
disable-model-invocation: true
---
Two-axis review of diff between `HEAD` and fixed point user supplies:

- **Standards** — code follow this repo's documented coding standards?
- **Spec** — code faithfully implement originating issue / PRD / spec?

Both axes run as **parallel sub-agents** — no context pollution between them. This skill aggregates findings.

Issue tracker should already be provided. Run `/setup-matt-pocock-skills` if `docs/agents/issue-tracker.md` missing.

## Process

### 1. Pin the fixed point

Fixed point = whatever user said — commit SHA, branch name, tag, `main`, `HEAD~5`, etc. If none given, ask.

Capture diff command once: `git diff <fixed-point>...HEAD` (three-dot = compare vs merge-base). Also note commit list: `git log <fixed-point>..HEAD --oneline`.

Before continuing, confirm fixed point resolves (`git rev-parse <fixed-point>`) and diff non-empty. Bad ref or empty diff must fail here — not inside two parallel sub-agents.

### 2. Identify the spec source

Find originating spec, this order:

1. Issue refs in commit messages (`#123`, `Closes #45`, GitLab `!67`, etc.) — fetch via workflow in `docs/agents/issue-tracker.md`.
2. A path the user passed as an argument.
3. PRD/spec file under `docs/`, `specs/`, or `.scratch/` matching branch name or feature.
4. If nothing found, ask user where spec is. If no spec exists, **Spec** sub-agent skips, reports "no spec available".

### 3. Identify the standards sources

Anything in repo documenting how code should be written, e.g. `CODING_STANDARDS.md` or `CONTRIBUTING.md`.

On top of repo docs, Standards axis always carries **smell baseline** below — fixed set of Fowler code smells (_Refactoring_, ch.3), applies even when repo documents nothing. Two rules bind it:

- **Repo overrides.** Documented repo standard always wins. Where it endorses something baseline would flag, suppress smell.
- **Always judgement call.** Each smell = labelled heuristic ("possible Feature Envy"), never hard violation. Skip anything tooling already enforces.

Each smell: *what it is* → *how to fix*. Match against diff:

- **Mysterious Name** — function, variable, or type whose name doesn't reveal what it does or holds. → rename it. No honest name possible → design murky.
- **Duplicated Code** — same logic shape in more than one hunk or file in change. → extract shared shape, call from both.
- **Feature Envy** — method reaches into another object's data more than own. → move method onto data it envies.
- **Data Clumps** — same few fields or params keep travelling together (type wanting to be born). → bundle into one type, pass that.
- **Primitive Obsession** — primitive or string standing in for domain concept that deserves own type. → give concept own small type.
- **Repeated Switches** — same `switch`/`if`-cascade on same type recurs across change. → replace with polymorphism, or one shared map.
- **Shotgun Surgery** — one logical change forces scattered edits across many files in diff. → gather what changes together into one module.
- **Divergent Change** — one file or module edited for several unrelated reasons. → split so each module changes for one reason.
- **Speculative Generality** — abstraction, parameters, or hooks added for needs spec doesn't have. → delete. Inline back until real need shows.
- **Message Chains** — long `a.b().c().d()` navigation caller shouldn't depend on. → hide walk behind one method on first object.
- **Middle Man** — class or function that mostly just delegates onward. → cut it, call real target direct.
- **Refused Bequest** — subclass or implementer ignores or overrides most of what it inherits. → drop inheritance, use composition.

### 4. Spawn both sub-agents in parallel

Send one message with two `Agent` tool calls. Use `general-purpose` subagent for both.

**Standards sub-agent prompt** — include:

- Full diff command and commit list.
- Standards-source files found in step 3, **plus smell baseline from step 3** pasted in full — sub-agent has no other access to it.
- The brief: "Report — per file/hunk where relevant — (a) every place diff violates documented standard: cite standard (file + rule); and (b) any baseline smell you spot: name it, quote hunk. Distinguish hard violations from judgement calls — documented-standard breaches can be hard, but baseline smells always judgement calls, and documented repo standard overrides baseline. Skip anything tooling enforces. Under 400 words."

**Spec sub-agent prompt** — include:

- Diff command and commit list.
- Path or fetched contents of spec.
- The brief: "Report: (a) spec requirements missing or partial; (b) diff behaviour not asked for (scope creep); (c) requirements that look implemented but implementation looks wrong. Quote spec line for each finding. Under 400 words."

If spec missing, skip Spec sub-agent, note in final report.

### 5. Aggregate

Present both reports under `## Standards` and `## Spec` headings, verbatim or lightly cleaned. Do **not** merge or rerank findings — two axes deliberately separate (see _Why two axes_).

End with one-line summary: total findings per axis, and worst issue _within each axis_ (if any). Don't pick single winner across axes — that's the reranking the separation prevents.

## Why two axes

A change can pass one axis and fail other:

- Code follows every standard but implements wrong thing → **Standards pass, Spec fail.**
- Code does exactly what issue asked but breaks project conventions → **Spec pass, Standards fail.**

Report separately — stops one axis masking other.