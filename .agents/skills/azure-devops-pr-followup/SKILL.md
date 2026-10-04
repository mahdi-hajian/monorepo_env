---
name: azure-devops-pr-followup
description: >-
  Fetches Azure DevOps (Mohaymen analytics.mohaymen.ir) PR comment threads via MCP_DOCKER,
  implements review feedback in code, and replies on threads with the exact phrase "done with AI"
  without resolving threads.
  Use when the user links an ADO PR, asks to fix PR comments, fetch active threads,
  or follow up on MicroService.IAP / Analytics collection pull requests.
disable-model-invocation: true
---
# Azure DevOps PR follow-up (MCP)

**CANON SOURCE:** [`MicroService.IAP/MicroService.IAP/.cursor/skills/azure-devops-pr-followup/SKILL.md`](../../../MicroService.IAP/MicroService.IAP/.cursor/skills/azure-devops-pr-followup/SKILL.md)

READ FILE FULL. FOLLOW IT. FOR **WEB** / WEBUI PR, USE [`web-azure-devops-pr-followup`](../web-azure-devops-pr-followup/SKILL.md) INSTEAD.