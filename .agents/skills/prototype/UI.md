# UI Prototype

Make **several radically different UI variants** on one route, switch via floating bottom bar. User flips between variants in browser, picks one (or steals bits from each), throws rest away.

If question about logic/state, not what something looks like — wrong branch. Use [LOGIC.md](LOGIC.md).

## When this is the right shape

- "What should this page look like?"
- "I want to see a few options for this dashboard before committing."
- "Try a different layout for the settings screen."
- Any time user would otherwise waste day picking between three vague mockups in head.

## Two sub-shapes — strongly prefer sub-shape A

UI prototype much easier to judge when **butting up against rest of app** — real header, real sidebar, real data, real density. Throwaway route alone is vacuum: every variant looks fine in isolation. Default to sub-shape A whenever plausible existing page can host variants. Only use sub-shape B if prototype truly has no nearby home.

### Sub-shape A — adjustment to an existing page (preferred)

Route already exists. Variants rendered **on same route**, gated by `?variant=` URL search param. Existing data fetching, params, auth all stay — only rendering swaps. This is default; pick it unless specific reason not to.

If prototype for something with no page yet but *would naturally live inside one* (new dashboard section, new card on settings screen, new step in existing flow) — still sub-shape A. Mount variants inside host page.

### Sub-shape B — a new page (last resort)

Only use when thing prototyped truly has no existing page to live inside — e.g. entirely new top-level surface, or flow can't embed anywhere sensible.

Create **throwaway route** using whatever routing convention project already uses — don't invent new top-level structure. Name it so obviously prototype (e.g. include word `prototype` in path or filename). Same `?variant=` pattern.

Before committing to sub-shape B, sanity-check: really no existing page to embed in? Empty route hides design problems populated one would expose.

Both sub-shapes: floating bottom bar identical.

## Process

### 1. State the question and pick N

Default **3 variants**. More than 5 stops being radically different, becomes noise — cap there.

Write plan in one line, in prototype's location or top-of-file comment:

> "Three variants of settings page, switchable via `?variant=`, on existing `/settings` route."

Works whether user here to push back or not.

### 2. Generate radically different variants

Draft each variant. Hold each to:

- Page's purpose and data it has access to.
- Project's component library / styling system (TailwindCSS, shadcn, MUI, plain CSS, whatever).
- Clear exported component name, e.g. `VariantA`, `VariantB`, `VariantC`.

Variants must be **structurally different** — different layout, different info hierarchy, different primary affordance, not just different colours. Three slightly-tweaked card grids isn't UI prototype, it's wallpaper. If two drafts come out too similar, redo one with explicit "do not use a card grid" guidance.

### 3. Wire them together

Create single switcher component on route:

```tsx
// pseudo-code — adapt to the project's framework
const variant = searchParams.get('variant') ?? 'A';
return (
  <>
    {variant === 'A' && <VariantA {...data} />}
    {variant === 'B' && <VariantB {...data} />}
    {variant === 'C' && <VariantC {...data} />}
    <PrototypeSwitcher variants={['A','B','C']} current={variant} />
  </>
);
```

For sub-shape A (existing page): keep all existing data fetching above switcher; only rendered subtree changes per variant.

For sub-shape B (new page): throwaway route under `/prototype/<name>` mounts same switcher.

### 4. Build the floating switcher

Small fixed-position bar at bottom-centre of screen, three pieces:

- **Left arrow** — cycle to previous variant (wraps around).
- **Variant label** — show current variant key and, if variant exports name, that name too. e.g. `B — Sidebar layout`.
- **Right arrow** — cycle forward (wraps around).

Behaviour:

- Click arrow → update URL search param (use framework's router — `router.replace` on Next, `navigate` on React Router, etc) so variant shareable and reload-stable.
- Keyboard: `←` and `→` arrow keys also cycle. Don't intercept arrow keys when `<input>`, `<textarea>`, or `[contenteditable]` focused.
- Visually distinct from page (e.g. high-contrast pill, subtle shadow) so obviously not part of design being evaluated.
- Hidden in production builds — gate on `process.env.NODE_ENV !== 'production'` or equivalent check, so stray prototype merge can't ship bar to users.

Put switcher in one shared component so both sub-shapes reuse it. Locate where shared UI lives in project.

### 5. Hand it over

Surface URL (and `?variant=` keys). User flips through whenever. Interesting feedback usually **"I want the header from B with the sidebar from C"** — that's actual design they want.

### 6. Capture the answer and clean up

Once variant won, capture answer — which variant and why — then capture prototype the way [SKILL](SKILL.md) describes. Fold winner into real code, move rest onto throwaway branch, not into main:

- **Sub-shape A** — fold winner into existing page; drop losing variants and switcher from main.
- **Sub-shape B** — promote winning variant to real route; drop throwaway route and switcher from main.

Full set of variants is primary source, so lands on throwaway branch, not bin — variant components and switcher left in main branch rot fast and confuse next reader.

## Anti-patterns

- **Variants that differ only in colour or copy.** That's tweak, not prototype. Real variants disagree about structure.
- **Sharing too much code between variants.** Shared `<Header>` fine; shared `<Layout>` defeats point. Each variant free to throw out layout.
- **Wiring variants to real mutations.** Read-only prototypes fine. If variant needs to mutate, point at stub — question is "what should this look like", not "does the backend work".
- **Promoting prototype directly to production.** Variant code written under prototype constraints (no tests, minimal error handling). Rewrite properly when folding in.