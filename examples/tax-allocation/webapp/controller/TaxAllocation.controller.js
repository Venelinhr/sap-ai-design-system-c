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
        allocationId: "",
        taxpayerName: "",
        taxpayerType: "business",
        taxYear: "2026",
        totalAmount: 0,
        currency: "EUR",
        autoCalculate: true,
        allocations: [],
        totalAllocated: 0,
        totalTax: 0,
        status: "draft",
        notes: ""
      };
    }

    return Controller.extend("taxalloc.controller.TaxAllocation", {
      onInit: function () {
        this.getView().setModel(new JSONModel(initialModel()), "taxalloc");
      },

      // Taxpayer type change - update available categories
      onTaxTypeChange: function (oEvent) {
        var sType = oEvent.getParameter("selectedItem").getKey();
        MessageToast.show("Taxpayer type changed to: " + sType);
      },

      // Total amount change - recalculate if auto-calculate is on
      onTotalAmountChange: function (oEvent) {
        var bAutoCalculate = this.getView().getModel("taxalloc").getProperty("/autoCalculate");
        if (bAutoCalculate) {
          this.onCalculate();
        }
      },

      // Add new allocation row
      onAddAllocation: function () {
        var oModel = this.getView().getModel("taxalloc");
        var aAllocations = oModel.getProperty("/allocations");
        
        aAllocations.push({
          category: "income",
          description: "",
          amount: 0,
          percentage: 0,
          taxRate: 0,
          taxAmount: 0
        });
        
        oModel.setProperty("/allocations", aAllocations);
        MessageToast.show("Added new allocation row");
      },

      // Delete allocation row
      onDeleteAllocation: function (oEvent) {
        var oItem = oEvent.getParameter("listItem");
        var oContext = oItem.getBindingContext("taxalloc");
        var sPath = oContext.getPath();
        
        MessageBox.confirm("Delete this allocation?", {
          onClose: function (oAction) {
            if (oAction === MessageBox.Action.OK) {
              var oModel = this.getView().getModel("taxalloc");
              var aAllocations = oModel.getProperty("/allocations");
              var iIndex = parseInt(sPath.split("/")[2]);
              
              aAllocations.splice(iIndex, 1);
              oModel.setProperty("/allocations", aAllocations);
              this.onCalculate();
              MessageToast.show("Allocation deleted");
            }
          }.bind(this)
        });
      },

      // Allocation field change
      onAllocationChange: function (oEvent) {
        var bAutoCalculate = this.getView().getModel("taxalloc").getProperty("/autoCalculate");
        if (bAutoCalculate) {
          this.onCalculate();
        }
      },

      // Calculate all allocations
      onCalculate: function () {
        var oModel = this.getView().getModel("taxalloc");
        var aAllocations = oModel.getProperty("/allocations");
        var fTotalAmount = parseFloat(oModel.getProperty("/totalAmount")) || 0;
        var fTotalAllocated = 0;
        var fTotalTax = 0;
        var oValidationMessage = this.byId("validationMessage");

        // Calculate each allocation
        aAllocations.forEach(function (oAllocation) {
          var fAmount = parseFloat(oAllocation.amount) || 0;
          var fTaxRate = parseFloat(oAllocation.taxRate) || 0;
          
          // Calculate percentage
          oAllocation.percentage = fTotalAmount > 0 ? (fAmount / fTotalAmount) * 100 : 0;
          
          // Calculate tax amount
          oAllocation.taxAmount = fAmount * (fTaxRate / 100);
          
          fTotalAllocated += fAmount;
          fTotalTax += oAllocation.taxAmount;
        });

        // Update model
        oModel.setProperty("/allocations", aAllocations);
        oModel.setProperty("/totalAllocated", fTotalAllocated);
        oModel.setProperty("/totalTax", fTotalTax);

        // Validation: check if allocations equal total amount
        var fDifference = Math.abs(fTotalAmount - fTotalAllocated);
        if (fDifference > 0.01 && fTotalAmount > 0) {
          oValidationMessage.setText("Total allocations must equal total amount. Difference: €" + fDifference.toFixed(2));
          oValidationMessage.setVisible(true);
        } else {
          oValidationMessage.setVisible(false);
        }

        MessageToast.show("Calculations updated");
      },

      // Reset form
      onReset: function () {
        MessageBox.confirm("Reset all form data?", {
          onClose: function (oAction) {
            if (oAction === MessageBox.Action.OK) {
              this.getView().getModel("taxalloc").setData(initialModel());
              this.byId("validationMessage").setVisible(false);
              MessageToast.show("Form reset to initial values");
            }
          }.bind(this)
        });
      },

      // Save allocation
      onSave: function () {
        var oModel = this.getView().getModel("taxalloc");
        var oData = oModel.getData();
        var oValidationMessage = this.byId("validationMessage");

        // Validation: required fields
        if (!oData.taxpayerName) {
          MessageBox.error("Taxpayer Name is required.");
          return;
        }

        if (!oData.totalAmount || oData.totalAmount <= 0) {
          MessageBox.error("Total Amount must be greater than 0.");
          return;
        }

        if (oData.allocations.length === 0) {
          MessageBox.error("At least one allocation line item is required.");
          return;
        }

        // Validation: 100% allocation
        var fTotalAllocated = parseFloat(oData.totalAllocated) || 0;
        var fTotalAmount = parseFloat(oData.totalAmount) || 0;
        var fDifference = Math.abs(fTotalAmount - fTotalAllocated);
        
        if (fDifference > 0.01 && fTotalAmount > 0) {
          MessageBox.error("Total allocations must equal total amount. Current difference: €" + fDifference.toFixed(2));
          return;
        }

        // Update status
        oModel.setProperty("/status", "submitted");
        oValidationMessage.setVisible(false);

        MessageBox.success(
          "Tax allocation saved successfully!\n\n" +
          "Total Allocated: €" + fTotalAllocated.toFixed(2) + "\n" +
          "Total Tax: €" + oData.totalTax.toFixed(2) + "\n" +
          "Status: Submitted"
        );
      },

      // Formatter: Percentage
      formatPercentage: function (fAmount, fTotalAmount) {
        if (!fTotalAmount || fTotalAmount === 0) return "0.00%";
        var fPercentage = (parseFloat(fAmount) / parseFloat(fTotalAmount)) * 100;
        return fPercentage.toFixed(2) + "%";
      },

      // Formatter: Tax Amount
      formatTaxAmount: function (fAmount, fTaxRate) {
        var fTaxAmount = (parseFloat(fAmount) || 0) * ((parseFloat(fTaxRate) || 0) / 100);
        return "€" + fTaxAmount.toFixed(2);
      },

      // Formatter: Currency
      formatCurrency: function (fValue) {
        return "€" + (parseFloat(fValue) || 0).toFixed(2);
      },

      // Formatter: Allocation Status
      formatAllocationStatus: function (fTotalAllocated, fTotalAmount) {
        var fDifference = Math.abs((parseFloat(fTotalAmount) || 0) - (parseFloat(fTotalAllocated) || 0));
        if (fDifference <= 0.01) return "100% Allocated";
        var fPercentage = fTotalAmount > 0 ? ((fTotalAllocated / fTotalAmount) * 100).toFixed(2) : "0.00";
        return fPercentage + "% Allocated";
      },

      // Formatter: Allocation State
      formatAllocationState: function (fTotalAllocated, fTotalAmount) {
        var fDifference = Math.abs((parseFloat(fTotalAmount) || 0) - (parseFloat(fTotalAllocated) || 0));
        if (fDifference <= 0.01) return "Success";
        if (fTotalAllocated > fTotalAmount) return "Error";
        return "Warning";
      },

      // Formatter: Remaining Amount
      formatRemaining: function (fTotalAmount, fTotalAllocated) {
        var fRemaining = (parseFloat(fTotalAmount) || 0) - (parseFloat(fTotalAllocated) || 0);
        return "€" + fRemaining.toFixed(2);
      }
    });
  }
);
