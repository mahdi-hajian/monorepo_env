---
name: css-logical-properties-bidi
description: >-
  Convert physical CSS (left/right, margin-left, float:left, text-align:left)
  to logical properties and reduce RTL/LTR-duplicated HTML/TS so layouts work
  in both directions. Use when the user asks for logical CSS, bidirectional
  layout, RTL+LTR fixes, or to migrate a package/module the same way as
  WebUI bdmp/dm/iap/base.
disable-model-invocation: true
---

# CSS logical properties + bidirectional UI

Migrate a **scoped package/folder** (not the whole monorepo unless asked) so styles and UI work under both `dir="rtl"` and `dir="ltr"`.

## Preconditions

1. Confirm document direction is set on a root element (`dir` and/or CSS `direction`). Logical properties follow that, not a custom attribute alone.
2. Ask user for **scope paths** (e.g. `WebUI/ams`). Do not expand outside scope.
3. If the repo uses both `dir` and a custom attribute like `[direction=rtl]`, convert layout with logical props; keep custom selectors only for non-layout differences (fonts, etc.).

## Workflow

Copy and track:

```
- [ ] 1. Inventory physical CSS in scope (scss/css; app ts/html inline styles)
- [ ] 2. Convert SCSS/CSS to logical properties
- [ ] 3. Collapse identical rtl/ltr SCSS mirrors
- [ ] 4. Unify duplicate HTML/TS direction branches (safe cases)
- [ ] 5. Leave vendor / map offsets / intentional third-party direction APIs
- [ ] 6. Post-convert trap scan (align classes, translateX, pixel coords)
- [ ] 7. Document out-of-scope leftovers for later
- [ ] 8. Branch naming, commit, push only if user asks
```

### 1. Inventory

Search under scope (exclude vendor/minified/docs/cypress as appropriate):

- `margin-left|margin-right|padding-left|padding-right`
- `border-left|border-right`
- `float:\s*(left|right)|text-align:\s*(left|right)`
- property lines `left:` / `right:` (not class names / IDs like `#mohaymen-left-section`)
- asymmetric 4-value `padding` / `margin` / `border-width` where inline sides differ
- `[direction=rtl|ltr]`, `:host-context([direction=…])`, `:host-context([dir=…])`
- **`.k-rtl` / `.k-ltr`** (Kendo — same invert rules as `[direction=…]`)
- duplicate app SCSS under `assets/` (e.g. `base/assets/styles/gridComponent.scss`) when it mirrors `styles/`
- `websiteDirection === 'rtl'|'ltr'`, `isRTL` used only to swap markup/icons
- Named align / content-direction classes: `cell-align-*`, `*-alignment`, `.is-rtl` / `.is-ltr`, `.direction-mode`, `.text-right`

### 2. Convert physical → logical

Use the mapping in [reference.md](reference.md).

**Direction-selector rule (critical):**

| Context | Mapping |
|---------|---------|
| Neutral / no direction wrapper | `left` → `inline-start`, `right` → `inline-end` |
| Inside `[direction=rtl]` / `:host-context(…rtl…)` / **`.k-rtl`** | **invert**: physical `left` → `inline-end`, physical `right` → `inline-start` |
| Inside LTR wrappers / **`.k-ltr`** | same as neutral (`left` → `inline-start`) |

After conversion, mirrored rtl/ltr blocks often become identical → merge (step 3).

**Element that forces its own `direction`:** if a rule sets `direction: rtl` (e.g. `.text-right`, `.cell-direction-rtl`), prefer `direction` + `text-align: start`. Do **not** apply neutral `text-align: right` → `end` on that block — with `direction: rtl`, physical `right` is **start**.

**Asymmetric 4-value shorthands** (`padding: T R B L` with R≠L): rewrite with `*-block` / `*-inline` (see reference).

### 2b. Known traps — do **not** convert (or revert if already converted)

Remember: under `dir=rtl`, `text-align: end` / `inset-inline-start` are the **physical left / right** sides flipped vs LTR intuition.

