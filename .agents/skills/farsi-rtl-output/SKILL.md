---
name: farsi-rtl-output
description: >-
  Make reply right-to-left (RTL) when user write Persian (Farsi), so prose
  readable in UI. Use when user message Persian, mixed Persian/English with
  Persian main, or user ask RTL or فارسی layout. Keep code block, path, CLI LTR.
  Wrap every Persian heading, paragraph, and list — never only the first paragraph.
disable-model-invocation: false
---

# Farsi RTL output

**Canonical source:** [`Web/WebUI/.agents/IMAP/SKILLS/reference/farsi-rtl-output/farsi-rtl-output.md`](../../../Web/WebUI/.agents/IMAP/SKILLS/reference/farsi-rtl-output/farsi-rtl-output.md)

Read that file **full**. Hard rules:

1. **Completion criterion:** every Persian heading, paragraph, list, closing note inside `<div dir="rtl" lang="fa">`.
2. **Forbidden:** wrap only opener; leave rest of Persian outside div.
3. **Code / path / CLI:** LTR; close RTL div before fence; new RTL div after for more Persian.
4. **Lists:** whole Persian list in one RTL div.
5. Before send: any Persian outside RTL → skill failed; fix first.
