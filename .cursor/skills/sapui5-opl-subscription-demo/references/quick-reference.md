# Quick reference: decision path (1 page)

```
START: Symptom in subscription-billing / OPL demo (8088)
  |
  +-- Cannot load page? --> Run `make demo-subscription` (repo root) + hard refresh
  |
  +-- Table / content half-width or "two columns" in one sub-section?
  |       --> ONE VBox in blocks, all content inside. Check useIconTabBar.
  |
  +-- Header contract + tools not on one line?
  |       --> HBox wrap=false, SpaceBetween, FlexItemData, Label+VBox, narrow SearchField
  |
  +-- Long sentence overlapping progress bar / "padding" on PI?
  |       --> Long text: m:Text. displayValue: percent + formatter. MessageStrip: Information
  |
  +-- Body more indented than title / double right edge / form narrow left with empty right?
  |       --> Remove sapUiResponsiveMargin on block. Drop nested Panel -> VBox+Title.
  |       --> SimpleForm: 1 col XL, emptySpan 0, singleContainerFullSize true, width 100%
  |
  +-- "Working capital" full-width bar header look?
  |       --> workCapBlock: VBox + Title + workCapForm (no Panel for that)
  |
  +-- Sub-section anchor strip looks "uneven" next to chevron?
  |       --> Explain UxAP: not optical centre. Pair shorter subsection titles. CSS last.
  |
  +-- Still stuck? 
          --> Read API for exact control. Measure DOM. One hypothesis. Minimal diff.
```

**Numbers to remember**
- **Port:** 8088 (`make demo-subscription`)
- **Theme:** `sap_horizon` (see `index.html`)
- **Density:** `sapUiSizeCompact` — affects `ProgressIndicator` value row
- **Debug metrics (if used):** `gapTextToBar` >= 0; left-edge deltas for strip vs table small

**Package home:** `~/.cursor/skills/sapui5-opl-subscription-demo/`
