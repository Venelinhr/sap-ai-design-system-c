# Purchase Order Entry Form Example

> **Full numbered rebuild + demo runbook** (all steps, ports, use cases, references):
> [DEMO-INSTRUCTIONS.md](DEMO-INSTRUCTIONS.md)

This folder contains a concrete implementation of the same PO form in two stacks:

- SAPUI5: `sapui5/PurchaseOrder.view.xml`, `sapui5/PurchaseOrder.controller.js`
- React: `react/PurchaseOrderForm.tsx`

## Form fields
- PO Number (required)
- Supplier (required)
- Document Date
- Currency (EUR, USD, GBP)
- Total Amount
- Urgent
- Notes

## SAPUI5 wiring notes
1. Place the view/controller in your UI5 app namespace.
2. Ensure `controllerName` in XML matches your app namespace.
3. Route or load `PurchaseOrder.view.xml` from your component/router.

## React wiring notes
1. Import `PurchaseOrderForm` into your app route/page.
2. Replace `alert/console.log` in `onSave` with your API call.

## Validate against this project rules
From repo root:

```bash
make validate-po
```

For Claude runtime generation validation:

```bash
export ANTHROPIC_API_KEY=YOUR_KEY
make validate-po-llm
```

## Run live demos
From repo root, run in two terminals:

```bash
make demo-ui5
```

```bash
make demo-react
```

Open in browser:
- OpenUI5 demo: [http://localhost:8085](http://localhost:8085)
- React demo: [http://localhost:8086](http://localhost:8086)

For pitch / all-in-one showcase:

```bash
make demo-pitch
```

Open:
- Pitch page: [http://localhost:8084](http://localhost:8084)
- (Embeds UI5 and React demos side-by-side)

## Golden command
When asked to **Build SAP Purchase Order**, run:

```bash
make build-sap-po
```

This enforces:
- exact SAPUI5 namespace/component validation for demo view + bootstrap
- deterministic PO artifact validation

