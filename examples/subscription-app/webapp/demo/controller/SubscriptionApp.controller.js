sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/m/MessageBox",
  "sap/m/MessageToast"
], function (Controller, JSONModel, MessageBox, MessageToast) {
  "use strict";

  return Controller.extend("demo.controller.SubscriptionApp", {
    onInit: function () {
      var oData = {
        currentRole: "employee",
        subscriptions: [
          {
            name: "Slack",
            vendor: "Slack Inc",
            cost: "USD 12.50",
            annualCost: "USD 150.00",
            status: "Active",
            statusState: "Success",
            renewalDate: "2026-05-15"
          },
          {
            name: "Jira Cloud",
            vendor: "Atlassian",
            cost: "USD 50.00",
            annualCost: "USD 600.00",
            status: "Active",
            statusState: "Success",
            renewalDate: "2026-06-01"
          },
          {
            name: "GitHub Pro",
            vendor: "GitHub",
            cost: "USD 21.00",
            annualCost: "USD 252.00",
            status: "Active",
            statusState: "Success",
            renewalDate: "2026-07-10"
          },
          {
            name: "Figma",
            vendor: "Figma Inc",
            cost: "USD 30.00",
            annualCost: "USD 360.00",
            status: "Active",
            statusState: "Success",
            renewalDate: "2026-05-20"
          },
          {
            name: "Zoom Pro",
            vendor: "Zoom",
            cost: "USD 199.99",
            annualCost: "USD 2,399.88",
            status: "Active",
            statusState: "Success",
            renewalDate: "2026-12-31"
          }
        ],
        requests: [
          {
            requesterName: "John Smith",
            subscriptionName: "Notion",
            department: "Engineering",
            estimatedCost: "USD 10.00"
          },
          {
            requesterName: "Jane Doe",
            subscriptionName: "Asana",
            department: "Product",
            estimatedCost: "USD 30.00"
          },
          {
            requesterName: "Mike Johnson",
            subscriptionName: "Linear",
            department: "Engineering",
            estimatedCost: "USD 20.00"
          }
        ],
        vendors: [
          {
            name: "Slack Inc",
            contactEmail: "sales@slack.com",
            totalAnnualCost: "USD 150.00",
            renewalSchedule: "2026-05-15",
            renewalState: "Success"
          },
          {
            name: "Atlassian",
            contactEmail: "sales@atlassian.com",
            totalAnnualCost: "USD 600.00",
            renewalSchedule: "2026-06-01",
            renewalState: "Success"
          },
          {
            name: "GitHub",
            contactEmail: "support@github.com",
            totalAnnualCost: "USD 252.00",
            renewalSchedule: "2026-07-10",
            renewalState: "Warning"
          },
          {
            name: "Figma Inc",
            contactEmail: "sales@figma.com",
            totalAnnualCost: "USD 360.00",
            renewalSchedule: "2026-05-20",
            renewalState: "Success"
          },
          {
            name: "Zoom",
            contactEmail: "sales@zoom.com",
            totalAnnualCost: "USD 2,399.88",
            renewalSchedule: "2026-12-31",
            renewalState: "Success"
          }
        ]
      };

      var oModel = new JSONModel(oData);
      this.getView().setModel(oModel);
    },

    onRoleChange: function (oEvent) {
      var sSelectedRole = oEvent.getParameter("selectedItem").getKey();
      this.getView().getModel().setProperty("/currentRole", sSelectedRole);
      MessageToast.show("Switched to " + sSelectedRole + " role");
    },

    onApproveRequest: function () {
      MessageBox.confirm("Approve this subscription request?", {
        onClose: function (sAction) {
          if (sAction === MessageBox.Action.OK) {
            MessageToast.show("Subscription approved and activated!");
          }
        }
      });
    },

    onOpenRequestForm: function () {
      MessageToast.show("Opening request form...");
    }
  });
});
