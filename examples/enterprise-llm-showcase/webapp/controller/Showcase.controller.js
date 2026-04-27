sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
  ],
  function (Controller, JSONModel, MessageToast) {
    "use strict";

    return Controller.extend("showcase.controller.Showcase", {
      onInit: function () {
        this._oConfirm = sap.ui.xmlfragment(
          this.getView().getId(),
          "showcase.fragment.Confirm",
          this
        );
        this.getView().addDependent(this._oConfirm);
        this.getView().setModel(
          new JSONModel({
            reqId: "REQ-1042",
            title: "Publish LLM-readable design system",
            supplier: "Internal platform",
            docDate: "",
            currency: "EUR",
            catKey: "Schema",
            amount: "1200",
            urgent: true,
            ack: true
          }),
          "view"
        );
        this.getView().setModel(
          new JSONModel({
            items: [
              {
                product: "ComponentSpec JSON Schema",
                status: "Merged",
                st: "Active",
                state: "Success"
              },
              {
                product: "Figma signals (tokens + patterns)",
                status: "Open",
                st: "Pending",
                state: "Warning"
              },
              {
                product: "SAP demo validation",
                status: "Green",
                st: "OK",
                state: "Success"
              }
            ]
          }),
          "rows"
        );
      },

      onSave: function () {
        MessageToast.show("Saved draft (demo only)");
      },

      onSearch: function (oEvent) {
        var q = oEvent.getParameter("query");
        MessageToast.show("Search (demo): " + (q || ""));
      },

      onAddLine: function () {
        var o = this.getView().getModel("rows");
        var a = o.getProperty("/items");
        a.push({
          product: "New line item",
          status: "New",
          st: "Open",
          state: "Information"
        });
        o.setProperty("/items", a);
      },

      onOpenDialog: function () {
        if (this._oConfirm) {
          this._oConfirm.open();
        }
      },

      onCloseDialog: function () {
        if (this._oConfirm) {
          this._oConfirm.close();
        }
      }
    });
  }
);
