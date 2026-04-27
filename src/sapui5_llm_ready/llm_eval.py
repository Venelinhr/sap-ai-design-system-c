from __future__ import annotations

import json
import os
import re
from dataclasses import dataclass
from typing import Dict, Optional

from anthropic import Anthropic

from .artifact_validation import validate_react_tsx_compiles, validate_sapui5_xml_structure

XML_BLOCK_RE = re.compile(r"```xml\s*(.*?)```", re.DOTALL | re.IGNORECASE)
TSX_BLOCK_RE = re.compile(r"```(?:tsx|typescript)\s*(.*?)```", re.DOTALL | re.IGNORECASE)


@dataclass(frozen=True)
class LlmArtifacts:
    xml_view: str
    react_tsx: str
    raw_response: str


def extract_code_blocks(text: str) -> Optional[LlmArtifacts]:
    xml_match = XML_BLOCK_RE.search(text)
    tsx_match = TSX_BLOCK_RE.search(text)
    if not xml_match or not tsx_match:
        return None
    return LlmArtifacts(
        xml_view=xml_match.group(1).strip(),
        react_tsx=tsx_match.group(1).strip(),
        raw_response=text,
    )


def validate_artifacts(artifacts: LlmArtifacts) -> Dict[str, object]:
    react_ok = "export" in artifacts.react_tsx and "PurchaseOrder" in artifacts.react_tsx
    has_form = "<form" in artifacts.react_tsx
    xml_report = validate_sapui5_xml_structure(artifacts.xml_view)
    ts_report = validate_react_tsx_compiles(artifacts.react_tsx)

    out = {
        "reactHasExportAndPurchaseOrder": react_ok,
        "reactContainsForm": has_form,
        **xml_report,
        **ts_report,
    }
    out["status"] = "pass" if (
        react_ok
        and has_form
        and bool(out.get("xmlRootIsMvcView"))
        and bool(out.get("xmlHasRequiredNodes"))
        and bool(out.get("reactTypeScriptCompileOk"))
    ) else "fail"
    return out


def run_claude_generation(model: str = "claude-3-5-sonnet-latest") -> LlmArtifacts:
    api_key = os.getenv("ANTHROPIC_API_KEY")
    if not api_key:
        raise RuntimeError("ANTHROPIC_API_KEY is required for Claude evaluation.")

    prompt = (
        "Build a simple Purchase Order entry form.\n"
        "Return exactly two fenced code blocks:\n"
        "1) xml block with a SAPUI5 XML View\n"
        "2) tsx block with a React component\n"
        "No prose outside code blocks.\n"
        "Use fields: PO Number, Supplier, Document Date, Currency, Total Amount, Urgent.\n"
        "Include Save and Cancel actions.\n"
    )

    client = Anthropic(api_key=api_key)
    msg = client.messages.create(
        model=model,
        max_tokens=1800,
        temperature=0.1,
        messages=[{"role": "user", "content": prompt}],
    )

    parts = []
    for block in msg.content:
        txt = getattr(block, "text", None)
        if txt:
            parts.append(txt)
    content = "\n".join(parts).strip()

    artifacts = extract_code_blocks(content)
    if artifacts is None:
        raise RuntimeError("Claude output did not contain both XML and TSX code blocks.")
    return artifacts


def make_report(validation: Dict[str, object], model: str) -> Dict[str, object]:
    return {
        "model": model,
        "validation": validation,
    }


def report_json(report: Dict[str, object]) -> str:
    return json.dumps(report, indent=2)

