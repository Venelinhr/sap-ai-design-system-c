# Workflow: zero → 100% (HTML-ready SAP Fiori demo)

**Goal:** A **running** OpenUI5 app in the browser that is **API-legal**, **Fiori-credible** (Horizon, compact, correct aggregations), and **defensible in review**—not a pretty screenshot built on impossible XML.

**This doc is the “easy to read” path:** each phase has **what to do**, **what usually goes wrong**, and **the fix**. For shorter prompts, see [`PROMPTING_MCP_AND_STATIC.md`](PROMPTING_MCP_AND_STATIC.md). For the full narrative, see [`LLM_HUMAN_PLAYBOOK.md`](LLM_HUMAN_PLAYBOOK.md).

**Where the screenshots come from (examples in this repo):**

| What you see in the browser | `make` target | URL | What it proves |
|----------------------------|---------------|-----|----------------|
| **LLM readiness** – tabs *Fields* / *Table + toolbar*, search “registry / components…”, info strip about `top_components_seed.yaml` | `make demo-showcase` | [http://localhost:8087/](http://localhost:8087/) | Top components + `sap.m` + `SimpleForm` + `sap.uxap` in one Horizon **compact** shell |
| **B2B subscription / billing** Object Page | `make demo-subscription` | [http://127.0.0.1:8088/](http://127.0.0.1:8088/) | OPL, sections, `blocks`, real layout pressure |
| **Purchase Order** (Object Page, items table, shell bar) | `make demo-ui5` | [http://localhost:8085/](http://localhost:8085/) | Full **sap.uxap**-style flow + validation path (`make validate-sap-demo`) |
| (React / deck / pitch) | `demo-react`, `demo-deck`, `demo-pitch` | `8086`, `8083`, `8084` | *Not* SAPXML—contrast only; see `examples/llm-playbook-comparison/` |

**“100%” in this program means:** the demo **loads without console-fatal errors**, **control ids exist in the API** for the pinned version, **parent/child aggregations match** the same API, **CI-style checks** you chose (`make validate-*`, token audit for static pages) are **understood** for that path, and a reviewer can answer **“which control and aggregation is this line?”** for main `view.xml` fragments.

---

## How to use this page

- Read **phases 1–6** in order.  
- Use **Issue → fix** when something breaks—don’t skip to CSS first.  
- Use **Prompt: wrong / right** when talking to an LLM.  
- **Avoid** the “don’t” column in each phase; **prefer** the “do” column.

---

## Phase map (percent = readiness of the *delivery*, not time)

| % band | You have… |
|--------|------------|
| **0–20%** | Repo + venv, **UI5 version pinned** in `index.html`, you’ve read `DESIGN.md` + API entry for the pattern you need |
| **20–40%** | A **Fiori pattern** + **recipe** (`recipes/*.yaml`) + a **registry slice** or **MCP/HTTP** retrieval plan |
| **40–60%** | **First** `view.xml` + controller + model: only **real** `sap.*` classes, valid **aggregations** |
| **60–80%** | **`make demo-*`** + browser: layout works; you fix **structure** (OPL `blocks`, form layout) before pixels |
| **80–95%** | **`make validate-*`**, 7-step checklist, **line-level** agent QA on XML |
| **95–100%** | **Design vs API** conflicts documented; a11y/token rules for *your* path; **stakeholder-ready** demo |

---

## Phase 1 — 0–20%: Foundation (environment + version + sources of truth)

| Do | Don’t |
|----|--------|
| Clone repo; `pip install -e ".[dev]"` (and case-study extra if you build decks) | Start from an empty project and “ask the LLM for SAP” with no `DESIGN.md` |
| **Pin** OpenUI5 in every demo’s `index.html` / `sap-ui-core.js` (same as [SAPUI5 API](https://ui5.sap.com/#/api) you read) | Mix two UI5 versions between chat, registry, and browser |
| Read **`DESIGN.md`**, then **API** for the controls you will touch | Treat Figma frame names as `sap.m` class names |
| Open **`AGENTS.md`** (agent rules) for this repository | Rely on the model’s memory of “what SAP has” |

**Typical issues → fixes**

| Issue | Symptom | Fix |
|-------|---------|-----|
| Wrong mental model | “I’ll style it like the mockup in CSS” | **Layout first:** aggregations, density, OPL `blocks`—**then** theme classes; see Fiori + `recipes/`. |
| No shared version | Runtime control not found, wrong property name | Grep your **actual** `sap-ui-core` / doc URL; never assume “latest” in the prompt. |

**Prompt (right):** *“I’m on UI5 (paste version from `index.html`). List only `sap.*` classes for the chosen pattern that appear in the API, with parent aggregations, before writing XML.”*  

**Prompt (wrong):** *“Build an SAP Fiori page like the screenshot.”* (no version, no API, no registry)

---

## Phase 2 — 20–40%: Pattern + machine facts (recipe + JSON / MCP)

| Do | Don’t |
|----|--------|
| Pick **Fiori pattern** (Object Page, list-report, worklist) from guidelines + a **`recipes/*.yaml`** when applicable | Free-hand “use Object Page” in one sentence with no `blocks` plan |
| Fetch **ComponentSpec** via **`search` / `getComponentSpec`** (`make run-api`) or **MCP** tools with the *same* contract | Paste **entire** `data/registry.json` into chat (noise + wrong focus) |
| Keep **2–3** `ComponentSpec` **objects** per feature in context | “Remember” 200 controls from training |

**Typical issues → fixes**

| Issue | Symptom | Fix |
|-------|---------|-----|
| Hallucinated control | `sap.m.Foo` doesn’t load | `search` or registry: **only** ids that **exist**; **grep** or API doc for exact string. |
| Wrong child under parent | Illegal aggregation, white screen / broken section | Check **`slots` / aggregations** in spec + **API** for *that* parent (e.g. OPL `blocks`, table `items`). |
| Figma as spec | “Component says ‘Card’ in English” in XML as class | Use `data/figma/signals.yaml` as **soft** input; **API** wins for XML. See [`FIGMA_VS_MACHINE_TRUTH.md`](FIGMA_VS_MACHINE_TRUTH.md). |

**Prompt (right):** *“Here is `ComponentSpec` JSON for A and B. Generate **only** a `view.xml` fragment where every element’s `class` is one of {…}; after each line, state **parent** and **aggregation**.”*  

**Prompt (wrong):** *“Use modern SAP cards and grids.”* (undefined controls)

---

## Phase 3 — 40–60%: Generate XML + JS (grounded)

| Do | Don’t |
|----|--------|
| Copy **property names** from the API page for *that* control | Use HTML/React names (`onClick`, `className`, …) in XML |
| **One** column in OPL `blocks` when stacking blocks vertically (unless design + API allow otherwise) | Two narrow `blocks` + long text + compact → **layout hacks**; fix **structure** (see OPL / ProgressIndicator rules in playbooks) |
| **Controller** only wires API / `i18n` / models you can justify | Obscure 500-line controller “to fix layout” |

**Typical issues → fixes**

| Issue | Symptom | Fix |
|-------|---------|-----|
| `ProgressIndicator` + long `displayValue` in **compact** | Overlap, truncation | **Split** label: `m:Text` + short %; see validation docs and OPL case material. |
| **MessageStrip** a11y | Missing `type` or wrong role | 7-step + [`VALIDATION_7STEPS_LLM.md`](VALIDATION_7STEPS_LLM.md). |
| Ingest / demo-only code in “ship” path | CI or review failure | **Follow** `GOVERNANCE.md` and your branch’s `make all` set. |

**Prompt (right):** *“For this fragment, **no** control outside the attached `ComponentSpec` + API; flag any line you cannot ground.”*  

**Prompt (wrong):** *“Make it look exactly like Dribbble.”* (not a testable spec)

---

## Phase 4 — 60–80%: Run local HTML demo (first true “see it”)

| Do | Don’t |
|----|--------|
| Start the right **`make demo-*`**, keep terminal open, open the **bookmarked** URL | *Connection refused* and blame “UI5”—usually **server not running** |
| **Hard refresh** after XML/JS changes | Stale view: “code didn’t apply” when cache is old |
| Fix **order of sections / blocks / form layout** if broken | `!important` on `sap.uxap` before fixing **aggregations** |

**Typical issues → fixes**

| Issue | Symptom | Fix |
|-------|---------|-----|
| `ERR_CONNECTION_REFUSED` | Nothing loads | See **Makefile** / README: `8085` PO, `8087` showcase, `8088` subscription. |
| “ResponsiveGridLayout / density” looks wrong | MessageStrip says density mismatch (like your **green success strip** in demos) | Adjust **form** settings (`SingleContainer`, columns, `labelSpan`) from API + Fiori form docs—not random padding. |
| Top controls demo | Search bar, tabs “Fields / Table”, table **Deliverable / Status / Health** | **Showcase** reads seed YAML; use it as a **template** for how **registry-backed** UIs are structured, not as copy-paste of business data. |

**What your screenshots show at this stage:** Fiori **Horizon**, **Compact**, `sap.m` + `SimpleForm` + (where relevant) `sap.uxap`, **MessageStrip** feedback, real controls ( **DatePicker**, **Switch**, **Select**, table **toolbar**). That is the **“HTML ready”** *look* **after** the XML is *mechanically* right.

---

## Phase 5 — 80–95%: Validate (make + 7 steps + line QA)

| Do | Don’t |
|----|--------|
| `make validate-registry` when registry changes; **`make validate-sap-demo`** (PO path); `make token-audit` for static marketing HTML | “Looks fine” in the browser with **no** gate |
| Work through [`VALIDATION_7STEPS_LLM.md`](VALIDATION_7STEPS_LLM.md) + [`DESIGN_REVIEW_CHECKLIST.md`](DESIGN_REVIEW_CHECKLIST.md) | Skip **existence** and **composition** steps |
| For each nontrivial `view.xml` line: **“Which control id + parent aggregation?”** | Merge without agent/human line review on critical screens |

**Typical issues → fixes**

| Issue | Symptom | Fix |
|-------|---------|-----|
| Component not in API | Build/runtime error | Remove or replace with a **real** id from `search`. |
| Token / hex in static pages | `token-audit` fails | Only **`llm-tokens.css`** variables for those paths (`AGENTS.md`). |

**Prompt (right):** *“List **violations** of the 7-step list for this file; then minimal patch.”*  

**Prompt (wrong):** *“It works on my machine, ship it.”* (no checklist)

---

## Phase 6 — 95–100%: Stakeholder-ready (design debt + comms)

| Do | Don’t |
|----|--------|
| If Fiori/UX and **API-legal** XML **disagree**, **write down** the product decision: change design later vs technical constraint | Silently add CSS/ hacks that break **Fiori** or **a11y** |
| **Same** **demo** URL + **same** `make` story in slide deck / handoff | Orphan “screenshot only” with no way to reproduce |
| For org packs: `docs/LLM-READABLE-ADDENDUM.md` + case study as needed | One-off Confluence with no link back to `DESIGN.md` |

**Typical issues → fixes**

| Issue | Symptom | Fix |
|-------|---------|-----|
| Stakeholder: “not like Figma” | Conflict on pixels vs runtime | **Record:** XML is **API**-correct; delta is **design backlog**, not a silent override. |
| “Is this really SAP?” | Brand / density concerns | Point to **Horizon** + **compact** + **official** controls; avoid fake `sap` classes. |

**At 100%** you can honestly say: **repro** (clone, `make`, URL), **trace** (API + spec lines), **validate** (commands + checklist), **demo** (browser matches program).

---

## One-page: prompt instruction — wrong way vs best way

| Topic | **Wrong way** | **Best way** |
|-------|----------------|--------------|
| **Scope** | “Build the app.” | “Name UI5 version, pattern (OPL, form, or list), attach `ComponentSpec` for the control ids, one `recipes/*.yaml` where applicable, and follow the 4-step flow in [`PROMPTING_MCP_AND_STATIC.md`](PROMPTING_MCP_AND_STATIC.md).” |
| **Grounding** | Rely on model memory of SAP | **MCP/HTTP** `getComponentSpec` / `search` or **2–3** JSON objects; **no** full registry file |
| **Figma** | “Match this frame 1:1 in XML” | Figma = **copy + layout intent**; **API + registry** = **class / aggregation** |
| **Output** | One giant paste | **Fragment** + **line table** (control, aggregation) + **self-check** vs 7 steps |
| **Fixing bugs** | Add CSS until it looks right | **Aggregations, density, form layout** first; then theme classes |
| **Done?** | Screenshot | **`make` green** + 7 steps + line QA for critical views |

## What to avoid (summary)

1. **Inventing** `sap.m.*` / `sap.uxap.*` names.  
2. **Treating Figma** as the aggregation graph.  
3. **Pasting** megabytes of `registry.json`.  
4. **CSS-first** fixes for **wrong parent/child**.  
5. **Shipping** on visual alone without **validate** + **line traceability**.  
6. **Mismatched** UI5 version between **prompt**, **registry**, and **runtime**.

## Best practices (summary)

1. **Version → pattern → spec slice → XML → run demo → validate → document gaps.**  
2. **Small** retrievals, **repeated** validation.  
3. **Same** API + CI story as the rest of the **sapui5-llm-ready** program.  
4. **Demos** as **evidence** (`8085` / `8087` / `8088`), not as **decorations** in slides only.

---

## See also

- [`TURNING_POINT_MOMENTUM.md`](TURNING_POINT_MOMENTUM.md) — the **moment** work starts to **work**: what flips, **who does what** (you / agent / repo)  
- [`DEMOS_LOCALHOST_8087_8088.md`](DEMOS_LOCALHOST_8087_8088.md) — **8087 vs 8088:** approach, **issues → fixes**, **best path** to the final running demo  
- [`PROMPTING_MCP_AND_STATIC.md`](PROMPTING_MCP_AND_STATIC.md) — 4-step template, DO/DON’Ts, examples  
- [`LLM_HUMAN_PLAYBOOK.md`](LLM_HUMAN_PLAYBOOK.md) — full briefing  
- [`PLAYBOOK_INDEX.md`](PLAYBOOK_INDEX.md) — all topic files  
- `make playbook-presentation` — slide deck; Part 3b+ embeds skills + path + **image** slides for localhost demos

---

*Last updated: aligned with `sapui5-llm-ready` layout (ports, `make` targets, showcase/subscription/PO examples). Add your own **annotated** screenshots next to the tables above in org-internal copies if helpful.*
