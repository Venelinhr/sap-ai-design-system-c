import React, { useState } from "react";

type Currency = "EUR" | "USD" | "GBP";

type PurchaseOrder = {
  poNumber: string;
  supplier: string;
  docDate: string;
  currency: Currency;
  amount: string;
  urgent: boolean;
  notes: string;
};

const initialState: PurchaseOrder = {
  poNumber: "",
  supplier: "",
  docDate: "",
  currency: "EUR",
  amount: "",
  urgent: false,
  notes: "",
};

export function PurchaseOrderForm(): JSX.Element {
  const [po, setPo] = useState<PurchaseOrder>(initialState);
  const [error, setError] = useState<string>("");

  const setField = <K extends keyof PurchaseOrder>(key: K, value: PurchaseOrder[K]) => {
    setPo((prev) => ({ ...prev, [key]: value }));
  };

  const onSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!po.poNumber || !po.supplier) {
      setError("PO Number and Supplier are required.");
      return;
    }
    setError("");
    // Replace this with API persistence.
    // eslint-disable-next-line no-console
    console.log("Saving Purchase Order", po);
    alert(`Purchase Order saved: ${po.poNumber}`);
  };

  const onCancel = () => {
    setPo(initialState);
    setError("");
  };

  return (
    <form onSubmit={onSave} aria-label="Purchase Order Entry Form">
      <h2>Purchase Order Entry</h2>
      {error ? <p role="alert">{error}</p> : null}

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
        <select value={po.currency} onChange={(e) => setField("currency", e.target.value as Currency)}>
          <option value="EUR">EUR</option>
          <option value="USD">USD</option>
          <option value="GBP">GBP</option>
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

      <label>
        Notes
        <textarea value={po.notes} onChange={(e) => setField("notes", e.target.value)} rows={3} />
      </label>

      <div>
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

