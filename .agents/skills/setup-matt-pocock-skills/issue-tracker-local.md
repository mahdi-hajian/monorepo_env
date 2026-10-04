# Issue tracker: Local Markdown

Issues + specs (you may know spec as PRD) for this repo live as markdown files in `.scratch/`.

## Conventions

- One feature per dir: `.scratch/<feature-slug>/`
- Spec: `.scratch/<feature-slug>/spec.md`
- Implementation issues: one file per ticket at `.scratch/<feature-slug>/issues/<NN>-<slug>.md`, numbered from `01` — never single combined tickets file
- Triage state: `Status:` line near top of each issue file (see `triage-labels.md` for role strings)
- Comments + conversation history append to bottom of file under `## Comments` heading

## When a skill says "publish to the issue tracker"

Make new file under `.scratch/<feature-slug>/` (create dir if needed).

## When a skill says "fetch the relevant ticket"

Read file at referenced path. User normally passes path or issue number directly.

## Wayfinding operations

Used by `/wayfinder`. **Map**: one file. Each ticket = one **child** file.

- **Map**: `.scratch/<effort>/map.md` — Notes / Decisions-so-far / Fog body.
- **Child ticket**: `.scratch/<effort>/issues/NN-<slug>.md`, numbered from `01`, question in body. `Type:` line records ticket type (`research`/`prototype`/`grilling`/`task`); `Status:` line records `claimed`/`resolved`.
- **Blocking**: `Blocked by: NN, NN` line near top. Ticket unblocked when every listed file `resolved`.
- **Frontier**: scan `.scratch/<effort>/issues/` for open, unblocked, unclaimed files; first by number wins.
- **Claim**: set `Status: claimed` and save before any work.
- **Resolve**: append answer under `## Answer` heading, set `Status: resolved`, then append context pointer (gist + link) to map's Decisions-so-far in `map.md`.