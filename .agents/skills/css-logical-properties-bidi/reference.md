# Reference — logical property map & patterns

## Property map

| Physical | Logical (LTR = start left) |
|----------|----------------------------|
| `margin-left` | `margin-inline-start` |
| `margin-right` | `margin-inline-end` |
| `padding-left` | `padding-inline-start` |
| `padding-right` | `padding-inline-end` |
| `border-left` (+ `-width/-style/-color`) | `border-inline-start` (+ …) |
| `border-right` (+ …) | `border-inline-end` (+ …) |
| `left` (positioned) | `inset-inline-start` |
| `right` | `inset-inline-end` |
| `top` / `bottom` (optional) | `inset-block-start` / `inset-block-end` |
| `float: left` | `float: inline-start` |
| `float: right` | `float: inline-end` |
| `text-align: left` | `text-align: start` |
| `text-align: right` | `text-align: end` |
| `border-top-left-radius` | `border-start-start-radius` |
| `border-top-right-radius` | `border-start-end-radius` |
| `border-bottom-left-radius` | `border-end-start-radius` |
| `border-bottom-right-radius` | `border-end-end-radius` |
| `scroll-margin-left` / `right` | `scroll-margin-inline-start` / `end` |

`left: 0; right: 0` → `inset-inline: 0`.

## Inside RTL-only selectors

Physical coordinates stay absolute. In RTL, physical **left** is the **inline-end** side:

- `margin-left` in an RTL block → `margin-inline-end`
- `right: 2em` in an RTL block → `inset-inline-start`

Prefer converting then **deleting** the rtl/ltr wrappers when both sides match.

## Shorthands

Symmetric `padding: 8px 12px` (block / inline) is fine.

Asymmetric TRBL example:

```scss
// physical: top right bottom left
border-width: 0 0 1px 1px;
// logical:
border-block-width: 0 1px;   // start end
border-inline-width: 1px 0;  // start end
```

```scss
padding: 5px 12px 1px 0;
padding-block: 5px 1px;
padding-inline: 0 12px;
```

## HTML unification examples

**Search field (icon at inline-end, action at inline-start):**

```html
<div class="search-box">
  <button *ngIf="action" class="action"></button>
  <input />
  <i class="search-icon"></i>
</div>
```

```scss
.search-box {
  display: flex;
  flex-direction: row;
  align-items: center;
}
```

**Chevron:**

```html
<i class="far fa-angle-left pane-chevron"></i>
```

```scss
:host-context([dir='rtl']) .pane-chevron {
  transform: scaleX(-1);
}
```

**Carousel:** `prevItem()` → index−1, `nextItem()` → index+1; place `.prev` at `inset-inline-start`, `.next` at `inset-inline-end`.

## Mohaymen WebUI notes

- `WebsiteDirectionService` sets `html` attributes `dir` and `direction`.
- Selectors may use `[direction="rtl"]` or `:host-context([direction='rtl'])` — treat like dir for inventory; prefer logical props over new mirrors.
- Split PRs per package (`feature/<pkg>-logical-css-properties`) worked well for bdmp / dm / iap.
- Prior art packages already migrated: `bdmp`, `dm`, `iap`. Next shared priority historically: `base`, then `ams` (see local backlog if present).

## Script caution

Bulk replace scripts that rewrite every `.scss` file can flip CRLF→LF and dirty unrelated files. Only write files that actually change properties; restore mtime-only phantoms (`git diff` empty → checkout).
