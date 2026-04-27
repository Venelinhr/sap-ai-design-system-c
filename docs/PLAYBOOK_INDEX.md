# Playbook index — humans and AI agents (navigation)

| Document | Use for |
|----------|---------|
| **[`INSTALL_AND_VALIDATE.md`](INSTALL_AND_VALIDATE.md)** | **Golden path:** clone, venv, `make all`, `make build-sap-po`, optional demos, troubleshooting |
| **[`SHIP_TO_GITHUB.md`](SHIP_TO_GITHUB.md)** | **Push to GitHub** — real `cd` paths, `gh auth`, `git push` (no placeholders) |
| **[`PROMPT_EVERYTHING.md`](PROMPT_EVERYTHING.md)** | **Copy-paste prompts** for Cursor/Claude/Windsurf (bootstrap, UI5, OPL, registry, tokens) |
| **[`../CASE_STUDY.md`](../CASE_STUDY.md)** (repo **root**) | **Full program** case study: every **root** path, `docs/`, `examples/`, **architecture**, **make** table, **deliverables** |
| **[`WORKFLOW_ZERO_TO_100.md`](WORKFLOW_ZERO_TO_100.md)** | **Readable** zero→100% path: **phases**, **issue→fix**, **wrong vs best prompts**, **what to avoid**, links demos (`8085`/`8087`/`8088`) |
| **[`DEMOS_LOCALHOST_8087_8088.md`](DEMOS_LOCALHOST_8087_8088.md)** | **Deep dive** `localhost:8087` & `:8088`: **purpose, approach, issues, fixes, best solution**; ties to `top_components_seed.yaml` and subscription OPL |
| **[`TURNING_POINT_MOMENTUM.md`](TURNING_POINT_MOMENTUM.md)** | **When things start to happen:** the **inflection** (grounding + `make` + browser); **your action** vs **assistant** vs **repo**; fill-in for **your** story |
| **[`../DESIGN.md`](../DESIGN.md)** | Master specification — start here |
| **[`../SAPUI5-COMPONENTS.md`](../SAPUI5-COMPONENTS.md)** | Component JSON + API + examples index |
| **[`LLM_HUMAN_PLAYBOOK.md`](LLM_HUMAN_PLAYBOOK.md)** | Full narrative: idea, process, before/after, JSON, Figma, prompts, React vs Fiori |
| [`VALIDATION_7STEPS_LLM.md`](VALIDATION_7STEPS_LLM.md) | 7-step LLM checklist |
| [`PROMPTING_MCP_AND_STATIC.md`](PROMPTING_MCP_AND_STATIC.md) | MCP vs static vs direct; 4-step template; 3 examples; 4 patterns; DO/DON'T |
| [`FIGMA_VS_MACHINE_TRUTH.md`](FIGMA_VS_MACHINE_TRUTH.md) | Why Figma ≠ OpenUI5 truth |
| [`ERROR_HANDLING_LLM.md`](ERROR_HANDLING_LLM.md) | Common errors and fixes |
| [`LLM-READABLE-ADDENDUM.md`](LLM-READABLE-ADDENDUM.md) | 2-page org hub addendum |
| [`DESIGN_REVIEW_CHECKLIST.md`](DESIGN_REVIEW_CHECKLIST.md) | Merge gate + agent QA line |
| [`case_study/PROMPT_DRIVEN_SAP_CASE_STUDY.md`](case_study/PROMPT_DRIVEN_SAP_CASE_STUDY.md) | Long case study |
| **Slides (~34)** | `make playbook-presentation` → `docs/case_study/exports/SAP_LLM_Playbook_Full.pptx` |
| **Case study HTML hub** | `make demo-playbook-site` — same page embeds **how to build a SAP Fiori app** (section `#build-sap-app`); [Markdown edition](../examples/llm-playbook-case-study/CASE_STUDY_HUB.md); URL **127.0.0.1** + free port from 8089 ([`README`](../examples/llm-playbook-case-study/README.md)) |
| **HTML compare (React vs Fiori)** | [`../examples/llm-playbook-comparison/fiori-concepts-vs-react.html`](../examples/llm-playbook-comparison/fiori-concepts-vs-react.html) |

**For coding agents:** load `AGENTS.md` + `DESIGN.md` + this index in every SAPUI5 session.
