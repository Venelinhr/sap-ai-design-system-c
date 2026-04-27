# Prompt everything — examples for users and developers

Use these **copy-paste** prompts in **Cursor**, **Claude Code**, **Windsurf**, or any chat that can read the repo. They align with [AGENTS.md](../AGENTS.md) and reduce bad SAPUI5 guesses.

**Before any task:** open the repo root and ensure the agent can read `AGENTS.md`, `DESIGN.md`, and [PLAYBOOK_INDEX.md](PLAYBOOK_INDEX.md).

---

## 1. Session bootstrap (first message)

```text
You are working in the sap-ai-design-system-c repository on GitHub (Python package import: sapui5_llm_ready). SAP Fiori / SAPUI5 LLM-ready registry.

Before writing code:
1. Read AGENTS.md and follow it.
2. Read DESIGN.md for architecture.
3. For UI work, use only controls from the public SAPUI5 API (https://ui5.sap.com/#/api). Figma does not override the API.

After any change, say which make targets I should run (from AGENTS.md / CONTRIBUTING.md).
```

---

## 2. Green build (validate my machine)

```text
I just cloned the repo and ran: python3 -m venv .venv, pip install -e ".[dev]".

Guide me through confirming everything works: run make all, then make build-sap-po, and interpret any failure. Do not skip token-audit or test steps.
```

---

## 3. Change an OpenUI5 view (XML) safely

```text
I need to change examples/purchase-order/demo/ui5/webapp/view/PurchaseOrder.view.xml (or another demo view).

Rules: only sap.m / sap.ui.core.mvc / supported libs as in existing index.html; sap_horizon + compact if the demo uses them; one logical change at a time.

After editing, list the exact commands: make validate-sap-demo and/or make build-sap-po. Do not use setTimeout for layout fixes.
```

---

## 4. Subscription Object Page demo (layout / UxAP)

```text
I'm working on examples/subscription-billing/ (Object Page, port 8088, make demo-subscription).

Load the in-repo skill at .cursor/skills/sapui5-opl-subscription-demo/SKILL.md and follow its source-of-truth order. Propose a fix for [describe symptom: e.g. ProgressIndicator overlap, narrow form, two blocks side by side].

Validate with make demo-subscription and browser check; no permanent debug fetch in the controller.
```

---

## 5. Registry / API / Python

```text
I need to extend the FastAPI surface or change data/registry.json generation.

Constraints: ComponentSpec must match schemas/component_spec.schema.json; run make build-registry && make validate-registry && make test. Point me to the exact files and tests to update.
```

---

## 6. Static HTML / deck / tokens

```text
I'm editing static HTML or CSS under examples/purchase-order/demo/ (deck, pitch).

Rules: no new raw hex or px in consumer CSS—use examples/purchase-order/demo/_shared/llm-tokens.css variables. Run make token-audit before we're done.
```

---

## 7. Docs only (wording, links)

```text
Update docs/ or README: no code changes. Keep all internal links and repo-relative paths valid. Do not change AGENTS.md rules unless I asked.
```

---

## 8. Case study / playbook narrative

```text
I want to align narrative in docs/case_study/ with the runnable demos (8087, 8088, playbook site). Read PLAYBOOK_INDEX.md and CASE_STUDY.md; suggest minimal doc edits, no fiction about URLs—only documented ports and make targets.
```

---

## Anti-prompts (avoid)

- *“Rewrite the whole Object Page in React”* for a Fiori demo task — this repo is **SAPUI5-first**; React is a secondary artifact in generation examples.
- *“Use any CSS to fix the anchor bar”* — prefer UxAP structure and **content** fixes first; see the OPL skill.
- *“Add features without running make all”* — always run the gates in CONTRIBUTING.md.

## Related

- [INSTALL_AND_VALIDATE.md](INSTALL_AND_VALIDATE.md) — install and golden path  
- [ONBOARDING_AI_TOOLS.md](ONBOARDING_AI_TOOLS.md) — tool-specific files  
- [PROMPTING_MCP_AND_STATIC.md](PROMPTING_MCP_AND_STATIC.md) — deeper prompt patterns in-repo  
