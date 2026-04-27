from __future__ import annotations

from dataclasses import dataclass
from typing import Dict


@dataclass(frozen=True)
class GenerationArtifacts:
    xml_view: str
    react_component: str


def generate_purchase_order_form() -> GenerationArtifacts:
    """
    Deterministic PO form generator used for contract validation.
    The generated files are directly runnable skeletons.
    """
    xml_view = """<mvc:View
  xmlns:mvc="sap.ui.core.mvc"
  xmlns:core="sap.ui.core"
  xmlns:form="sap.ui.layout.form"
  xmlns="sap.m"
  controllerName="demo.controller.PurchaseOrder">
  <Page title="Purchase Order Entry">
    <content>
      <form:SimpleForm editable="true" layout="ResponsiveGridLayout">
        <Label text="PO Number" />
        <Input value="{po>/poNumber}" required="true" />
        <Label text="Supplier" />
        <Input value="{po>/supplier}" required="true" />
        <Label text="Document Date" />
        <DatePicker value="{po>/docDate}" displayFormat="yyyy-MM-dd" />
        <Label text="Currency" />
        <Select selectedKey="{po>/currency}">
          <items>
            <core:Item key="EUR" text="EUR" />
            <core:Item key="USD" text="USD" />
          </items>
        </Select>
        <Label text="Total Amount" />
        <Input value="{po>/amount}" type="Number" />
        <Label text="Urgent" />
        <Switch state="{po>/urgent}" />
      </form:SimpleForm>
      <Toolbar>
        <ToolbarSpacer />
        <Button text="Save" type="Emphasized" press=".onSave" />
        <Button text="Cancel" press=".onCancel" />
      </Toolbar>
    </content>
  </Page>
</mvc:View>
"""

    react_component = """import React, { useState } from "react";

type PurchaseOrder = {
  poNumber: string;
  supplier: string;
  docDate: string;
  currency: "EUR" | "USD";
  amount: string;
  urgent: boolean;
};

export function PurchaseOrderForm(): JSX.Element {
  const [po, setPo] = useState<PurchaseOrder>({
    poNumber: "",
    supplier: "",
    docDate: "",
    currency: "EUR",
    amount: "",
    urgent: false,
  });

  const setField = <K extends keyof PurchaseOrder>(key: K, value: PurchaseOrder[K]) =>
    setPo((prev) => ({ ...prev, [key]: value }));

  const onSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Saving PO", po);
  };

  return (
    <form onSubmit={onSave} aria-label="Purchase Order Entry Form">
      <h2>Purchase Order Entry</h2>
      <label>
        PO Number
        <input value={po.poNumber} onChange={(e) => setField("poNumber", e.target.value)} required />
      </label>
      <label>
        Supplier
        <input value={po.supplier} onChange={(e) => setField("supplier", e.target.value)} required />
      </label>
      <label>
        Document Date
        <input type="date" value={po.docDate} onChange={(e) => setField("docDate", e.target.value)} />
      </label>
      <label>
        Currency
        <select value={po.currency} onChange={(e) => setField("currency", e.target.value as "EUR" | "USD")}>
          <option value="EUR">EUR</option>
          <option value="USD">USD</option>
        </select>
      </label>
      <label>
        Total Amount
        <input type="number" value={po.amount} onChange={(e) => setField("amount", e.target.value)} />
      </label>
      <label>
        Urgent
        <input type="checkbox" checked={po.urgent} onChange={(e) => setField("urgent", e.target.checked)} />
      </label>
      <div>
        <button type="submit">Save</button>
        <button type="button">Cancel</button>
      </div>
    </form>
  );
}
"""
    return GenerationArtifacts(xml_view=xml_view, react_component=react_component)


def generation_metadata_prompt() -> Dict[str, str]:
    return {
        "prompt": "Build a simple Purchase Order entry form with SAPUI5 XML View and React component.",
        "strategy": "retrieval-constrained generation",
    }