| Trap | Why it breaks | Keep / fix |
|------|----------------|------------|
| Semantic physical align: `.cell-align-right`, `.cell-align-left`, `.right-alignment`, `.left-alignment`, `.is-rtl` / `.is-ltr` text-align, `.direction-mode` | HTML maps content RTL → class `*-right` → meant **physical right**. `right`→`end` becomes left under document RTL | Physical `text-align: right` / `left` |
| Switch/slider thumb: `left` + `translateX(+N)` | Logical start under RTL puts thumb on the right; `translateX(+)` still moves further right → outside track | Physical `left` (or rewrite both states with inset-inline, no translateX) |
| Centering: `left: 50%` + `translate(-50%)` / `translateX(-50%)` | Same mismatch → mis-centered loaders/overlays | Physical `left: 50%` |
| Drag preview: `left: -50%` + `top: -50%` | Same family as centering | Physical `left: -50%` |
| Image/map/face **pixel** coords: `left: calc(var(--x) * 1px)` | Coordinates are bitmap/geometry, not writing direction | Physical `left` |
| Vendor / minified CSS | Third-party | Skip |
| Horizontal `box-shadow` / lone `translateX` without updating the paired inset | Incomplete conversion | Leave physical or convert **both** axes of the idiom |

Also skip: CSS/SCSS **names** that merely contain `-left` (dead `$padding-left` → delete if unused); optional comment cleanup only.

### 3. Collapse identical direction blocks

If rtl and ltr blocks only differ by mirrored physical props (now the same logical props), delete both wrappers and keep one rule set.

**Correct collapses (examples):**

- rtl `text-align: right` + ltr `text-align: left` → one `text-align: start`
- rtl `text-align: left` + ltr `text-align: right` → one `text-align: end`

**Keep separate** when values truly differ:

- font stacks (`html[direction=rtl|ltr]`)
- explicit `direction: rtl|ltr` on chrome (header, `kendo-splitter`)
- `k-rtl` / product-only tweaks
- **DOM-order** hacks (`:first-child` vs `:last-child`) for which pane gets a border

When merging float/layout lists, do **not** copy unrelated declarations across selector groups (e.g. do not add `display: flex` to rules that only had `float`).

### 4. HTML / TS direction branching

Goal: one markup path that follows document `dir`, not two templates.

| Pattern | Fix |
|---------|-----|
| Two `*ngIf` blocks for rtl vs ltr (e.g. Semantic `left icon` / `right action`) | One flex row; DOM order **inline-start → … → inline-end** |
| Chevron / angle icon swap via `websiteDirection` | One icon + `transform: scaleX(-1)` under `[dir=rtl]` / `:host-context([dir=rtl])` |
| Semantic/Ant `left`/`right` in class strings | Stable class + flex / logical CSS |
| Duplicate pager controls hidden by direction | One control set; mirror arrows with CSS if needed |
| Carousel `next`/`prev` with inverted index math per direction | Array ±1; prev at `inset-inline-start`, next at `inset-inline-end`; stable titles |

**Keep** (usually): `[dir]` on portals/drawers, `k-rtl` for Kendo, font-family by language, library `direction` APIs (e.g. Fotorama) — note in follow-up if ugly.

### 5. Post-convert trap scan

After bulk convert, grep the scope for regressions:

```
text-align:\s*end   near cell-align|is-rtl|direction-mode|right-alignment
inset-inline-start  near translateX\(|translate\(-50
inset-inline-start:\s*50%
left:\s*calc\(var\(--x
```

Fix traps per table in §2b before calling the package done.

### 6. Out-of-scope documentation

If user asks, write a short backlog (shell → large apps → design system → vendor). Path the user chooses.

### 7. Git

- Branch: `feature/<pkg>-logical-css-properties`
- One branch per package if split PRs requested
- Commit / push **only** when explicitly requested
- Do not commit unrelated dirty files (`web.uiconfig`, etc.)
- Suggested subject: `Convert <pkg> styles to CSS logical properties for correct LTR/RTL layout.`
- Follow-up fixes: short subjects like `Keep physical left for translate-based centering…`

## Done criteria

- App SCSS under scope uses logical props **except** intentional physical leftovers listed in §2b (and comments/vendor).
- Shared `assets/` duplicates of app stylesheets converted when in scope.
- No duplicate rtl/ltr HTML when a single logical layout works.
- Trap scan (§5) clean; spot-check `dir=ltr` and `dir=rtl` (grids with `cell-align-*`, switches, centered loaders, face/map overlays if touched).
- Follow-up doc lists deferred work.

## Additional resources

- Property map, traps with code, Mohaymen notes: [reference.md](reference.md)
