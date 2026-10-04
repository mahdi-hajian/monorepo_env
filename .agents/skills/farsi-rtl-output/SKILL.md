---
name: farsi-rtl-output
description: >-
  Formats assistant replies right-to-left (RTL) when the user writes in Persian
  (Farsi), so prose is readable in the UI. Use when the user's message is in
  Persian, mixed Persian/English with Persian as the main language, or when they
  ask for RTL or فارسی layout. Keeps code blocks, paths, and CLI in LTR.
disable-model-invocation: false
---

# Farsi RTL output

**Canonical source:** [`Web/WebUI/.agents/IMAP/SKILLS/reference/farsi-rtl-output/farsi-rtl-output.md`](../../../Web/WebUI/.agents/IMAP/SKILLS/reference/farsi-rtl-output/farsi-rtl-output.md)

Read that file in full. Wrap Persian narrative in `<div dir="rtl" lang="fa">`; keep code fences and paths LTR.
