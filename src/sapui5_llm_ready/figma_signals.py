from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
from typing import Any, Dict, List, Tuple

import yaml

from .models import ComponentSpec, CompositionSpec, SourceSpec, TokenSpec


@dataclass(frozen=True)
class FigmaSignals:
    schema_version: str
    source: SourceSpec
    tokens_semantic: Dict[str, str]
    component_intent_tags: Dict[str, List[str]]
    component_composition_notes: Dict[str, List[str]]
    patterns: Dict[str, Dict[str, Any]]


def load_figma_signals(path: Path) -> FigmaSignals:
    raw = yaml.safe_load(path.read_text(encoding="utf-8")) or {}
    schema_version = str(raw.get("schemaVersion", "1.0.0"))
    src = raw.get("source") or {}
    source = SourceSpec(system="figma", ref=str(src.get("ref", "figma:unknown")))

    tokens = raw.get("tokens") or {}
    semantic = tokens.get("semantic") or {}
    tokens_semantic: Dict[str, str] = {str(k): str(v) for k, v in semantic.items()}

    comps = raw.get("components") or {}
    component_intent_tags: Dict[str, List[str]] = {}
    component_composition_notes: Dict[str, List[str]] = {}
    for comp_id, payload in comps.items():
        if not isinstance(payload, dict):
            continue
        tags = payload.get("intentTags") or []
        if isinstance(tags, list):
            component_intent_tags[str(comp_id)] = [str(t) for t in tags if str(t).strip()]
        comp = payload.get("composition") or {}
        notes = comp.get("notes") or []
        if isinstance(notes, list):
            component_composition_notes[str(comp_id)] = [str(n) for n in notes if str(n).strip()]

    patterns = raw.get("patterns") or {}
    patterns_out: Dict[str, Dict[str, Any]] = {}
    if isinstance(patterns, dict):
        for pid, p in patterns.items():
            if isinstance(p, dict):
                patterns_out[str(pid)] = p

    return FigmaSignals(
        schema_version=schema_version,
        source=source,
        tokens_semantic=tokens_semantic,
        component_intent_tags=component_intent_tags,
        component_composition_notes=component_composition_notes,
        patterns=patterns_out,
    )


def enrich_components_with_figma_signals(
    components: List[ComponentSpec],
    signals: FigmaSignals,
) -> Tuple[List[ComponentSpec], Dict[str, Any]]:
    """
    Returns a new list of enriched ComponentSpec objects plus extracted pattern docs.

    Design intent:
    - Avoid 1:1 Figma component conversion.
    - Merge only the high-signal, stable inputs that improve LLM selection and consistency:
      - semantic tokens
      - intent tags
      - composition notes
    """

    by_id = {c.id: c for c in components}
    enriched: List[ComponentSpec] = []

    for comp_id, spec in by_id.items():
        intent_tags = list(spec.intentTags)
        for t in signals.component_intent_tags.get(comp_id, []):
            if t not in intent_tags:
                intent_tags.append(t)

        notes = list(spec.composition.notes)
        for n in signals.component_composition_notes.get(comp_id, []):
            if n not in notes:
                notes.append(n)

        merged_tokens = TokenSpec(
            semantic={**signals.tokens_semantic, **spec.tokens.semantic},
            componentOverrides=spec.tokens.componentOverrides,
        )

        enriched.append(
            spec.model_copy(
                update={
                    "source": SourceSpec(system="hybrid", ref=f"{spec.source.ref} + figma"),
                    "intentTags": intent_tags,
                    "composition": CompositionSpec(
                        allowedWith=spec.composition.allowedWith,
                        forbiddenWith=spec.composition.forbiddenWith,
                        notes=notes,
                    ),
                    "tokens": merged_tokens,
                }
            )
        )

    pattern_docs: Dict[str, Any] = {"source": signals.source.model_dump(mode="json"), "patterns": signals.patterns}
    return enriched, pattern_docs

