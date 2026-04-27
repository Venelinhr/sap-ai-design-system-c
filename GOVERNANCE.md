# Governance & Quality Gates

## Objectives
- Keep component registry aligned with SAPUI5 API changes.
- Keep design semantics aligned with Figma tokens/patterns.
- Prevent LLM hallucination by enforcing deterministic contracts.

## Update Workflow
1. Update SAPUI5 input metadata (download or fixture).
2. Run registry build:

```bash
make build-registry
```

3. Validate schema contract:

```bash
make validate-registry
```

4. Run tests + lint:

```bash
make all
```

5. Review diffs in:
- `data/registry.json`
- `data/patterns.json`
- `recipes/*.yaml`

## Quality Gates
- **Gate 1: Schema validity**: every component must pass `ComponentSpec` schema.
- **Gate 2: API contract stability**: endpoints in `tests/test_api_contract.py` must pass.
- **Gate 3: Recipe integrity**: recipes must satisfy required fields and a11y checklist.
- **Gate 4: Deterministic validation**: `validateUiPlan` must reject unknown component IDs.
- **Gate 5: LLM runtime validation**: `make validate-po-llm` must produce parseable XML and valid React form scaffold.
- **Gate 6: Strict artifact checks**:
  - XML root must be `mvc:View` and include `Page`, `SimpleForm`, and `Button`.
  - React artifact must successfully pass TypeScript compile (`tsc --noEmit`) in validator.
- **Gate 7: Static visual token audit (deck / pitch)**: `make token-audit` must pass — no hardcoded hex (or unscoped px in CSS) outside `examples/purchase-order/demo/_shared/llm-tokens.css`. Rationale: [Pandya — LLM design systems](https://hvpandya.com/llm-design-systems) “closed token layer + audit”; see `docs/COMPARISON_PANDYA.md`.

## Drift Management
- **Code drift** (SAPUI5 changes): regenerate registry on each UI5 version upgrade.
- **Design drift** (Figma changes): update `data/figma/signals.yaml` and rerun build/tests.
- **Prompt drift**: evolve `recipes/prompt-template.md` with versioned notes.

## Ownership Model
- **Design System Team**: maintains `signals.yaml`, token semantics, recipe UX quality.
- **Frontend Platform Team**: maintains extractor, schema, API contracts, CI gates.
- **AI Enablement Team**: maintains prompt template, integration with agent tools/MCP.

## OpenUI5 Testing Note
The OpenUI5 `run-test` skill in [UI5/openui5](https://github.com/UI5/openui5/tree/master/.claude/skills/run-test) is useful as a reference for:
- deterministic test URL discovery
- explicit handling of server-absent/test-not-found conditions
- structured, machine-readable test outputs

This project mirrors that philosophy by using deterministic scripts + explicit pass/fail reports.

