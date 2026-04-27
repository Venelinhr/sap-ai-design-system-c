sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
  ],
  function (Controller, JSONModel, MessageToast) {
    "use strict";

    var deep = function (o) {
      return JSON.parse(JSON.stringify(o));
    };

    var BASE = {
      company: "Contoso Chemicals Europe B.V.",
      companyId: "CUST-7F2A-991",
      planName: "SAP Private Cloud + Industry Suite",
      planCode: "PLN-ENT-HANA-2026",
      contractId: "SC-2026-8842-PQ",
      quoteRef: "SAP Price Quote: PQ-2026-120044",
      subscriptionState: "Active",
      subscriptionStateS: "Success",
      messageStripType: "Information",
      lifecycleNote:
        "Scroll sections below → use Unsubscribe / Re-subscribe, then Reset demo to return to this baseline. No backend; client-only mock.",
      balance: {
        currency: "EUR",
        prepaid: 12840.0,
        unbilled: 4120.55,
        openInv: 0,
        creditNotes: 350.0,
        nextInvoiceDate: "2026-05-01",
        nextInvoiceMin: 8900.0,
        method: "SEPA direct debit (•••• 1824)",
        billingAccount: "BA-EU-AMS-01",
        taxId: "NL8555.19.B01"
      },
      plan: {
        start: "2025-12-15",
        renewal: "2026-12-15",
        seats: 480,
        mrr: 74800.0,
        annualCommit: 897600.0
      },
      approval: {
        percent: 75,
        currentStage: "IT security & license compliance",
        label: "3 of 4 stages cleared — awaiting final activation gate"
      },
      stages: [
        {
          order: 1,
          name: "Commercial approval",
          state: "Success",
          status: "Completed",
          when: "2026-04-14",
          who: "Elena Vogel · Sales Ops"
        },
        {
          order: 2,
          name: "Cost object & PO validation",
          state: "Success",
          status: "Completed",
          when: "2026-04-16",
          who: "Controlling – CC 4400 / PO 9xxxxx"
        },
        {
          order: 3,
          name: "IT security & license compliance",
          state: "Information",
          status: "In review",
          when: "In queue",
          who: "Global Security (SLA 5d)"
        },
        {
          order: 4,
          name: "Service activation (SAP enablement)",
          state: "None",
          status: "Waiting",
          when: "—",
          who: "—"
        }
      ],
      lineItems: [
        {
          product: "S/4HANA Cloud, private ed. (prod tenant)",
          sku: "3000284",
          cycle: "Annual prepay + true-up",
          price: 428000.0,
          next: "2026-05-01",
          liState: "Success",
          liText: "Active",
          tax: "NL ICP 0%"
        },
        {
          product: "SAP Build Process Automation (450 builders)",
          sku: "BPA-BLD-01",
          cycle: "Monthly",
          price: 12400.0,
          next: "2026-05-01",
          liState: "Success",
          liText: "Active",
          tax: "NL ICP 0%"
        },
        {
          product: "Integration Suite – enterprise messaging",
          sku: "IS-ENT-01",
          cycle: "Monthly",
          price: 6100.0,
          next: "2026-05-01",
          liState: "Warning",
          liText: "True-up review",
          tax: "NL ICP 0%"
        },
        {
          product: "SAP Datasphere (200 capacity units · DR)",
          sku: "DS-CU-DR",
          cycle: "Annual",
          price: 98000.0,
          next: "2026-12-10",
          liState: "Success",
          liText: "Active",
          tax: "NL ICP 0%"
        },
        {
          product: "Sustainability footprint hub (optional add-on trial)",
          sku: "SF-TR-90",
          cycle: "Trial",
          price: 0.0,
          next: "2026-07-15",
          liState: "Information",
          liText: "Trial",
          tax: "—"
        }
      ],
      unsub: { reason: "COST", effective: "", noticeDays: 90 },
      resub: { selectedPlan: "same" }
    };

    return Controller.extend("subbilling.controller.Subscription", {
      onInit: function () {
        this._oUnsub = sap.ui.xmlfragment(
          this.getView().getId(),
          "subbilling.fragment.UnsubscribeDialog",
          this
        );
        this._oResub = sap.ui.xmlfragment(
          this.getView().getId(),
          "subbilling.fragment.ResubscribeDialog",
          this
        );
        this.getView().addDependent(this._oUnsub);
        this.getView().addDependent(this._oResub);
        this.getView().setModel(new JSONModel(deep(BASE)));
      },

      formatApprovalPercent: function (n) {
        if (n === null || n === undefined) {
          return "";
        }
        return n + "%";
      },

      onRefresh: function () {
        MessageToast.show("Refreshed balances from mock billing (demo)");
      },

      onOpenUnsub: function () {
        this._oUnsub.open();
      },

      onCloseUnsub: function () {
        this._oUnsub.close();
      },

      onConfirmUnsub: function () {
        var o = this.getView().getModel();
        o.setProperty("/subscriptionState", "Cancellation scheduled");
        o.setProperty("/subscriptionStateS", "Warning");
        o.setProperty("/messageStripType", "Warning");
        o.setProperty(
          "/approval/label",
          "Gates 3–4 on hold — off-boarding in progress (demo)"
        );
        o.setProperty(
          "/lifecycleNote",
          "Unsubscribe request recorded — credit note preview € " +
            (o.getProperty("/balance/creditNotes") + 500).toFixed(2) +
            " (demo pro-ration). Header shows warning until you re-subscribe or reset."
        );
        this._oUnsub.close();
        MessageToast.show("Cancellation scheduled — see warning on header & strip");
      },

      onOpenResub: function () {
        this._oResub.open();
      },

      onCloseResub: function () {
        this._oResub.close();
      },

      onConfirmResub: function () {
        var o = this.getView().getModel();
        o.setProperty("/subscriptionState", "Active");
        o.setProperty("/subscriptionStateS", "Success");
        o.setProperty("/messageStripType", "Success");
        o.setProperty(
          "/lifecycleNote",
          "Re-subscribe confirmed — 4/4 stages complete, subscription operational. (Production: new Order Form for scope changes.)"
        );
        o.setProperty("/approval/percent", 100);
        o.setProperty(
          "/approval/label",
          "4 of 4 — approved & active (100%)"
        );
        o.setProperty("/stages/2/state", "Success");
        o.setProperty("/stages/2/status", "Completed");
        o.setProperty("/stages/2/when", "2026-04-24");
        o.setProperty("/stages/2/who", "Global Security — cleared (demo)");
        o.setProperty("/stages/3/state", "Success");
        o.setProperty("/stages/3/status", "Completed");
        o.setProperty("/stages/3/when", "2026-04-24");
        o.setProperty("/stages/3/who", "SAP enablement (mock)");
        this._oResub.close();
        MessageToast.show("100% approved — status Active. Progress bar full.");
      },

      onResetDemo: function () {
        if (this._oUnsub) {
          this._oUnsub.close();
        }
        if (this._oResub) {
          this._oResub.close();
        }
        this.getView().setModel(new JSONModel(deep(BASE)));
        MessageToast.show("Baseline restored — 75% approval, 4 stages as at start");
      }
    });
  }
);
