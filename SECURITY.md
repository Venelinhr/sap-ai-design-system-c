# Security policy

## Supported versions

Security fixes are applied to the **default branch** (`main`) of [Venelinhr/sap-ai-design-system-c](https://github.com/Venelinhr/sap-ai-design-system-c). Use the latest commit on `main` for development.

## Reporting a vulnerability

**Do not** open a public issue for undisclosed security problems.

- Open a **private vulnerability report** via GitHub (**Security** tab → **Report a vulnerability**) if enabled for the repository, or
- Contact the maintainers through a **private** channel they publish for this repository.

Include: affected area, steps to reproduce, impact, and suggested fix if you have one.

## Secrets

- Never commit API keys, tokens, or `.env` files.
- Never paste production credentials into issues or pull requests.
- Use environment variables locally (e.g. `ANTHROPIC_API_KEY` for optional LLM validation targets in the Makefile).

## Optional dependencies

Some `make` targets require network or API access (e.g. live SAPUI5 extraction, LLM validation). Treat keys as **local only** and keep them out of git.
