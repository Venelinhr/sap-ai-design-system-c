from __future__ import annotations

import argparse
import json
from pathlib import Path

from sapui5_llm_ready.figma_signals import enrich_components_with_figma_signals, load_figma_signals
from sapui5_llm_ready.models import ComponentSpec


def load_registry(path: Path) -> dict:
    return json.loads(path.read_text(encoding="utf-8"))


def write_json(path: Path, obj: object) -> None:
    path.write_text(json.dumps(obj, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--registry", type=str, required=True, help="Path to registry.json")
    ap.add_argument("--signals", type=str, required=True, help="Path to figma signals.yaml")
    ap.add_argument("--out-registry", type=str, default=None, help="Path to enriched registry output")
    ap.add_argument("--out-patterns", type=str, default=None, help="Path to extracted patterns output")
    args = ap.parse_args()

    registry_path = Path(args.registry)
    raw = load_registry(registry_path)
    comps = [ComponentSpec.model_validate(c) for c in raw.get("components", [])]

    signals = load_figma_signals(Path(args.signals))
    enriched, patterns = enrich_components_with_figma_signals(comps, signals)

    out_registry = Path(args.out_registry) if args.out_registry else registry_path
    out_patterns = Path(args.out_patterns) if args.out_patterns else Path("data") / "patterns.json"

    write_json(
        out_registry,
        {
            "generatedAt": raw.get("generatedAt"),
            "schemaVersion": raw.get("schemaVersion"),
            "components": [c.model_dump(mode="json", exclude_none=True) for c in enriched],
        },
    )
    write_json(out_patterns, patterns)


if __name__ == "__main__":
    main()

