# Deepening

How to safely deepen cluster of shallow modules, given its dependencies. Assumes vocabulary in [SKILL.md](SKILL.md) — **module**, **interface**, **seam**, **adapter**.

## Dependency categories

Classify candidate's dependencies before deepening. Category determines how deepened module tested across seam.

### 1. In-process

Pure computation, in-memory state, no I/O. Always deepenable — merge modules, test through new interface directly. No adapter needed.

### 2. Local-substitutable

Dependencies with local test stand-ins (PGLite for Postgres, in-memory filesystem). Deepenable if stand-in exists. Test deepened module with stand-in running in test suite. Seam internal; no port at module's external interface.

### 3. Remote but owned (Ports & Adapters)

Own services across network boundary (microservices, internal APIs). Define **port** (interface) at seam. Deep module owns logic; transport injected as **adapter**. Tests use in-memory adapter. Production uses HTTP/gRPC/queue adapter.

Recommendation shape: *"Define port at seam, implement HTTP adapter for production and in-memory adapter for testing, so logic sits in one deep module even though deployed across network."*

### 4. True external (Mock)

Third-party services (Stripe, Twilio, etc.) you don't control. Deepened module takes external dependency as injected port; tests provide mock adapter.

## Seam discipline

- **One adapter means hypothetical seam. Two adapters means real one.** Don't introduce port unless at least two adapters justified (typically production + test). Single-adapter seam is just indirection.
- **Internal seams vs external seams.** Deep module can have internal seams (private to implementation, used by own tests) as well as external seam at interface. Don't expose internal seams through interface just because tests use them.

## Testing strategy: replace, don't layer

- Old unit tests on shallow modules become waste once tests at deepened module's interface exist — delete them.
- Write new tests at deepened module's interface. **Interface is test surface**.
- Tests assert observable outcomes through interface, not internal state.
- Tests should survive internal refactors — describe behaviour, not implementation. If test changes when implementation changes, it's testing past interface.