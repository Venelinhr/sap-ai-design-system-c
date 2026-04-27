from __future__ import annotations

import argparse
import json
from pathlib import Path
from typing import Any, Dict, List

import yaml


def read_json(path: Path) -> Dict[str, Any]:
    return json.loads(path.read_text(encoding="utf-8"))


def write_json(path: Path, data: Dict[str, Any]) -> None:
    path.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--registry", type=str, required=True)
    ap.add_argument("--seed", type=str, default="data/top_components_seed.yaml")
    ap.add_argument("--output", type=str, default=None)
    ap.add_argument("--manifest-output", type=str, default="data/top_components_manifest.json")
    args = ap.parse_args()

    registry_path = Path(args.registry)
    output_path = Path(args.output) if args.output else registry_path
    seed_path = Path(args.seed)

    registry = read_json(registry_path)
    seed_doc = yaml.safe_load(seed_path.read_text(encoding="utf-8")) or {}
    top_components: List[str] = [str(x) for x in seed_doc.get("topComponents", [])]

    components = registry.get("components", [])
    found: List[str] = []
    missing: List[str] = []
    for comp in components:
        cid = comp.get("id")
        if cid in top_components:
            found.append(cid)
            tags = comp.get("intentTags") or []
            if "tier-a" not in tags:
                tags.append("tier-a")
            comp["intentTags"] = tags

    for cid in top_components:
        if cid not in found:
            missing.append(cid)

    write_json(output_path, registry)
    write_json(
        Path(args.manifest_output),
        {
            "topComponentsRequested": top_components,
            "foundInRegistry": found,
            "missingInRegistry": missing,
            "coverage": 0 if not top_components else round(len(found) / len(top_components), 4),
        },
    )


if __name__ == "__main__":
    main()

