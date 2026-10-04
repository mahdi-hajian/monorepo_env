---
name: to-spec
description: Turn the current conversation into a spec and publish it to the project issue tracker — no interview, just synthesis of what you've already discussed.
disable-model-invocation: true
---
This skill take current conversation context and codebase understanding, produce spec (aka PRD). Do NOT interview user — just synthesize what you already know.

Issue tracker and triage label vocab should have been given to you — run `/setup-matt-pocock-skills` if not.

## Process

1. Explore repo to understand current codebase state, if you haven't already. Use project domain glossary vocab throughout spec, respect any ADRs in area you touch.

2. Sketch seams where you test feature. Prefer existing seams over new ones. Use highest seam possible. If new seams needed, propose them at highest point you can. Fewer seams across codebase = better — ideal number is one.

Check with user that seams match their expectations.

3. Write spec using template below, then publish to project issue tracker. Apply `ready-for-agent` triage label — no extra triage needed.

<spec-template>

## Problem Statement

Problem user facing, from user perspective.

## Solution

Solution to problem, from user perspective.

## User Stories

LONG, numbered list of user stories. Each story format:

    1. As an <actor>, I want a <feature>, so that <benefit>

<user-story-example>
1. As a mobile bank customer, I want to see balance on my accounts, so that I can make better informed decisions about my spending
</user-story-example>

List must be extremely extensive, cover all aspects of feature.

## Implementation Decisions

List of implementation decisions made. Can include:

- Modules that will be built/modified
- Interfaces of those modules that will be modified
- Technical clarifications from developer
- Architectural decisions
- Schema changes
- API contracts
- Specific interactions

Do NOT include specific file paths or code snippets. They get outdated very quick.

Exception: if prototype produced snippet that encodes decision more precisely than prose can (state machine, reducer, schema, type shape), inline it within relevant decision, note briefly it came from prototype. Trim to decision-rich parts — not working demo, just important bits.

## Testing Decisions

List of testing decisions made. Include:

- What makes good test (only test external behavior, not implementation details)
- Which modules will be tested
- Prior art for tests (similar test types in codebase)

## Out of Scope

Things out of scope for this spec.

## Further Notes

Any further notes about feature.

</spec-template>