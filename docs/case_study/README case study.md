# Case study: Prompt-driven SAP (Fiori) application delivery

**Complete repository case study (all root files, docs, examples, make targets, deliverables):** [`../../CASE_STUDY.md`](../../CASE_STUDY.md) (repository root).

This folder contains the **narrative case study** and build instructions for **companion deliverables** (PowerPoint, PDF) generated from the same repository you use to run the SAPUI5 demos and LLM registry.


| Asset                                 | File                                                                 | Description                                                                               |
| ------------------------------------- | -------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| **Full case study**                   | `[PROMPT_DRIVEN_SAP_CASE_STUDY.md](PROMPT_DRIVEN_SAP_CASE_STUDY.md)` | Problem, solution, MVP approach, SAP guidelines, pain points, collaboration, step-by-step |
| **Case study PPTX + PDFs (generated)** | `exports/` after `make case-study-artifacts` | `SAP_Prompt_Case_Study.pptx` + `SAP_Prompt_Case_Study.pdf` (narrative) · `SAP_Repository_Case_Study_Handout.md` + `SAP_Repository_Case_Study_Handout.pdf` (root [`CASE_STUDY.md`](../../CASE_STUDY.md)) |
| **Full playbook deck (50+ slides, Parts 1–10)** | `exports/` after `make playbook-presentation` | `SAP_LLM_Playbook_Full.pptx` — `PLAYBOOK_DECK_OUTLINE.md` |
| **Case study HTML hub (static)** | `make demo-playbook-site` (prints URL, often **:8089**) | Includes **#build-sap-app** (how to build a Fiori app). Server: `scripts/serve_playbook_case_study.py` — [`../../examples/llm-playbook-case-study/README.md`](../../examples/llm-playbook-case-study/README.md) |


**Build case study slides + PDF:**

```bash
pip install -e ".[case-study]"
make case-study-artifacts
```

**Build 34-slide full playbook (MCP, Figma, workflow):**

```bash
make playbook-presentation
```

Outputs include: `SAP_Prompt_Case_Study.pptx`, `SAP_Prompt_Case_Study.pdf`, `SAP_Repository_Case_Study_Handout.md`, `SAP_Repository_Case_Study_Handout.pdf`, and (from `make playbook-presentation`) `SAP_LLM_Playbook_Full.pptx` — all under `docs/case_study/exports/`

**Google Slides:** upload the `.pptx` to Google Drive → Open with Google Slides (conversion is automatic; fix any font substitutions if needed).

See also: `[../LLM-READABLE-ADDENDUM.md](../LLM-READABLE-ADDENDUM.md)` and the root `[README.md](../../README.md)` for installation and running demos.