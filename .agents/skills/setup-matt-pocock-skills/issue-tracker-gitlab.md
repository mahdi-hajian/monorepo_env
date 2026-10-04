# Issue tracker: GitLab

Issues + PRDs for this repo live as GitLab issues. Use the [`glab`](https://gitlab.com/gitlab-org/cli) CLI for all operations.

## Conventions

- **Create issue**: `glab issue create --title "..." --description "..."`. Heredoc for multi-line descriptions. Pass `--description -` to open editor.
- **Read issue**: `glab issue view <number> --comments`. `-F json` for machine-readable output.
- **List issues**: `glab issue list -F json` with `--label` filters.
- **Comment**: `glab issue note <number> --message "..."`. GitLab calls comments "notes".
- **Apply / remove labels**: `glab issue update <number> --label "..."` / `--unlabel "..."`. Multiple labels: comma-separated or repeat flag.
- **Close**: `glab issue close <number>`. `glab issue close` does not accept closing comment — post explanation first via `glab issue note <number> --message "..."`, then close.
- **Merge requests**: GitLab calls PRs "merge requests". Use `glab mr create`, `glab mr view`, `glab mr note`, etc. — same shape as `gh pr ...`: `mr` replaces `pr`, `note`/`--message` replaces `comment`/`--body`.

Infer repo from `git remote -v` — `glab` does this automatically inside a clone.

## Merge requests as a triage surface

**MRs as a request surface: no.** _(Set to `yes` if this repo treats external merge requests as feature requests; `/triage` reads this flag.)_

If `yes`, MRs use same labels + states as issues, via `glab mr` equivalents:

- **Read MR**: `glab mr view <number> --comments`, `glab mr diff <number>` for diff.
- **List external MRs for triage**: `glab mr list -F json`, keep only MRs whose author is not a project member/owner (contributor's MR, not maintainer's in-flight work).
- **Comment / label / close**: `glab mr note`, `glab mr update --label`/`--unlabel`, `glab mr close`.

Unlike GitHub, GitLab numbers issues + MRs separately. `#42` unambiguous once surface known.

## When a skill says "publish to the issue tracker"

Create a GitLab issue.

## When a skill says "fetch the relevant ticket"

Run `glab issue view <number> --comments`.

## Wayfinding operations

Used by `/wayfinder`. **Map** = single issue. **Child** issues = tickets.

- **Map**: single issue labelled `wayfinder:map`, holds Notes / Decisions-so-far / Fog body. `glab issue create --label wayfinder:map`. (On GitLab tiers with native epics, epic may hold map instead; labelled issue works everywhere.)
- **Child ticket**: issue carrying `Part of #<map>` at top of description, labels `wayfinder:<type>` (`research`/`prototype`/`grilling`/`task`). Once claimed, assigned to driving dev.
- **Blocking**: GitLab **native blocking link** — canonical, UI-visible. Add via `/blocked_by #<n>` quick action, posted as note (`glab issue note <child> --message "/blocked_by #<blocker>"`). Native blocking links = Premium/Ultimate feature; free tier (or where unavailable): fall back to `Blocked by: #<n>, #<n>` line at top of description. Ticket unblocked when every blocker closed.
- **Frontier query**: `glab issue list -F json` scoped to map's children, drop any with open blocker — native `blocked_by` link to open issue (`glab api projects/:id/issues/:iid/links`), or open issue in `Blocked by` line — or assignee; first in map order wins.
- **Claim**: `glab issue update <n> --assignee @me` — session's first write.
- **Resolve**: `glab issue note <n> --message "<answer>"`, then `glab issue close <n>`, then append context pointer (gist + link) to map's Decisions-so-far.