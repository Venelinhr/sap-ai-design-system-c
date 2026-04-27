from __future__ import annotations

import json
from pathlib import Path
from typing import Any, Dict, List, Optional

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

from .registry import load_component_schema, load_registry
from .settings import Settings


ROOT = Path(__file__).resolve().parents[2]
settings = Settings()
SCHEMA_PATH = ROOT / settings.schema_path
PRIMARY_REGISTRY = ROOT / settings.registry_path
FALLBACK_REGISTRY = ROOT / settings.fallback_registry_path
PATTERNS_PATH = ROOT / settings.patterns_path


app = FastAPI(title="SAPUI5 LLM-Ready Registry", version="0.1.0")

_schema_validator = load_component_schema(SCHEMA_PATH)
_registry = load_registry(
    PRIMARY_REGISTRY if PRIMARY_REGISTRY.exists() else FALLBACK_REGISTRY,
    schema_validator=_schema_validator,
)

if PATTERNS_PATH.exists():
    _patterns = json.loads(PATTERNS_PATH.read_text(encoding="utf-8"))
else:
    _patterns = {"patterns": {}}


class SearchRequest(BaseModel):
    intent: str = Field(..., description="Natural language intent, e.g. primary action, input field")
    constraints: Dict[str, Any] = Field(default_factory=dict)
    limit: int = 10


class ValidateUiPlanRequest(BaseModel):
    uiPlan: Dict[str, Any]


class SearchResponse(BaseModel):
    intent: str
    results: List[str]
    count: int


@app.get("/health")
def health() -> dict[str, Any]:
    return {
        "ok": True,
        "registrySchemaVersion": _registry.schema_version,
        "componentCount": len(_registry.components),
    }


@app.get("/components/{component_id}")
def get_component_spec(component_id: str) -> dict[str, Any]:
    spec = _registry.components.get(component_id)
    if spec is None:
        raise HTTPException(status_code=404, detail="Unknown component_id")
    return spec.model_dump(mode="json")


@app.get("/components/{component_id}/composition")
def get_composition_rules(component_id: str) -> dict[str, Any]:
    spec = _registry.components.get(component_id)
    if spec is None:
        raise HTTPException(status_code=404, detail="Unknown component_id")
    return spec.composition.model_dump(mode="json")


@app.get("/components/{component_id}/examples")
def get_examples(component_id: str, kind: Optional[str] = None) -> dict[str, Any]:
    spec = _registry.components.get(component_id)
    if spec is None:
        raise HTTPException(status_code=404, detail="Unknown component_id")
    examples = spec.examples
    if kind is not None:
        examples = [e for e in examples if e.kind == kind]
    return {"componentId": component_id, "examples": [e.model_dump(mode="json") for e in examples]}


@app.post("/search")
def search_components(req: SearchRequest) -> SearchResponse:
    intent = req.intent.lower().strip()
    hits: list[tuple[int, str]] = []
    for comp_id, spec in _registry.components.items():
        score = 0
        hay = " ".join([spec.name, spec.description or "", " ".join(spec.intentTags)]).lower()
        for token in intent.split():
            if token and token in hay:
                score += 1
        if score > 0:
            hits.append((score, comp_id))

    hits.sort(reverse=True)
    selected = [comp_id for _, comp_id in hits[: max(1, min(req.limit, 50))]]
    return SearchResponse(intent=req.intent, results=selected, count=len(selected))


@app.post("/validate-ui-plan")
def validate_ui_plan(req: ValidateUiPlanRequest) -> dict[str, Any]:
    """
    A minimal validator: checks that all referenced component IDs exist.
    This is intentionally strict and deterministic; richer rules are layered in governance tests.
    """

    missing: list[str] = []

    def walk(node: Any) -> None:
        if isinstance(node, dict):
            t = node.get("type")
            if isinstance(t, str) and t and t not in _registry.components:
                missing.append(t)
            for v in node.values():
                walk(v)
        elif isinstance(node, list):
            for item in node:
                walk(item)

    walk(req.uiPlan)
    return {"ok": len(missing) == 0, "missingComponentIds": sorted(set(missing))}


@app.get("/patterns")
def get_patterns() -> dict[str, Any]:
    return _patterns


@app.post("/tools/searchComponents")
def tool_search_components(req: SearchRequest) -> SearchResponse:
    return search_components(req)


@app.get("/tools/getComponentSpec/{component_id}")
def tool_get_component_spec(component_id: str) -> dict[str, Any]:
    return get_component_spec(component_id)


@app.get("/tools/getCompositionRules/{component_id}")
def tool_get_composition_rules(component_id: str) -> dict[str, Any]:
    return get_composition_rules(component_id)


@app.get("/tools/getExamples/{component_id}")
def tool_get_examples(component_id: str, context: Optional[str] = None) -> dict[str, Any]:
    # context reserved for future filtering behavior
    _ = context
    return get_examples(component_id)


@app.post("/tools/validateUiPlan")
def tool_validate_ui_plan(req: ValidateUiPlanRequest) -> dict[str, Any]:
    return validate_ui_plan(req)

