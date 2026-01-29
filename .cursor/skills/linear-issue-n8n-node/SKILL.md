---
name: linear-issue-n8n-node
description: Creates an n8n node from a Linear issue link by extracting the issue key and the final URL path segment as the API title, then building the node from the ChannelTalk swagger spec. Use when the user provides a Linear issue URL for creating a new n8n node.
---

# Linear Issue to n8n Node

## Purpose

Turn a Linear issue URL into a new n8n node task by:

- Using the issue key for the git branch name
- Using the final URL path segment as the API title
- Building the node from the ChannelTalk swagger spec

## Inputs

- Linear issue URL (example):
  - `https://linear.app/channel/issue/FDE-1982/n8n-user-post-openv5usersuseridtouch`

## Extraction Rules

1. **Issue key**: the segment right after `/issue/` (e.g., `FDE-1982`).
2. **API title**: the **last** path segment of the URL (e.g., `n8n-user-post-openv5usersuseridtouch`).

## Workflow

1. **Create a branch from `origin/main`:**
   - Run:
     - `git fetch origin`
     - `git checkout -b <ISSUE_KEY> origin/main`

2. **Find the API spec in the swagger file:**
   - Use `ref/channel-swagger.json` to locate the endpoint that matches the API title.

3. **Create the n8n node:**
   - Use the swagger spec as the source of truth for parameters, method, and path.
   - Use existing node files as references:
     - `nodes/ChannelTalk/resources/message/`
     - `nodes/ChannelTalk/ChannelTalk.node.ts`
   - Mirror existing patterns for:
     - request/response structure
     - required/optional fields
     - parameter mapping
     - resource registration in the main node file

## Output Expectations

- A new resource implementation under `nodes/ChannelTalk/resources/`
- Updated `ChannelTalk.node.ts` (and any index files) to register the new operation
- Consistent with existing ChannelTalk node conventions

## Notes

- Always base the branch on `origin/main`.
- The API title comes **only** from the last path segment of the Linear URL.
