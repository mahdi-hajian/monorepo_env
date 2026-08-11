---
name: csharp-test-style
description: >-
  C# unit test conventions for LAP.Tests (AAA, NSubstitute, FluentAssertions,
  naming Method_Should_When, fixtures). Use automatically whenever writing,
  editing, reviewing, or generating C# test files (*Tests.cs, LAP.Tests).
---

# C# unit test conventions (LAP)

**Canonical source:** [`MicroService.IAP/MicroService.IAP/.cursor/rules/csharp-test-style.mdc`](../../../MicroService.IAP/MicroService.IAP/.cursor/rules/csharp-test-style.mdc)

## When to use

- Any edit to `*Tests.cs` or files under `LAP.Tests/`
- Adding or updating unit tests for MicroService.IAP / LAP

## Instructions

1. **Read the full rule file** linked above before writing or changing tests.
2. Keep AAA comments, NSubstitute doubles, FluentAssertions, and `Method_Should_When` naming.
3. Production code under test must still follow [`csharp-code-style`](../csharp-code-style/SKILL.md).
4. Run tests with [`run-unit-tests`](../run-unit-tests/SKILL.md) (`dotnet test` + `--no-restore` from the IAP project root).
