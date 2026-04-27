# Claude Code (and similar) — start here

This repository is **SAP AI design system / LLM-readable SAPUI5 registry** work (public: [Venelinhr/sap-ai-design-system-c](https://github.com/Venelinhr/sap-ai-design-system-c)).

## Required reading

1. **[docs/INSTALL_AND_VALIDATE.md](docs/INSTALL_AND_VALIDATE.md)** — clone, venv, `make all`, demos.
2. **[docs/PROMPT_EVERYTHING.md](docs/PROMPT_EVERYTHING.md)** — copy-paste session prompts.
3. **[AGENTS.md](AGENTS.md)** — authoritative rules for agents (UI, registry, tokens, `make` targets).
4. **[docs/ONBOARDING_AI_TOOLS.md](docs/ONBOARDING_AI_TOOLS.md)** — tool matrix (Cursor, Windsurf, VS Code).
5. **[docs/PLAYBOOK_INDEX.md](docs/PLAYBOOK_INDEX.md)** — doc map.

## Quick verify

```bash
pip install -e ".[dev]"
make all
```

Do not commit secrets (`.env`, API keys). See [SECURITY.md](SECURITY.md).

**Push to GitHub:** [docs/SHIP_TO_GITHUB.md](docs/SHIP_TO_GITHUB.md)
