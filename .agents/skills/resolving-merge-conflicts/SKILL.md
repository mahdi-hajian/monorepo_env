---
name: resolving-merge-conflicts
description: "Use when you need to resolve an in-progress git merge/rebase conflict."
disable-model-invocation: true
---
1. **See current state** of merge/rebase. Check git history + conflicting files.

2. **Find primary sources** for each conflict. Understand deeply why each change made, what original intent was. Read commit messages, check PRs, check original issues/tickets.

3. **Resolve each hunk.** Preserve both intents where possible. Where incompatible, pick one matching merge's stated goal + note trade-off. Do **not** invent new behaviour. Always resolve; never `--abort`.

4. Discover project's **automated checks**, run them — typically typecheck, then tests, then format. Fix anything merge broke.

5. **Finish merge/rebase.** Stage everything, commit. If rebasing, continue rebase process until all commits rebased.