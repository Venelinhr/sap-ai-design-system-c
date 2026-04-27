sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel"
  ],
  function (Controller, MessageToast, MessageBox, JSONModel) {
    "use strict";

    return Controller.extend("demo.controller.PurchaseOrder", {
      onInit: function () {
        var oModel = new JSONModel({
          poNumber: "",
          supplier: "",
          docDate: "",
          currency: "EUR",
          amount: "",
          urgent: false,
          notes: ""
        });
        this.getView().setModel(oModel, "po");
      },

      onSave: function () {
        var oData = this.getView().getModel("po").getData();
        if (!oData.poNumber || !oData.supplier) {
          MessageBox.error("PO Number and Supplier are required.");
          return;
        }
        MessageToast.show("Purchase Order saved: " + oData.poNumber);
      },

      onCancel: function () {
        this.getView().getModel("po").setData({
          poNumber: "",
          supplier: "",
          docDate: "",
          currency: "EUR",
          amount: "",
          urgent: false,
          notes: ""
        });
      }
    });
  }
);

