sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/m/MessageToast"
], function (Controller, JSONModel, MessageToast) {
  "use strict";

  return Controller.extend("cursor.demo.controller.ProductList", {
    onInit: function () {
      var oModel = new JSONModel({
        items: [
          { name: "Standard Laptop", price: "999.00 EUR", availability: "In Stock" },
          { name: "Wireless Mouse", price: "29.99 EUR", availability: "Low Stock" },
          { name: "USB-C Hub", price: "49.00 EUR", availability: "Out of Stock" }
        ]
      });
      this.getView().setModel(oModel, "product");
    },

    onAddToCart: function () {
      MessageToast.show("Added to cart");
    }
  });
});
