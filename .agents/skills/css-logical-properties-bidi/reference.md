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
| `clear: left` / `right` | `clear: inline-start` / `inline-end` |
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
- Same invert for **`.k-rtl …`** (not only `[direction=rtl]`)

Prefer converting then **deleting** the rtl/ltr wrappers when both sides match.

### Self-directed elements

```scss
// BAD after naive neutral map (right → end): with direction:rtl, end is physical LEFT
.text-right {
  text-align: end;
  direction: rtl;
}

// GOOD
.text-right {
  text-align: start;
  direction: rtl;
}
```

Same idea for grid cell helpers: set `direction: rtl|ltr` on the cell class and use `text-align: start`.

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
padding-inline: 0 12px; // start end = left right in LTR
```

```scss
// R === L but T !== B — optional normalize
margin: 10px 0 5px 0;
margin-block: 10px 5px;
margin-inline: 0;
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
- Kendo: keep applying `k-rtl` in TS when required; when converting SCSS under `.k-rtl`, **invert** physical sides.
- Split PRs per package (`feature/<pkg>-logical-css-properties`).
- Migrated (feature branches / prior art): `bdmp`, `dm`, `iap`, `base`. Typical next: `ams`, then `dap` / `dia-*` / `termeh` (see local backlog if present).
- `base` specifics worth reusing:
  - Convert both `styles/gridComponent.scss` and `assets/styles/gridComponent.scss` if both exist.
  - Shell chrome (`styles.scss` header/logout) collapses heavily after logical conversion.
  - Keep font-family and explicit `direction` on header/splitter; keep `:first-child` / `:last-child` submodule borders if DOM order differs by product direction.
- Azure DevOps remote for Web; `gh`/`az` may be missing locally — still push the feature branch when asked.

## Script caution

Bulk replace scripts that rewrite every `.scss` file can flip CRLF→LF and dirty unrelated files. Only write files that actually change properties; restore mtime-only phantoms (`git diff` empty → checkout).

If automating:

1. Track brace depth and treat `[direction=rtl]`, `:host-context([direction=rtl])`, and **`.k-rtl`** as invert contexts.
2. Preserve original newlines (CRLF on Windows checkouts).
3. Skip vendor trees (`assets/styles/semantic`, `jquery-kendo`, `*.min.css`, fotorama, …) but **do** process app duplicates like `assets/styles/gridComponent.scss`.
4. After bulk convert, manually fix self-`direction` blocks and re-invert any `.k-rtl` rules that were treated as neutral.
5. Prefer Node when Python is unavailable on the agent machine.
6. Never stage unrelated local config (`web.uiconfig`, etc.).
