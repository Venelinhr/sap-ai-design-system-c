from __future__ import annotations

import argparse
import json
from pathlib import Path

from sapui5_llm_ready.artifact_validation import validate_sapui5_xml_structure


def _require(text: str, expected: str, errors: list[str], label: str) -> None:
    if expected not in text:
        errors.append(f"Missing {label}: {expected}")


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument(
        "--ui5-root",
        type=str,
        default="examples/purchase-order/demo/ui5/webapp",
        help="Path to the UI5 demo webapp root.",
    )
    args = ap.parse_args()

    root = Path(args.ui5_root)
    index_path = root / "index.html"
    view_path = root / "view" / "PurchaseOrder.view.xml"
    controller_path = root / "controller" / "PurchaseOrder.controller.js"

    errors: list[str] = []

    if not index_path.exists() or not view_path.exists() or not controller_path.exists():
        raise SystemExit("UI5 demo files are missing.")

    index_text = index_path.read_text(encoding="utf-8")
    view_text = view_path.read_text(encoding="utf-8")
    controller_text = controller_path.read_text(encoding="utf-8")

    # Validate bootstrap/theme/content density conventions for SAP-style rendering.
    _require(index_text, "https://ui5.sap.com/resources/sap-ui-core.js", errors, "UI5 bootstrap")
    _require(index_text, 'data-sap-ui-theme="sap_horizon"', errors, "Horizon theme")
    _require(index_text, 'data-sap-ui-libs="sap.m,sap.ui.layout,sap.ui.core"', errors, "required libs")
    _require(index_text, 'class="sapUiBody sapUiSizeCompact"', errors, "content density class")

    # Validate view namespace exactness and required controls.
    xml_report = validate_sapui5_xml_structure(view_text)
    if not xml_report.get("xmlRootIsMvcView"):
        errors.append("Root is not exact sap.ui.core.mvc.View namespace.")
    if not xml_report.get("xmlHasRequiredNodes"):
        errors.append(f"Missing required SAPUI5 nodes: {xml_report.get('xmlMissingRequiredNodes')}")
    _require(view_text, 'xmlns:form="sap.ui.layout.form"', errors, "SimpleForm namespace")
    _require(view_text, "<form:SimpleForm", errors, "exact SimpleForm control")
    _require(view_text, "<core:Item", errors, "exact sap.ui.core.Item usage")
    _require(view_text, "<App", errors, "sap.m.App full-viewport shell")
    _require(view_text, "<pages>", errors, "App pages aggregation")

    # Validate controller imports are SAPUI5 modules.
    _require(controller_text, "sap/ui/core/mvc/Controller", errors, "Controller import")
    _require(controller_text, "sap/ui/model/json/JSONModel", errors, "JSONModel import")
    _require(controller_text, "sap/m/MessageToast", errors, "MessageToast import")

    report = {
        "ui5Root": str(root),
        "indexPath": str(index_path),
        "viewPath": str(view_path),
        "controllerPath": str(controller_path),
        "xmlValidation": xml_report,
        "errors": errors,
        "status": "pass" if not errors else "fail",
    }
    print(json.dumps(report, indent=2))

    if errors:
        raise SystemExit(1)


if __name__ == "__main__":
    main()

