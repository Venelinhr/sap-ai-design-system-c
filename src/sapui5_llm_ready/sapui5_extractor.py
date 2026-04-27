from __future__ import annotations

from dataclasses import dataclass
from typing import Any, Dict, List, Optional

from .models import (
    A11ySpec,
    ComponentSpec,
    CompositionSpec,
    ConstraintSpec,
    EventParameterSpec,
    EventSpec,
    PropSpec,
    SlotSpec,
    SourceSpec,
    TokenSpec,
    TypeRef,
    VersioningSpec,
)


@dataclass(frozen=True)
class ExtractOptions:
    ui5_version: Optional[str] = None
    source_ref_prefix: str = "sapui5:"


def _infer_type_ref(ui5_type: Optional[str]) -> TypeRef:
    t = (ui5_type or "").strip()
    if t in {"string", "sap.ui.core.CSSSize"}:
        return TypeRef(kind="string", sapui5Type=t if t != "string" else None)
    if t in {"int", "float"}:
        return TypeRef(kind="number", sapui5Type=t)
    if t == "boolean":
        return TypeRef(kind="boolean")
    if t:
        return TypeRef(kind="sapui5-type", sapui5Type=t)
    return TypeRef(kind="any")


def _infer_category(component_id: str) -> str:
    # Heuristic; can be refined later using usage analytics or curated mapping.
    cid = component_id.lower()
    if any(k in cid for k in ["button", "input", "select", "checkbox", "radio", "switch", "slider"]):
        return "form"
    if any(k in cid for k in ["table", "list", "chart", "tree"]):
        return "data"
    if any(k in cid for k in ["dialog", "message", "toast", "busy", "popover"]):
        return "feedback"
    if any(k in cid for k in ["page", "panel", "layout", "grid", "flex", "form"]):
        return "layout"
    if any(k in cid for k in ["nav", "tab", "breadcrumb", "shell", "bar"]):
        return "navigation"
    return "other"


def extract_components_from_ui5_api_doc(
    ui5_api_doc: Dict[str, Any],
    *,
    options: Optional[ExtractOptions] = None,
) -> List[ComponentSpec]:
    """
    Converts a SAPUI5 API metadata document into ComponentSpec entries.

    Input format expectation:
    - `ui5_api_doc` contains a top-level `symbols` list (or similar) as exported by UI5 SDK tooling.

    This function is intentionally tolerant; missing fields become empty specs.
    """
    options = options or ExtractOptions()

    symbols = ui5_api_doc.get("symbols") or ui5_api_doc.get("symbolsRaw") or []
    out: List[ComponentSpec] = []

    for sym in symbols:
        kind = (sym.get("kind") or sym.get("type") or "").lower()
        # Keep only controls/classes that look like UI5 controls.
        if kind and kind not in {"class", "control"}:
            continue

        component_id = sym.get("name") or sym.get("id")
        if not isinstance(component_id, str) or not component_id:
            continue

        props: List[PropSpec] = []
        events: List[EventSpec] = []
        slots: List[SlotSpec] = []

        for p in sym.get("properties", []) or sym.get("propertiesPublic", []) or []:
            pname = p.get("name")
            if not pname:
                continue
            ptype = _infer_type_ref(p.get("type"))
            default = p.get("defaultValue")
            required = bool(p.get("required", False))
            constraints: List[ConstraintSpec] = []
            props.append(
                PropSpec(
                    name=str(pname),
                    type=ptype,
                    required=required,
                    default=default,
                    since=p.get("since"),
                    deprecatedSince=p.get("deprecatedSince"),
                    constraints=constraints,
                    description=p.get("description"),
                )
            )

        for e in sym.get("events", []) or []:
            ename = e.get("name")
            if not ename:
                continue
            params: List[EventParameterSpec] = []
            for param in e.get("parameters", []) or []:
                pn = param.get("name")
                if not pn:
                    continue
                params.append(
                    EventParameterSpec(
                        name=str(pn),
                        type=_infer_type_ref(param.get("type")),
                        description=param.get("description"),
                    )
                )
            events.append(
                EventSpec(
                    name=str(ename),
                    since=e.get("since"),
                    parameters=params,
                    description=e.get("description"),
                )
            )

        # Aggregations are the key UI5 composition/slot concept.
        for a in sym.get("aggregations", []) or []:
            aname = a.get("name")
            if not aname:
                continue
            cardinality = a.get("cardinality") or a.get("multiple")
            if isinstance(cardinality, str):
                card = cardinality
            elif cardinality is True:
                card = "0..n"
            elif cardinality is False:
                card = "0..1"
            else:
                card = "0..n" if a.get("multiple") else "0..1"

            allowed = []
            atype = a.get("type")
            if isinstance(atype, str) and atype:
                allowed = [atype]
            elif isinstance(atype, list):
                allowed = [t for t in atype if isinstance(t, str)]

            slots.append(
                SlotSpec(
                    name=str(aname),
                    cardinality=card if card in {"0..1", "1..1", "0..n", "1..n"} else "0..n",
                    allowed=allowed,
                    since=a.get("since"),
                    description=a.get("description"),
                )
            )

        spec = ComponentSpec(
            id=component_id,
            name=sym.get("basename") or component_id.split(".")[-1],
            source=SourceSpec(system="sapui5", ref=f"{options.source_ref_prefix}{component_id}"),
            category=_infer_category(component_id),
            status="deprecated" if sym.get("deprecated") else "stable",
            description=sym.get("description"),
            intentTags=[],
            props=props,
            events=events,
            slots=slots,
            composition=CompositionSpec(),
            tokens=TokenSpec(),
            a11y=A11ySpec(),
            examples=[],
            versioning=VersioningSpec(
                since=sym.get("since"),
                deprecatedSince=sym.get("deprecatedSince"),
                ui5Version=options.ui5_version,
            ),
        )
        out.append(spec)

    return out

