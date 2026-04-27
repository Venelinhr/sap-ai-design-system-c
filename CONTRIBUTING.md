# Contributing to sap-ai-design-system-c

**Repository:** [github.com/Venelinhr/sap-ai-design-system-c](https://github.com/Venelinhr/sap-ai-design-system-c)

| Name | What it is |
|------|------------|
| **`sap-ai-design-system-c`** | GitHub repo and **PyPI/distribution** name in `pyproject.toml` (`pip install -e .` installs it under this name). |
| **`sapui5_llm_ready`** | **Python import package** in `src/` (unchanged: `import sapui5_llm_ready`). |

**How to push:** [docs/SHIP_TO_GITHUB.md](docs/SHIP_TO_GITHUB.md)

## Environment

Step-by-step validation (golden path, troubleshooting): **[docs/INSTALL_AND_VALIDATE.md](docs/INSTALL_AND_VALIDATE.md)**.  
Prompt examples for AI tools: **[docs/PROMPT_EVERYTHING.md](docs/PROMPT_EVERYTHING.md)**.

```bash
git clone https://github.com/Venelinhr/sap-ai-design-system-c.git
cd sap-ai-design-system-c
python3 -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -e ".[dev]"
```

Optional extras: `pip install -e ".[case-study]"` for PPTX/PDF artifact builds.

## Before you open a PR

Run the same checks CI runs (see [.github/workflows/ci.yml](.github/workflows/ci.yml)):

```bash
make all
```

If you changed **SAPUI5 XML** or **generated** PO views, also:

```bash
make build-sap-po
```

If you touch **static** HTML/CSS that must use design tokens:

```bash
make token-audit
```

## What to run for different changes

| Area | Commands / notes |
|------|------------------|
| Python, API, registry | `make lint`, `make test`, `make build-registry`, `make validate-registry` |
| `examples/**` OpenUI5 views | `make validate-sap-demo` and/or `make build-sap-po` |
| Deck / pitch / case-study HTML | `make token-audit` |
| Docs only | No `make` required, but keep links valid |

## AI assistants

- Read [AGENTS.md](AGENTS.md) first.
- For tool-specific setup: [docs/ONBOARDING_AI_TOOLS.md](docs/ONBOARDING_AI_TOOLS.md).
- In-repo skill for the subscription Object Page demo: [.cursor/skills/sapui5-opl-subscription-demo/SKILL.md](.cursor/skills/sapui5-opl-subscription-demo/SKILL.md).

## Security

Do not commit secrets. See [SECURITY.md](SECURITY.md).

## Pull requests

- One logical change per PR when possible.
- Describe **what** changed and **why** in the PR body (the template prompts you).
- Link related issues if any.
