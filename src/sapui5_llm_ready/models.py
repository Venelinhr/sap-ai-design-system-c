from __future__ import annotations

from typing import Any, Dict, List, Literal, Optional

from pydantic import BaseModel, Field


SchemaVersion = Literal["1.0.0"]


class TypeRef(BaseModel):
    kind: Literal[
        "string", "number", "boolean", "enum", "object", "array", "sapui5-type", "any"
    ]
    enumValues: Optional[List[str]] = None
    sapui5Type: Optional[str] = None


class ConstraintSpec(BaseModel):
    kind: Literal["range", "regex", "oneOf", "not", "custom"]
    value: Optional[Any] = None


class PropSpec(BaseModel):
    name: str
    type: TypeRef
    required: bool
    default: Optional[Any] = None
    since: Optional[str] = None
    deprecatedSince: Optional[str] = None
    constraints: List[ConstraintSpec] = Field(default_factory=list)
    description: Optional[str] = None


class EventParameterSpec(BaseModel):
    name: str
    type: TypeRef
    description: Optional[str] = None


class EventSpec(BaseModel):
    name: str
    parameters: List[EventParameterSpec] = Field(default_factory=list)
    since: Optional[str] = None
    description: Optional[str] = None


class SlotSpec(BaseModel):
    name: str
    cardinality: Literal["0..1", "1..1", "0..n", "1..n"]
    allowed: List[str]
    since: Optional[str] = None
    description: Optional[str] = None


class CompositionSpec(BaseModel):
    allowedWith: List[str] = Field(default_factory=list)
    forbiddenWith: List[str] = Field(default_factory=list)
    notes: List[str] = Field(default_factory=list)


class TokenSpec(BaseModel):
    semantic: Dict[str, str] = Field(default_factory=dict)
    componentOverrides: Dict[str, str] = Field(default_factory=dict)


class A11ySpec(BaseModel):
    role: str = ""
    nameFrom: List[str] = Field(default_factory=list)
    keyboard: List[str] = Field(default_factory=list)
    notes: List[str] = Field(default_factory=list)


class ExampleSpec(BaseModel):
    id: str
    title: str
    kind: Literal["minimal", "enterprise", "anti-pattern"]
    uiPlan: Dict[str, Any] = Field(default_factory=dict)
    whenToUse: List[str] = Field(default_factory=list)
    whenNotToUse: List[str] = Field(default_factory=list)


class VersioningSpec(BaseModel):
    since: Optional[str] = None
    deprecatedSince: Optional[str] = None
    ui5Version: Optional[str] = None


class SourceSpec(BaseModel):
    system: Literal["sapui5", "figma", "hybrid"]
    ref: str


class ComponentSpec(BaseModel):
    schemaVersion: SchemaVersion = "1.0.0"
    id: str
    name: str
    source: SourceSpec
    category: Literal["form", "display", "navigation", "feedback", "layout", "data", "other"]
    status: Literal["stable", "experimental", "deprecated"]
    description: Optional[str] = None
    intentTags: List[str] = Field(default_factory=list)

    props: List[PropSpec] = Field(default_factory=list)
    events: List[EventSpec] = Field(default_factory=list)
    slots: List[SlotSpec] = Field(default_factory=list)
    composition: CompositionSpec = Field(default_factory=CompositionSpec)
    tokens: TokenSpec = Field(default_factory=TokenSpec)
    a11y: A11ySpec = Field(default_factory=A11ySpec)
    examples: List[ExampleSpec] = Field(default_factory=list)
    versioning: VersioningSpec = Field(default_factory=VersioningSpec)

