---
name: prototype
description: Build a throwaway prototype to answer a design question. Use when the user wants to sanity-check whether a state model or logic feels right, or explore what a UI should look like.
disable-model-invocation: true
---
# Prototype

Prototype = **throwaway code that answers a question**. Question decides shape.

## Pick a branch

Find which question is being answered — from user's prompt, surrounding code, or ask user if around:

- **"Does this logic / state model feel right?"** → [LOGIC.md](LOGIC.md). Build tiny interactive terminal app that pushes state machine through cases hard to reason about on paper.
- **"What should this look like?"** → [UI.md](UI.md). Generate several radically different UI variations on one route, switchable via URL search param + floating bottom bar.

Two branches produce very different artifacts — wrong pick wastes whole prototype. If question ambiguous and user unreachable, default to branch matching surrounding code (backend module → logic; page or component → UI). State assumption at top of prototype.

## Rules that apply to both

1. **Throwaway from day one, clearly marked.** Put prototype code near where it will be used (next to module or page it prototypes for) so context obvious — but name it so reader sees prototype, not production. For throwaway UI routes, obey project's existing routing convention; don't invent new top-level structure.
2. **One command to run.** Use whatever project's existing task runner supports — `pnpm <name>`, `python <path>`, `bun <path>`, etc. User starts it without thinking.
3. **No persistence by default.** State lives in memory. Persistence is what prototype _checks_, not what it depends on. If question involves a database, hit scratch DB or local file with clear "PROTOTYPE — wipe me" name.
4. **Skip polish.** No tests, no error handling beyond what makes prototype _runnable_, no abstractions. Point is to learn fast.
5. **Surface the state.** After every action (logic) or on every variant switch (UI), print or render full relevant state so user sees what changed.
6. **Capture it when done.** Fold validated decisions into real code, then capture prototype as **primary source**: commit to throwaway branch, out of main, leave context pointer to that branch on implementation issue. Capture answer too — verdict and question it settled — in issue or commit. Main branch keeps only validated decision.