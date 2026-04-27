from __future__ import annotations

import argparse
import json
from pathlib import Path

from jsonschema import Draft202012Validator


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--registry", type=str, required=True)
    ap.add_argument("--schema", type=str, required=True)
    args = ap.parse_args()

    registry = json.loads(Path(args.registry).read_text(encoding="utf-8"))
    schema = json.loads(Path(args.schema).read_text(encoding="utf-8"))
    validator = Draft202012Validator(schema)

    components = registry.get("components", [])
    failures = []
    for i, comp in enumerate(components):
        errors = sorted(validator.iter_errors(comp), key=lambda e: e.path)
        for e in errors:
            failures.append(f"component[{i}] {comp.get('id')}: {list(e.path)} {e.message}")

    if failures:
        print("Registry validation failed:")
        for f in failures[:50]:
            print(f"- {f}")
        raise SystemExit(1)

    print(f"Registry valid. Components: {len(components)}")


if __name__ == "__main__":
    main()

