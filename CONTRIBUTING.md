# Contributors

Thanks for helping improve this repository. This guide explains how to set up
the project, run n8n locally, test changes, and open a pull request.

## Prerequisites

- Node.js (use the version from `.nvmrc`)
- pnpm
- n8n installed locally

### Install n8n Locally (Script)

```bash
npm install -g n8n
```

If you prefer pnpm:

```bash
pnpm add -g n8n
```

## Initial Setup

```bash
pnpm install
```

Link the custom node package (from the repo root):

```bash
pnpm link:node
```

Build once before running:

```bash
pnpm build
```

## Run n8n Locally

Start n8n:

```bash
n8n start
```

After building (`pnpm build`), restart your n8n instance (stop and start again)
to apply the changes.

## Local Testing Workflow

1. Make changes.
2. Build:

```bash
pnpm build
```

3. Restart n8n:

```bash
n8n start
```

## Pull Request Flow

1. Create a branch from `main`.
2. Push the branch to the remote.
3. Open a PR to `main`.

## How to Write a PR Description

Include at least:

- **Title**: short, action-oriented
- **Summary**: what and why
- **Preview**: screenshots or notes on UI changes (if any)
- **Checklist**: use the PR template below
