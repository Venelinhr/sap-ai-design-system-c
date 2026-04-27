sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/m/MessageToast"
], function (Controller, JSONModel, MessageToast) {
  "use strict";

  return Controller.extend("demo.controller.SubscriptionManage", {
    onInit: function () {
      this.getView().setModel(new JSONModel({
        customerName: "",
        planKey: "standard",
        search: "",
        autoRenew: true,
        items: [
          { service: "Cloud Platform", status: "Active", renewalDate: "2026-05-01", amount: "EUR 1,200.00" },
          { service: "Premium Support", status: "Trial", renewalDate: "2026-06-15", amount: "EUR 199.00" }
        ]
      }), "sub");
    },

    onSave: function () {
      MessageToast.show("Subscription saved");
    },

    onSearch: function (oEvent) {
      var sQuery = oEvent.getParameter("query");
      MessageToast.show(sQuery ? "Search: " + sQuery : "Search cleared");
    }
  });
});
