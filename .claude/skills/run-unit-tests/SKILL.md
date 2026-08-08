---
name: run-unit-tests
description: >-
  Runs xUnit unit tests in LAP.Tests for MicroService.IAP via dotnet test with
  --no-restore, filtering, and repo-specific constraints (SDK pin, private NuGet,
  project root). Use when the user asks to run tests, verify a change, debug a
  failing test, filter LAP.Tests, or check test count after edits.
---

# Unit Test Run Guide (LAP.Tests)

## Project

| Project | Path | Framework |
|---------|------|-----------|
| `LAP.Tests` | `LAP.Tests/LAP.Tests.csproj` | xUnit + NSubstitute + FluentAssertions |

## Prerequisites

```powershell
cd D:\analytics\MicroService.IAP\MicroService.IAP
```

SDK is pinned to `8.0.x` via `global.json` (`8.0.100` + `rollForward: latestFeature`). Installed SDK is `8.0.418`.

## Run all tests

```powershell
dotnet test "LAP.Tests/LAP.Tests.csproj" --no-restore
```

## Filtering

**Test class:**

```powershell
dotnet test "LAP.Tests/LAP.Tests.csproj" --no-restore --filter "FullyQualifiedName~AggregationValuesProviderTests"
```

**Single method:**

```powershell
dotnet test "LAP.Tests/LAP.Tests.csproj" --no-restore --filter "FullyQualifiedName~AggregationValuesProviderTests.Aggregate_ShouldThrow_WhenInstancesIsNull"
```

**Namespace:**

```powershell
dotnet test "LAP.Tests/LAP.Tests.csproj" --no-restore --filter "FullyQualifiedName~LAP.Tests.MicroService.IAP.Plugin.DatasetManagement"
```

## Common switches

| Switch | Purpose |
|--------|---------|
| `--verbosity minimal` | Summary only |
| `--verbosity normal` | Full errors and stack trace |
| `--no-build` | Skip build if already built |
| `--no-restore` | Skip NuGet restore (required here) |
| `--filter "..."` | Filter by FullyQualifiedName, DisplayName, or TestCategory |
| `-c Release` | Release configuration |
| `--blame` | Full stack trace for crashes |

**Combined example:**

```powershell
dotnet test "LAP.Tests/LAP.Tests.csproj" --no-restore --verbosity minimal --filter "FullyQualifiedName~ValueAggregationComputerTests"
```

## Expected output

```
Passed!  - Failed:     0, Passed:   813, Skipped:     0, Total:   813, Duration:  1 s - LAP.Tests.dll (net8.0)
```

On failure, expect class/method name, error message, and stack trace with file path and line.

## Rules (always follow)

1. **Always `--no-restore`** — Private NuGet feed (`analytics.mohaymen.ir`) is unreachable from the Cursor sandbox. Packages are cached locally (e.g. `C:\Users\Mahdi\.nuget\packages\`). Without `--no-restore`, restore fails.

2. **Always run from project root** — `D:\analytics\MicroService.IAP\MicroService.IAP`.

3. **Strange build errors** — clean and rebuild:

   ```powershell
   dotnet clean "LAP.Tests/LAP.Tests.csproj" --verbosity quiet
   dotnet build "LAP.Tests/LAP.Tests.csproj" --verbosity quiet
   ```

4. **`FullyQualifiedName~`** is a contains match; full name is not required.

5. **Runtime errors** (`NullReferenceException`, `ArgumentOutOfRangeException`, etc.) may indicate production bugs — read the stack trace to see production vs test origin.

6. **Test count** — Note baseline before branch work (currently ~1937). Unexpected delta warrants investigation.

## Common errors

| Symptom | Action |
|---------|--------|
| `dotnet test` not found | Install .NET SDK 8; verify with `dotnet --version` |
| `MSB3277` | Assembly binding redirect warning — ignore |
| `NU1608` | NuGet version mismatch — ignore unless build fails |

## Writing tests

For AAA structure, NSubstitute, FluentAssertions, and naming, follow [csharp-test-style](../csharp-test-style/SKILL.md) / [`.cursor/rules/csharp-test-style.mdc`](../../../.cursor/rules/csharp-test-style.mdc).
