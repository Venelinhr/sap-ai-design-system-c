import json
from pathlib import Path

from sapui5_llm_ready.figma_signals import enrich_components_with_figma_signals, load_figma_signals
from sapui5_llm_ready.models import ComponentSpec


def test_enriches_fixture_component_with_figma_tags_and_tokens() -> None:
    root = Path(__file__).resolve().parents[1]
    signals = load_figma_signals(root / "data" / "figma" / "signals.yaml")

    raw = json.loads((root / "data" / "fixtures" / "registry.min.json").read_text(encoding="utf-8"))
    comps = [ComponentSpec.model_validate(c) for c in raw["components"]]

    enriched, patterns = enrich_components_with_figma_signals(comps, signals)
    b = next(c for c in enriched if c.id == "sap.m.Button")

    assert "primary-action" in b.intentTags
    assert "color.primary.bg" in b.tokens.semantic
    assert "patterns" in patterns

