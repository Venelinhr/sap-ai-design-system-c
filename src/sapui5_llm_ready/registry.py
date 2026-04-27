from __future__ import annotations

import json
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Optional

from jsonschema import Draft202012Validator

from .models import ComponentSpec


@dataclass(frozen=True)
class Registry:
    schema_version: str
    components: dict[str, ComponentSpec]
    generated_at: Optional[str] = None


def load_json(path: Path) -> Any:
    return json.loads(path.read_text(encoding="utf-8"))


def load_component_schema(schema_path: Path) -> Draft202012Validator:
    schema = load_json(schema_path)
    return Draft202012Validator(schema)


def load_registry(
    registry_path: Path,
    *,
    schema_validator: Optional[Draft202012Validator] = None,
) -> Registry:
    raw = load_json(registry_path)
    schema_version = raw.get("schemaVersion", "unknown")
    generated_at = raw.get("generatedAt")

    components: dict[str, ComponentSpec] = {}
    for comp in raw.get("components", []):
        if schema_validator is not None:
            errors = sorted(schema_validator.iter_errors(comp), key=lambda e: e.path)
            if errors:
                msg = "; ".join([f"{list(e.path)}: {e.message}" for e in errors[:5]])
                raise ValueError(f"Component {comp.get('id')} failed schema validation: {msg}")
        spec = ComponentSpec.model_validate(comp)
        components[spec.id] = spec

    return Registry(schema_version=schema_version, components=components, generated_at=generated_at)

