# Skills and agent assets in this repository

## Purpose

We keep a **small, high-value** set of files so **Cursor**, **Claude Code**, and similar tools can load **project-specific** guidance without you copying your entire `~/.claude/skills` or `~/.cursor/skills` tree.

## What is committed

| Path | Role |
|------|------|
| [AGENTS.md](../AGENTS.md) | Primary instructions for any coding agent (SAPUI5 API, `make` gates, tokens). |
| [CLAUDE.md](../CLAUDE.md) | Short entry for Claude Code; defers to `AGENTS.md`. |
| `.cursor/rules/` | Cursor **rules** (scope: this repo, focused checks). |
| `.cursor/skills/sapui5-opl-subscription-demo/` | Vendored **skill** for `sap.uxap` + `sap.m` Object Page / subscription-billing style demos. |

## Vendored skill: `sapui5-opl-subscription-demo`

- **Source:** maintained as a copy of the project skill package (SKILL.md + `references/`, `case-study/`).
- **When to use:** debugging or extending the subscription Object Page demo under `examples/subscription-billing/`, or similar OPL + compact layout work.
- **How to read:** start at `.cursor/skills/sapui5-opl-subscription-demo/SKILL.md`, then follow its “load order” table for references.

**Install + prompts + ship:** [INSTALL_AND_VALIDATE.md](INSTALL_AND_VALIDATE.md) · [SHIP_TO_GITHUB.md](SHIP_TO_GITHUB.md) · [PROMPT_EVERYTHING.md](PROMPT_EVERYTHING.md)

## Adding a new skill in-repo

1. Create `.cursor/skills/<skill-name>/` with a `SKILL.md` and optional `references/`.
2. Add one line to [docs/ONBOARDING_AI_TOOLS.md](ONBOARDING_AI_TOOLS.md) under a “vendored skills” bullet if the skill is user-facing.
3. Keep skills **task-focused**; do not commit large unrelated skill mirrors (file size and maintenance).

## What we intentionally omit

- Full copies of generic skills (e.g. broad “file organizer” or “MCP builder”)—link to public docs or install them in your home directory.
- **Secrets** and **local chat export** blobs—see `.gitignore` and [SECURITY.md](../SECURITY.md).
