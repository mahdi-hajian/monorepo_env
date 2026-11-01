# Bidirectional (RTL/LTR) layout — follow-ups outside bdmp / dm / iap

Work completed on feature branches:

- `feature/bdmp-logical-css-properties`
- `feature/dm-logical-css-properties`
- `feature/iap-logical-css-properties`

Those three packages converted physical CSS (`margin-left`, `left`, `float: left`, …) to logical properties and reduced direction-specific HTML/TS branching inside the package trees.

This document lists **remaining work outside those folders** (and a few vendor assets that live under `iap/assets` but should be treated as third-party).

---

## Priority 1 — shared shell (`WebUI/base`)

Highest impact: almost every module inherits these styles.

| Area | Why |
|------|-----|
| `base/styles.scss` | Global layout, body `text-align`, many `[direction=rtl]` / `ltr` mirrors |
| `base/styles/gridComponent.scss` (+ assets copy) | Grids / Kendo-related direction |
| `base/styles/ngzorro-custom-styles.scss` | ng-zorro overrides with physical sides |
| `base/src/lib/app/*` shared components | modal, dropdown, toolbar, tree, search-input, accordion, multiselect, dialog, form-field, … |

**Approach:** same as IAP/BDMP — convert to logical properties; collapse identical rtl/ltr SCSS blocks; keep real differences (fonts).

---

## Priority 2 — AMS (`WebUI/ams`)

Very large count of physical properties, especially `*.external.scss` under organization/system screens (groups, roles, data-sheet, services, SSO, …). Many hardcoded `direction: rtl` rules.

---

## Priority 3 — other product packages

| Package | Notes |
|---------|--------|
| `dap` | ~100+ physical SCSS hits |
| `dia-plugins` / `dia-objects` / `dia-shared-components` | Plugin UI chrome |
| `termeh` / `termeh-charts` / `termeh-patterns` | Design-system primitives (cascade to apps) |
| `authentication` | Login / SSO chrome |
| `aip`, `notification-center`, `stardrive`, … | Smaller leftovers |

---

## Priority 4 — design system & tables

| Package | Notes |
|---------|--------|
| `mohaymen-share-components` | Shared widgets |
| `mohaymen-table` | Table layout |
| `mohaymen-code-editor` | Editor chrome |

---

## Do not bulk-edit (or treat carefully)

| Asset | Location | Reason |
|-------|----------|--------|
| jQuery Confirm | `iap/assets/jquery-confirm.min.css` (+ base copies) | Minified vendor |
| jqPagination | `iap/assets/jqpagination/` | Vendor |
| Fotorama | `iap/styles/fotorama.scss` / assets | Vendor; attachments pass `direction` into Fotorama API |
| PDF.js worker | `iap/assets/pdf-viewer/` | Vendor |
| Kendo theme CSS | `base/assets/.../jquery-kendo-*` | Vendor; use `k-rtl` where already wired |
| Map marker pixel offsets | e.g. IAP map `left`/`top` in TS | Geographic/UI overlay coordinates — keep physical |

**In-package note (IAP):** `custom-attachments` still uses Fotorama’s `direction` option and index remapping. Prefer fixing via Fotorama config/docs rather than rewriting vendor CSS; optional follow-up inside IAP after Fotorama behavior is verified in LTR.

---

## Suggested order of work

1. `base` (+ critical `termeh` pieces used by shell)
2. `ams`
3. `dap` → `dia-*`
4. Remaining small packages
5. Vendor overrides only if a specific LTR bug is proven (prefer wrapper SCSS, not editing `.min.css`)

---

## Verification checklist (any package)

- [ ] `html[dir=ltr]` and `html[dir=rtl]` (also `direction` attribute — set by `WebsiteDirectionService`)
- [ ] No duplicated markup solely for left/right Semantic UI classes when flex + logical CSS suffice
- [ ] Icons that mean “toward start/end” use one glyph + CSS `scaleX(-1)` under RTL, or logical placement
- [ ] Grids/Kendo still get `k-rtl` when required
- [ ] Map/canvas pixel offsets unchanged unless intentionally mirrored
