from __future__ import annotations

import argparse
import json
from pathlib import Path

import httpx

from sapui5_llm_ready.sapui5_connector import download_first_available_api_doc
from sapui5_llm_ready.sapui5_extractor import ExtractOptions, extract_components_from_ui5_api_doc


def load_json(path: Path) -> dict:
    return json.loads(path.read_text(encoding="utf-8"))


def write_registry(path: Path, components: list[dict], *, schema_version: str = "1.0.0") -> None:
    out = {"generatedAt": "extract_sapui5", "schemaVersion": schema_version, "components": components}
    path.write_text(json.dumps(out, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument(
        "--input",
        type=str,
        help="Path to a UI5 API metadata JSON file (offline mode).",
    )
    ap.add_argument(
        "--url",
        type=str,
        help="Optional URL to download UI5 API metadata JSON.",
    )
    ap.add_argument("--ui5-version", type=str, default=None)
    ap.add_argument(
        "--live",
        action="store_true",
        help="Use built-in live SAPUI5 connector candidate endpoints.",
    )
    ap.add_argument(
        "--live-fallback-input",
        type=str,
        default=None,
        help="Fallback local API JSON path if live download fails.",
    )
    ap.add_argument(
        "--output",
        type=str,
        default=str(Path("data") / "registry.json"),
        help="Output registry JSON path.",
    )
    args = ap.parse_args()

    if not args.input and not args.url and not args.live:
        raise SystemExit("Provide --input path or --url or --live")

    if args.live:
        try:
            result = download_first_available_api_doc()
            api_doc = result.payload
            print(f"Using live SAPUI5 API endpoint: {result.url}")
        except Exception as exc:  # noqa: BLE001
            if not args.live_fallback_input:
                raise
            print(f"Live download failed, using fallback input: {exc}")
            api_doc = load_json(Path(args.live_fallback_input))
    elif args.url:
        with httpx.Client(timeout=60) as client:
            resp = client.get(args.url)
            resp.raise_for_status()
            api_doc = resp.json()
    else:
        api_doc = load_json(Path(args.input))

    comps = extract_components_from_ui5_api_doc(
        api_doc, options=ExtractOptions(ui5_version=args.ui5_version)
    )
    write_registry(Path(args.output), [c.model_dump(mode="json", exclude_none=True) for c in comps])


if __name__ == "__main__":
    main()

