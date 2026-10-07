# Issue tracker: Local Markdown + Jira (MCP)

Work is published in **both** places. Local files are the durable repo record; Jira Subtasks are the team board view.

## Local (always)

Issues + specs live as markdown under `.scratch/`.

- One feature per dir: `.scratch/<feature-slug>/`
- Spec: `.scratch/<feature-slug>/spec.md`
- Implementation issues: one file per ticket at `.scratch/<feature-slug>/issues/<NN>-<slug>.md`, numbered from `01` — never a single combined tickets file
- Triage state: `Status:` line near top of each issue file (see `triage-labels.md`)
- Comments append under `## Comments`

## Jira (also, via MCP)

Use the **`user-MCP_DOCKER`** Jira tools (e.g. `jira_create_issue`, `jira_get_issue`, `jira_search`, `jira_update_issue`, `jira_add_comment`). Do **not** use `gh` for this tracker's publish path.

Host: `https://jira.mohaymen.ir`

### Default parent / project

| Field | Value |
| ----- | ----- |
| Default parent | [TECSDM-121817](https://jira.mohaymen.ir/browse/TECSDM-121817) |
| Project key | `TECSDM` |

- Use this parent unless the user supplies a different Jira URL or key for the current publish.
- Do not invent other `project_key` values.
- Each `to-tickets` slice becomes a **Subtask** under the parent:
  - `issue_type`: `Subtask`
  - `additional_fields`: `{"parent": "<PARENT-KEY>"}` (default `TECSDM-121817`)
  - `project_key`: `TECSDM` (or prefix of the overridden parent key)
  - `summary` / `description`: from the approved ticket (What to build + acceptance criteria + Blocked by)

### Labels / triage on Jira

When applying triage roles, set Jira labels to the strings in `triage-labels.md` when the project allows labels; also keep the local file `Status:` in sync.

### Blocking edges

- Local: `Blocked by:` lists other local ticket numbers/titles.
- Jira: put the same blocking info in the Subtask description (issue keys of sibling Subtasks once created). Create Subtasks in dependency order (blockers first) so descriptions can reference real keys. Use native Jira issue links only if the user asks.

## When a skill says "publish to the issue tracker"

1. Write the local `.scratch/.../issues/<NN>-<slug>.md` file(s) first (and keep `spec.md` local).
2. Use default parent `TECSDM-121817` unless the user gave another parent URL/key.
3. Create one Jira Subtask per approved **implementation** ticket via MCP; write the created key (e.g. `TECSDM-123456`) back into the local file (e.g. `Jira: TECSDM-123456` near the top).
4. **Do not** create a Jira Subtask for the spec/roadmap. Put the high-level narrative (problem, solution, links, out of scope) on the **parent** Story description. Full detail stays in `.scratch/<feature-slug>/spec.md`.

Do **not** close the parent Jira issue. Updating the parent description for overview text is expected.

## When a skill says "fetch the relevant ticket"

- Prefer the local path if given.
- If given a Jira key/URL, fetch via MCP and also open the matching local file when `Jira: <KEY>` is present under `.scratch/`.

## Wayfinding operations

Used by `/wayfinder`. Map + children stay **local** under `.scratch/<effort>/` (same conventions as local-only). Optionally mirror child tickets as Jira Subtasks under the default parent (or a user-provided parent) when the user asks to publish the map's tickets.
