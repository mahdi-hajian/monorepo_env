# 06: Expandable View Graph search (Figma)

**What to build:** View Graph search is collapsible like Figma / the visualizer search pattern: collapsed = small search button only; expanded = input + button with joined one-sided radii. Prefer shared Termeh `termeh-expandable-search` used from DM (and IAP wrapper where applicable).

**Blocked by:** Prefer 05 (floating chrome) for full visual result; can proceed in parallel on the search control itself.

**Status:** ready-for-agent

**Jira:** TECSDM-160222

- [ ] Collapsed search shows only a compact search button (no large empty field).
- [ ] Expanded / hover / focus opens the input; blur collapses again.
- [ ] Border radii: full on collapsed button; joined one-sided when expanded.
- [ ] Enter / search button still runs search-and-locate on the graph.
