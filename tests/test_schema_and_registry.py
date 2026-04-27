from pathlib import Path

from sapui5_llm_ready.registry import load_component_schema, load_registry


def test_fixture_registry_validates_against_schema() -> None:
    root = Path(__file__).resolve().parents[1]
    schema_path = root / "schemas" / "component_spec.schema.json"
    registry_path = root / "data" / "fixtures" / "registry.min.json"

    validator = load_component_schema(schema_path)
    registry = load_registry(registry_path, schema_validator=validator)

    assert registry.schema_version == "1.0.0"
    assert "sap.m.Button" in registry.components

