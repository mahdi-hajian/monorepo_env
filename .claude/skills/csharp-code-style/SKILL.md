---
name: csharp-code-style
description: >-
  C# production coding conventions for LAP / MicroService.IAP (file-scoped
  namespaces, null checks, sealed types, DI, FluentValidation, CancellationToken,
  tracing, DTOs). Use automatically whenever writing, editing, reviewing, or
  generating C# production code (.cs files that are not tests).
---

# C# production conventions (LAP)

**Canonical source:** [`.cursor/rules/csharp-code-style.mdc`](../../../.cursor/rules/csharp-code-style.mdc)

## When to use

- Any edit to non-test `*.cs` under `MicroService.IAP/`
- Generating or refactoring production C# in this workspace

## Instructions

1. **Read the full rule file** linked above before writing or changing production C#.
2. Apply every applicable checklist item (namespaces, null checks, `sealed`, DI, FluentValidation, etc.).
3. If the file is a test (`*Tests.cs` / under `LAP.Tests`), use the [`csharp-test-style`](../csharp-test-style/SKILL.md) skill instead.
4. For build/test commands, use [`build-project`](../build-project/SKILL.md) and [`run-unit-tests`](../run-unit-tests/SKILL.md).
