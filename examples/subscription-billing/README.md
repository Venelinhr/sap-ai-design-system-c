# Subscription & billing cockpit (B2B demo)

**Port:** `8088` — run from repo root: `make demo-subscription` → [http://localhost:8088](http://localhost:8088)

**What it is:** A Fiori **Object Page** with **icon tabs** for sections: plan & contract, **approval pipeline** (progress + table), **subscribed services** (full table), **balance & payment**. **Unsubscribe** / **Re-subscribe** are dialogs; state is in-memory only (no OData).

**Stack:** `sap.m` + `sap.uxap` + `sap.ui.layout.form` · `sap_horizon` · `ui5.sap.com` bootstrap.

## Guided flow (end-to-end)

1. **Scroll** the page (or use the **section icon tab bar** at the top) to move through *Plan* → *Approval* → *Services* → *Balance*.  
2. **Unsubscribe** (header) → **Submit cancellation** in the dialog.  
3. **Check:** header `ObjectStatus` = **Cancellation scheduled** (warning) + `MessageStrip` = **Warning** and updated copy.  
4. **Re-subscribe** (header) → **Confirm re-subscribe**.  
5. **Check:** `ObjectStatus` = **Active** (success), **ProgressIndicator** = **100%**, `MessageStrip` = **Success**, stages 3–4 **Completed**.  
6. **Reset demo** (toolbar) → baseline again (**75%**, original stages, `Information` strip).
