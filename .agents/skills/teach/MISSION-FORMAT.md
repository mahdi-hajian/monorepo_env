# MISSION.md Format

`MISSION.md` lives at workspace root. Captures _reason_ user learns topic. Every teaching decision — what teach next, which resources surface, which exercises design — trace back to this doc.

## Template

```md
# Mission: {Topic}

## Why
{1-3 sentences. The concrete real-world goal the user is chasing. What changes in their life or work when they have this skill? Avoid abstract framings like "to understand X" — push for the underlying outcome.}

## Success looks like
- {A specific, observable thing the user will be able to do}
- {Another specific thing}
- {…}

## Constraints
- {Time, budget, prior commitments, learning preferences, anything that bounds the approach}

## Out of scope
- {Adjacent topics the user explicitly does not want to chase right now — protects the zone of proximal development}
```

## Rules

- **One mission per workspace.** User wants learn two unrelated things = two workspaces.
- **Concrete over abstract.** "Run a half marathon by October" beats "get fitter." "Ship a Rust CLI to my team" beats "learn Rust."
- **Push back on vagueness.** If user can't articulate why, interview before writing anything. Bad mission worse than no mission.
- **Revise when reality shifts.** Missions change. When user's goal moves, update file — don't leave stale mission steering future sessions.
- **Keep it short.** If `MISSION.md` runs past screen, stopped being compass, started being plan.