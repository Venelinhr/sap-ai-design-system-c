# Onboarding: AI tools and this repository

**Repository:** [github.com/Venelinhr/sap-ai-design-system-c](https://github.com/Venelinhr/sap-ai-design-system-c) (clone URL below)

Use this file if you work with **Cursor**, **Claude Code**, **Windsurf**, or **any editor + LLM** on SAP Fiori / SAPUI5 tasks in this project.

## Clone and install (all tools)

```bash
git clone https://github.com/Venelinhr/sap-ai-design-system-c.git
cd sap-ai-design-system-c
python3 -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -e ".[dev]"
```

Then run quality gates (see [CONTRIBUTING.md](../CONTRIBUTING.md)):

```bash
make all
```

**Full checklists:** [INSTALL_AND_VALIDATE.md](INSTALL_AND_VALIDATE.md) (install + `make build-sap-po` + demos). **Ship to GitHub:** [SHIP_TO_GITHUB.md](SHIP_TO_GITHUB.md). **AI prompt examples:** [PROMPT_EVERYTHING.md](PROMPT_EVERYTHING.md).

## What to read first (humans and agents)

| Order | File | Why |
|-------|------|-----|
| 1 | [AGENTS.md](../AGENTS.md) | **Rules** for UI, registry, tokens, and `make` targets |
| 2 | [DESIGN.md](../DESIGN.md) | Architecture and contracts |
| 3 | [docs/PLAYBOOK_INDEX.md](PLAYBOOK_INDEX.md) | Navigation for playbooks and addenda |
| 4 | [docs/SKILLS_IN_REPO.md](SKILLS_IN_REPO.md) | In-repo skills and how to extend them |
| 5 | [docs/INSTALL_AND_VALIDATE.md](INSTALL_AND_VALIDATE.md) | End-to-end install and validation |
| 6 | [docs/PROMPT_EVERYTHING.md](PROMPT_EVERYTHING.md) | Copy-paste prompts for agents |

## Tool-specific setup

| Tool | Project files | First actions |
|------|----------------|---------------|
| **Cursor** | [.cursor/rules/](../.cursor/rules/) (rules), [.cursor/skills/](../.cursor/skills/) (vendored skill) | Open the repo root; rules apply automatically. For subscription OPL work, read the skill under `.cursor/skills/sapui5-opl-subscription-demo/`. |
| **Claude Code** | [CLAUDE.md](../CLAUDE.md) (entry point) | Start in repo root; Claude loads `CLAUDE.md`, which defers to `AGENTS.md`. |
| **Windsurf** | [.windsurfrules](../.windsurfrules) (CASCADE instructions) | Same as Cursor: work from root; file points to the same links and gates. |
| **VS Code / other** | [AGENTS.md](../AGENTS.md) | Paste or @-include `AGENTS.md` in your session, or add a user snippet that opens these paths. |

## Demos and ports (local only)

| Command | Typical URL | Area |
|---------|-------------|------|
| `make demo-subscription` | [http://127.0.0.1:8088/](http://127.0.0.1:8088/) | Object Page subscription demo |
| `make demo-showcase` | [http://localhost:8087](http://localhost:8087) | Enterprise showcase |
| `make run-api` | [http://127.0.0.1:8000/health](http://127.0.0.1:8000/health) | FastAPI registry |

If the browser shows **connection refused**, the local server is not running—start the `make` target in a terminal and use a **hard refresh**.

## Optional: global skills (not vendored here)

This repo does **not** copy every home-directory skill. For patterns on authoring skills, see the [Anthropic / Cursor “skills”](https://docs.anthropic.com/) and community “skill-creator” style workflows. The **one** full skill we vendor for SAPUI5 OPL is under `.cursor/skills/sapui5-opl-subscription-demo/`.

## Publishing your fork

See [GITHUB_PUBLISH.md](GITHUB_PUBLISH.md).
