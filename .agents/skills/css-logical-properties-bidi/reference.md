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

### Under `dir=rtl` (cheat sheet)

| Declaration | Physical side |
|-------------|----------------|
| `text-align: start` / `inset-inline-start` | **right** |
| `text-align: end` / `inset-inline-end` | **left** |
| `text-align: right` / `left:` | still right / left |

## Self-directed elements

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

Same for grid `.cell-direction-rtl`: set `direction: rtl` + `text-align: start`.

## Named physical align utilities (do not convert)

Product maps **content** direction to class names that mean absolute sides:

```scss
// HTML: cellDirection === 'rtl' → 'cell-align-right'
.cell-align-right td {
  text-align: right; // NOT end
}
.cell-align-left td {
  text-align: left; // NOT start
}

.is-rtl .element-container {
  text-align: right; // NOT end
}
.is-ltr .element-container {
  text-align: left; // NOT start
}

.direction-mode {
  text-align: right;
}
```

Under document `dir=rtl`, `text-align: end` is physical **left** → Persian cells look “LTR”.

## Shorthands

```scss
// physical: top right bottom left
padding: 5px 12px 1px 0;
padding-block: 5px 1px;
padding-inline: 0 12px; // start end
```

```scss
border-width: 0 0 1px 1px;
border-block-width: 0 1px;
border-inline-width: 1px 0;
```

Symmetric `padding: 8px 12px` can stay.

## Pairs that must stay physical with translate / geometry

### Switch / slider thumbs

```scss
// BAD under dir=rtl — thumb starts on the right, translateX(+) exits the track
.slider::before {
  inset-inline-start: 3px;
}
.slider.checked::before {
  transform: translateX(14px);
}

// OK with existing translateX
.slider::before {
  left: 3px;
}
```

### Centering with translate

```scss
// BAD
.loader {
  inset-inline-start: 50%;
  transform: translate(-50%, -50%);
}

// OK
.loader {
  left: 50%;
  transform: translate(-50%, -50%);
}
```

### Drag-preview / offset pairs

```scss
// OK — keep both physical
.column-drag-preview {
  top: -50%;
  left: -50%;
}
```

### Bitmap / map pixel coordinates

```scss
// OK — geometry, not writing mode
.border-box {
  left: calc(var(--x) * 1px);
  top: calc(var(--y) * 1px);
}
```

## HTML unification examples

**Search field:** one flex row; action at inline-start, icon at inline-end.

**Chevron:** one `fa-angle-left` + `scaleX(-1)` under `:host-context([dir='rtl'])`.

**Carousel:** `prev` = index−1 at `inset-inline-start`; `next` = index+1 at `inset-inline-end`.

## Correct rtl/ltr collapses

| Before (mirrored) | After |
|-------------------|--------|
| rtl `text-align: right` + ltr `text-align: left` | `text-align: start` |
| rtl `text-align: left` + ltr `text-align: right` | `text-align: end` |
| rtl `margin-right: 5px` + ltr `margin-left: 5px` | `margin-inline-start: 5px` |

## Mohaymen WebUI notes

- `WebsiteDirectionService` sets `html` `dir` and `direction`.
- Selectors may use `[direction="rtl"]` / `:host-context([direction='rtl'])`.
- Kendo: keep `k-rtl` in TS; invert physical sides under `.k-rtl` in SCSS.
- Branch: `feature/<pkg>-logical-css-properties`.
- Migrated: `bdmp`, `dm`, `iap`, `base`. Typical next: `ams`, then `dap` / `dia-*` / `termeh`.
- `base`: convert both `styles/gridComponent.scss` and `assets/styles/gridComponent.scss`; keep fonts + header/splitter `direction`; keep `:first-child`/`:last-child` submodule borders if DOM order differs.
- Azure DevOps remote; `gh`/`az` may be missing — still push when asked; don’t stage `web.uiconfig`.

## Script caution

Bulk replace can flip CRLF→LF. Only write files that change; restore empty diffs.

If automating:

1. Brace-depth invert for `[direction=rtl]`, `:host-context([direction=rtl])`, **`.k-rtl`**.
2. Preserve CRLF on Windows.
3. Skip vendor (`semantic`, `jquery-kendo`, `*.min.css`, fotorama); **do** process app `assets/styles/gridComponent.scss`.
4. After convert: trap scan (align classes, `inset-inline-start: 50%` + translate, `--x` pixels, switch thumbs).
5. Prefer Node if Python is missing.
6. Never stage unrelated local config.
