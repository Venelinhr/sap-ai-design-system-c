from pathlib import Path

from sapui5_llm_ready.recipes import load_recipes_dir


def test_no_recipe_references_deprecated_components() -> None:
    root = Path(__file__).resolve().parents[1]
    recipes = load_recipes_dir(root / "recipes")

    # This guard can be replaced with live registry checks in CI once full registry is available.
    deprecated_allowlist = set()
    for r in recipes:
        required = set(r.get("requiredComponents", []))
        assert required.isdisjoint(deprecated_allowlist)


def test_recipes_have_non_empty_accessibility_checklist() -> None:
    root = Path(__file__).resolve().parents[1]
    recipes = load_recipes_dir(root / "recipes")
    for r in recipes:
        items = r.get("accessibilityChecklist", [])
        assert isinstance(items, list)
        assert len(items) >= 2

