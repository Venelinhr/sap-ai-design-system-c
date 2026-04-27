from fastapi.testclient import TestClient

from sapui5_llm_ready.api import app


client = TestClient(app)


def test_health() -> None:
    r = client.get("/health")
    assert r.status_code == 200
    body = r.json()
    assert body["ok"] is True
    assert body["componentCount"] >= 1


def test_tool_search_components() -> None:
    r = client.post("/tools/searchComponents", json={"intent": "primary action", "constraints": {}})
    assert r.status_code == 200
    assert "results" in r.json()


def test_validate_ui_plan_detects_unknown_component() -> None:
    r = client.post(
        "/tools/validateUiPlan",
        json={"uiPlan": {"type": "unknown.Control", "children": [{"type": "sap.m.Button"}]}},
    )
    assert r.status_code == 200
    body = r.json()
    assert body["ok"] is False
    assert "unknown.Control" in body["missingComponentIds"]

