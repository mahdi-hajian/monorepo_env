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

Use this skill when the user wants to **read PR comments**, **apply fixes in the repo**, and **acknowledge on the PR**—especially for `analytics.mohaymen.ir` / **Analytics** / **MicroService.IAP**.

**Discovery (Cursor + Claude Code, etc.):** Workspace root **[`AGENTS.md`](../../../AGENTS.md)** points here so agents load the same workflow without relying only on Cursor’s `@skill` picker. This file remains the **single source of truth** for the full checklist.

## MCP server and tools

1. **Always** read the tool JSON schema under the workspace `mcps/` folder **before** calling `call_mcp_tool` (required MCP rule).
2. Use server **`user-MCP_DOCKER`** (Azure DevOps Git REST), **not** GitHub MCP, for this org.

### Typical calls

| Goal | Tool | Notes |
|------|------|--------|
| PR metadata | `repo_get_pull_request_by_id` | `project`, `repositoryId`, `pullRequestId` |
| Comment threads | `repo_list_pull_request_threads` | Same ids; use `status: "Active"` for open items; `fullResponse: true` if you need full JSON |
| Reply on a thread | `repo_reply_to_comment` | Same ids + `threadId` + `content` |

**Project/repo defaults** (from URL pattern `.../Analytics/_git/MicroService.IAP/...`):

- `project`: **`Analytics`**
- `repositoryId`: **`MicroService.IAP`**
- `pullRequestId`: numeric id from `pullrequest/<id>`

Parse other repos/projects from the user’s URL the same way when different.

## Workflow

1. **Fetch** PR and/or threads with MCP (see table above).
2. **AI-Reviewer — ask first:** If any thread is from **AI-Reviewer** (or clearly the bot summary: no `threadContext` / no file, long markdown), **stop and ask the user** before coding—**unless** they already said in this request (e.g. «AI-Reviewer را هم حل کن» / «ردش کن»). Example question:  
   **«آیا کامنت‌های AI-Reviewer را هم در کد اعمال کنم؟»** (or the same yes/no in English).  
   - If the user says **yes** (e.g. حل کن / بله / yes / fix it): **implement** that feedback in code and treat it like other threads for replies (**`done with AI`** where you actually addressed it).  
   - If the user says **no** or does not want it: **ignore** those threads — **no** code changes and **no** `repo_reply_to_comment` on them.
3. **Implement** feedback for all other (non–AI-Reviewer) threads you are handling, plus AI-Reviewer only when the user answered yes.
4. **Acknowledge on ADO** using **`repo_reply_to_comment`** only (per thread you addressed).

## PR reply rule (verbatim)

**Reply text must be exactly (verbatim, no extra words):**

```text
done with AI
```

- Use **`repo_reply_to_comment`** once per thread you addressed (or per thread the user asked you to acknowledge).
- **Do not** add a separate long explanation comment on the PR unless the user explicitly asks for it.

## Do NOT resolve threads unless asked

- **Do not** set thread status to **Fixed** / **Closed** / **WontFix** via `repo_update_pull_request_thread` **unless the user explicitly tells you** to resolve or close those threads.
- The user’s intended flow is: **fix in code + reply `done with AI` only**; **reviewer** marks threads resolved in the UI if they want.

(If threads were previously marked Fixed by mistake, reopening to **Active** also uses `repo_update_pull_request_thread`—only do that when the user asks to undo resolve.)

## How to spot AI-Reviewer threads

- Author display name **AI-Reviewer**, and/or  
- Thread with **`threadContext`: null** (general PR comment) and long structured markdown (risk summary, bullet sections).

## Checklist before you finish

- [ ] Schemas read for every MCP tool you invoked.
- [ ] If AI-Reviewer threads exist: **asked** the user yes/no; behavior matches their answer.
- [ ] **Diff matches intended threads:** every code change maps to a review comment you chose to address; nothing unrelated. If **AI-Reviewer** was ignored (user said no), it is OK that those suggestions have **no** corresponding changes.
- [ ] Each handled thread has reply **`done with AI`** (if user wanted acknowledgements).
- [ ] No silent **`repo_update_pull_request_thread`** → **Fixed** unless user asked.
