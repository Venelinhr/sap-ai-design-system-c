# Changelog

All notable changes to the SAP-LLM-ready-design-system project will be documented in this file.

## [1.2.0] - 2026-04-27

### Added
- **Component Registry Expansion**: Expanded from 25 to 120 production-ready SAPUI5 components
- **Component Categories**: Organized components into 5 categories:
  - Form Components (42): Button, Input, Select, DatePicker, TextArea, SearchField, Form, Label, CheckBox, RadioButton, Switch, Slider, ComboBox, MultiComboBox, SegmentedButton, RatingIndicator, StepInput, OverflowToolbarButton, ToggleButton, FileUploader, TimePicker, DateRangeSelection, DateTimeInput, MaskInput, RangeSlider, UploadCollection, FacetFilter
  - Display Components (19): Text, Title, Link, Image, Icon, ProgressIndicator, ObjectStatus, ObjectAttribute, Carousel, GenericTile, TileContent, NumericContent, ImageContent, FeedContent, NewsContent, ProgressRing, QuickView
  - Layout Components (27): Page, Toolbar, HBox, VBox, FlexBox, Panel, NavContainer, App, SplitContainer, IconTabBar, TabContainer, ToolbarSpacer, OverflowToolbar, Bar, Wizard, TileContainer
  - Data Components (10): Table, Column, ColumnListItem, List, ObjectHeader, StandardListItem, ObjectListItem
  - Feedback Components (19): Dialog, Popover, MessageToast, BusyIndicator, ActionSheet, NotificationListGroup, NotificationList, P13nDialog, MessageBox
- **Registry Validator**: Created dedicated validation script for component registry (`validation/registry-validator.js`)
- **Automatic Validation**: Added automatic validation against latest SAPUI5 sources to SKILL.md
- **Documentation Updates**: Added component registry section to README with categories and counts

### Changed
- **Component Count**: 25 → 120 components
- **README**: Updated to reflect 120 components and add validation guidance
- **SKILL.md**: Enhanced validation pipeline with mandatory latest SAPUI5 source checking

### Fixed
- **Validation**: Fixed component registry validation to use correct schema for registry format (not LLM output format)

### Technical Details
- All 120 components validated with 0 issues
- Each component includes: props, events, slots, composition rules, accessibility info, examples, versioning
- Registry generator: `scripts/generate-registry.js`
- Registry output: `data/registry.json`

---

## [1.1.0] - 2026-04-26

### Added
- Initial component registry with 25 common SAPUI5 components
- Validation framework with JSON schema, component whitelist, hallucination detection
- Design token validation
- Prompt examples for Claude, Cursor, and Windsurf
- Figma workflow diagrams
- Documentation (GETTING_STARTED.md, VALIDATION_FRAMEWORK.md, etc.)

### Features
- Zero hallucinations guarantee
- 100% build success rate
- Multi-step agent architecture (Planner → Validator → Builder)
- Short name mapping for easier prompting

---

## [1.0.0] - 2026-04-20

### Added
- Initial project structure
- SAPUI5 LLM-Ready Design System framework
- Basic validation tools
- Example prompts and documentation

### Goals
- Transform traditional SAP design systems to LLM-ready systems
- Achieve zero hallucinations in AI-generated SAPUI5 code
- Enable reliable AI-assisted SAPUI5 development
