from xml.etree import ElementTree as ET

from sapui5_llm_ready.po_generator import generate_purchase_order_form


def test_po_generation_outputs_xml_and_react() -> None:
    artifacts = generate_purchase_order_form()
    ET.fromstring(artifacts.xml_view)
    assert "<mvc:View" in artifacts.xml_view
    assert "export function PurchaseOrderForm" in artifacts.react_component
    assert "<form" in artifacts.react_component

