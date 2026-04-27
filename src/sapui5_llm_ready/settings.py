from __future__ import annotations

from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_prefix="SAPUI5_LLM_READY_", case_sensitive=False)

    registry_path: Path = Path("data/registry.json")
    fallback_registry_path: Path = Path("data/fixtures/registry.min.json")
    patterns_path: Path = Path("data/patterns.json")
    schema_path: Path = Path("schemas/component_spec.schema.json")

