---
name: farsi-rtl-output
description: >-
  Make reply right-to-left (RTL) when user write Persian (Farsi), so prose
  readable in UI. Use when user message Persian, mixed Persian/English with
  Persian main, or user ask RTL or فارسی layout. Keep fenced code LTR.
  One RTL container for whole Persian answer — never alternate RTL/LTR/RTL.
disable-model-invocation: false
---

# Farsi RTL output

**Canonical source:** [`Web/WebUI/.agents/IMAP/SKILLS/reference/farsi-rtl-output/farsi-rtl-output.md`](../../../Web/WebUI/.agents/IMAP/SKILLS/reference/farsi-rtl-output/farsi-rtl-output.md)

Read that file **full**. Hard rules:

1. **One container:** put the entire Persian answer (headings, paragraphs, numbered/bulleted lists, closing notes) in **one** `<div dir="rtl" lang="fa">`.
2. **Break only for fences:** close the div only before a ` ``` ` fence; open a new RTL div after if more Persian follows.
3. **Inline code stays inside RTL:** `` `ClassName` `` / short paths in backticks stay in the Persian container — do not eject them to LTR blocks.
4. **Forbidden interleave:** never `RTL div` → bare LTR numbered list → `RTL div`. That pattern failed in chat UI.
5. **Completion criterion:** no Persian prose/list outside RTL; no bare LTR list between Persian blocks.
6. Before send: run the three-check list in the canonical file; if any fails, fix first.
