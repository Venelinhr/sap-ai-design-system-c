from __future__ import annotations

import argparse
import json
from pathlib import Path

from sapui5_llm_ready.artifact_validation import validate_react_tsx_compiles, validate_sapui5_xml_structure
from sapui5_llm_ready.po_generator import generate_purchase_order_form, generation_metadata_prompt


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--out-dir", type=str, default="generated")
    args = ap.parse_args()

    out_dir = Path(args.out_dir)
    out_dir.mkdir(parents=True, exist_ok=True)

    artifacts = generate_purchase_order_form()
    xml_path = out_dir / "purchase_order.view.xml"
    react_path = out_dir / "PurchaseOrderForm.tsx"
    report_path = out_dir / "po_validation_report.json"

    xml_path.write_text(artifacts.xml_view, encoding="utf-8")
    react_path.write_text(artifacts.react_component, encoding="utf-8")

    react_ok = "export function PurchaseOrderForm" in artifacts.react_component and "<form" in artifacts.react_component
    xml_report = validate_sapui5_xml_structure(artifacts.xml_view)
    ts_report = validate_react_tsx_compiles(artifacts.react_component)

    report = {
        "prompt": generation_metadata_prompt()["prompt"],
        "xmlPath": str(xml_path),
        "reactPath": str(react_path),
        "reactContainsComponentAndForm": react_ok,
        **xml_report,
        **ts_report,
    }
    report["status"] = "pass" if (
        react_ok
        and bool(report.get("xmlRootIsMvcView"))
        and bool(report.get("xmlHasRequiredNodes"))
        and bool(report.get("reactTypeScriptCompileOk"))
    ) else "fail"
    report_path.write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(report, indent=2))

    if report["status"] != "pass":
        raise SystemExit(1)


if __name__ == "__main__":
    main()

