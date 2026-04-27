from sapui5_llm_ready.llm_eval import extract_code_blocks, validate_artifacts


def test_extract_code_blocks_and_validate() -> None:
    sample = """
```xml
<mvc:View xmlns:mvc="sap.ui.core.mvc" xmlns="sap.m" xmlns:form="sap.ui.layout.form"><Page title="PO"><content><form:SimpleForm /><Button text="Save" /></content></Page></mvc:View>
```
```tsx
export function PurchaseOrderForm(){ return <form />; }
```
"""
    artifacts = extract_code_blocks(sample)
    assert artifacts is not None
    result = validate_artifacts(artifacts)
    assert result["xmlParseable"] is True
    assert result["status"] == "pass"

