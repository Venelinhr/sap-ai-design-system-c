# Planning, hypotheses, and validation (templates)

## A) Planning (before first edit)

1. **State the symptom** in **observable** terms (e.g. “`gapTextToBar` negative (overlap)” or “right edge double border in screenshot,” not “looks bad”).  
2. **Scope:** which **view section** and **user flow** (scroll to which anchor). **Out of scope** for a tight fix: unrelated refactors, new features.  
3. **List 3–5 hypotheses** in plain language, each **testable** in one of: read API, read XML, DOM measure, or user screenshot.  
4. **Order of attack:** start with **structure** (OPL / blocks / flex) before **cosmetic** CSS; start with **data binding** to wrong aggregation before **workaround** `setTimeout`.  
5. **Risks:** theme upgrade changes classes; `!important` CSS is **last** resort.  
6. **Rollback plan:** e.g. revert the last commit, or revert the hypothesis-specific diff only.

## B) Instrumentation (when debug is required)

- **Log payload:** `location`, `message`, `hypothesisId`, `data` (numbers, not secrets/PII), `timestamp`, optional `runId` / `sessionId`.  
- **Clear log file** for that session (tool `delete_file` on the project log path if your workflow provides one) **before** the user re-runs.  
- **One `onAfterRendering` guard** (`_fooLogged = true`) so you do not flood the network.  
- **Remove** all instrumentation after **evidence** supports the fix and user confirms, unless they ask to keep a probe.

**Example metrics (this project):**
- Header: `gapFormToActions`, `sameRowPx`, `titleRightOfOrBelowLabel`.  
- Progress: `gapTextToBar` = `stgApprBar.top - stgApprSubtext.bottom` (should be ≥ 0 after fix).  
- OPL blocks: `dLeftSubtextMinusMsg`, `dLeftTblMinusMsg` near 0; `dLeftFormMinusKeyBlock` small positive = form inside block padding.

## C) Validation matrix (pre-ship)

| # | Check | How |
|---|--------|-----|
| 1 | **No debug `fetch`** in controller for production | `grep` / search `ingest` in `webapp` |
| 2 | **Browser** on **8088** with **hard refresh** | `make demo-subscription`, load app |
| 3 | **Key sections** visible | Plan/contract, approval, line items, balance — no obvious clip/overlap at desktop width |
| 4 | **Compact** | App uses `sapUiSizeCompact` on body or view; controls behave as in compact (PI value row) |
| 5 | **XML** well-formed | Editor / build if the repo has a validator; at minimum no duplicate ids |
| 6 | **Linter** on edited files | If available in the project |

## D) Guideline quick-check (Fiori-aligned, not a full design review)

- **Object page:** sections/subsections for grouping; blocks hold **content** — avoid **two** “card” borders for one block.  
- **Forms:** label/value **relationship** clear; **one** logical form — avoid 2 columns when one full-width group is intended.  
- **Density:** do not fix layout with **`setTimeout`** / arbitrary delays; use **layout**, **wrap**, **aggregations**.  
- **Message strip:** `type` matches semantics (`Information` for info).  
- **i18n:** for a real app, all user-facing strings from i18n; for this demo, English in XML is acceptable per project convention.

## E) “Done” definition

- User-visible issue **addressed** or **explained** (e.g. UxAP strip asymmetry) with the **minimal** code change.  
- No leftover **rejected** hypothesis code (reverted).  
- **Documented** in skill or commit message if the pattern is reusable.
