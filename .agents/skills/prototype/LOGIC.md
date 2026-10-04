# Logic Prototype

Tiny interactive terminal app. User drive state model by hand. Use when question about **business logic, state transitions, or data shape** — look fine on paper, feel wrong once push through real cases.

## When this is the right shape

- "Not sure this state machine handles edge case X then Y."
- "Does this data model let me represent case where..."
- "Want to feel out API before writing it."
- Anything where user want **press buttons and watch state change**.

If question be "what should this look like" — wrong branch. Use [UI.md](UI.md).

## Process

### 1. State the question

Before code, write down state model + question being prototyped. One paragraph in prototype README or comment at top of file. Prototype that answer wrong question = pure waste — make question explicit so can check later, user watching now or return AFK.

### 2. Pick the language

Use whatever host project use. If project no obvious runtime (e.g. docs repo), ask.

Match existing tooling conventions — don't add new package manager or runtime for prototype.

### 3. Isolate the logic in a portable module

Put actual logic — bit that answer question — behind small pure interface. Can lift out, drop into real codebase later. TUI around it throwaway; logic module not.

Right shape depend on question:

- **Pure reducer** — `(state, action) => state`. Good when actions discrete events, state single value.
- **State machine** — explicit states + transitions. Good when "which actions legal right now" part of question.
- **Small set of pure functions** over plain data type. Good when no implicit current state — just transformations.
- **Class or module with clear method surface** when logic truly own ongoing internal state.

Pick shape that best fit question, *not* easiest to wire to TUI. Keep pure: no I/O, no terminal code, no `console.log` for control flow. TUI import it, call into it; nothing flow other direction.

This make prototype useful past own lifetime: when question answered, validated reducer / machine / function set lift into real module on own.

### 4. Build the smallest TUI that exposes the state

Build **lightweight TUI** — every tick, clear screen (`console.clear()` / `print("\033[2J\033[H")` / equivalent), re-render whole frame. User always see one stable view, not ever-growing scrollback.

Each frame two parts, in this order:

1. **Current state**, pretty-printed, diff-friendly (one field per line, or formatted JSON). **Bold** for field names or section headers, **dim** for less important context (timestamps, IDs, derived values). Native ANSI escape codes fine — `\x1b[1m` bold, `\x1b[2m` dim, `\x1b[0m` reset. No styling library unless already in project.
2. **Keyboard shortcuts**, listed at bottom: `[a] add user  [d] delete user  [t] tick clock  [q] quit`. Bold key, dim description, or vice-versa — whatever read clean.

Behaviour:

1. **Initialise state** — single in-memory object/struct. Render first frame on start.
2. **Read one keystroke (or one line)** at time, dispatch to handler that mutate state.
3. **Re-render** full frame after every action — don't append, replace.
4. **Loop until quit.**

Whole frame fit on one screen.

### 5. Make it runnable in one command

Add script to existing task runner (`package.json` scripts, `Makefile`, `justfile`, `pyproject.toml`). User run `pnpm run <prototype-name>` or equivalent — never remember path.

If no task runner, put command at top of prototype README.

### 6. Hand it over

Give user run command. They drive it; interesting moments when they say "wait, that shouldn't be possible" or "huh, I assumed X would be different" — those be bugs in _idea_, the whole point. Want new actions? Add them. Prototypes evolve.

### 7. Capture the answer and the prototype

Once prototype answered question, capture answer, then capture prototype as [SKILL](SKILL.md) describe. Logic mapping: validated reducer / machine / function set lift into real module (decision, absorbed); TUI shell ride along to throwaway branch that keep prototype as primary source.

## Anti-patterns

- **Don't add tests.** Prototype that need tests no longer prototype.
- **Don't wire to real database.** Use in-memory store unless question about persistence.
- **Don't generalise.** No "what if support X later." Prototype answer one question.
- **Don't blur logic + TUI.** If reducer / state machine use `console.log`, prompts, or terminal escape codes, no longer portable. TUI thin shell over pure module.
- **Don't ship TUI shell to production.** Shell optimised for hand-driving from terminal. Logic module behind it be bit worth keeping.