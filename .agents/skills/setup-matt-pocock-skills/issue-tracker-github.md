# Issue tracker: GitHub

Issues + PRDs for repo live as GitHub issues. Use `gh` CLI for all ops.

## Conventions

- **Make issue**: `gh issue create --title "..." --body "..."`. Use heredoc for multi-line bodies.
- **Read issue**: `gh issue view <number> --comments`, filter comments by `jq`, fetch labels too.
- **List issues**: `gh issue list --state open --json number,title,body,labels,comments --jq '[.[] | {number, title, body, labels: [.labels[].name], comments: [.comments[].body]}]'` with `--label` + `--state` filters as needed.
- **Comment on issue**: `gh issue comment <number> --body "..."`
- **Add / remove labels**: `gh issue edit <number> --add-label "..."` / `--remove-label "..."`
- **Close**: `gh issue close <number> --comment "..."`

Get repo from `git remote -v` — `gh` does this automatically inside a clone.

## Pull requests as a triage surface

**PRs as a request surface: no.** _(Set to `yes` if repo treats external PRs as feature requests; `/triage` reads flag.)_

When `yes`, PRs use same labels + states as issues, via `gh pr` equivalents:

- **Read PR**: `gh pr view <number> --comments` + `gh pr diff <number>` for diff.
- **List external PRs for triage**: `gh pr list --state open --json number,title,body,labels,author,authorAssociation,comments` then keep only `authorAssociation` of `CONTRIBUTOR`, `FIRST_TIME_CONTRIBUTOR`, or `NONE` (drop `OWNER`/`MEMBER`/`COLLABORATOR`).
- **Comment / label / close**: `gh pr comment`, `gh pr edit --add-label`/`--remove-label`, `gh pr close`.

GitHub uses one number space for issues + PRs — bare `#42` may be either. Try `gh pr view 42`, fall back to `gh issue view 42`.

## When a skill says "publish to the issue tracker"

Create GitHub issue.

## When a skill says "fetch the relevant ticket"

Run `gh issue view <number> --comments`.

## Wayfinding operations

Used by `/wayfinder`. **Map** = one issue, **child** issues = tickets.

- **Map**: one issue labelled `wayfinder:map`, holds Notes / Decisions-so-far / Fog body. `gh issue create --label wayfinder:map`.
- **Child ticket**: issue linked to map as GitHub sub-issue (`gh api` on sub-issues endpoint). If sub-issues off, add child to task list in map body + put `Part of #<map>` at top of child body. Labels: `wayfinder:<type>` (`research`/`prototype`/`grilling`/`task`). Once claimed, assign ticket to driving dev.
- **Blocking**: GitHub **native issue dependencies** — canonical, UI-visible. Add edge: `gh api --method POST repos/<owner>/<repo>/issues/<child>/dependencies/blocked_by -F issue_id=<blocker-db-id>`, where `<blocker-db-id>` = blocker's numeric **database id** (`gh api repos/<owner>/<repo>/issues/<n> --jq .id`, _not_ `#number` or `node_id`). GitHub reports `issue_dependencies_summary.blocked_by` (open blockers only — the live gate). If dependencies unavailable, fall back to `Blocked by: #<n>, #<n>` line at top of child body. Ticket unblocked when all blockers closed.
- **Frontier query**: list map's open children (`gh issue list --state open`, scoped to map's sub-issues / task list), drop any with open blocker (`issue_dependencies_summary.blocked_by > 0`, or open issue in `Blocked by` line) or assignee; first in map order wins.
- **Claim**: `gh issue edit <n> --add-assignee @me` — session's first write.
- **Resolve**: `gh issue comment <n> --body "<answer>"`, then `gh issue close <n>`, then append context pointer (gist + link) to map's Decisions-so-far.