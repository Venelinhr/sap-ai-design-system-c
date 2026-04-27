# SAP Purchase Order demo — full instruction set

This document is the **authoritative, step-by-step** guide to rebuild, validate, and run the **Purchase Order (PO) entry** demo. Follow steps **in order**; each step is required for a correct result.

**References (official inputs you provided):**

- SAPUI5 / OpenUI5 API reference: [https://ui5.sap.com/#/api](https://ui5.sap.com/#/api)
- Figma Design Demo Kit: [https://www.figma.com/community/file/1494295794601744471](https://www.figma.com/community/file/1494295794601744471)
- OpenUI5 source: [https://github.com/UI5/openui5](https://github.com/UI5/openui5)
- OpenUI5 test-finder skill (QUnit / test URL discovery): [https://github.com/UI5/openui5/tree/master/.claude/skills/run-test](https://github.com/UI5/openui5/tree/master/.claude/skills/run-test)

---

## 0. Simple guide: why `http://localhost:8087` fails, and what to do

**In one sentence:** The URL `http://localhost:8087` is **not a public website**. It is **your own computer** talking to a small program that you must start and **leave running** in a terminal. If you skip that step, the browser correctly shows *connection refused* / *site can’t be reached*.

### 0.1 For business / non-technical readers

| What you are looking at | Plain explanation |
|---------------------------|-------------------|
| This repository | A **set of files + scripts** (design-system tooling for developers). It is not automatically “on the web.” |
| `localhost:8083`, `:8085`, `:8087`, etc. | **Local only** address: “my PC, this port number.” Nothing listens there until a developer runs the matching command. |
| The on-screen Fiori look | The demo loads **real SAPUI5** from **SAP’s CDN** (`https://ui5.sap.com/...` — see the demo’s `index.html`). **You need network access** to SAP’s servers for the UI to appear. The **layout and control names** must still follow the **SAPUI5 API** (see *Source of truth* below), not a screenshot alone. |

### 0.2 For developers: the **source of truth** for this repo (vs SAP product docs)

| Topic | **Authoritative for *this* project** | **Authoritative for SAP *product* behavior** |
|-------|----------------------------------------|-----------------------------------------------|
| **Which port & folder serve the 8087 demo** | **`Makefile`**, target `demo-showcase` (currently: `python3 -m http.server 8087 --directory examples/enterprise-llm-showcase/webapp`) | *Not in SAP Help — we chose 8087.* |
| **Whether XML/views are structurally valid** | Repo scripts, e.g. `scripts/validate_sap_purchase_order_demo.py` (PO demo) | SAPUI5 framework behavior + [SAPUI5 API](https://ui5.sap.com/#/api) |
| **Control names, properties, aggregations** | Must match the **public API** | **[SAPUI5 API Reference](https://ui5.sap.com/#/api)** |
| **Where UI5 runtime is loaded in the 8087 demo** | `examples/enterprise-llm-showcase/webapp/index.html` (bootstrap `src` on `ui5.sap.com`, theme `sap_horizon`) | [OpenUI5 / UI5](https://ui5.sap.com) documentation and runtime |
| **Figma** | [Figma community file](https://www.figma.com/community/file/1494295794601744471) (see **§10** and the list at the top of this file) is a **visual design reference** | Does **not** override the SAPUI5 API for generated code |

### 0.3 When `http://localhost:8087` does not load — causes and fixes

| What you see | Most likely cause | **Step** → **result** (success) |
|--------------|-------------------|---------------------------------|
| **Connection refused** / can’t connect | No server on port **8087** | **1.** Open a terminal. **2.** `cd` to the folder that **contains** `Makefile` (repo root). **3.** Run `make demo-showcase`. **Result:** the terminal **does not return to a prompt**; it keeps running. **4.** Open [http://localhost:8087](http://localhost:8087) again. **Result:** the page loads (HTTP 200). |
| Blank white page, or stuck loading | **Network** to `ui5.sap.com` blocked or offline | **1.** In the browser, open **Developer Tools** → **Network**. **2.** Reload. **Result:** you see `sap-ui-core.js` (or similar) requested from `ui5.sap.com`. If that request is **red/blocked**, fix network / allowlist, or use your org’s **internal UI5 host** and change the bootstrap URL in `index.html` (advanced). |
| `make: *** No rule to make target 'demo-showcase'. Did you mean...` | Wrong directory (not repo root) | **1.** `cd` to the directory that has `Makefile`. **2.** `ls Makefile` → file exists. **3.** `make demo-showcase` again. **Result:** server starts. |
| `OSError: [Errno 48] Address already in use` (or similar) | Another process (maybe another `make demo-showcase`) already uses **8087** | **1.** Find and stop the other process, *or* **2.** Edit `Makefile` line `demo-showcase` to use another free port and open `http://localhost:THAT_PORT`. **Result:** one server, one port. |

**Exact server command (copy-paste) if you do not have `make`:**

```bash
cd /path/to/sapui5-llm-ready
python3 -m http.server 8087 --directory examples/enterprise-llm-showcase/webapp
```

This is the **same** command as the `make demo-showcase` target in `Makefile` (source of truth for this repo).

**How to know the server is really up (technical check):** in a **second** terminal, run:

```bash
curl -s -o /dev/null -w "%{http_code}\n" http://127.0.0.1:8087/
```

**Result:** you should see `200`. If you see `000` or connection errors, the server is not running on that port.

### 0.4 Step → result: quick smoke test of the 8087 screen

Run **only after** §0.3 server is up.

| Step | Action | **Success = you see / get** |
|------|--------|-----------------------------|
| A | Open [http://localhost:8087](http://localhost:8087) | A **Fiori Horizon**-style (light) full-page UI — **Object Page** style header, not a single clipped strip. |
| B | Press **F12** → **Console** | No red **uncaught** errors (warnings from CDN may appear depending on browser — focus on **errors**). |
| C | Click **Open review…** (header) | A **Dialog** opens. **Close** dismisses it. **Result:** no new red errors in Console. |
| D | In **Network**, confirm a request to `https://ui5.sap.com/...` | Status **200** (proves the app uses the official UI5 bootstrap from SAP’s site, as in `index.html`). |

### 0.5 Step → result: the Purchase Order demo (port **8085**) — same idea

| Step | Action | **Success** |
|------|--------|-------------|
| 1 | New terminal, repo root, run `make demo-ui5` | Terminal stays running; server listens on **8085** (see `Makefile` target `demo-ui5`). |
| 2 | Open [http://localhost:8085](http://localhost:8085) | **PO-style** form in **Fiori** full viewport. |

`make build-sap-po` is **not** required just to *open* 8085/8087 in a browser, but you **should** run it before you change demo files or before release (see §4).

---

## 1. What you are building (use cases)

1. **Stakeholder pitch** — Show a **real SAP Fiori-styled** PO form in the browser, built with **exact SAPUI5** XML namespaces and controls, with optional comparison to a non-SAP React artifact.
2. **LLM + design system proof** — Prove that a **schema + registry + validators** can drive consistent SAPUI5 generation and **fail closed** if XML is not framework-correct.
3. **Developer onboarding** — New teams run one numbered path to: install, validate, start demos, and open pitch URLs.

---

## 2. Prerequisites (before any command)

1. **Machine** — macOS, Linux, or Windows with `python3` and `make` available.
2. **Python** — Version **3.9+** (project supports 3.9+).
3. **Node.js + npm** — For TypeScript checks on generated React (`npx` downloads TypeScript on first run).
4. **Network** — For live SAPUI5 bootstrap from `https://ui5.sap.com/resources/sap-ui-core.js` in the **OpenUI5 demo** `index.html`. (Offline SAP CDN requires your own static mirror; not included here.)
5. **Optional: Claude / Anthropic** — Only if you run **LLM** validation (`make validate-po-llm`). Set `ANTHROPIC_API_KEY` in the environment.
6. **Browser** — Chrome or Edge recommended for Fiori theme rendering.

---

## 3. One-time: get the project

1. **Locate the repository** on your machine. Default path in this work: `~/sapui5-llm-ready`.
2. **Open a terminal** and `cd` into the project root:

   ```bash
   cd ~/sapui5-llm-ready
   ```

3. **Install Python dependencies (editable + dev):**

   ```bash
   python3 -m pip install -e ".[dev]"
   ```

4. **Confirm install:**

   ```bash
   python3 -c "import sapui5_llm_ready; print('ok')"
   ```

---

## 4. Golden rule: when someone says “Build SAP Purchase Order”

**Always run this exact target first** (validates strict SAPUI5 demo + generated PO contract):

```bash
make build-sap-po
```

This command:

1. Runs `validate_sap_purchase_order_demo.py` on `examples/purchase-order/demo/ui5/webapp` (bootstrap URL, `sap_horizon` theme, compact density, **exact** `form:SimpleForm` + namespaces).
2. Runs `make validate-po` (regenerates `generated/` XML + React and runs strict checks).

**Exit code must be 0** before you update the demo or show stakeholders.

**In Cursor** — use task **“Build SAP Purchase Order”** (from `.vscode/tasks.json`), which maps to the same `make build-sap-po`.

---

## 5. Full quality gate (CI-style)

Run the complete pipeline (lint, registry, tests, PO validation, SAP demo validation):

```bash
make all
```

**Expected:** ruff clean, tests pass, `validate-po` pass, `validate-sap-demo` pass.

---

## 6. Start the live demos (HTTP servers)

Use **separate terminals** (or Cursor **Run Task** in background), **after** `make build-sap-po` succeeds.

| Step | Command | Port | What it is |
|------|---------|------|------------|
| 1 | `make demo-deck` | **8083** | **Case study + scroll deck** (stakeholder narrative, links to API + Figma) |
| 2 | `make demo-ui5` | **8085** | **Primary SAPUI5/OpenUI5** PO app (`sap.m.App` + `Page`, Fiori Horizon) |
| 3 | `make demo-pitch` | **8084** | **Pitch** page (embed + fullscreen links) |
| 4 | `make demo-react` | **8086** | **Optional** React artifact (not SAPUI5) |
| 5 | `make demo-showcase` | **8087** | **Top-component seed** (`data/top_components_seed.yaml`) in one **Object Page** app |
| 6 | `make demo-subscription` | **8088** | **B2B subscription & billing** cockpit (approval gates, line items, balance, unsubscribe / re-subscribe) |

**URLs to open in the browser:**

- **Deck / case study (boardroom)**: [http://localhost:8083](http://localhost:8083)
- **SAPUI5 fullscreen (pixel-accurate layout)**: [http://localhost:8085](http://localhost:8085)
- **Enterprise LLM showcase (20 controls, `sap.uxap`)**: [http://localhost:8087](http://localhost:8087)
- **Subscription & billing (B2B Object Page)**: [http://localhost:8088](http://localhost:8088)
- Pitch (embed): [http://localhost:8084](http://localhost:8084)
- React only: [http://localhost:8086](http://localhost:8086)

**Print run instructions without starting servers:**

```bash
make demo-up
```

---

## 7. Viewport and layout (no cropping in fullscreen)

1. The OpenUI5 demo **must** use a proper shell: `sap.m.App` → `pages` → `sap.m.Page` (this is the standard full-height mobile/Fiori pattern; a bare `Page` as the only child of a raw `View` often **clips** in static `index.html` bootstraps).
2. The demo `index.html` pins `#content` with **`position: fixed; inset: 0`**, and sets `overflow: hidden` on the document so **scrolling happens inside** `Page` — not in a one-line-tall “strip” at the top.
3. The pitch page (8084) is still an **iframe**; for the **true fullscreen Fiori experience**, use [http://localhost:8085](http://localhost:8085) or the **stakeholder deck** at [http://localhost:8083](http://localhost:8083).

---

## 7.1 Team test protocol (everyone runs the same path)

**Goal:** no “it worked on my machine” — each teammate follows the same **order** and **assertions**.

1. **One-time** — `cd` to repo root, `python3 -m pip install -e ".[dev]"` (if not already).
2. **Golden build** — `make build-sap-po` → exit code **0** (do not skip).
3. **PO demo** — `make demo-ui5` in a dedicated terminal; open [http://localhost:8085](http://localhost:8085). Check: Fiori Horizon, compact density, form scrolls **inside** the page, no clipped one-line shell.
4. **Enterprise showcase** — `make demo-showcase` in **another** terminal; open [http://localhost:8087](http://localhost:8087). **If 8087 refuses to connect, read §0.3 first** (the server was not left running, wrong directory, or port in use). Check: object page header, SimpleForm, table with `ObjectStatus`, dialog opens from “Open review…” and closes without console errors.
5. **Case study deck** — `make demo-deck`; open [http://localhost:8083](http://localhost:8083). Skim all sections; confirm links to 8085/8087 work while those servers are up.
6. **Optional** — `make all` for full CI-style gate before you merge or present.

**Report** — if anything fails, capture: `make build-sap-po` output, browser console, and the exact port that refused connection.

---

## 8. Optional: LLM-generated PO (Claude)

1. **Set API key:**

   ```bash
   export ANTHROPIC_API_KEY=YOUR_KEY
   ```

2. **Run:**

   ```bash
   make validate-po-llm
   ```

3. **Inspect outputs** under `generated/`:
   - `purchase_order.llm.view.xml`
   - `PurchaseOrderForm.llm.tsx`
   - `po_llm_validation_report.json`

If the key is missing, the step fails by design (no silent pass).

---

## 9. Where the important files live

| Area | Path |
|------|------|
| SAPUI5 **live** demo (bootstrap + view + controller) | `examples/purchase-order/demo/ui5/webapp/` |
| **Enterprise** showcase (top-20 seed, Object Page) | `examples/enterprise-llm-showcase/webapp/` |
| **Subscription & billing** (B2B approval + line items + balance) | `examples/subscription-billing/webapp/` |
| Case study + deck (boardroom) | `examples/purchase-order/demo/deck/index.html` |
| Pitch page | `examples/purchase-order/demo/pitch/index.html` |
| Reference SAPUI5 view (same patterns) | `examples/purchase-order/sapui5/` |
| Registry / schema (LLM system) | `data/registry.json`, `schemas/component_spec.schema.json` |
| Golden SAP demo validator | `scripts/validate_sap_purchase_order_demo.py` |
| PO contract validator | `scripts/validate_po_generation.py` |

---

## 10. Tying in SAP API docs, Figma, and OpenUI5 tests

1. **SAPUI5 API** — Use [https://ui5.sap.com/#/api](https://ui5.sap.com/#/api) to verify **property names, aggregations, and namespaces** for every control in your XML (e.g. `sap.m.Page`, `sap.ui.layout.form.SimpleForm`, `sap.ui.core.Item`).
2. **Figma Design Demo Kit** — Use [Figma file](https://www.figma.com/community/file/1494295794601744471) for **spacing, label alignment, and density** expectations; map semantic tokens in `data/figma/signals.yaml` in the main project.
3. **OpenUI5 repo** — [https://github.com/UI5/openui5](https://github.com/UI5/openui5) is the **source of truth** for control behavior; align with their patterns when extending.
4. **QUnit / test URLs** — The [run-test](https://github.com/UI5/openui5/tree/master/.claude/skills/run-test) skill documents how to find QUnit URLs when you embed OpenUI5 in a real app and need automated UI tests. For *this* static demo, you rely on `make build-sap-po` instead of QUnit.

---

## 11. Troubleshooting (ordered checklist)

1. **Port already in use** — Stop other processes on 8083/8084/8085/8086/8087/8088 or change the `make demo-*` port in the `Makefile` locally.
2. **Blank or broken SAPUI5** — Check browser devtools: CDN blocked? Then host UI5 resources internally.
3. **`make build-sap-po` fails** — Read JSON stderr from the script output; fix XML namespaces in `view/PurchaseOrder.view.xml` first.
4. **Embedded pitch looks different than fullscreen** — **Expected**; iframes differ slightly; use port **8085** for pixel-accurate SAP layout.

---

## 12. Quick copy-paste: full demo from zero

```bash
cd ~/sapui5-llm-ready
python3 -m pip install -e ".[dev]"
make build-sap-po
make all
# Terminal 1 — case study + deck
make demo-deck
# Terminal 2 — SAPUI5 PO (fullscreen)
make demo-ui5
# Terminal 3 — top-20 enterprise showcase
make demo-showcase
# Optional — pitch with iframe
# Terminal 4: make demo-pitch
# Browser
open http://localhost:8083
open http://localhost:8085
open http://localhost:8087
```

**Done.** The numbered sequence above is the minimum correct path for a repeatable **SAP Purchase Order** demo and pitch.
