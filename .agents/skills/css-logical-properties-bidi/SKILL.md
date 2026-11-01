---
name: css-logical-properties-bidi
description: >-
  Convert physical CSS (left/right, margin-left, float:left, text-align:left)
  to logical properties and reduce RTL/LTR-duplicated HTML/TS so layouts work
  in both directions. Use when the user asks for logical CSS, bidirectional
  layout, RTL+LTR fixes, or to migrate a package/module the same way as
  WebUI bdmp/dm/iap.
disable-model-invocation: true
---

# CSS logical properties + bidirectional UI

Migrate a **scoped package/folder** (not the whole monorepo unless asked) so styles and UI work under both `dir="rtl"` and `dir="ltr"`.

## Preconditions

1. Confirm document direction is set on a root element (`dir` and/or CSS `direction`). Logical properties follow that, not a custom attribute alone.
2. Ask user for **scope paths** (e.g. `WebUI/base`, `WebUI/ams`). Do not expand outside scope.
3. If the repo uses both `dir` and a custom attribute like `[direction=rtl]`, convert layout with logical props; keep custom selectors only for non-layout differences (fonts, etc.).

## Workflow

Copy and track:

```
- [ ] 1. Inventory physical CSS in scope (scss/css; app ts/html inline styles)
- [ ] 2. Convert SCSS/CSS to logical properties
- [ ] 3. Collapse identical rtl/ltr SCSS mirrors
- [ ] 4. Unify duplicate HTML/TS direction branches (safe cases)
- [ ] 5. Leave vendor / map offsets / intentional third-party direction APIs
- [ ] 6. Document out-of-scope leftovers for later
- [ ] 7. Branch naming, commit, push only if user asks
```

### 1. Inventory

Search under scope (exclude vendor/minified/docs/cypress as appropriate):

- `margin-left|margin-right|padding-left|padding-right`
- `border-left|border-right`
- `float:\s*(left|right)|text-align:\s*(left|right)`
- property lines `left:` / `right:` (not class names)
- `[direction=rtl|ltr]`, `:host-context([direction=…])`, `:host-context([dir=…])`
- `websiteDirection === 'rtl'|'ltr'`, `isRTL` used only to swap markup/icons

### 2. Convert physical → logical

Use the mapping in [reference.md](reference.md).

**Direction-selector rule (critical):**

| Context | Mapping |
|---------|---------|
| Neutral / no direction wrapper | `left` → `inline-start`, `right` → `inline-end` |
| Inside `[direction=rtl]` / `:host-context(…rtl…)` | **invert**: physical `left` → `inline-end`, physical `right` → `inline-start` |
| Inside LTR wrappers | same as neutral (`left` → `inline-start`) |

After conversion, mirrored rtl/ltr blocks often become identical → merge (step 3).

**Asymmetric 4-value shorthands** (`padding: T R B L` with R≠L, or `border-width: …`): rewrite with `*-block` / `*-inline` (see reference).

**Do not convert:**

- Vendor / minified CSS (jquery, kendo theme, fotorama, pdf.js, …)
- Map/canvas **pixel** offsets (`left`/`top` for markers)
- Horizontal `box-shadow` / `translateX` unless you add explicit rtl mirrors or logical alternatives
- CSS custom property **names** that contain `-left` (only change usages of physical props)

### 3. Collapse identical direction blocks

If rtl and ltr blocks only differ by mirrored physical props (now the same logical props), delete both wrappers and keep one rule set.

**Keep separate** when values truly differ (font stacks, label widths, `k-rtl`, product-only tweaks).

### 4. HTML / TS direction branching

Goal: one markup path that follows document `dir`, not two templates.

| Pattern | Fix |
|---------|-----|
| Two `*ngIf` blocks for rtl vs ltr (e.g. Semantic `left icon` / `right action`) | One flex row; place items in DOM order so **inline-start → … → inline-end** matches product intent |
| Chevron / angle icon swap via `websiteDirection` | One icon class + `transform: scaleX(-1)` under `[dir=rtl]` / `:host-context([dir=rtl])` |
| Semantic/Ant `left`/`right` in class strings | Stable class + flex / logical CSS |
| Duplicate pager controls hidden by direction | One control set; mirror arrows with CSS if needed |
| Carousel `next`/`prev` with inverted index math per direction | Prefer **array ±1** methods; put prev at `inset-inline-start`, next at `inset-inline-end`; stable titles |

**Keep** (usually):

- `[dir]="websiteDirection"` on portals/drawers that do not inherit
- `k-rtl` (or equivalent) for Kendo/third-party grids
- Font family selection for Arabic/Persian vs Latin
- Passing `direction` into a library API that requires it (e.g. Fotorama) — note in follow-up doc if ugly

### 5. Out-of-scope documentation

If user asks to document leftovers outside the scoped folders, write a short markdown backlog (priority by shared shell → large apps → design system → vendor). Prefer a path the user chooses (often outside git or a docs folder they name).

### 6. Git

- Branch prefix: follow repo convention (`feature/…` if required).
- One branch per package if user asks for split PRs.
- Commit / push **only** when explicitly requested.
- Do not commit unrelated dirty files (local configs).

## Done criteria

- Under scope: no remaining physical margin/padding/border-inline-side / float left|right / text-align left|right / positional left|right in **app** scss (vendor excluded).
- No duplicate rtl/ltr HTML for the same control when a single logical layout works.
- LTR and RTL both intentional: spot-check key screens with root `dir=ltr` and `dir=rtl`.
- Follow-up doc lists anything deferred.

## Additional resources

- Property map, shorthand examples, Mohaymen WebUI notes: [reference.md](reference.md)
