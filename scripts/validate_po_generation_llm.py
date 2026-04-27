from __future__ import annotations

import argparse
import json
from pathlib import Path

from sapui5_llm_ready.llm_eval import make_report, report_json, run_claude_generation, validate_artifacts


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--out-dir", type=str, default="generated")
    ap.add_argument("--model", type=str, default="claude-3-5-sonnet-latest")
    args = ap.parse_args()

    out_dir = Path(args.out_dir)
    out_dir.mkdir(parents=True, exist_ok=True)

    artifacts = run_claude_generation(model=args.model)
    validation = validate_artifacts(artifacts)
    report = make_report(validation, model=args.model)

    xml_path = out_dir / "purchase_order.llm.view.xml"
    tsx_path = out_dir / "PurchaseOrderForm.llm.tsx"
    raw_path = out_dir / "po_llm_raw_response.md"
    report_path = out_dir / "po_llm_validation_report.json"

    xml_path.write_text(artifacts.xml_view + "\n", encoding="utf-8")
    tsx_path.write_text(artifacts.react_tsx + "\n", encoding="utf-8")
    raw_path.write_text(artifacts.raw_response + "\n", encoding="utf-8")
    report_path.write_text(report_json(report) + "\n", encoding="utf-8")

    print(json.dumps({"reportPath": str(report_path), "status": validation["status"]}, indent=2))
    if validation["status"] != "pass":
        raise SystemExit(1)


if __name__ == "__main__":
    main()

