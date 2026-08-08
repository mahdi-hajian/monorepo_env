---
name: build-project
description: >-
  Builds the MicroService.IAP solution or specific projects via dotnet build with
  --no-restore (private NuGet feed constraints), from the correct project root.
  Use when the user asks to build, verify compilation, or check for build errors.
---

# Build Guide (MicroService.IAP)

## Project root

```powershell
cd D:\analytics\MicroService.IAP\MicroService.IAP
```

SDK pinned to `8.0.x` via `global.json` (`8.0.100` + `rollForward: latestFeature`).

## Full solution

```powershell
dotnet build MicroService.IAP.sln --no-restore
```

## Specific projects

**LAP (main):**
```powershell
dotnet build MicroService.IAP/LAP.csproj --no-restore
```

**LAP.Tests:**
```powershell
dotnet build LAP.Tests/LAP.Tests.csproj --no-restore
```

## Flags

| Switch | Purpose |
|--------|---------|
| `--no-restore` | Skip NuGet restore (required — private feed unreachable) |
| `--verbosity minimal` | Errors only |
| `--verbosity quiet` | Success/fail only |

## Common build errors

| Symptom | Action |
|---------|--------|
| `NU1102` / `NU1608` | NuGet issue — try `--no-restore` first; if still failing, packages not cached |
| `MSB3021` / `MSB3027` | Output file locked by running process (e.g. `MSSE.LAPortal`). Stop the process. |
| `NETSDK1127` | Targeting pack not installed. Verify SDK matches global.json. |
| `MSB3277` / `MSB3245` | Assembly binding warning — ignore unless build fails |

## Verify built successfully

```powershell
dotnet build LAP.Tests/LAP.Tests.csproj --no-restore --verbosity quiet
```
No output = success.
