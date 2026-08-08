---
name: azure-devops-pr-resolve
description: >-
  Marks Azure DevOps (Mohaymen analytics.mohaymen.ir) PR comment threads as Fixed via MCP_DOCKER
  without changing code or replying on threads.
  Use when the user links an ADO PR and asks to resolve, close, or mark PR comments/threads as done
  (e.g. «resolve کن», «فقط resolve», «mark threads fixed») on MicroService.IAP / Analytics PRs.
disable-model-invocation: true
---

# Azure DevOps PR resolve (MCP only)

Use this skill when the user wants to **mark PR comment threads as resolved on Azure DevOps**—**no code changes**, **no `done with AI` replies**.

For **fixing review feedback in code** + replying `done with AI`, use **[`azure-devops-pr-followup`](../azure-devops-pr-followup/SKILL.md)** instead.

## MCP server and tools

1. **Always** read the tool JSON schema under the workspace `mcps/user-MCP_DOCKER/tools/` folder **before** calling `CallMcpTool`.
2. Use server **`user-MCP_DOCKER`** (Azure DevOps Git REST), **not** GitHub MCP.

| Goal | Tool | Notes |
|------|------|--------|
| List threads | `repo_list_pull_request_threads` | `status: "Active"` for open items; `fullResponse: true` if you need thread ids from JSON |
| Resolve a thread | `repo_update_pull_request_thread` | `status: "Fixed"` (default) |

**Project/repo defaults** (URL `.../Analytics/_git/MicroService.IAP/pullrequest/<id>`):

- `project`: **`Analytics`**
- `repositoryId`: **`MicroService.IAP`**
- `pullRequestId`: numeric id from the URL

Parse other repos/projects from the user's URL when different.

## Workflow

1. **Fetch Active threads** with `repo_list_pull_request_threads` (`status: "Active"`, `top: 100`).
2. **If the list is empty**, fetch all threads once (no status filter) and confirm they are already `Fixed` / non-Active; report that to the user and stop.
3. **Resolve each Active thread** with `repo_update_pull_request_thread`:
   - `project`, `repositoryId`, `pullRequestId`, `threadId`
   - `status`: **`Fixed`** unless the user asked for another status (`WontFix`, `Closed`, `ByDesign`, …).
4. **Re-fetch Active threads** (or verify the update responses) to confirm none remain Active.
5. **Report a short summary**: PR id, count resolved, thread ids; note any failures.

## Do NOT

- **Do not** edit repo files or run tests for this task.
- **Do not** call `repo_reply_to_comment` unless the user explicitly asks for a reply in addition to resolve.
- **Do not** use `azure-devops-pr-followup` (that skill fixes code and replies `done with AI` without resolving).

## Optional: reopen threads

Only when the user asks to **reopen** or **unresolve**: `repo_update_pull_request_thread` with `status: "Active"`.

## Checklist before you finish

- [ ] Schemas read for every MCP tool invoked.
- [ ] No code changes in the working tree.
- [ ] Every requested Active thread updated (or user told why some were skipped).
- [ ] Final Active-thread count is zero (or failures reported).
