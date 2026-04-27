from pathlib import Path

from sapui5_llm_ready.recipes import load_recipes_dir


def test_load_recipes_directory() -> None:
    root = Path(__file__).resolve().parents[1]
    recipes = load_recipes_dir(root / "recipes")
    ids = {r["id"] for r in recipes}
    assert "list-report" in ids
    assert "object-page" in ids
    assert "wizard-flow" in ids
    assert "dashboard-cards" in ids

