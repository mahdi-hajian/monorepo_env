---
name: handoff
description: Compact the current conversation into a handoff document for another agent to pick up.
argument-hint: "What will the next session be used for?"
disable-model-invocation: true
---
Write handoff doc. Summarize current conversation so fresh agent can continue work. Save to temp dir of user OS - not current workspace.

Add "suggested skills" section. List skills agent should invoke.

No duplicate content already in other artifacts (specs, plans, ADRs, issues, commits, diffs). Reference by path or URL instead.

Redact sensitive info: API keys, passwords, personally identifiable info.

If user passed arguments, treat as next session focus. Tailor doc to match.