sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel"
  ],
  function (Controller, MessageToast, MessageBox, JSONModel) {
    "use strict";

    function initialModel() {
      return {
        poNumber: "",
        supplier: "",
        docDate: "",
        currency: "EUR",
        amount: "",
        urgent: false,
        notes: ""
      };
    }

    return Controller.extend("podemo.controller.PurchaseOrder", {
      onInit: function () {
        this.getView().setModel(new JSONModel(initialModel()), "po");
      },

      onSave: function () {
        var data = this.getView().getModel("po").getData();
        if (!data.poNumber || !data.supplier) {
          MessageBox.error("PO Number and Supplier are required.");
          return;
        }
        MessageToast.show("Saved Purchase Order: " + data.poNumber);
      },

      onCancel: function () {
        this.getView().getModel("po").setData(initialModel());
      }
    });
  }
);

