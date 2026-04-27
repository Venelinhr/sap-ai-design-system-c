from sapui5_llm_ready.artifact_validation import (
    validate_react_tsx_compiles,
    validate_sapui5_xml_structure,
)


def test_validate_sapui5_xml_structure() -> None:
    xml = """
<mvc:View xmlns:mvc="sap.ui.core.mvc" xmlns="sap.m" xmlns:form="sap.ui.layout.form">
  <Page><content><form:SimpleForm /><Button text="Save" /></content></Page>
</mvc:View>
"""
    result = validate_sapui5_xml_structure(xml)
    assert result["xmlParseable"] is True
    assert result["xmlRootIsMvcView"] is True
    assert result["xmlHasRequiredNodes"] is True


def test_validate_react_tsx_compiles() -> None:
    tsx = "export function PurchaseOrderForm(){ return <form><input /></form>; }"
    result = validate_react_tsx_compiles(tsx)
    assert result["reactTypeScriptCompileOk"] is True

