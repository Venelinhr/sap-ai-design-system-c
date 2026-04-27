import json
from pathlib import Path

from sapui5_llm_ready.sapui5_extractor import extract_components_from_ui5_api_doc


def test_extracts_sample_api_doc() -> None:
    root = Path(__file__).resolve().parents[1]
    sample = json.loads((root / "data" / "fixtures" / "ui5_api_doc.sample.json").read_text())
    comps = extract_components_from_ui5_api_doc(sample)
    assert len(comps) == 1
    assert comps[0].id == "sap.m.Button"
    assert any(p.name == "text" for p in comps[0].props)

