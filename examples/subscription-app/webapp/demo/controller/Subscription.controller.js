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
        horizontalLayoutMode: false,
        subscriber: {
          id: "",
          companyName: "",
          contactPerson: "",
          email: "",
          phone: "",
          address: "",
          vatId: "",
          customerType: "enterprise"
        },
        subscription: {
          plan: "professional",
          billingFrequency: "monthly",
          pricingModel: "fixed",
          startDate: "",
          endDate: "",
          autoRenew: true,
          freeTrial: false,
          trialDays: 30,
          seatCount: 10,
          usageQuota: 1000
        },
        billing: {
          currency: "EUR",
          taxRate: 20,
          taxExempt: false,
          invoiceFrequency: "monthly",
          paymentMethod: "creditcard",
          poNumber: "",
          billingContact: "",
          billingEmail: ""
        },
        payment: {
          cardNumber: "",
          cardExpiry: "",
          cardCvv: "",
          bankAccount: "",
          bankBic: "",
          paypalEmail: ""
        },
        pricing: {
          basePrice: 299,
          seatCost: 0,
          usageCost: 0,
          taxAmount: 59.80,
          totalCost: 358.80,
          billingCycle: "Monthly",
          nextBillingDate: ""
        },
        status: {
          current: "Draft",
          history: []
        }
      };
    }

    return Controller.extend("subdemo.controller.Subscription", {
      onInit: function () {
        this.getView().setModel(new JSONModel(initialModel()), "sub");
        this.calculatePricing();
      },

      onPlanChange: function (oEvent) {
        var sPlan = oEvent.getParameter("selectedItem").getKey();
        var oModel = this.getView().getModel("sub");

        var aPrices = {
          basic: 99,
          professional: 299,
          enterprise: 999,
          custom: 0
        };

        oModel.setProperty("/subscription/plan", sPlan);
        oModel.setProperty("/pricing/basePrice", aPrices[sPlan] || 0);
        this.calculatePricing();
        MessageToast.show("Plan changed to: " + sPlan);
      },

      onBillingChange: function (oEvent) {
        var sFrequency = oEvent.getParameter("selectedItem").getKey();
        var oModel = this.getView().getModel("sub");

        var aCycles = {
          monthly: "Monthly",
          quarterly: "Quarterly",
          annually: "Annually",
          custom: "Custom"
        };

        oModel.setProperty("/subscription/billingFrequency", sFrequency);
        oModel.setProperty("/pricing/billingCycle", aCycles[sFrequency]);
        this.calculatePricing();
        MessageToast.show("Billing frequency: " + sFrequency);
      },

      onPricingChange: function (oEvent) {
        var sModel = oEvent.getParameter("selectedItem").getKey();
        this.getView().getModel("sub").setProperty("/subscription/pricingModel", sModel);
        this.calculatePricing();
        MessageToast.show("Pricing model: " + sModel);
      },

      onDateChange: function (oEvent) {
        var oModel = this.getView().getModel("sub");
        var sStartDate = oModel.getProperty("/subscription/startDate");
        var sEndDate = oModel.getProperty("/subscription/endDate");

        if (sStartDate && sEndDate && new Date(sEndDate) <= new Date(sStartDate)) {
          MessageBox.error("End date must be after start date.");
          oModel.setProperty("/subscription/endDate", "");
          return;
        }

        this.calculateNextBillingDate();
      },

      onTrialChange: function (oEvent) {
        var bTrial = oEvent.getParameter("selected");
        this.getView().getModel("sub").setProperty("/subscription/freeTrial", bTrial);
        MessageToast.show("Free trial: " + (bTrial ? "Enabled" : "Disabled"));
      },

      onAutoRenewChange: function (oEvent) {
        var bAutoRenew = oEvent.getParameter("state");
        var oModel = this.getView().getModel("sub");
        var sMessage = bAutoRenew
          ? "Enable auto-renewal for this subscription?"
          : "Disable auto-renewal for this subscription?";

        MessageBox.confirm(sMessage, {
          onClose: function (oAction) {
            if (oAction === MessageBox.Action.OK) {
              oModel.setProperty("/subscription/autoRenew", bAutoRenew);
              MessageToast.show("Auto-renew: " + (bAutoRenew ? "Enabled" : "Disabled"));
            } else {
              oEvent.getSource().setState(!bAutoRenew);
              MessageToast.show("Auto-renew change cancelled");
            }
          }.bind(this)
        });
      },

      onSeatChange: function (oEvent) {
        var iSeats = parseInt(oEvent.getParameter("value")) || 0;
        var oModel = this.getView().getModel("sub");
        oModel.setProperty("/subscription/seatCount", iSeats);
        this.calculatePricing();
      },

      onUsageChange: function (oEvent) {
        var iQuota = parseInt(oEvent.getParameter("value")) || 0;
        var oModel = this.getView().getModel("sub");
        oModel.setProperty("/subscription/usageQuota", iQuota);
        this.calculatePricing();
      },

      onPlanSelect: function (oEvent) {
        var oItem = oEvent.getParameter("listItem");
        var aCells = oItem.getCells();
        var sPlan = aCells[0].getText();

        var oModel = this.getView().getModel("sub");
        oModel.setProperty("/subscription/plan", sPlan.toLowerCase());

        var aPrices = {
          basic: 99,
          professional: 299,
          enterprise: 999,
          custom: 0
        };

        oModel.setProperty("/pricing/basePrice", aPrices[sPlan.toLowerCase()] || 0);
        this.calculatePricing();
        MessageToast.show("Selected plan: " + sPlan);
      },

      onCurrencyChange: function (oEvent) {
        var sCurrency = oEvent.getParameter("selectedItem").getKey();
        this.getView().getModel("sub").setProperty("/billing/currency", sCurrency);
        this.calculatePricing();
        MessageToast.show("Currency: " + sCurrency);
      },

      onTaxChange: function (oEvent) {
        var fTaxRate = parseFloat(oEvent.getParameter("value")) || 0;
        this.getView().getModel("sub").setProperty("/billing/taxRate", fTaxRate);
        this.calculatePricing();
      },

      onTaxExemptChange: function (oEvent) {
        var bExempt = oEvent.getParameter("selected");
        this.getView().getModel("sub").setProperty("/billing/taxExempt", bExempt);
        this.calculatePricing();
      },

      onPaymentMethodChange: function (oEvent) {
        var sMethod = oEvent.getParameter("selectedItem").getKey();
        this.getView().getModel("sub").setProperty("/billing/paymentMethod", sMethod);
        MessageToast.show("Payment method: " + sMethod);
      },

      calculatePricing: function () {
        var oModel = this.getView().getModel("sub");
        var oData = oModel.getData();

        var fBasePrice = parseFloat(oData.pricing.basePrice) || 0;
        var iSeatCount = parseInt(oData.subscription.seatCount) || 0;
        var iUsageQuota = parseInt(oData.subscription.usageQuota) || 0;
        var fTaxRate = parseFloat(oData.billing.taxRate) || 0;
        var bTaxExempt = oData.billing.taxExempt;
        var sPricingModel = oData.subscription.pricingModel;
        var sBillingFrequency = oData.subscription.billingFrequency;

        var fSeatCost = 0;
        var fUsageCost = 0;

        if (sPricingModel === "per-seat" && iSeatCount > 0) {
          fSeatCost = iSeatCount * 20;
        }

        if (sPricingModel === "usage" && iUsageQuota > 0) {
          fUsageCost = iUsageQuota * 0.1;
        }

        var fMultiplier = 1;
        if (sBillingFrequency === "quarterly") {
          fMultiplier = 3;
        } else if (sBillingFrequency === "annually") {
          fMultiplier = 12;
        }

        var fSubtotal = (fBasePrice + fSeatCost + fUsageCost) * fMultiplier;
        var fTaxAmount = bTaxExempt ? 0 : (fSubtotal * (fTaxRate / 100));
        var fTotalCost = fSubtotal + fTaxAmount;

        oModel.setProperty("/pricing/seatCost", fSeatCost);
        oModel.setProperty("/pricing/usageCost", fUsageCost);
        oModel.setProperty("/pricing/taxAmount", fTaxAmount);
        oModel.setProperty("/pricing/totalCost", fTotalCost);

        this.calculateNextBillingDate();
      },

      calculateNextBillingDate: function () {
        var oModel = this.getView().getModel("sub");
        var sStartDate = oModel.getProperty("/subscription/startDate");
        var sBillingFrequency = oModel.getProperty("/subscription/billingFrequency");

        if (!sStartDate) {
          return;
        }

        var oStartDate = new Date(sStartDate);
        var oNextBilling = new Date(oStartDate);

        if (sBillingFrequency === "monthly") {
          oNextBilling.setMonth(oNextBilling.getMonth() + 1);
        } else if (sBillingFrequency === "quarterly") {
          oNextBilling.setMonth(oNextBilling.getMonth() + 3);
        } else if (sBillingFrequency === "annually") {
          oNextBilling.setFullYear(oNextBilling.getFullYear() + 1);
        }

        var sNextBillingDate = oNextBilling.toISOString().split('T')[0];
        oModel.setProperty("/pricing/nextBillingDate", sNextBillingDate);
      },

      onCalculate: function () {
        this.calculatePricing();
        MessageToast.show("Pricing calculated successfully");
      },

      onReset: function () {
        MessageBox.confirm("Reset all form data?", {
          onClose: function (oAction) {
            if (oAction === MessageBox.Action.OK) {
              this.getView().getModel("sub").setData(initialModel());
              this.byId("validationMessage").setVisible(false);
              this.calculatePricing();
              MessageToast.show("Form reset to initial values");
            }
          }.bind(this)
        });
      },

      onSave: function () {
        var oModel = this.getView().getModel("sub");
        var oData = oModel.getData();
        var oValidationMessage = this.byId("validationMessage");

        if (!oData.subscriber.companyName) {
          MessageBox.error("Company Name is required.");
          return;
        }

        if (!oData.subscriber.email) {
          MessageBox.error("Email is required.");
          return;
        }

        if (!oData.subscription.startDate) {
          MessageBox.error("Start Date is required.");
          return;
        }

        if (!oData.billing.billingEmail) {
          MessageBox.error("Billing Email is required.");
          return;
        }

        oModel.setProperty("/status/current", "Active");
        oValidationMessage.setVisible(false);

        MessageBox.success(
          "Subscription saved successfully!\n\n" +
          "Plan: " + oData.subscription.plan + "\n" +
          "Total Cost: " + this.formatCurrency(oData.pricing.totalCost) + "\n" +
          "Status: Active"
        );
      },

      formatCurrency: function (fValue) {
        var sCurrency = this.getView().getModel("sub").getProperty("/billing/currency") || "EUR";
        return sCurrency + " " + (parseFloat(fValue) || 0).toFixed(2);
      },

      formatInverted: function (bValue) {
        return !bValue;
      },

      onLayoutToggle: function (oEvent) {
        var bHorizontalLayout = oEvent.getParameter("state");
        this.getView().getModel("sub").setProperty("/horizontalLayoutMode", bHorizontalLayout);
        MessageToast.show("Layout mode: " + (bHorizontalLayout ? "Horizontal" : "Vertical"));
      }
    });
  }
);
