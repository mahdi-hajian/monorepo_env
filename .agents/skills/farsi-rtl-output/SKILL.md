---
name: farsi-rtl-output
description: >-
  Make reply right-to-left (RTL) when user write Persian (Farsi), so prose
  readable in UI. Use when user message Persian, mixed Persian/English with
  Persian main, or user ask RTL or فارسی layout. Keep code block, path, CLI LTR.
disable-model-invocation: false
---

# Farsi RTL output

**Canonical source:** [`Web/WebUI/.agents/IMAP/SKILLS/reference/farsi-rtl-output/farsi-rtl-output.md`](../../../Web/WebUI/.agents/IMAP/SKILLS/reference/farsi-rtl-output/farsi-rtl-output.md)

Read file full. Wrap Persian prose in `<div dir="rtl" lang="fa">`. Keep code fence and path LTR.