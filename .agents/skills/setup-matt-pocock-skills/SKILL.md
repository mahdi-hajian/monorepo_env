---
name: setup-matt-pocock-skills
description: Configure this repo for the engineering skills — set up its issue tracker, triage label vocabulary, and domain doc layout. Run once before first use of the other engineering skills.
disable-model-invocation: true
---
# Setup Matt Pocock's Skills

Scaffold per-repo config that engineering skills assume:

- **Issue tracker** — where issues live (GitHub default; local markdown also works out of box)
- **Triage labels** — strings for five canonical triage roles
- **Domain docs** — where `CONTEXT.md` and ADRs live, plus consumer rules for reading them

Prompt-driven skill, not deterministic script. Explore, present what found, confirm with user, then write.

## Process

### 1. Explore

Look at repo. Read what exists. No assume:

- `git remote -v` and `.git/config` — GitHub repo? Which one?
- `AGENTS.md` and `CLAUDE.md` at repo root — either exist? `## Agent skills` section already in either?
- `CONTEXT.md` and `CONTEXT-MAP.md` at repo root
- `docs/adr/` and any `src/*/docs/adr/` dirs
- `docs/agents/` — this skill's prior output already exist?
- `.scratch/` — sign local-markdown issue tracker convention already in use
- `triage` skill installed? (a `triage` skill folder alongside this one, or `triage` in your available skills.) This decides whether Section B runs at all.
- Monorepo signals — `pnpm-workspace.yaml`, a `workspaces` field in `package.json`, or populated `packages/*` with own `src/`. Present only in genuinely large multi-package repo; absence means single-context, which is almost every repo.

### 2. Present findings and ask

Summarise what present, what missing. Then take sections in order — one section, one answer, then next.

Lead each section with recommended answer so user can accept in one word. Give one-line explainer only when choice genuinely branches; skip section entirely when exploration already settled it (Section B when `triage` not installed, Section C when no monorepo).

**Section A — Issue tracker.**

> Explainer: "issue tracker" = where issues live for this repo. Skills like `to-tickets`, `triage`, `to-spec`, and `qa` read and write it — need know whether to call `gh issue create`, write markdown file under `.scratch/`, or follow other workflow you describe. Pick place you actually track work for this repo.

Default posture: skills designed for GitHub. If `git remote` points at GitHub, propose that. If `git remote` points at GitLab (`gitlab.com` or self-hosted host), propose GitLab. Otherwise (or if user prefers), offer:

- **GitHub** — issues live in repo's GitHub Issues (uses `gh` CLI)
- **GitLab** — issues live in repo's GitLab Issues (uses [`glab`](https://gitlab.com/gitlab-org/cli) CLI)
- **Local markdown** — issues live as files under `.scratch/<feature>/` in this repo (good for solo projects or repos without remote)
- **Other** (Jira, Linear, etc.) — ask user to describe workflow in one paragraph; skill records it as freeform prose

Record choice in `docs/agents/issue-tracker.md`. GitHub and GitLab templates carry "PRs as a request surface" flag, defaulted **off** — leave off, no raise; user wanting external PRs in triage queue can flip flag in file later.

**Section B — Triage label vocabulary.** Skip entirely if `triage` skill not installed (exploration told you) — uninstalled skill needs no labels.

If installed, ask exactly one question:

> Want keep default triage labels? (recommended: **yes**)

Defaults = five canonical roles, each label string equal to its name: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. On **yes**, write as-is. Only if user says no — usually because tracker already uses other names (e.g. `bug:triage` for `needs-triage`) — collect overrides so `triage` applies existing labels instead of creating duplicates.

**Section C — Domain docs.** Default **single-context** — one `CONTEXT.md` + `docs/adr/` at repo root. Fits almost every repo; write without asking.

Offer **multi-context** — root `CONTEXT-MAP.md` pointing to per-context `CONTEXT.md` files — only when exploration found monorepo signals. Then confirm which layout wanted.

### 3. Confirm and edit

Show user draft of:

- The `## Agent skills` block to add to whichever of `CLAUDE.md` / `AGENTS.md` being edited (see step 4 for selection rules)
- Contents of `docs/agents/issue-tracker.md`, `docs/agents/domain.md`, and `docs/agents/triage-labels.md` (last only when `triage` installed)

Let user edit before writing.

### 4. Write

**Pick file to edit:**

- If `CLAUDE.md` exists, edit it.
- Else if `AGENTS.md` exists, edit it.
- If neither exists, ask user which to create — don't pick for them.

Never create `AGENTS.md` when `CLAUDE.md` already exists (or vice versa) — always edit one already there.

If `## Agent skills` block already exists in chosen file, update contents in-place rather than appending duplicate. Don't overwrite user edits to surrounding sections.

The block:

```markdown
## Agent skills

### Issue tracker

[one-line summary of where issues are tracked]. See `docs/agents/issue-tracker.md`.

### Triage labels

[one-line summary of the label vocabulary]. See `docs/agents/triage-labels.md`.

### Domain docs

[one-line summary of layout — "single-context" or "multi-context"]. See `docs/agents/domain.md`.
```

Include `### Triage labels` sub-block, and write `docs/agents/triage-labels.md`, only when `triage` installed and Section B ran. When not, both omitted.

Then write docs files using seed templates in this skill folder as starting point:

- [issue-tracker-github.md](./issue-tracker-github.md) — GitHub issue tracker
- [issue-tracker-gitlab.md](./issue-tracker-gitlab.md) — GitLab issue tracker
- [issue-tracker-local.md](./issue-tracker-local.md) — local-markdown issue tracker
- [triage-labels.md](./triage-labels.md) — label mapping (only if `triage` installed)
- [domain.md](./domain.md) — domain doc consumer rules + layout

For "other" issue trackers, write `docs/agents/issue-tracker.md` from scratch using user's description.

### 5. Done

Tell user setup complete and which engineering skills now read from these files. Mention can edit `docs/agents/*.md` directly later — re-running skill only needed to switch issue trackers or restart from scratch.