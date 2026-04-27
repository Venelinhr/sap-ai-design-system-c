# Guidelines checklist (before merge) — OPL + sap.m compact demo

Check **Y / N** or **N/A**. Use **Fiori** and **OpenUI5 API** as the primary design and technical **sources of truth**; this list is a **compliance** aid, not a substitute for official docs.

## Structure and information architecture

- [ ] `sections` / `subSections` / `blocks` are used as **intended** (grouping only in `title`; **not** as extra chrome without need).
- [ ] There is at most **one** **visual** “card” per block **unless** product design explicitly needs **Panel** in OPL (this demo **defaults** to **VBox + Title** to avoid **double** borders).
- [ ] `ObjectPageSubSection` has **one** `blocks` child that is a **container** (e.g. `VBox`) if multiple controls must stack — **not** two separate `blocks` for side-by-side layout you did not intend.

## Layout and flex

- [ ] **Header** contract/actions: **`wrap="false"`** where a **single** **row** is required; **`FlexItemData`** on children of `HBox` as needed; **`minWidth`/`SearchField` width** checked on narrow viewports.
- [ ] **No** arbitrary **`setTimeout` / `sleep`** to “fix” layout; use **layout** and **event** / **re-render** correctly.

## Forms (SimpleForm + ResponsiveGridLayout)

- [ ] For **one** **logical** **group** filling the block: `columnsXL="1"` (and L/M as appropriate), `emptySpan*` **0** where full width is intended, `singleContainerFullSize="true"`, `width="100%"` on the form if valid for your UI5 version.
- [ ] **Label** and **value** **relationships** are clear (Fiori form pattern: label + field).

## ProgressIndicator (compact)

- [ ] **Long** **status** text is **not** in `displayValue` — use **`m:Text`** (or `FormattedText` if needed) and keep **`displayValue`** to a **short** string (e.g. percent) + formatter.
- [ ] `showValue` / `percentValue` / `state` match the story you tell in the view.

## MessageStrip

- [ ] `type` matches the message (**Information** for informational copy, not `None` unless deliberate).

## Message / subsection titles (anchor strip)

- [ ] If **asymmetry** in the **stuck** **sub-section** **bar** is reported: **tried** **shorter, paired** `ObjectPageSubSection` **title** **strings** **before** **custom** **CSS** on UxAP internals.
- [ ] If **custom** **CSS** is used: it is **scoped** (e.g. under `#subOpl` or a view class) and **documented**; accept **maintenance** on theme upgrades.

## Internationalisation and copy

- [ ] For **production**: user-facing strings from **i18n** files. For **this** **demo** repo: English in XML is acceptable **only** if the **project** says so.
- [ ] **Subsection** `title` **lengths** are **intentional** (readability, anchor strip, not only SEO).

## Accessibility and quality

- [ ] New controls are **Fiori** / **UI5** where possible; custom markup does not **remove** **focus** or **contrast** without replacement.
- [ ] **No** **debug** `fetch` / `console` spam in **shipped** code (no **ingest** in controller for production).
- [ ] **Linter** / project quality gates (if any) run on **touched** files.

## Process (see also `planning-and-validation.md`)

- [ ] **Hypotheses** were **tested**; **rejected** hypothesis code was **reverted**, not **accumulated**.
- [ ] **Validation** gates V1–V4 (at minimum) from the main **SKILL** section **5** are satisfied or **N/A** with reason.

**Sign-off (optional in team):** name / date / commit.
