from __future__ import annotations

from pathlib import Path
from typing import Any, Dict, List

import yaml


REQUIRED_KEYS = [
    "id",
    "title",
    "description",
    "requiredComponents",
    "optionalComponents",
    "tokenBindings",
    "accessibilityChecklist",
    "uiSkeleton",
]


def load_recipe(path: Path) -> Dict[str, Any]:
    data = yaml.safe_load(path.read_text(encoding="utf-8"))
    if not isinstance(data, dict):
        raise ValueError(f"Invalid recipe format: {path}")
    missing = [k for k in REQUIRED_KEYS if k not in data]
    if missing:
        raise ValueError(f"Recipe {path.name} missing keys: {missing}")
    return data


def load_recipes_dir(path: Path) -> List[Dict[str, Any]]:
    out: List[Dict[str, Any]] = []
    for p in sorted(path.glob("*.yaml")):
        out.append(load_recipe(p))
    return out

