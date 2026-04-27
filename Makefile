PYTHON ?= python3

.PHONY: install lint test build-registry seed-top20 validate-registry run-api validate-po validate-po-llm validate-sap-demo token-audit build-sap-po demo-ui5 demo-react demo-pitch demo-deck demo-showcase demo-subscription demo-playbook-site demo-up case-study-artifacts playbook-presentation playbook-images all

install:
	$(PYTHON) -m pip install -e ".[dev]"

lint:
	$(PYTHON) -m ruff check src tests scripts

test:
	$(PYTHON) -m pytest -q

build-registry:
	$(PYTHON) scripts/extract_sapui5.py --input data/fixtures/ui5_api_doc.sample.json --output data/registry.json
	$(PYTHON) scripts/apply_figma_signals.py --registry data/registry.json --signals data/figma/signals.yaml --out-registry data/registry.json --out-patterns data/patterns.json

seed-top20:
	$(PYTHON) scripts/seed_top_components.py --registry data/registry.json --seed data/top_components_seed.yaml --manifest-output data/top_components_manifest.json

validate-registry:
	$(PYTHON) scripts/validate_registry.py --registry data/registry.json --schema schemas/component_spec.schema.json

run-api:
	$(PYTHON) -m uvicorn sapui5_llm_ready.api:app --reload --port 8000

validate-po:
	$(PYTHON) scripts/validate_po_generation.py --out-dir generated

validate-po-llm:
	$(PYTHON) scripts/validate_po_generation_llm.py --out-dir generated

validate-sap-demo:
	$(PYTHON) scripts/validate_sap_purchase_order_demo.py --ui5-root examples/purchase-order/demo/ui5/webapp

# Closed token layer for static HTML (deck/pitch) — no raw hex outside llm-tokens.css
# See: https://hvpandya.com/llm-design-systems
token-audit:
	$(PYTHON) scripts/audit_static_visuals.py

build-sap-po: validate-sap-demo validate-po
	@echo "Build SAP Purchase Order complete."

demo-ui5:
	$(PYTHON) -m http.server 8085 --directory examples/purchase-order/demo/ui5/webapp

demo-react:
	$(PYTHON) -m http.server 8086 --directory examples/purchase-order/demo/react

demo-pitch:
	$(PYTHON) -m http.server 8084 --directory examples/purchase-order/demo/pitch

demo-deck:
	$(PYTHON) -m http.server 8083 --directory examples/purchase-order/demo/deck

demo-showcase:
	$(PYTHON) -m http.server 8087 --directory examples/enterprise-llm-showcase/webapp

demo-subscription:
	$(PYTHON) -m http.server 8088 --directory examples/subscription-billing/webapp

# Case-study hub: binds 127.0.0.1, auto-picks a free port from 8089, opens browser. PLAYBOOK_SITE_PORT=8090 make demo-playbook-site
demo-playbook-site:
	$(PYTHON) scripts/serve_playbook_case_study.py

demo-up:
	@echo "Start in separate terminals:"
	@echo "  make demo-deck  # case study + deck http://localhost:8083"
	@echo "  make demo-ui5   # http://localhost:8085"
	@echo "  make demo-react # http://localhost:8086"
	@echo "  make demo-pitch # http://localhost:8084"
	@echo "  make demo-showcase  # top-20 controls showcase http://localhost:8087"
	@echo "  make demo-subscription  # B2B subscription + billing cockpit http://localhost:8088"
	@echo "  make demo-playbook-site  # case-study hub (127.0.0.1, free port from 8089, opens browser)"

# Case study: PPTX + PDFs + handout (install extras: pip install -e ".[case-study]")
#  → docs/case_study/exports/SAP_Prompt_Case_Study.{pptx,pdf}
#  → docs/case_study/exports/SAP_Repository_Case_Study_Handout.{md,pdf}  (from root CASE_STUDY.md)
case-study-artifacts:
	$(PYTHON) scripts/build_case_study_deliverables.py

# Full deck: includes PNGs under docs/case_study/exports/images/ (regenerate: make playbook-images)
playbook-presentation:
	$(PYTHON) scripts/build_playbook_presentation.py

# Illustrative (Pillow) or best-effort Chrome headless of localhost 8087/8088; then rebuild deck
playbook-images:
	$(PYTHON) scripts/playbook_images.py placeholders
	@echo "For live browser shots: in two terminals run make demo-subscription and make demo-showcase, then: python3 scripts/playbook_images.py capture"

all: lint build-registry seed-top20 validate-registry test validate-po validate-sap-demo token-audit

