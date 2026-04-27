# Worked examples: request → root cause → fix (subscription demo)

Abbreviated; **source of truth** is always the current XML in the repo.

---

## A) “Tables are squeezed / middle column empty / two columns of blocks”

- **Request (paraphrased):** Sub-section content not full width; table looks in half the card.  
- **Cause:** `ObjectPageSubSection` with **two** (or more) top-level `blocks` children → UxAP can lay them **side by side** in a grid.  
- **Fix:** A **single** `sap.m.VBox` `width="100%"` with **all** former blocks’ content as **siblings** inside it.  
- **Outcome:** One vertical stack, tables `width="100%"` behave as expected.

---

## B) “Contract row and actions on two lines / both blocks same left in geometry logs”

- **Request:** Header layout wrong; left/right not one row.  
- **Cause:** `HBox` **wrap** + insufficient horizontal room; or label/value in one column confusing Fiori form row.  
- **Fix:** `wrap="false"` on header `HBox`s; `justifyContent="SpaceBetween"`; `FlexItemData` on the contract row and actions row; `Label` + `VBox` (Title, Text) for values; `SearchField` not full width.  
- **Metric (debug):** `actions.left - formRow.right` positive; `sameRowPx` (vertical delta) small.

---

## C) “Progress area padding is wrong / long text on the bar”

- **Request:** Stage gate progress looks broken; line overlaps bar.  
- **Cause:** Long `approval/label` bound to `ProgressIndicator` `displayValue` — **value** row is **one** line in **compact** density.  
- **Fix:** `m:Text` with `{/approval/label}`; `displayValue` = percent only via `formatApprovalPercent` on `{/approval/percent}`; `MessageStrip` `type="Information"`.  
- **Metric (debug):** `gapTextToBar` = bar top minus text bottom ≥ 0 (e.g. 23 px in one run).

---

## D) “Content shifted right; double border on right; form stuck on the left with empty right side”

- **Request:** OPL body does not line up with titles; “stair step” on the right; Key figures form narrow.  
- **Cause (stacked):** `sapUiResponsiveMargin` on top of OPL insets; **nested** `sap.m.Panel` in `blocks` + OPL block chrome; `SimpleForm` with two XL columns and empty spans.  
- **Fix:** Remove extra responsive margin on block root; **VBox + Title** instead of **Panel** where one card is enough; `columnsXL="1"`, `emptySpanXL="0"`, `emptySpanL="0"`, `singleContainerFullSize="true"`, `width="100%"` on the form.  
- **Metric (debug, when present):** `dLeftSubtextMinusMsg` and `dLeftTblMinusMsg` near 0 when strip and table share one container.

---

## E) “Working capital is a long pill; text only on the left”

- **Request:** Balance section header looks like a full-width bar, not a normal heading.  
- **Cause:** Expandable `Panel` with `headerText` — that **is** a full-width **header** control.  
- **Fix:** `workCapBlock` = `VBox` + `m:Title` + `form:SimpleForm` `workCapForm` (no inner Panel for that heading).

---

## F) “Space between subsection titles and the chevron is uneven”

- **Request:** Is spacing correct?  
- **Cause (framework):** UxAP navigation/sticky row uses **row** layout, **max-width/ellipsis**; left and right **strings differ in length and truncation** — not **optical** centre.  
- **Fix (content):** Shorter, **paired** titles (e.g. `Line items (company view)` and `Ledger view (illustrative)`). **CSS** only with DevTools-proven selectors and a maintenance plan.

---

## G) `ERR_CONNECTION_REFUSED` on 8088

- **Request:** App does not load.  
- **Cause:** **No** HTTP server on the port.  
- **Fix:** From repo root: `make demo-subscription` and **keep the terminal** running.

---

## H) “Save the session in a skill”

- **Outcome:** This package under `~/.cursor/skills/sapui5-opl-subscription-demo/` with `SKILL.md` and `references/*`.
