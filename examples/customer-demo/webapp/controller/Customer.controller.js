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
        customerId: "",
        companyName: "",
        contactPerson: "",
        email: "",
        phone: "",
        country: "US",
        status: "active",
        vip: false,
        notes: ""
      };
    }

    return Controller.extend("custdemo.controller.Customer", {
      onInit: function () {
        this.getView().setModel(new JSONModel(initialModel()), "cust");
      },

      onSave: function () {
        var data = this.getView().getModel("cust").getData();
        if (!data.customerId || !data.companyName) {
          MessageBox.error("Customer ID and Company Name are required.");
          return;
        }
        MessageToast.show("Saved Customer: " + data.customerId + " - " + data.companyName);
      },

      onReset: function () {
        this.getView().getModel("cust").setData(initialModel());
        MessageToast.show("Form reset to initial values.");
      }
    });
  }
);
