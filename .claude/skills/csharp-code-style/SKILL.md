---
name: csharp-code-style
description: >-
  C# production coding conventions for LAP / MicroService.IAP (file-scoped
  namespaces, null checks, sealed types, DI lifetime, DI, FluentValidation, CancellationToken,
  tracing, DTOs, one public capability per interface+implementation). Use
  automatically whenever writing, editing, reviewing, or generating C# production
  code (.cs files that are not tests).
---

# C# production conventions (LAP)

**Canonical source:** [`MicroService.IAP/MicroService.IAP/.cursor/rules/csharp-code-style.mdc`](../../../MicroService.IAP/MicroService.IAP/.cursor/rules/csharp-code-style.mdc)

## When to use

- Any edit to non-test `*.cs` under `MicroService.IAP/`
- Generating or refactoring production C# in this workspace

## Instructions

1. **Read the full rule file** linked above before writing or changing production C#.
2. Apply every applicable checklist item (namespaces, null checks, `sealed`, DI, FluentValidation, etc.). A method with more than two parameters takes one `sealed record` request — see **More than two method parameters** in the canonical file.
3. If the file is a test (`*Tests.cs` / under `LAP.Tests`), use the [`csharp-test-style`](../csharp-test-style/SKILL.md) skill instead.
4. For build/test commands, use [`build-project`](../build-project/SKILL.md) and [`run-unit-tests`](../run-unit-tests/SKILL.md).
5. For FluentValidation authoring (`AbstractValidator<T>`, DI, `ValidateAndThrow`), use [`lap-fluent-validation`](../lap-fluent-validation/SKILL.md).
6. For language-dictionary keys and FluentValidation `.WithMessage`, use [`lap-language-dictionary`](../lap-language-dictionary/SKILL.md).
