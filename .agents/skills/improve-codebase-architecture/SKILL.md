---
name: improve-codebase-architecture
description: Scan a codebase for deepening opportunities, present them as a visual HTML report, then grill through whichever one you pick.
disable-model-invocation: true
---
# Improve Codebase Architecture

Find arch friction. Suggest **deep-making changes** — refactors that turn shallow modules into deep ones. Goal: testability + AI-navigability.

Command _informed_ by project domain model. Built on shared design words:

- Run `/codebase-design` skill for arch words (**module**, **interface**, **depth**, **seam**, **adapter**, **leverage**, **locality**) and rules (deletion test, "interface = test surface", "one adapter = made-up seam, two = real"). Use these exact words in every idea — no drift to "component," "service," "API," "boundary."
- Domain words in `CONTEXT.md` name good seams; ADRs in `docs/adr/` hold decisions — don't re-fight.

## Process

### 1. Explore

**Look before you scan — YAGNI.** Deep module pays off: future changes to it get easier. So weight recently-changed code more. Decide *where* to look before you look:

- If user names direction — module, subsystem, pain point — take it. Skip guessing below.
- Else, walk back commit history (`git log --oneline`) to find hot spots — files and areas that keep showing up. Let those paths pull attention first. If changes scattered, no clear hot spot — widen net.

Read domain glossary (`CONTEXT.md`) and any ADRs near your area first.

Then use Agent tool with `subagent_type=Explore` to walk codebase. No rigid rules — explore loose, note where you feel friction:

- Where understanding one concept needs bouncing between many small modules?
- Where modules **shallow** — interface almost as big as implementation?
- Where pure functions pulled out just for testability, but real bugs hide in how they called (no **locality**)?
- Where tight-coupled modules leak across seams?
- Which parts untested, or hard to test through current interface?

Use **deletion test** on anything you suspect shallow: would deleting it pack complexity in, or just move it? "Yes, packs in" = the signal you want.

### 2. Present candidates as an HTML report

Write self-contained HTML file to OS temp dir so nothing lands in repo. Get temp dir from `$TMPDIR`, fallback `/tmp` (or `%TEMP%` on Windows). Write to `<tmpdir>/architecture-review-<timestamp>.html` so each run gets fresh file. Open for user — `xdg-open <path>` on Linux, `open <path>` on macOS, `start <path>` on Windows — and tell them absolute path.

Report uses **Tailwind via CDN** for layout/styling, **Mermaid via CDN** for diagrams where graph/flow/sequence tells structure well. Mix Mermaid with hand-made CSS/SVG — Mermaid when relations graph-shaped (call graphs, deps, sequences), hand-built divs/SVG when want more editorial (mass diagrams, cross-sections, collapse animations). Each candidate gets **before/after picture**. Be visual.

For each candidate, show card with:

- **Files** — which files/modules involved
- **Problem** — why current arch causes friction
- **Solution** — plain English of what would change
- **Benefits** — in words of locality and leverage, and how tests improve
- **Before / After diagram** — side-by-side, hand-drawn, showing shallowness and the deepening
- **Recommendation strength** — one of `Strong`, `Worth exploring`, `Speculative`, shown as badge

End report with **Top recommendation** part: which candidate to tackle first and why.

**Use `CONTEXT.md` words for domain, `/codebase-design` words for arch.** If `CONTEXT.md` defines "Order," say "Order intake module" — not "FooBarHandler," not "Order service."

**ADR fights**: if candidate contradicts existing ADR, only surface when friction real enough to reopen ADR. Mark clearly in card (e.g. warning callout: _"contradicts ADR-0007 — but worth reopening because…"_). Don't list every theoretical refactor an ADR bans.

See [HTML-REPORT.md](HTML-REPORT.md) for full HTML scaffold, diagram patterns, styling help.

Do NOT propose interfaces yet. After file written, ask user: "Which of these would you like to explore?"

### 3. Grilling loop

Once user picks candidate, run `/grilling` skill to walk decision tree with them — constraints, deps, shape of deepened module, what sits behind seam, what tests survive.

Side effects happen inline as decisions firm up — run `/domain-modeling` skill to keep domain model current as you go:

- **Naming deepened module after concept not in `CONTEXT.md`?** Add term to `CONTEXT.md`. Make file lazy if not there.
- **Sharpening fuzzy term during chat?** Update `CONTEXT.md` right there.
- **User rejects candidate with load-bearing reason?** Offer ADR, framed: _"Want me to record this as an ADR so future architecture reviews don't re-suggest it?"_ Only offer when reason actually needed by future explorer to avoid re-suggesting same thing — skip throwaway reasons ("not worth it right now") and self-evident ones.
- **Want to explore other interfaces for deepened module?** Run `/codebase-design` skill and use its design-it-twice parallel sub-agent pattern.