jQuery.sap.require("com.gc.dashboard.ext.formatter.ObjectPageFormatter");
sap.ui.define(
  [
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    "sap/ui/table/Column",
    "sap/ui/model/Filter",
    "sap/m/Text",
    "sap/m/MessageBox",
    "sap/m/ColumnListItem",
    "sap/ui/core/format/DateFormat",
    "sap/m/Button",
    "sap/ui/core/Icon"
  ],
  function (JSONModel, Fragment, UIColumn, Filter, Text, MessageBox, ColumnListItem, DateFormat, Button, Icon) {
    "use strict";
    return sap.ui.controller("com.gc.dashboard.ext.controller.DetailsExt", {
      /**
       * Enable Variant Management for all the tables in the Object Page
       * @private
       */
      _enableVariantManagement: function () {
        // Helper function to safely configure a table if it exists
        const fnConfigureTable = function (sId) {
          const oTable = sap.ui.getCore().byId(
            "com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--" + sId + "::Table"
          );

          // CRITICAL FIX: Only proceed if the table actually exists
          if (oTable) {
            oTable.setUseVariantManagement(true);
            oTable.setUseExportToExcel(true);
            oTable.setShowFullScreenButton(true);
          }
        };

        // --- DC Tables ---
        fnConfigureTable("TotalDC-ID");
        fnConfigureTable("Section-14-ID");
        fnConfigureTable("DemolitionCred-ID");
        fnConfigureTable("TotalDC-ID-NonInd");
        fnConfigureTable("DCExemption-ID");
        fnConfigureTable("DCDeferralTable-ID");
        fnConfigureTable("Previous-Building-Permit-Credit-ID");

        // --- CBC Tables ---
        fnConfigureTable("ExemptionCBC-ID");
        fnConfigureTable("InKindContr-ID");
        fnConfigureTable("DemoExm-ID");

        // --- Payment Tables ---
        fnConfigureTable("PaymentInfo-ID");
        fnConfigureTable("RefundInfo-ID");
        fnConfigureTable("DeferralInfo-ID");
      },

      /**
       * Helper method to hide Paste Btn from Object Page Table
       * @private
       */
      _hidePasteButton: function () {
        const aDCTableIds = ["TotalDC-ID", "Section-14-ID", "DemolitionCred-ID", "TotalDC-ID-NonInd", "DCExemption-ID", "Previous-Building-Permit-Credit-ID"];
        aDCTableIds.forEach(mId => {
          const oTable = sap.ui.getCore().byId(`com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--${mId}::pasteEntries`);
          oTable.setVisible(false);
        });
        const aCBCTableIds = ["ExemptionCBC-ID", "InKindContr-ID", "DemoExm-ID"];
        aCBCTableIds.forEach(mId => {
          const oTable = sap.ui.getCore().byId(`com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--${mId}::pasteEntries`);
          oTable.setVisible(false);
        });
        const aPaymentTableIds = ["PaymentInfo-ID", "RefundInfo-ID", "DeferralInfo-ID"];
        aPaymentTableIds.forEach(mId => {
          const oTable = sap.ui.getCore().byId(`com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--${mId}::pasteEntries`);
          oTable?.setVisible(false);
        });
      },

      /**
       * Set the 'default' variant for the table
       * @private
       */
      _applyDefaultVariant: function () {
        const oDCTable = sap.ui.getCore().byId("com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--TotalDC-ID::Table");
        if (!oDCTable.getCurrentVariantId()) {
          oDCTable.setCurrentVariantId("id_1676542872462_327_table");
        }
        const oSec14Table = sap.ui.getCore().byId("com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--Section-14-ID::Table");
        if (!oSec14Table.getCurrentVariantId()) {
          oSec14Table.setCurrentVariantId("id_1676542938991_361_table");
        }
        const demoTable = sap.ui.getCore().byId("com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--DemolitionCred-ID::Table");
        if (!demoTable.getCurrentVariantId()) {
          demoTable.setCurrentVariantId("id_1676543071117_394_table");
        }
        const totalNonIndDCTable = sap.ui.getCore().byId("com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--TotalDC-ID-NonInd::Table");
        if (!totalNonIndDCTable.getCurrentVariantId()) {
          totalNonIndDCTable.setCurrentVariantId("id_1676562836642_289_table");
        }
        const oExemptionDCTable = sap.ui.getCore().byId("com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--DCExemption-ID::Table");
        if (!oExemptionDCTable.getCurrentVariantId()) {
          oExemptionDCTable.setCurrentVariantId("id_1676543390787_326_table");
        }
        const oDeferralDCTable = sap.ui.getCore().byId("com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--DCDeferralTable-ID::Table");
        if (!oDeferralDCTable.getCurrentVariantId()) {
          oDeferralDCTable.setCurrentVariantId("id_1676544587107_1211_table");
        }
        const oPrvBuidlingPermitDCTable = sap.ui.getCore().byId("com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--Previous-Building-Permit-Credit-ID::Table");
        if (!oPrvBuidlingPermitDCTable.getCurrentVariantId()) {
          oPrvBuidlingPermitDCTable.setCurrentVariantId("id_1676543461076_336_table");
        }
        //CBC Tables
        const oCBCExemptTable = sap.ui.getCore().byId("com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--ExemptionCBC-ID::Table");
        if (!oCBCExemptTable.getCurrentVariantId()) {
          oCBCExemptTable.setCurrentVariantId("id_1676544024721_379_table");
        }
        const oCBCInKindTable = sap.ui.getCore().byId("com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--InKindContr-ID::Table");
        if (!oCBCInKindTable.getCurrentVariantId()) {
          oCBCInKindTable.setCurrentVariantId("id_1676544064673_397_table");
        }
        const oCBCDemoTable = sap.ui.getCore().byId("com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--DemoExm-ID::Table");
        if (!oCBCDemoTable.getCurrentVariantId()) {
          oCBCDemoTable.setCurrentVariantId("id_1676544100387_407_table");
        }
        //Payment Table
        const oPaymentInfoPaymentTable = sap.ui.getCore().byId("com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--PaymentInfo-ID::Table");
        if (!oPaymentInfoPaymentTable.getCurrentVariantId()) {
          oPaymentInfoPaymentTable.setCurrentVariantId("id_1676543851405_292_table");
        }
        const oRefundInfoPaymentTable = sap.ui.getCore().byId("com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--RefundInfo-ID::Table");
        if (!oRefundInfoPaymentTable.getCurrentVariantId()) {
          oRefundInfoPaymentTable.setCurrentVariantId("id_1676543774458_268_table");
        }
        const oDeferralPaymentTable = sap.ui.getCore().byId("com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--DeferralInfo-ID::Table");
        if (!oDeferralPaymentTable.getCurrentVariantId()) {
          oDeferralPaymentTable.setCurrentVariantId("id_1676543726160_259_table");
        }
      },

      _hideDCButtons: function () {
        // List of all standard Add/Delete buttons in the DC Section tables
        const aButtonSufixes = [
          "TotalDC-ID::addEntry",
          "TotalDC-ID::deleteEntry",
          "DemolitionCred-ID::addEntry",
          "DemolitionCred-ID::deleteEntry", // Good practice to include delete if it exists
          "Section-14-ID::addEntry",
          "Section-14-ID::deleteEntry",
          "DCExemption-ID::addEntry",
          "DCExemption-ID::deleteEntry"
        ];

        // LOGIC: Enable only if Editable AND Status is NOT Final/Closed/Hold
        // This decouples it from the 'permit_issued' lock but respects the overall status.
        var sExpression = "{= ${ui>/editable} && ${status} !== 'FIN_APR' && ${status} !== 'CLSD' && ${status} !== 'PCLSD' && ${status} !== 'HLD' }";

        aButtonSufixes.forEach(function (sButtonSufix) {
          const oButton = sap.ui.getCore().byId("com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--" + sButtonSufix);
          if (oButton) {
            // Bind the 'enabled' property to our expression
            oButton.bindProperty("enabled", {
              parts: [
                { path: "ui>/editable" },
                { path: "status" }
              ],
              formatter: function (bEditable, sStatus) {
                return bEditable && sStatus !== 'FIN_APR' && sStatus !== 'CLSD' && sStatus !== 'PCLSD' && sStatus !== 'HLD';
              }
            });
          }
        });
      },
      _addCustomActions: function () {
        let oCalculateButton = sap.ui.getCore().byId("com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--CalculateButton");

        // 1. Calculate Button
        if (!oCalculateButton) {
          oCalculateButton = new Button({
            "id": "com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--CalculateButton",
            "text": "Calculate",
            "type": "Emphasized",
            "press": this.onPressDCCalc.bind(this),
            "visible": "{ui>/editable}",
            // LOGIC: Enable if Editable AND Status is NOT Final/Closed/Hold
            "enabled": "{= ${ui>/editable} && ${status} !== 'FIN_APR' && ${status} !== 'CLSD' && ${status} !== 'PCLSD' && ${status} !== 'HLD' }"
          });
          const oDCTable = sap.ui.getCore().byId("com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--TotalDC-ID::Table");
          const oDCHeader = oDCTable.getToolbar();
          oDCHeader.addContent(oCalculateButton);
        }

        let oNewPBPButton = sap.ui.getCore().byId("com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--NewPBPButton");

        // 2. Add Credit Button
        if (!oNewPBPButton) {
          oNewPBPButton = new Button({
            "id": "com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--NewPBPButton",
            "text": "Add Credit",
            "press": this.onPressNewPBP.bind(this),
            // LOGIC: Enable if Editable AND Status is NOT Final/Closed/Hold
            "enabled": "{= ${ui>/editable} && ${status} !== 'FIN_APR' && ${status} !== 'CLSD' && ${status} !== 'PCLSD' && ${status} !== 'HLD' }"
          });
          const oPBPTable = sap.ui.getCore().byId("com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--Previous-Building-Permit-Credit-ID::Table");
          const oPBPHeader = oPBPTable.getToolbar();
          oPBPHeader.addContent(oNewPBPButton);
        }
      },
      _defineLocalModel: function () {
        const oLocalModel = new JSONModel({
        });
        this.getView().setModel(oLocalModel, "LocalModel");
        oLocalModel.setProperty("/busy", true);
      },
      onInit: function () {

     var oUiModel = this.getView().getModel("ui");

// 2. If it's not found on the View, try the Component
if (!oUiModel) {
    var oComponent = this.getOwnerComponent();
    if (oComponent) {
        oUiModel = oComponent.getModel("ui");
    }
}

// 3. Attach Listener ONLY if the model exists
if (oUiModel) {
    oUiModel.attachPropertyChange(function(oEvent){
        if (oEvent.getParameter("path") === "/editable") {
            this._updateBill17ListState();
        }
    }.bind(this));
} else {
    // Fallback: If model isn't ready, attach to the view's modelContextChange event
    // This fires when models are propagated to the view
    this.getView().attachEventOnce("modelContextChange", function() {
        var oLateUiModel = this.getView().getModel("ui");
        if (oLateUiModel) {
            oLateUiModel.attachPropertyChange(function(oEvent){
                if (oEvent.getParameter("path") === "/editable") {
                    this._updateBill17ListState();
                }
            }.bind(this));
        }
    }.bind(this));
}
        this._defineLocalModel();


        //Enable Variant management for various tables
        this._enableVariantManagement();
        //Warning poup when DC clearance datee edited
        // FIX 1: Get Model from Component safely and use correct event 'attachPropertyChange'
        var oComponent = this.getOwnerComponent();
        if (oComponent) {
          var oModel = oComponent.getModel();
          if (oModel) {
            oModel.attachPropertyChange(this._onPropertyChange, this);
          }
        }

        // const dcClearanceDate = sap.ui.getCore().byId("com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--PaymentInfo_FG-ID::dc_clearance_date::Field");
        // dcClearanceDate.attachChange(function (oEvent) {
        //   MessageBox.warning("Once you save the request, you will not be able to edit the DC Clearance Date.");
        // });
        const oRouter = this.getOwnerComponent().getRouter();
        const sHashKey = oRouter.getHashChanger().key;
        if (sHashKey === "Child") {
          sap.ui.getCore().byId(
            "com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--action::ZGC_C_REQUESTS_CDS.ZGC_C_REQUESTS_CDS_Entities::zgc_c_requestsSubmit::Determining"
          ).getParent().setVisible(false);
          sap.ui.getCore().byId(
            "com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--fullScreen"
          ).getParent().setVisible(false);
        }
        var that = this;
        //Add custom action buttons in DC section
        this._addCustomActions();
        this.getView().attachModelContextChange(this._updateBill17Status, this);

        // Also run it once immediately just in case
        this._updateBill17Status();


        this.getOwnerComponent().getModel().attachRequestCompleted(function (oEvent) {
          //Check if the call was for action Generate Receipt
          if (oEvent.getParameter("url").includes("zgc_c_paymentsGen_pay_receipt") || oEvent.getParameter("url").includes("ZGC_C_DEFERRALSGen_def_invoice")) {
            const attachmentComponent = sap.ui.getCore().byId("com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--attachmentReuseComponent::InPayRef::Attachments::ComponentContainer").getComponentInstance();
            //Refresh the attachment component 
            // defect 113 attachment refresh issue added below code - 14/07/2025
            var oAttachmentModel = attachmentComponent.getModel();
            var oContext = attachmentComponent.getBindingContext();
            attachmentComponent.stRefresh(oAttachmentModel, oContext);
            // defect 113 attachment refresh issue commented old code - 14/07/2025
            //attachmentComponent.stRefresh();
          }
          //Check if the call was for attaching the draft invoice
          if (oEvent.getParameter("url").includes("zgc_c_requestsAttach_draft_invoice")) {
            const attachmentComponent = sap.ui.getCore().byId("com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--attachmentReuseComponent::InPayRef::Attachments::ComponentContainer").getComponentInstance();
            //Refresh the attachment component
            // defect 113 attachment refresh issue - added below code 14/07/2025
            var oAttachmentModel = attachmentComponent.getModel();
            var oContext = attachmentComponent.getBindingContext();
            attachmentComponent.stRefresh(oAttachmentModel, oContext);
            // defect 113 attachment refresh issue - commented old refresh  code 14/07/2025
            //attachmentComponent.stRefresh();

            //Refresh the invoice section
            const pdfViewer = sap.ui.getCore().byId("com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--PDFViewer");
            const oLocalModel = pdfViewer.getModel("local");
            const newInvTechDetails = JSON.parse(oEvent.getParameters().response.responseText).d.inv_tech_details;
            const aInvoiceTechDetails = newInvTechDetails.split("-");
            this._sValidPath =
              `/sap/opu/odata/sap/CV_ATTACHMENT_SRV/OriginalContentSet(Documenttype='GOS',Documentnumber='${aInvoiceTechDetails[0]}',Documentpart='',Documentversion='',ApplicationId='${aInvoiceTechDetails[1]}',FileId='${aInvoiceTechDetails[2]}')/$value`;
            oLocalModel.setProperty("/Source", this._sValidPath);
            pdfViewer.invalidate();
          }
        });

        this.extensionAPI.attachPageDataLoaded(function (event) {
          const oComponent = sap.ui.getCore().byId(
            "com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests"
          ).getParent();

          //Commented old code for defect 114 layout issue fix
          /*  
           const oRouterComp = oComponent.getRouter();
           const sHKey = oRouterComp.getHashChanger().key;
           if (sHKey === "Child") {
             sap.ui.getCore().byId(
               "com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--fullScreen"
             ).firePress();
 
           } */
          //CIL Selected Section
          const sCILSection = sap.ui.getCore().byId("com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--CIL::Section");
          const sSelectedSection = sCILSection.getParent().getSelectedSection();
          if (sSelectedSection === "com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--CIL::Section") {
            sCILSection.getParent().scrollToSection(sCILSection.getId());
          }
          //defect 73 busy dialog issue fix , 23/07/2025
          //that._hidePasteButton();
          //Park Planner in Edit Mode. Disable DC buttons
          const oRequest = event.context.getObject();
          // Check initial state and disable field if needed
          //  Check Initial State for Partner Field
          //  Change: Removed 'if' check so it updates (enables/disables) regardless of value
          this._updatePartnerFieldState(!!oRequest.permit_issued);

          // Apply state to the Permit Issued checkbox itself
          this._disablePermitIssuedField(!!oRequest.permit_issued);

          if (oRequest.dc_applicable_fc === 1 && oRequest.Activation_ac) {
            //Without the below delay, action buttons like 'Calculate' and 'Add Credit' are not getting disabled
            that._hideDCButtons();
          }


          //Calculate and Add Credit Button Visibility
          const oCalBtn = sap.ui.getCore().byId(
            "com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--CalculateButton"
          );
          const oAddCreditBtn = sap.ui.getCore().byId(
            "com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--NewPBPButton"
          );
          const bEdit = oComponent.getModel("ui").getProperty("/editable");
          if (bEdit) {
            oCalBtn.setVisible(true);
            oAddCreditBtn.setVisible(true);
          } else {
            oCalBtn.setVisible(false);
            oAddCreditBtn.setVisible(false);
          }
          //Invoice Section
          const view = sap.ui.getCore().byId("com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests");
          const draftInvoiceAvailable = view.getBindingContext().getObject()?.Attach_draft_invoice_ac;
          if (draftInvoiceAvailable || document.URL.includes("Workflow")) { //If the request is not yet final approved or if it is getting opened in My Inbox 
            const request_id = view.getBindingContext().getObject()?.request_id;
            const dc_version = view.getBindingContext().getObject()?.version;
            this._sValidPath = `/sap/opu/odata/sap/ZGC_GROWTH_CHARGES_SRV/DraftInvoiceSet(dcId='${request_id}',version='${dc_version}')/$value`;
          } else {
            const invoice_tech_details = view.getBindingContext().getObject()?.inv_tech_details;
            const aInvoiceTechDetails = invoice_tech_details.split("-");
            this._sValidPath =
              `/sap/opu/odata/sap/CV_ATTACHMENT_SRV/OriginalContentSet(Documenttype='GOS',Documentnumber='${aInvoiceTechDetails[0]}',Documentpart='',Documentversion='',ApplicationId='${aInvoiceTechDetails[1]}',FileId='${aInvoiceTechDetails[2]}')/$value`;
          }
          this._oModel = new JSONModel({
            Source: this._sValidPath
          });
          view.byId("PDFViewer").setModel(this._oModel, "local");
          this._updateBill17ListState();

        }.bind(this));

        //On clicking Invoice tab, refresh the PDF Viewer
        const oObjectPage = sap.ui.getCore().byId("com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--objectPage");
        oObjectPage.attachNavigate(function (oEvent) {
          if (oEvent.getParameter("section").getId() === "com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--AfterFacet::zgc_c_requests::InPayRef::Section") {
            const pdfViewer = sap.ui.getCore().byId("com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--PDFViewer");
            const oPath = pdfViewer.getModel("local").getProperty("/Source");
            //If the path is pointing to custom service, it means that it is a draft invoice. So refresh the content
            if (oPath.includes("ZGC_GROWTH_CHARGES_SRV")) {
              pdfViewer.invalidate();
            }
          }
        });
      },
      //commented this to match the code with ECD (1809) system code 29/08/2025  for defect 216

      // _defineCILIconControl: function (sId) {
      //   const oCILIcon = new Icon(
      //     {
      //       color: "#346187",
      //       src: "sap-icon://incident",
      //       width: "50px",
      //       height: "30px"
      //     }
      //   );
      //   switch (sId) {
      //     case "exm_units":
      //       oCILIcon.setTooltip("As exemption under the parkland conveyance bylaw.");
      //       break;
      //     case "oth_cr_units":
      //       oCILIcon.setTooltip("Parkland dedication agreement credits.");
      //       break;
      //     default:
      //       oCILIcon.setTooltip("This is populated from lesser of the Site Specific CIL Calculation OR the CIL Site Value Cap Calculation OR the CIL Capped Rate Total");
      //       break;
      //   }
      //   return oCILIcon;
      // },
      //added below code to match the code with ECD (1809) system code 29/08/2025  for defect 216
      _defineCILIconControl: function (sId, sSec) {
        const oCILIcon = new Icon(
          {
            color: "#346187",
            src: "sap-icon://incident",
            width: "50px",
            height: "30px"
          }
        );
        switch (sId) {
          case "exm_units":
            oCILIcon.setTooltip("As exemption under the parkland conveyance bylaw.");
            break;
          case "oth_cr_units":
            oCILIcon.setTooltip("Parkland dedication agreement credits.");
            break;

          case "other_credits_res":
            if (sSec === "ResHigh") {
              oCILIcon.setTooltip("Dollar value of parkland dedication agreement credits to be applied against the High/Medium Density Payable Amount.");
            } else {
              oCILIcon.setTooltip("Dollar value of parkland dedication agreement credits to be applied against the Low Density Payable Amount.");
            }

            break;

          case "other_credits_nres":
            if (sSec === "NResExt") {
              oCILIcon.setTooltip("Dollar value of parkland dedication agreement credits to be applied against the Non-Residential Existing Payable Amount.");
            } else {
              oCILIcon.setTooltip("Dollar value of parkland dedication agreement credits to be applied against the Non-Residential Vacant Payable Amount.");
            }
            break;
          default:
            oCILIcon.setTooltip("This is populated from lesser of the Site Specific CIL Calculation OR the CIL Site Value Cap Calculation OR the CIL Capped Rate Total");
            break;
        }
        return oCILIcon;
      },
      //commented this to match the code with ECD (1809) system code 29/08/2025  for defect 216
      // _addCILIconControl: function () {
      //   const aCILGroup = ["density_payable", "exm_units", "oth_cr_units"];
      //   aCILGroup.forEach(mItem => {
      //     let oControl = sap.ui.getCore().byId(`com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--CILResDensity-ID::${mItem}::GroupElement`);
      //     oControl.addElement(this._defineCILIconControl(mItem));
      //   });

      // },

      //added below to match the code with ECD (1809) system code 29/08/2025  for defect 216
      _addCILIconControl: function () {

        // density_payable
        const aCILGroup = ["density_pay_subt1", "exm_units", "oth_cr_units", "other_credits_res", "other_credits_nres"];
        aCILGroup.forEach(mItem => {
          let oControl = sap.ui.getCore().byId(`com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--CILResDensity-ID::${mItem}::GroupElement`);

          if (oControl) {
            this._applyCustomSpanToInput(oControl.getElements()[0]);
            oControl.addElement(this._defineCILIconControl(mItem, "ResHigh"));
          }

        });

        const aCILGroupResLow = ["other_credits_res"];
        aCILGroupResLow.forEach(mItem => {
          let oControl = sap.ui.getCore().byId(`com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--CILResDensityLow-ID::${mItem}::GroupElement`);
          if (oControl) {
            this._applyCustomSpanToInput(oControl.getElements()[0]);
            oControl.addElement(this._defineCILIconControl(mItem, "ResLow"));
          }

        });
        const aCILGroupNRes = ["other_credits_nres"];
        aCILGroupNRes.forEach(mItem => {
          let oControl = sap.ui.getCore().byId(`com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--CILNonResDensity-ID::${mItem}::GroupElement`);
          if (oControl) {
            this._applyCustomSpanToInput(oControl.getElements()[0]);
            oControl.addElement(this._defineCILIconControl(mItem, "NResExt"));
          }

        });

        const aCILGroupVac = ["other_credits_nres"];
        aCILGroupVac.forEach(mItem => {
          let oControl = sap.ui.getCore().byId(`com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--CILNonResDensityVac-ID::${mItem}::GroupElement`);
          if (oControl) {
            this._applyCustomSpanToInput(oControl.getElements()[0]);
            oControl.addElement(this._defineCILIconControl(mItem, "NResVac"));
          }

        });
      },
      //added below code to match the code with ECD (1809) system code 29/08/2025  for defect 216
      _applyCustomSpanToInput: function (oControl) {
        oControl.setLayoutData(new sap.ui.layout.GridData({ span: "L10 M10 S12" }));
      },
      onAfterRendering: function () {
        this._applyDefaultVariant();
        this._addCILIconControl();
        this._insertBelowBill17DeferralPartner();
        this._updateBill17Status();

        // Also try to attach to data changes (Double Safety)
        var oBinding = this.getView().getElementBinding();
        if (oBinding) {
          oBinding.attachDataReceived(this._updateBill17Status, this);
          oBinding.attachChange(this._updateBill17Status, this);
        }



        //  START OF NEW CODE 
        // List of all tables that need the "Grey Row" logic
        var aTableIds = [
          "TotalDC-ID",
          "Section-14-ID",
          "DemolitionCred-ID",
          "DCExemption-ID"
        ];

        aTableIds.forEach(function (sId) {
          var oSmartTable = sap.ui.getCore().byId("com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--" + sId + "::Table");

          if (oSmartTable) {
            var oInnerTable = oSmartTable.getTable();

            // 1. Detach/Attach Listener (For future updates)
            oInnerTable.detachEvent("rowsUpdated", this._onDcTableDataReceived, this);
            oInnerTable.attachEvent("rowsUpdated", this._onDcTableDataReceived, this);

            // 2. FIX: CALL IMMEDIATELY (For data already loaded)
            // Pass the table directly to the function
            this._onDcTableDataReceived(oInnerTable);
          }
        }.bind(this));
        // --- END OF NEW CODE ---

        // >>> NEW BLOCK FOR PAYMENT TABLE <<<
        var oPayTable = sap.ui.getCore().byId("com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--PaymentInfo-ID::Table");
        if (oPayTable) {
          var oInnerPayTable = oPayTable.getTable();
          // Attach listener to re-apply logic if user sorts/filters/pages
          oInnerPayTable.detachEvent("rowsUpdated", this._updatePaymentDocFieldState, this);
          oInnerPayTable.attachEvent("rowsUpdated", this._updatePaymentDocFieldState, this);

          // Run immediately
          this._updatePaymentDocFieldState();
        }
        // >>> END NEW BLOCK OF PAYMENT TABLE<<<
        //Value help for CIL capped rate and CIL rate
        this._cilUpdates = {
          "onAfterRendering": function () {
            const id = this.id;
            const input_id = `${id}-input`;
            let rateId = this.rateId;
            var that = this.that;
            const cappedRateSF = sap.ui.getCore().byId(id);
            if (cappedRateSF) {
              cappedRateSF.onAfterRendering = function () {
                const cilRate = sap.ui.getCore().byId(input_id);
                if (!cilRate) {
                  return;
                }
                cilRate.setShowValueHelp(true);
                cilRate.setValueHelpOnly(true);
                cilRate.attachValueHelpRequest(function (oEvent) {
                  this.VHInput = oEvent.getSource();
                  const fragment = Fragment.load({
                    name: "com.gc.dashboard.ext.fragments.cil.cilRate",
                    controller: this
                  });

                  //For NR this will not be set. So setting it here
                  if (!rateId) {
                    if (this.getView().byId("idCIL_EditRBGrpNResType").getButtons()[0].getSelected()) {
                      rateId = "NON_RES_VAC";
                    } else {
                      rateId = "NON_RES_EXT";
                    }
                  }
                  //Date filter
                  const rateIDFilter = new Filter(
                    "rate_id",
                    "EQ",
                    rateId
                  );
                  this._requestDateFilter = [rateIDFilter];
                  fragment.then(
                    function (oDialog) {
                      this._oCRValueHelpDialog = oDialog;
                      this.getView().addDependent(oDialog);
                      oDialog.getTableAsync().then(
                        function (oTable) {
                          oTable.setModel(this.getView().getModel());
                          // For Desktop and tabled the default table is sap.ui.table.Table
                          if (oTable.bindRows) {
                            // Bind rows to the ODataModel and add columns
                            oTable.bindRows({
                              path: "/zgc_cil_ln_vh",
                              filters: this._requestDateFilter,
                              events: {
                                dataReceived: function () {
                                  oDialog.update();
                                }
                              }
                            });

                            // Only two decimal places
                            const dcRateTemplate = new Text({
                              text: "{ path: 'rate',type: 'sap.ui.model.type.Float', formatOptions: {minFractionDigits: 2, maxFractionDigits: 2}}"
                            });
                            const startDateTemplate = new Text({
                              text: "{path: 'start_date', type: 'sap.ui.model.type.Date', formatOptions: {datePattern: 'MM/dd/yyyy'}}"
                            });
                            const endDateTemplate = new Text({
                              text: "{path: 'end_date', type: 'sap.ui.model.type.Date', formatOptions: {datePattern: 'MM/dd/yyyy'}}"
                            });

                            oTable.addColumn(
                              new UIColumn({ label: "Rate", template: dcRateTemplate })
                            );
                            oTable.addColumn(
                              new UIColumn({
                                label: "Valid From",
                                template: startDateTemplate
                              })
                            );
                            oTable.addColumn(
                              new UIColumn({
                                label: "Valid To",
                                template: endDateTemplate
                              })
                            );
                          }
                          oDialog.update();
                        }.bind(this)
                      );
                      oDialog.open();
                    }.bind(this));
                }.bind(that));
              };
            }
          }
        };
        const id = "com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--CIL-ResLow-SS::SubSection";
        const smartFieldId = "com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--CILResDensityLow-ID::cil_rate_res::Field";
        const cilResLowSS = sap.ui.getCore().byId(id);
        if (cilResLowSS) {
          const context = { "that": this, "id": smartFieldId, "rateId": "RES_LOW_DEN" };
          cilResLowSS.addEventDelegate(this._cilUpdates, context);
        }

        //CIL Rate VH for Non Residential scenario - Existing
        const nonResExtSSId = "com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--CIL-NonResVac-SS::SubSection";
        const nonResExtSS_smartFieldId = "com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--CILNonResDensity-ID::cil_rate_nres::Field";
        const nonResExtSS = sap.ui.getCore().byId(nonResExtSSId);
        if (nonResExtSS) {
          const context = { "that": this, "id": nonResExtSS_smartFieldId };
          nonResExtSS.addEventDelegate(this._cilUpdates, context);
        }

        //CIL Rate VH for Non Residential scenario - Vacant
        const nonResVacSSId = "com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--CIL-NonRes-SS::SubSection";
        const nonResVacSS_smartFieldId = "com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--CILNonResDensityVac-ID::cil_rate_nres::Field";
        const nonResVacSS = sap.ui.getCore().byId(nonResVacSSId);
        if (nonResVacSS) {
          const context = { "that": this, "id": nonResVacSS_smartFieldId };
          nonResVacSS.addEventDelegate(this._cilUpdates, context);
        }

        const setBlocksRight = function () {
          var blocks = this.getBlocks();
          for (var i = 0; i < blocks.length; i++) {
            //Temporary Comment
            //|| blocks[i].getParent().getParent().getId() === "com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--DCHeader-GI::SubSection"
            //blocks[i].getParent().getParent().getId() === "com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--CBCHeader-GI::SubSection"||
            if (
              blocks[i].getParent().getParent().getId() === "com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--CBC_Comments::SubSection"
              || blocks[i].getParent().getParent().getId() === "com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--Gen_Info_Comments::SubSection"
              || blocks[i].getParent().getParent().getId() === "com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--TotalDCComm-ID::SubSection"
              || blocks[i].getParent().getParent().getId() === "com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--CIL-Comm-SS::SubSection") {
              blocks[i].getContent()[0].getLayout().setColumnsM(1);
              blocks[i].getContent()[0].getLayout().setColumnsL(1);
              blocks[i].getContent()[0].getLayout().setColumnsXL(1);
            }
            blocks[i].getLayoutData().setSpanS(12);
            blocks[i].getLayoutData().setSpanM(12);
            blocks[i].getLayoutData().setSpanL(12);
            blocks[i].getLayoutData().setSpanXL(12);
          }
        };
        const cbcGenSubSection = sap.ui.getCore().byId("com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--CBCHeader-GI::SubSection");
        if (cbcGenSubSection) {
          cbcGenSubSection.onAfterRendering = setBlocksRight;
        }
        const cbcCommSection = sap.ui.getCore().byId("com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--CBC_Comments::SubSection");
        if (cbcCommSection) {
          cbcCommSection.onAfterRendering = setBlocksRight;
        }


        //Set the Grid Layout for the SubSection

        const exmSubSection = sap.ui.getCore().byId(
          "com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--CBC-Exm-SS::SubSection"
        );
        if (exmSubSection) {
          exmSubSection.onAfterRendering = setBlocksRight;
        }

        const kindSubSection = sap.ui.getCore().byId(
          "com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--CBC-InK-SS::SubSection"
        );
        if (kindSubSection) {
          kindSubSection.onAfterRendering = setBlocksRight;
        }

        const demSubSection = sap.ui.getCore().byId(
          "com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--CBC-Dem-SS::SubSection"
        );
        if (demSubSection) {
          demSubSection.onAfterRendering = setBlocksRight;
        }

        const paymentSection = sap.ui.getCore().byId(
          "com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--Payment-SS::SubSection"
        );
        if (paymentSection) {
          paymentSection.onAfterRendering = setBlocksRight;
        }

        const refundSection = sap.ui.getCore().byId(
          "com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--Refund-SS::SubSection"
        );
        if (refundSection) {
          refundSection.onAfterRendering = setBlocksRight;
        }

        const deferralSection = sap.ui.getCore().byId(
          "com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--Deferral-SS::SubSection"
        );
        if (deferralSection) {
          deferralSection.onAfterRendering = setBlocksRight;
        }

        //Set the Grid Layout for the SubSection
        const dcGenSubSection = sap.ui.getCore().byId("com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--DCHeader-GI::SubSection");
        if (dcGenSubSection) {
          dcGenSubSection.onAfterRendering = setBlocksRight;
        }

        const dcGen_Info_CommentsSubSection = sap.ui.getCore().byId("com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--Gen_Info_Comments::SubSection");
        if (dcGen_Info_CommentsSubSection) {
          dcGen_Info_CommentsSubSection.onAfterRendering = setBlocksRight;
        }

        const dcTotalDCCommSubSection = sap.ui.getCore().byId("com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--TotalDCComm-ID::SubSection");
        if (dcTotalDCCommSubSection) {
          dcTotalDCCommSubSection.onAfterRendering = setBlocksRight;
        }

        const dcExemptionSection = sap.ui.getCore().byId(
          "com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--DC-Exemption-SS::SubSection"
        );
        if (dcExemptionSection) {
          dcExemptionSection.onAfterRendering = setBlocksRight;
        }

        const dcDeferralSection = sap.ui.getCore().byId(
          "com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--DC-Deferral-SS::SubSection"
        );
        if (dcDeferralSection) {
          dcDeferralSection.onAfterRendering = setBlocksRight;
        }

        const dcSection14SubSection = sap.ui.getCore().byId("com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--Section-14-SS::SubSection");
        if (dcSection14SubSection) {
          dcSection14SubSection.onAfterRendering = setBlocksRight;
        }

        const prevPermitSection = sap.ui.getCore().byId("com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--PrevBldPerCrd-SS::SubSection");
        if (prevPermitSection) {
          prevPermitSection.onAfterRendering = setBlocksRight;
        }

        // CIL Comments
        const cil_CommentsSubSection = sap.ui.getCore().byId("com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--CIL-Comm-SS::SubSection");
        if (cil_CommentsSubSection) {
          cil_CommentsSubSection.onAfterRendering = setBlocksRight;
        }

        // FIX 1 (Backup): Ensure Field State is applied after rendering
        // This catches cases where onInit was too early
        var oContext = this.getView().getBindingContext();
        if (oContext) {
          var bPermitIssued = oContext.getProperty("permit_issued");


          // 1. Disable/Grey out Deferral Partners
          if (this._updatePartnerFieldState) {
            this._updatePartnerFieldState(!!bPermitIssued);
          }

          // 2. [NEW] Disable "Permit Issued" checkbox itself
          // ##$ Change: Removed 'if (bPermitIssued)' check so it can re-enable if false
          if (this._disablePermitIssuedField) {
            this._disablePermitIssuedField(!!bPermitIssued);
          }
        }

        // [NEW] Force the list to show ALL items by default
        // We wrap it in a small timeout to ensure the control is fully drawn by Fiori first
        setTimeout(function () {
          this._forceFullTokenDisplay();
        }.bind(this), 500);


      },

      onBeforeRebindTableExtension: function (oEvent) {
        var sTableId = oEvent.getSource().getId();
        var oBindingParams = oEvent.getParameter("bindingParams");
        oBindingParams.parameters = oBindingParams.parameters || {};

        // ============================================================
        // 1. PAYMENT TABLE (PaymentInfo-ID)
        // ============================================================
        if (sTableId.indexOf("PaymentInfo-ID::Table") > -1) {
          oBindingParams.parameters.select = oBindingParams.parameters.select + ",Gen_pay_receipt_ac,deferral_adjust";

          var vDefPartner = this.getView().getBindingContext().getProperty("to_defpartner");
          var bIsBill17 = this._isBill17Active(vDefPartner);

          if (bIsBill17) {
            // --- FIX START ---
            // 1. CLEAR existing sorters to remove "DraftEntityCreationDateTime" priority
            oBindingParams.sorter = [];

            // 2. Add your custom sorters in strict order
            oBindingParams.sorter.push(new sap.ui.model.Sorter("invoice_doc_issue", true)); // 1. Issue Date -> Descending
            oBindingParams.sorter.push(new sap.ui.model.Sorter("sort_document", false));    // 2. Doc #      -> Ascending
            oBindingParams.sorter.push(new sap.ui.model.Sorter("sort_date", false));        // 3. Date       -> Ascending (Safety)
            // --- FIX END ---

          } else {
            // Standard Logic (Legacy)
            oBindingParams.sorter = [
              new sap.ui.model.Sorter("sort_date", false),
              new sap.ui.model.Sorter("sort_document", false)
            ];
          }
          return;
        }

        // ============================================================
        // 2. MAIN TOTAL DC TABLE (TotalDC-ID) 
        // This is the ONLY table that supports 'dc_partner' & 'hierarchy_level'
        // ============================================================
        if (sTableId.indexOf("TotalDC-ID::Table") > -1) {
          oBindingParams.parameters.operationMode = "Client";

          var sSelect = oBindingParams.parameters.select || "";
          if (sSelect.indexOf("dc_partner") === -1) sSelect += ",dc_partner";

          sSelect += ",is_rate_edited,is_bill17_appl,sort_order,dc_txt";
          oBindingParams.parameters.select = sSelect;

          if (!oBindingParams.sorter || oBindingParams.sorter.length === 0) {
            oBindingParams.sorter = [
              new sap.ui.model.Sorter("sort_order", false),
              new sap.ui.model.Sorter("dc_type", false),
              new sap.ui.model.Sorter("hierarchy_level", false),
              new sap.ui.model.Sorter("sub_service_id", false)
            ];
          }
          return;
        }

        // ============================================================
        // 3. SAFE DC TABLES (NonInd, Demolition, Exemption)
        // FIX: Removed 'dc_partner' to prevent 404 Errors
        // ============================================================
        if (
          sTableId.indexOf("TotalDC-ID-NonInd::Table") > -1 ||
          sTableId.indexOf("DemolitionCred-ID::Table") > -1 ||
          sTableId.indexOf("DCExemption-ID::Table") > -1
        ) {
          oBindingParams.parameters.operationMode = "Client";

          var sSelect = oBindingParams.parameters.select || "";

          // Only request safe fields. NO dc_partner.
          sSelect += ",is_rate_edited,is_bill17_appl,sort_order,dc_txt";

          // Ensure dc_type is present for F4 filter
          if (sSelect.indexOf("dc_type") === -1) sSelect += ",dc_type";

          oBindingParams.parameters.select = sSelect;

          // Simple Sorting (No hierarchy_level to be safe)
          if (!oBindingParams.sorter || oBindingParams.sorter.length === 0) {
            oBindingParams.sorter = [
              new sap.ui.model.Sorter("sort_order", false)
            ];
          }
          return;
        }

        // ============================================================
        // 4. PREVIOUS BUILDING PERMIT (Previous-Building-Permit-Credit-ID)
        // No flags supported
        // ============================================================
        if (sTableId.indexOf("Previous-Building-Permit-Credit-ID::Table") > -1) {
          oBindingParams.parameters.operationMode = "Client";

          var sSelect = oBindingParams.parameters.select || "";
          sSelect += ",sort_order";
          oBindingParams.parameters.select = sSelect;

          if (!oBindingParams.sorter || oBindingParams.sorter.length === 0) {
            oBindingParams.sorter = [
              new sap.ui.model.Sorter("sort_order", false),
              new sap.ui.model.Sorter("dc_type", false)
            ];
          }
          return;
        }

        // ============================================================
        // 5. SECTION 14 (Section-14-ID)
        // ============================================================
        if (sTableId.indexOf("Section-14-ID::Table") > -1) {
          oBindingParams.parameters.operationMode = "Client";

          var sSelect = oBindingParams.parameters.select || "";
          sSelect += ",sort_order";
          oBindingParams.parameters.select = sSelect;

          if (!oBindingParams.sorter || oBindingParams.sorter.length === 0) {
            oBindingParams.sorter = [
              new sap.ui.model.Sorter("sort_order", false),
              new sap.ui.model.Sorter("dc_type", false)
            ];
          }
          return;
        }
      },




      onPressDCCalc: function (oEvent) {
        const oModel = this.getView().getModel();
        const reqGuid = this.getView()
          .getBindingContext()
          .getProperty("req_uuid");
        oModel.callFunction("/zgc_c_dc_calcltnsCalculate", {
          method: "POST",
          urlParameters: {
            req_uuid: reqGuid
          },
          success: function (oData) {
            sap.ui.getCore().byId(
              "com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--TotalDC-ID::Table"
            ).rebindTable();
            oModel.refresh();
          },
          error: function (oError) { }
        });
      },

      /**
       * Function to handle the press of the New Credit button to show VH popup
       * @param {*} oEvent
       */
      onPressNewPBP: function (oEvent) {
        //Load the fragment
        if (!this._oNewPBPDialog) {
          this._oNewPBPDialog = sap.ui.xmlfragment(
            "com.gc.dashboard.ext.fragment.NewBuildingPermit",
            this
          );
          this.getView().addDependent(this._oNewPBPDialog);
        }
        this._oNewPBPDialog.getBinding("items").refresh();
        this._oNewPBPDialog.open();
      },
      /**
       * Function to call the backend action upon selecting a permit
       * @param {*} sStatus
       * @returns
       */
      onPressNewPBPConfirm: function (oEvent) {
        const oModel = this.getView().getModel();

        //Get rid of pendingchanges to ZGC_PERMIT_NO_VH entity
        const currentChnages = oModel.getPendingChanges();
        for (var key in currentChnages) {
          if (key.indexOf("ZGC_PERMIT_NO_VH") > -1) {
            oModel.resetChanges([`/${key}`]);
          }
        }

        const oSelectedObject = oEvent
          .getParameter("selectedItem")
          .getBindingContext()
          .getObject();
        const oRequestObject = oEvent
          .getSource()
          .getBindingContext()
          .getObject();
        const reqGuid = oRequestObject.req_uuid;
        const permitNo = oSelectedObject.build_permit_no;
        const sDCType = oSelectedObject.dc_type;
        oModel.callFunction("/ZGC_C_PRE_BLD_PERMIT_CRDAdd_build_permit", {
          method: "POST",
          urlParameters: {
            PermitNo: permitNo,
            req_uuid: reqGuid,
            dc_type: sDCType
          },
          success: function () {
            sap.ui
              .getCore()
              .byId(
                "com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--Previous-Building-Permit-Credit-ID::Table"
              )
              .rebindTable();
            // Defect 112 fix Permit Credit Table refresh the odata model for the table
            sap.ui
              .getCore()
              .byId(
                "com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--Previous-Building-Permit-Credit-ID::Table"
              ).getModel().refresh();
            // Defect 112 fix Permit Credit Table refresh the odata model for the table
          },
          error: function (oError) { }
        });
      },

      /** search Demand Permit from Table Select dialog
       * @public
       * @param {sap.ui.base.Event} oEvent
       */
      handleSearchPermit: function (oEvent) {
        const sValue = oEvent.getParameter("value");
        const oSource = oEvent.getSource();
        let oBindingInfo = oSource.getBindingInfo("items");
        if (sValue) {
          const sSearchTerm = "*" + sValue + "*";
          oBindingInfo.parameters = {
            custom: {
              search: sSearchTerm
            }
          };
        } else {
          oBindingInfo.parameters = {};
        }
        oSource.bindItems(oBindingInfo);
      },

      /**
       * Method to return Confirmation Message(Delete)
       * @public
       * @param {event} oBeforeLineItemDeleteProperties s
       * @returns {msg} oMessageText
       */
      beforeLineItemDeleteExtension: function (
        oBeforeLineItemDeleteProperties
      ) {
        const oMessageText = {
          text: "Are you sure you want to delete the row? This action cannot be undone."
        };
        return oMessageText;
      },

      onPressBuildingType: function (oEvent) {

        const iSelectedIndex = oEvent.getParameter("selectedIndex");

        let oPayload = {
          "resi_low_hidden": true,
          "resi_high_med_hidden": true,
          "non_resi_existing_hidden": true,
          "non_resi_vacant_hidden": true,
          "res_type": "",
          "nres_type": "",
          "cil_build_type": "MXD",
          "residential_hidden": true,
          "non_resi_hidden": true
        };
        if (iSelectedIndex === 0) {
          oPayload.cil_build_type = "RES";
        } else if (iSelectedIndex === 1) {
          oPayload.cil_build_type = "NRS";
        } else {
          oPayload.cil_build_type = "MXD";
        }
        this._doUpdateCILSection(oEvent, oPayload);
      },

      onPressRBGrpResType: function (oEvent) {
        const iSelectedIndex = oEvent.getParameter("selectedIndex");
        let oPayload = {
          "resi_low_hidden": true,
          "resi_high_med_hidden": true,
          "non_resi_existing_hidden": true,
          "non_resi_vacant_hidden": true,
          "res_type": "",
          "residential_hidden": false,
          "non_resi_hidden": true
        };
        if (iSelectedIndex === 0) {
          //For Payload 
          oPayload.res_type = "HDE";
          oPayload.resi_high_med_hidden = false;
          oPayload.resi_low_hidden = true;
        } else if (iSelectedIndex === 1) {
          //For Payload 
          oPayload.res_type = "MDE";
          oPayload.resi_high_med_hidden = false;
          oPayload.resi_low_hidden = true;
        } else {
          //For Payload 
          oPayload.res_type = "LDE";
          oPayload.resi_high_med_hidden = true;
          oPayload.resi_low_hidden = false;
        }
        // Do the Update Call
        this._doUpdateCILSection(oEvent, oPayload);
      },

      onPressRBGrpNResType: function (oEvent) {
        const iSelectedIndex = oEvent.getParameter("selectedIndex");
        let oPayload = {
          "resi_low_hidden": true,
          "resi_high_med_hidden": true,
          "non_resi_existing_hidden": true,
          "non_resi_vacant_hidden": true,
          "nres_type": "",
          "residential_hidden": true,
          "non_resi_hidden": false
        };
        if (iSelectedIndex === 0) {
          //For Payload 
          oPayload.nres_type = "VAC";
          oPayload.non_resi_existing_hidden = true;
          oPayload.non_resi_vacant_hidden = false;
        } else {
          //For Payload 
          oPayload.nres_type = "EXT";
          oPayload.non_resi_existing_hidden = false;
          oPayload.non_resi_vacant_hidden = true;
        }
        this._doUpdateCILSection(oEvent, oPayload);
      },

      cilApplicableChanged: function (oEvent) {
        const oSource = oEvent.getSource();
        const oBindingContext = oSource.getBindingContext();
        const sPath = oBindingContext.getPath();
        const oModel = this.getView().getModel();
        const bCilApplicable = oEvent.getParameter("selected");
        let oPayload = {
          "cil_applicable": bCilApplicable
        };
        this._removePendingChanges(oModel);
        oModel.update(sPath, oPayload, {
          success: function (oData, oResponse) {
            oModel.refresh();
          },
          error: function (oError) {
            let sErrorMsg = "";
            if (oError.responseText) {
              sErrorMsg = JSON.parse(oError.responseText).error
                .message.value;
            } else {
              sErrorMsg = this.oI18n.getText("msgErrorFail");
            }
            MessageBox.error(sErrorMsg);
          }.bind(this)
        });
      },
      //UPDATE CALL
      onUpdateResGFA: function (oEvent) {
        let oPayload = {
          "res_gfa": parseInt(oEvent.getParameter("newValue").replaceAll(",", ""))
        };
        this._doUpdateCILSection(oEvent, oPayload);
      },

      onUpdateNresGFA: function (oEvent) {
        let oPayload = {
          "nres_gfa": parseInt(oEvent.getParameter("newValue").replaceAll(",", ""))
        };
        this._doUpdateCILSection(oEvent, oPayload);
      },

      /**
      * Formatter to enable/disable NRes Type radio button
      * incase nresgfa is less than 20% then disable
      * @public
      * @param {string} sBuildType value
      * @param {string} sNGFAPer value
      * @returns {state} State
      */
      onShowNResType: function (sBuildType, sNGFAPer) {
        if (sBuildType === "MXD") {
          if (parseFloat(sNGFAPer) > 20) {
            return true;
          } else {
            return false;
          }
        } else {
          return true;
        }
      },

      _removePendingChanges: function (oModel) {
        //Remove Pending Changes
        const oPendingChanges = oModel.getPendingChanges();
        for (let key in oPendingChanges) {
          if (key.indexOf("zgc_c_cil_cal") > -1) {
            oModel.resetChanges([`/${key}`]);
          }
        }
      },

      _doUpdateCILSection: function (oEvent, oPayload) {
        const oView = sap.ui.getCore().byId("com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests");
        oView.setBusy(true);
        oView.setBusyIndicatorDelay(0);
        const oSource = oEvent.getSource();
        const oBindingContext = oSource.getBindingContext();
        const sPath = oBindingContext.getPath();
        const bIsActiveEntity = oBindingContext.getProperty("IsActiveEntity");
        const oModel = this.getView().getModel();
        this._removePendingChanges(oModel);

        const sCilCalPath = `/${oModel.createKey(
          "zgc_c_cil_cal",
          {
            cil_uuid:
              sPath.substr(30, 36),
            IsActiveEntity: bIsActiveEntity
          }
        )}`;
        oModel.update(sCilCalPath, oPayload, {
          success: function (oData, oResponse) {
            oModel.refresh();
            oView.setBusy(false);
          },
          error: function (oError) {
            oView.setBusy(false);
            let sErrorMsg = "";
            if (oError.responseText) {
              sErrorMsg = JSON.parse(oError.responseText).error
                .message.value;
            } else {
              sErrorMsg = this.oI18n.getText("msgErrorFail");
            }
            MessageBox.error(sErrorMsg);
          }.bind(this)
        });

      },

      onPressRBGrpMngrAppReq: function (oEvent) {
        let oPayload = {
          "mgr_apr_reqd": false
        };
        const iSelectedIndex = oEvent.getParameter("selectedIndex");
        if (iSelectedIndex === 0) {
          oPayload.mgr_apr_reqd = true;
        } else {
          oPayload.mgr_apr_reqd = false;
        }
        this._doUpdateCILSection(oEvent, oPayload);
      },

      onUpdateAssoPayment: function (oEvent) {
        this._prepareSideEffects(oEvent);
      },



      _prepareSideEffects: function (oEvent) {
        //Setup Side effect - copied from smartfield/SideEffectsUtil.js
        //For a custom column or field, to trigger side effects,
        // 1. The view should have custom data indicating the side effect and fieldgroupid
        // 2. The custom control should have corresponding fieldgroupid
        const oInput = oEvent.getSource();

        //THis column is used in multiple tables. FInd where is it coming from
        const sEntitySet = oInput.getBindingContext().getPath().split("(")[0].substring(1);
        switch (sEntitySet) {
          case "zgc_c_dc_calcltns":
            var originName = "zgc_c_dc_calcltnsType";
            var annotationName = "com.sap.vocabularies.Common.v1.SideEffects#DCRateChanged";
            break;
          case "zgc_c_dc_exms":
            originName = "zgc_c_dc_exmsType";
            annotationName = "com.sap.vocabularies.Common.v1.SideEffects#DCTableExemptionDCRateUpdated";
            break;
          case "zgc_c_dc_demos":
            originName = "zgc_c_dc_demosType";
            annotationName = "com.sap.vocabularies.Common.v1.SideEffects#DemoTableChanged";
            break;
          case "ZGC_C_DC_CAL_SPEC":
            originName = "ZGC_C_DC_CAL_SPECType";
            annotationName = "com.sap.vocabularies.Common.v1.SideEffects#DCSpecuTableChanged";
            break;
          case "zgc_c_payments":
            originName = "zgc_c_paymentsType";
            annotationName = "com.sap.vocabularies.Common.v1.SideEffects#PaymentNumberChanged";
            break;
          case "zgc_c_requests":
            originName = "zgc_c_requestsType";
            annotationName = "com.sap.vocabularies.Common.v1.SideEffects#CILAssocaitedPaymentChanged";
        }
        const oView = sap.ui.getCore().byId("com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests");
        const oID = {
          name: annotationName,
          originType: "entityType",
          originName: originName,
          originNamespace: "ZGC_C_REQUESTS_CDS",
          context: oEvent.getSource().getBindingContext().getPath()
        };

        let sID = JSON.stringify(oID);
        oID.contextObject = oEvent.getSource().getBindingContext();
        sID = sID.substring(1, sID.length - 2);
        let sUUID = oView.data(sID);
        function uuidv4() {
          return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
          );
        }
        if (!sUUID) {
          sUUID = uuidv4();
          oView.data(sUUID, oID);
          oView.data(sID, sUUID);
        }
        oInput.setFieldGroupIds([sUUID]);
      },

      /**
       * Handler for DN Value F4 Input fields
       * @public
       * @param {sap.ui.base.event} oEvent Event for the input field
       * @param {string} label of the associated field
       */
      onDNValueHelpRequested: function (oEvent) {
        this._prepareSideEffects(oEvent);
        this.VHInput = oEvent.getSource();
        const fragment = Fragment.load({
          name: "com.gc.dashboard.ext.fragment.DocumentNoValueHelp",
          controller: this
        });
        //Date filter
        const sInvoiceNumber = this.getView()
          .getBindingContext()
          .getObject().invoice_number;
        const invoiceFilter = new Filter(
          "doc_ref",
          "EQ",
          sInvoiceNumber
        );

        this.Filters = [invoiceFilter];
        fragment.then(
          function (oDialog) {
            this._oDNValueHelpDialog = oDialog;
            this.getView().addDependent(oDialog);
            oDialog.getTableAsync().then(
              function (oTable) {
                oTable.setModel(this.getView().getModel());
                // For Desktop and tabled the default table is sap.ui.table.Table
                if (oTable.bindRows) {
                  // Bind rows to the ODataModel and add columns
                  oTable.bindRows({
                    path: "/ZGC_PAY_DOC_VH",
                    filters: this.Filters,
                    events: {
                      dataReceived: function () {
                        oDialog.update();
                      }
                    }
                  });
                  const documentNoTemplate = new Text({
                    text: "{document_no}"
                  });
                  const ccTemplate = new Text({
                    text: "{company_code}"
                  });
                  const fyTemplate = new Text({ text: "{fiscal_year}" });

                  oTable.addColumn(
                    new UIColumn({
                      label: "Payment Document #",
                      template: documentNoTemplate
                    })
                  );
                  oTable.addColumn(
                    new UIColumn({
                      label: "Company Code",
                      template: ccTemplate
                    })
                  );
                  oTable.addColumn(
                    new UIColumn({
                      label: "Fiscal Year",
                      template: fyTemplate
                    })
                  );
                }
                oDialog.update();
              }.bind(this)
            );
            oDialog.open();
          }.bind(this)
        );
      },

      onValueHelpRequested: function (oEvent) {
        this._prepareSideEffects(oEvent);
        this.VHInput = oEvent.getSource();

        var fragment = sap.ui.core.Fragment.load({
          name: "com.gc.dashboard.ext.fragment.DCRateValueHelp",
          controller: this
        });

        // 1. GET DATA
        var oRowContext = oEvent.getSource().getBindingContext();
        var oHeaderContext = this.getView().getBindingContext();

        // Existing Date Properties
        var sInvoiceDate = oHeaderContext.getProperty("invoice_calculation_date");
        var sSitePlanAppDate = oHeaderContext.getProperty("site_plan_applied_date");

        // --- DEBUGGING VARIABLES ---
        var sStatus = oHeaderContext.getProperty("status");
        var sOccupancyDate = oHeaderContext.getProperty("occupancy_date");

        console.log("---------------- VALUE HELP DEBUG ----------------");
        console.log("Current Status:", sStatus);
        console.log("Occupancy Date:", sOccupancyDate);
        console.log("Invoice Date:", sInvoiceDate);
        // ---------------------------

        var sRowPartner = oRowContext.getProperty("dc_partner");
        var sCurrentDcType = oRowContext.getProperty("dc_type");

        // --- FIX: ROBUST PARTNER DETECTION ---
        if (!sRowPartner && sCurrentDcType) {
          if (sCurrentDcType.startsWith("MISS")) { sRowPartner = "COM"; }
          else if (sCurrentDcType.startsWith("REG")) { sRowPartner = "ROP"; }
          else if (sCurrentDcType.startsWith("PEEL")) { sRowPartner = "PDSB"; }
          else if (sCurrentDcType.startsWith("DP")) { sRowPartner = "DPCSB"; }
          else if (sCurrentDcType.startsWith("GO")) { sRowPartner = "GO"; }
        }

        // Default: Prevailing (Invoice Date)
        var sFilterDate = sInvoiceDate;

        // 2. LOGIC: Check Locked vs Prevailing
        if (sRowPartner && sSitePlanAppDate && this._oBill17List) {
          var aItems = this._oBill17List.getItems();
          for (var i = 0; i < aItems.length; i++) {
            var oItemContext = aItems[i].getBindingContext();
            if (oItemContext) {
              var oData = oItemContext.getObject();
              var bMatch = (oData.id === sRowPartner) || (oData.name === sRowPartner) || (oData.id && sRowPartner && oData.id.indexOf(sRowPartner) > -1);

              if (bMatch) {
                if (oData.calc_option === "L") {
                  sFilterDate = sSitePlanAppDate;
                  console.log(">> Logic: Bill 17 Locked Date Applied");
                }
                break;
              }
            }
          }
        }

        // --- 3. STATUS OVERRIDE LOGIC ---
        // Make sure sStatus matches exactly 'FIN_APR' (case sensitive)
        var aOverrideStatuses = ["DC1_APR", "FIN_APR", "DC1_APR", "FIN_PND", "CLSD", "PCLSD"];

        if (aOverrideStatuses.includes(sStatus) && sOccupancyDate) {
          sFilterDate = sOccupancyDate;
          console.log(">> Logic: Status Override Applied (" + sStatus + ")! Using Occupancy Date.");
        }
        // -----------------------------

        // Fallback
        if (!sFilterDate) { sFilterDate = new Date(); }

        console.log(">> FINAL DATE SENT TO BACKEND:", sFilterDate);
        console.log("--------------------------------------------------");

        // 4. FILTERS
        var startDateFilter = new sap.ui.model.Filter("start_date", "LE", sFilterDate);
        var endDateFilter = new sap.ui.model.Filter("end_date", "GE", sFilterDate);
        var dcFilter = new sap.ui.model.Filter("dc_type", "EQ", sCurrentDcType || "");

        this.rateFilters = [startDateFilter, endDateFilter, dcFilter];

        fragment.then(function (oDialog) {
          this._oValueHelpDialog = oDialog;
          this.getView().addDependent(oDialog);

          oDialog.getTableAsync().then(function (oTable) {
            oTable.setModel(this.getView().getModel());
            if (oDialog.setKey) { oDialog.setKey("dc_rate"); }
            this.getView().getModel("LocalModel").setProperty("/busy", false);

            if (oTable.bindRows) {
              oTable.bindRows({
                path: "/zgc_dcrates_vh",
                filters: this.rateFilters
              });

              var dcRateTemplate = new sap.m.Text({ text: "{ path: 'dc_rate', type: 'sap.ui.model.type.Float', formatOptions: {minFractionDigits: 2, maxFractionDigits: 2}}" });
              var startDateTemplate = new sap.m.Text({ text: "{path: 'start_date', type: 'sap.ui.model.type.Date', formatOptions: {datePattern: 'MM/dd/yyyy'}}" });
              var endDateTemplate = new sap.m.Text({ text: "{path: 'end_date', type: 'sap.ui.model.type.Date', formatOptions: {datePattern: 'MM/dd/yyyy'}}" });
              var rateComments = new sap.m.Text({ text: "{rate_note}" });

              oTable.addColumn(new sap.ui.table.Column({ label: "DC Rate", template: dcRateTemplate }));
              oTable.addColumn(new sap.ui.table.Column({ label: "Valid From", template: startDateTemplate }));
              oTable.addColumn(new sap.ui.table.Column({ label: "Valid To", template: endDateTemplate }));
              oTable.addColumn(new sap.ui.table.Column({ label: "Comments", template: rateComments }));
            }
            oDialog.update();
          }.bind(this));
          oDialog.open();
        }.bind(this));
      },
      onCILRateValueHelpOkPress: function (oEvent) {
        let selectedValue = oEvent.getParameter("tokens")[0].getKey();
        //Convert to integer
        selectedValue = Math.trunc(selectedValue);
        this.VHInput.setValue(selectedValue);
        oEvent.getSource().close();
      },
      onDNValueHelpOkPress: function (oEvent) {
        let selectedValue = oEvent.getParameter("tokens")[0].getKey();
        this.VHInput.setValue(selectedValue);
        oEvent.getSource().close();
      },

      // This MUST exist for selection to work
      onValueHelpOkPress: function (oEvent) {
        // 1. Get the Selected Key (This comes from oDialog.setKey("dc_rate"))
        var aTokens = oEvent.getParameter("tokens");

        if (aTokens && aTokens.length > 0) {
          var selectedValue = aTokens[0].getKey();
          // 2. Format and Set Value
          selectedValue = parseFloat(selectedValue).toFixed(2);
          this.VHInput.setValue(selectedValue);
        }
        // 3. Close
        oEvent.getSource().close();
      },

      onValueHelpCancelPress: function (oEvt) {
        oEvt.getSource().close();
      },

      onValueHelpAfterClose: function (oEvt) {
        oEvt.getSource().destroy();
      },
      // **************************************STATUS CHANGES ****************************
      /**
       * Formatter to control state of CIL Processflow
       * @public
       * @param {string} sStatus value
       * @returns {state} State
       */
      getStatusStateForCIL: function (sStatus) {
        if (sStatus === "INP") {
          return "Information";
        } else if (sStatus === "CIL1_PND" || sStatus === "CIL2_PND") {
          return "Warning";
        } else if (sStatus === "CIL1_REJ" || sStatus === "CIL2_REJ" || sStatus === "FIN_REJ") {
          return "Error";
        } else if (sStatus === "CIL_APR" || sStatus === "FIN_APR" || sStatus === "FIN_PND") {
          return "Success";
        } else if (sStatus === "CLSD" || sStatus === "PCLSD") {
          return "Success";
        } else {
          return "None";
        }
      },

      /**
       * Formatter to control state of CBC Processflow
       * @public
       * @param {string} sStatus value
       * @returns {state} State
       */
      getStatusStateForCBC: function (sStatus) {
        if (sStatus === "INP" || sStatus === "CIL1_PND" || sStatus === "CIL2_PND" || sStatus === "CIL1_REJ" || sStatus === "CIL2_REJ" || sStatus === "CIL_APR") {
          return "Information";
        } else if (sStatus === "FIN_PND") {
          return "Warning";
        } else if (sStatus === "FIN_REJ") {
          return "Error";
        } else if (sStatus === "FIN_APR") {
          return "Success";
        } else if (sStatus === "CLSD" || sStatus === "PCLSD") {
          return "Success";
        } else {
          return "None";
        }
      },

      /**
       * Formatter to control state of DC Processflow
       * @public
       * @param {string} sStatus value
       * @returns {state} State
       */
      getStatusStateForDC: function (sStatus) {
        if (sStatus === "INP" || sStatus === "CIL1_PND" || sStatus === "CIL2_PND" || sStatus === "CIL1_REJ" || sStatus === "CIL2_REJ" || sStatus === "CIL_APR") {
          return "Information";
        } else if (sStatus === "FIN_PND") {
          return "Warning";
        } else if (sStatus === "FIN_REJ") {
          return "Error";
        } else if (sStatus === "FIN_APR") {
          return "Success";
        } else if (sStatus === "CLSD" || sStatus === "PCLSD") {
          return "Success";
        } else {
          return "None";
        }
      },

      /**
       * Formatter to control state of Closed Processflow
       * @public
       * @param {string} sStatus value
       * @returns {state} State
       */
      getStatusStateForClosed: function (sStatus) {
        if (sStatus === "INP") {
          return "Information";
        } else if (sStatus === "CIL1_PND" || sStatus === "CIL2_PND" || sStatus === "FIN_PND") {
          return "Warning";
        } else if (sStatus === "CIL1_REJ" || sStatus === "CIL2_REJ" || sStatus === "FIN_REJ") {
          return "Error";
        } else if (sStatus === "CIL_APR" || sStatus === "FIN_APR") {
          return "Success";
        } else if (sStatus === "CLSD" || sStatus === "PCLSD") {
          return "Success";
        } else {
          return "None";
        }
      },

      /**
             * Formatter to control state of Closed Processflow
             * @public
             * @param {string} sStatus value
             * @returns {state} State
             */
      showStatusPClosed: function (sStatus) {
        if (sStatus === "PCLSD") {
          return "None";
        }
        return "None";
      },

      /**
       * Formatter to control state of Hold Processflow
       * @public
       * @param {string} sStatus value
       * @returns {state} State
       */
      getStatusStateForHold: function (sStatus) {
        if (sStatus === "HLD") { return "None"; }
        return "None";
      },

      _oModelRead: function (sURl, oLocalModel, sStatusTxt) {
        this.getView().getModel().read(sURl, {
          urlParameters: {
            $orderby: "action_on desc",
            $top: 1
          },
          success: function (odata, response) {

            oLocalModel.setProperty("/", odata.results[0]);
            oLocalModel.setProperty("/action_txt", sStatusTxt);
            oLocalModel.setProperty("/busy", false);
          },
          error: function (oError) {
            var sErrorMsg = "";
            oLocalModel.setProperty("/busy", false);
            if (oError.responseText) {
              sErrorMsg = oError.statusCode + " - " + oError.statusText;
            } else {
              sErrorMsg = this.oI18n.getText("msgErrorFail");
            }
            // MessageToast.show(sErrorMsg);
          }.bind(this)
        });
      },

      openMilestoneDialog: function (oEvent, sSelectedItem) {
        this.status1 = oEvent.getSource();
        const fragment = Fragment.load({
          name: "com.gc.dashboard.ext.fragments.StatusMicroDialog",
          controller: this
        });
        const oLocalModel = new JSONModel({
        });
        this.getView().setModel(oLocalModel, "StatusModel");
        oLocalModel.setProperty("/busy", true);
        fragment.then(
          function (oDialog) {
            this.getView().addDependent(oDialog);
            const sPath = this.status1.getBindingContext().getPath() + "/to_reqhstry";
            const sStatus = this.status1.getBindingContext().getProperty("status");
            const sStatusTxt = this.status1.getBindingContext().getProperty("status_Text");
            if (sStatus !== "INP") {
              this._oModelRead(sPath, oLocalModel, sStatusTxt);
            } else {
              oLocalModel.setProperty("/", { "action_txt": sStatusTxt });
            }
            oDialog.openBy(this.status1);
          }.bind(this));
      },

      //  Change: Updated logic to inverse greying based on Permit Issued status
      _onDcTableDataReceived: function (oEventOrTable) {
        var oTable;
        if (oEventOrTable.getSource) {
          oTable = oEventOrTable.getSource(); // Event
        } else {
          oTable = oEventOrTable; // Direct Control
        }

        // 1. Get Permit Issued Status
        var bPermitIssued = false;
        if (this.getView().getBindingContext()) {
          bPermitIssued = this.getView().getBindingContext().getProperty("permit_issued");
        }

        var aRows = oTable.getRows();

        aRows.forEach(function (oRow) {
          var oContext = oRow.getBindingContext();
          if (oContext) {
            var oRowData = oContext.getObject();

            // 2. Determine Logic
            // If Permit Issued (True)  AND is_bill17 (False) -> Grey Out (True)
            // If Permit Issued (False) AND is_bill17 (True)  -> Grey Out (True)
            // This is an inequality check (!==)
            var bShouldGrey = false;
            if (oRowData) {
              bShouldGrey = (!!bPermitIssued !== !!oRowData.is_bill17_appl);
            }

            if (bShouldGrey) {
              oRow.addStyleClass("greyedOutRow");
            } else {
              oRow.removeStyleClass("greyedOutRow");
            }
          }
        });
      },

      _onPropertyChange: function (oEvent) {
        var sPath = oEvent.getParameter("path");
        var oValue = oEvent.getParameter("value");
        var oContext = oEvent.getParameter("context");



        // Payment Information, is bill17 applicable
        // Inside _onPropertyChange
        if (sPath === "is_bill17_appl") {
          this._updateBill17ListState();
          // >>> FIX: Pass 'undefined' for Permit (to look it up) and 'oValue' for Bill 17 override
           this._updatePartnerFieldState(undefined, oValue);

          if (oValue === true) {
            sap.m.MessageBox.warning(
              "Saving this would create a new version and Bill 17 changes would be applicable in that version.\n\nDo you want to proceed?",
              {
                title: "Create New Version?",
                actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],

                // --- FIX STARTS HERE ---
                onClose: function (sAction) {
                  if (sAction === sap.m.MessageBox.Action.OK) {
                    // this._triggerCreateNewVersion(oContext);
                    // The checkbox stays checked (true), and waits for the user to click "Save".
                  } else {
                    // User clicked Cancel: Revert Checkbox
                    this.getView().getModel().setProperty(oContext.getPath() + "/" + sPath, false);
                    this.getView().getModel().resetChanges([oContext.getPath() + "/" + sPath]);
                  }
                }.bind(this)
                // --- FIX ENDS HERE ---
              }
            );
          }
        }
        // --- Logic 1: Permit Issued ---
        if (sPath === "permit_issued") {

          // A. Update Field State (Existing)
          if (this._updatePartnerFieldState) {
            this._updatePartnerFieldState(oValue);
          }
          this._updatePaymentDocFieldState(); // Bill 17 payment grey out of fields

          // ##$ Change: Immediately refresh table colors based on new value
          this._refreshAllTableStyles();

          // B. Popup Logic
          if (oValue === true) {
            var that = this;
            MessageBox.warning(
              "Once Permit Issued is selected, it cannot be unchecked.\n\nAs permit issued is selected you can't add or delete the Deferral Partners.",
              {
                title: "Warning",
                actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
                onClose: function (sAction) {
                  if (sAction === MessageBox.Action.CANCEL) {
                    // Revert
                    var sFullPath = oContext.getPath() + "/permit_issued";
                    that.getView().getModel().setProperty(sFullPath, false);
                    that.getView().getModel().resetChanges([sFullPath]);

                    if (that._updatePartnerFieldState) {
                      that._updatePartnerFieldState(false);
                    }

                    // ##$ Change: Revert table colors back to original state
                    that._refreshAllTableStyles();

                  } else {
                    // Lock
                    that._disablePermitIssuedField(true);
                  }
                }
              }
            );
          }
        }

        // --- Logic 2: DC Clearance Date ---
        if (sPath === "dc_clearance_date") {
          this._updatePaymentDocFieldState(); // Bill 17 payment grey out of fields
          MessageBox.warning("Once you save the request, you will not be able to edit the DC Clearance Date.");
        }

        // --- Logic 3: Occupancy Clearance Date (NEW) ---
        if (sPath === "occupancy_clearance_date") {
          MessageBox.warning("Once you save the request, you will not be able to edit the Occupancy Clearance Date.");
        }
      },

_updatePartnerFieldState: function (bPermitIssued, bIsBill17Override) {
    // 1. Find the Control
    var sRelativeId = "DCHeader-FG2::to_defpartner::id::MultiInput";
    var oSmartField = this.getView().byId(sRelativeId);

    if (!oSmartField) return;

    // 2. Get Context Data
    var oContext = this.getView().getBindingContext();
    var sStatus = oContext ? oContext.getProperty("status") : "";

    // --- FIX: PRIORITY TO OVERRIDE VALUE ---
    // If the checkbox just changed, use the new value passed in. 
    // Otherwise, read from the model.
    var bIsBill17;
    if (bIsBill17Override !== undefined) {
        bIsBill17 = bIsBill17Override;
    } else {
        bIsBill17 = oContext ? oContext.getProperty("is_bill17_appl") : false;
    }
    // ----------------------------------------

    // Safety: If bPermitIssued is undefined, try to read it from context
    if (bPermitIssued === undefined && oContext) {
        bPermitIssued = oContext.getProperty("permit_issued");
    }

    // 3. Define Logic
    var aStandardRestrictedStatuses = ["FIN_APR", "DC1_APR", "FIN_PND", "CLSD", "PCLSD", "HLD", "FIN_REJ"];
    var aBill17RestrictedStatuses = ["CLSD", "PCLSD", "HLD", "FIN_REJ"]; 

    // 4. Force Editable on the Wrapper
    oSmartField.setEditable(true);

    // 5. Apply Logic
    var fnFix = function () {
        var aInner = oSmartField.getInnerControls();
        if (aInner && aInner.length > 0) {
            var oCtrl = aInner[0];
            var bFinalEnabledState = true;

            if (bIsBill17) {
                // SCENARIO 1: BILL 17 IS ACTIVE
                if (aBill17RestrictedStatuses.includes(sStatus) || bPermitIssued) {
                    bFinalEnabledState = false; 
                }
            } else {
                // SCENARIO 2: STANDARD (OLD LOGIC)
                if (aStandardRestrictedStatuses.includes(sStatus) || bPermitIssued) {
                    bFinalEnabledState = false; 
                }
            }

            if (oCtrl.setEnabled) oCtrl.setEnabled(bFinalEnabledState);
            if (oCtrl.setEditable) oCtrl.setEditable(bFinalEnabledState);

            // Tokenizer Fix
            if (oCtrl.getAggregation) {
                var oTokenizer = oCtrl.getAggregation("tokenizer");
                if (oTokenizer) {
                    if (oTokenizer.setRenderMode) oTokenizer.setRenderMode("Loose");
                    oTokenizer.addEventDelegate({
                        onAfterRendering: function () {
                            if (this.getRenderMode() !== "Loose") this.setRenderMode("Loose");
                        }
                    }, oTokenizer);
                }
            }
        }
    };

    fnFix();
    oSmartField.detachEvent("innerControlsCreated", fnFix);
    oSmartField.attachEvent("innerControlsCreated", fnFix);
},

      _forceFullTokenDisplay: function () {
        var sRelativeId = "DCHeader-FG2::to_defpartner::id::MultiInput";
        var oSmartField = this.getView().byId(sRelativeId);

        if (oSmartField) {
          // Define the fix logic
          var fnApplyLooseMode = function () {
            var aInner = oSmartField.getInnerControls();
            if (aInner && aInner.length > 0) {
              var oMultiInput = aInner[0];

              // Access the internal Tokenizer of the MultiInput
              if (oMultiInput.getAggregation) {
                var oTokenizer = oMultiInput.getAggregation("tokenizer");
                if (oTokenizer) {

                  // 1. Apply "Loose" mode immediately (Forces wrapping)
                  if (oTokenizer.setRenderMode && oTokenizer.getRenderMode() !== "Loose") {
                    oTokenizer.setRenderMode("Loose");
                  }

                  // 2. Add a "Watchdog" (Delegate) to keep it Loose forever
                  // Fiori loves to reset this on re-render, so we force it back every time.
                  if (!oTokenizer._bLooseDelegateAdded) {
                    oTokenizer.addEventDelegate({
                      onAfterRendering: function () {
                        if (this.getRenderMode() !== "Loose") {
                          this.setRenderMode("Loose");
                        }
                      }
                    }, oTokenizer);
                    oTokenizer._bLooseDelegateAdded = true;
                  }
                }
              }
            }
          };

          // Run immediately
          fnApplyLooseMode();

          // Also attach to the SmartField's creation event to catch it if it redraws later
          oSmartField.detachEvent("innerControlsCreated", fnApplyLooseMode);
          oSmartField.attachEvent("innerControlsCreated", fnApplyLooseMode);
        }
      },
      // Helper to disable the Permit Issued field itself
      _disablePermitIssuedField: function (bDisable) {
        // 1. Try to find the field using the binding path "permit_issued"
        // This is safer than guessing the ID (e.g. PaymentInfo_FG vs PayHeader)
        var aControls = this.getView().findAggregatedObjects(true, function (oControl) {
          return oControl.getBindingPath && oControl.getBindingPath("value") === "permit_issued";
        });

        // 2. If found, set Enabled/Editable to false
        if (aControls.length > 0) {
          var oControl = aControls[0];
          if (oControl.setEnabled) {
            oControl.setEnabled(!bDisable);
          } else if (oControl.setEditable) {
            oControl.setEditable(!bDisable);
          }
        }
      },



      // ====================================================================
      //  STATUS PILL & COLOR CODING LOGIC (DYNAMIC BILL 17)
      // ====================================================================
      // ====================================================================
      //  STATUS PILL & COLOR CODING LOGIC (FIXED: ENABLE FINAL PILL FOR STANDARD)
      // ====================================================================

      _isBill17Active: function (vDefPartner) {
        if (!vDefPartner) return false;
        if (vDefPartner.results && vDefPartner.results.length > 0) return true;
        if (Array.isArray(vDefPartner) && vDefPartner.length > 0) return true;
        return false;
      },

      // --- 1. CIL PILL ---
      getStatusStateForCIL: function (sStatus) {
        if (sStatus === "WITHDRAWN") return "None"; // Grey

        if (sStatus === "CIL1_PND" || sStatus === "CIL2_PND") return "Warning";
        if (sStatus === "CIL1_REJ" || sStatus === "CIL2_REJ" || sStatus === "FIN_REJ") return "Error";
        if (sStatus === "CIL_APR" || sStatus === "FIN_APR" || sStatus === "FIN_PND" ||
          sStatus === "DC1_APR" || sStatus === "DC1_PND" || sStatus === "CLSD" || sStatus === "PCLSD") return "Success";

        return "Information";
      },

      // --- 2. GENERIC DC PILL ---
      _isDCPillVisible: function (bDcApplicable, vDefPartner) {
        if (this._isBill17Active(vDefPartner)) return false;
        return !!bDcApplicable;
      },

      getStatusStateForDC: function (sStatus) {
        if (sStatus === "WITHDRAWN") return "None";

        if (sStatus === "FIN_PND" || sStatus === "DC1_PND") return "Warning";
        if (sStatus === "FIN_REJ" || sStatus === "DC1_REJ") return "Error";
        if (sStatus === "FIN_APR" || sStatus === "DC1_APR" || sStatus === "CLSD" || sStatus === "PCLSD") return "Success";
        return "Information";
      },

      // --- 3. BILL 17: LEVEL 1 PILL ---
      _isBill17PillVisible: function (vDefPartner, sStatus) {
        // Level 1 is STRICTLY for Bill 17
        if (!this._isBill17Active(vDefPartner)) return false;

        var aVisibleStatuses = [
          "DC1_PND", "DC1_APR", "DC1_REJ",
          "FIN_PND", "FIN_APR", "FIN_REJ",
          "CLSD", "PCLSD", "HLD",
          "WITHDRAWN"
        ];
        return aVisibleStatuses.includes(sStatus);
      },

      getBill17Level1State: function (sStatus) {
        if (sStatus === "WITHDRAWN") return "None";

        if (sStatus === "DC1_PND") return "Information";
        if (sStatus === "DC1_REJ") return "Error";
        return "Success";
      },

      getBill17Level1Text: function (sStatus) {
        if (sStatus === "DC1_PND") return "DC Level 1 Approval";
        if (sStatus === "DC1_REJ") return "DC Level 1 Rejected";
        // History text for all other states
        return "DC Level 1 Approved";
      },

      // --- 4. BILL 17: FINAL APPROVAL PILL (RENAMED MENTALLY TO 'FINAL PILL') ---
      _isBill17FinalPillVisible: function (vDefPartner, sStatus) {
        // FIX: REMOVED STRICT BILL 17 CHECK.
        // This pill should show for Standard Cases too if they are Approved.

        var aVisibleStatuses = [
          "DC1_APR", // Bill 17 specific Pending
          "FIN_PND", // Generic Pending
          "FIN_APR", // Generic Approved
          "CLSD", "PCLSD"
        ];

        return aVisibleStatuses.includes(sStatus);
      },

      getBill17FinalPillState: function (sStatus) {
        if (sStatus === "WITHDRAWN") return "None";
        if (sStatus === "DC1_APR") return "Information"

        if (sStatus === "FIN_PND") return "Warning"; // Pending
        if (sStatus === "FIN_APR" || sStatus === "CLSD" || sStatus === "PCLSD") return "Success";
        return "None";
      },

      getBill17FinalPillText: function (sStatus) {
        if (sStatus === "DC1_APR" || sStatus === "FIN_PND") return "Final Approval";
        return "Final Approved";
      },

      // --- 5. CBC PILL ---
      getStatusStateForCBC: function (sStatus) {
        if (sStatus === "WITHDRAWN") return "None";

        if (sStatus === "FIN_PND" || sStatus === "DC1_APR") return "Warning";
        if (sStatus === "FIN_REJ") return "Error";
        if (sStatus === "FIN_APR" || sStatus === "CLSD" || sStatus === "PCLSD") return "Success";
        return "Information";
      },

      // --- 6. SEPARATOR LOGIC ---
      _isStatusPillVisible: function (sStatus) {
        if (sStatus === "WITHDRAWN") return false;
        return sStatus === "CLSD" || sStatus === "PCLSD" || sStatus === "HLD";
      },

      getSeparatorForCIL: function (bDc, vDefPartner, bCbc, sStatus) {
        // Do not force return false on Withdrawn, rely on next pill visibility
        var bGenericDcVisible = this._isDCPillVisible(bDc, vDefPartner);
        var bBill17Visible = this._isBill17PillVisible(vDefPartner, sStatus) || this._isBill17FinalPillVisible(vDefPartner, sStatus);

        return !!(bGenericDcVisible || bBill17Visible || bCbc || this._isStatusPillVisible(sStatus));
      },

      getSeparatorForDC: function (vDefPartner, bCbc, sStatus) {
        var bBill17Visible = this._isBill17PillVisible(vDefPartner, sStatus) || this._isBill17FinalPillVisible(vDefPartner, sStatus);
        return !!(bBill17Visible || bCbc || this._isStatusPillVisible(sStatus));
      },

      getSeparatorForBill17: function (vDefPartner, bCbc, sStatus) {
        var bFinalVisible = this._isBill17FinalPillVisible(vDefPartner, sStatus);
        return !!(bFinalVisible || bCbc || this._isStatusPillVisible(sStatus));
      },

      getSeparatorForBill17Final: function (bCbc, sStatus) {
        return !!(bCbc || this._isStatusPillVisible(sStatus));
      },

      getSeparatorForCBC: function (sStatus) {
        return !!(this._isStatusPillVisible(sStatus));
      },

      // --- 7. STANDARD LEGACY LOGIC ---
      getStatusStateForClosed: function (sStatus) {
        if (sStatus === "WITHDRAWN") return "None";

        if (sStatus === "INP") return "Information";
        if (sStatus === "CIL1_PND" || sStatus === "CIL2_PND" || sStatus === "FIN_PND") return "Warning";
        if (sStatus === "CIL1_REJ" || sStatus === "CIL2_REJ" || sStatus === "FIN_REJ") return "Error";
        if (sStatus === "CIL_APR" || sStatus === "FIN_APR" || sStatus === "CLSD" || sStatus === "PCLSD") return "Success";
        return "None";
      },

      showStatusPClosed: function (sStatus) {
        if (sStatus === "PCLSD") return "None";
        return "None";
      },

      getStatusStateForHold: function (sStatus) {
        if (sStatus === "HLD") return "None";
        return "None";
      },
      // ====================================================================
      //  END OF STATUS PILL LOGIC
      // ====================================================================

      // Bill17 case Graying out of the payment field
      // --- HELPER: DISABLE PAYMENT DOCUMENT FIELD ---
      _updatePaymentDocFieldState: function () {
        // console.log("[DEBUG] _updatePaymentDocFieldState: Starting...");

        var sTableId = "com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--PaymentInfo-ID::Table";
        var oSmartTable = sap.ui.getCore().byId(sTableId);

        if (!oSmartTable) { return; }

        var oInnerTable = oSmartTable.getTable();
        var aRows = oInnerTable.getRows();
        var aColumns = oInnerTable.getColumns();

        var oHeaderContext = this.getView().getBindingContext();
        if (!oHeaderContext) return;

        // --- 1. BILL 17 CHECK ---
        var bIsBill17 = false;
        var oPartnerField = this.getView().byId("DCHeader-FG2::to_defpartner::id::MultiInput");

        // Helper: safely checks if a control has tokens
        var fnHasTokens = function (oCtrl) {
          if (oCtrl && oCtrl.getTokens) {
            return oCtrl.getTokens().length > 0;
          }
          return false;
        };

        if (oPartnerField) {
          if (fnHasTokens(oPartnerField)) {
            bIsBill17 = true;
          } else if (oPartnerField.getInnerControls) {
            var aInner = oPartnerField.getInnerControls();
            for (var k = 0; k < aInner.length; k++) {
              if (fnHasTokens(aInner[k])) {
                bIsBill17 = true;
                break;
              }
            }
          }
        }

        // Fallback to Backend Flag
        if (!bIsBill17 && oHeaderContext.getProperty("bill17_hidden") === false) {
          bIsBill17 = true;
        }

        var bPermitIssued = oHeaderContext.getProperty("permit_issued");
        var dDcClearance = oHeaderContext.getProperty("dc_clearance_date");

        // --- 2. EVALUATE GLOBAL LOCK CONDITION ---
        // This is the "Potential" to lock. We refine it per row below.
        var bGlobalLockActive = bIsBill17 && bPermitIssued && (dDcClearance !== null && dDcClearance !== "" && dDcClearance !== undefined);

        // --- 3. FIND TARGET COLUMN ---
        var iDocNoIndex = -1;
        for (var i = 0; i < aColumns.length; i++) {
          var oCol = aColumns[i];
          var sKey = "";
          if (oCol.data && oCol.data("p13nData") && oCol.data("p13nData").columnKey) {
            sKey = oCol.data("p13nData").columnKey;
          }
          if (!sKey) sKey = oCol.getId();

          if (sKey === "document_no" || sKey === "CustomColumn1" || sKey.indexOf("document_no") > -1) {
            iDocNoIndex = i;
            break;
          }
        }

        if (iDocNoIndex === -1) return;

        // --- 4. APPLY STATE (Row-Specific Logic) ---
        // Helper to apply state recursively
        var fnSetControlState = function (oControl, bIsEditable) {
          if (!oControl) return;
          if (oControl.setEditable) oControl.setEditable(bIsEditable);
          else if (oControl.setEnabled) oControl.setEnabled(bIsEditable);

          if (oControl.getItems) oControl.getItems().forEach(function (c) { fnSetControlState(c, bIsEditable); });
          else if (oControl.getContent) oControl.getContent().forEach(function (c) { fnSetControlState(c, bIsEditable); });
        };

        aRows.forEach(function (oRow) {
          var aCells = oRow.getCells();
          var oRowContext = oRow.getBindingContext();

          if (aCells.length > iDocNoIndex) {
            var oTargetCell = aCells[iDocNoIndex];
            var bRowEditable = true; // Default to Editable

            // ONLY check logic if data exists for this row
            if (oRowContext) {
              var sDocNum = oRowContext.getProperty("document_no");

              // LOGIC: If Global Lock is ON ... AND ... Document Number EXISTS
              // Then we LOCK this specific row.
              if (bGlobalLockActive && sDocNum && sDocNum.trim() !== "") {
                bRowEditable = false;
              }
            }

            // Apply the specific state for this row
            fnSetControlState(oTargetCell, bRowEditable);
          }
        });
      },
      //2A,2B,2C Sceanrio related Functions
      formatCalcOptionToIndex: function (sValue) {
        // FIX: Handle null/undefined to prevent "Expression not available" error
        if (!sValue) {
          return 0;
        }
        if (sValue === "L") {
          return 0; // Locked
        }
        if (sValue === "P") {
          return 1; // Prevailing
        }
        return 0; // Default
      },
      //Changing Radio Buttons L or P

      onCalcOptionChange: function (oEvent) {
        var oRadioGroup = oEvent.getSource();
        var iIndex = oRadioGroup.getSelectedIndex();

        // --- DEBUG LOGS (Press F12 to see these) ---
        console.log("---------------- DEBUG START ----------------");
        console.log("Radio Button Index Selected:", iIndex);
        // 0 = First Button, 1 = Second Button

        // ASSUMPTION: Button 0 is "Locked", Button 1 is "Prevailing"
        var sValue = iIndex === 0 ? "L" : "P";
        console.log("Calculated Value (L/P):", sValue);

        if (sValue === "L") {
          var oHeaderContext = this.getView().getBindingContext();

          if (oHeaderContext) {
            // Get the raw value from the model
            var sSiteDate = oHeaderContext.getProperty("site_plan_applied_date");
            console.log("Raw Site Plan Date Value:", sSiteDate);

            // Check specifically for null, undefined, or empty
            // Note: A Date object is truthy, null is falsy.
            if (!sSiteDate) {
              console.log(">> Date is MISSING. Triggering Popup...");
              sap.m.MessageBox.warning(
                "Site Plan Applied Date is missing. Selecting 'Locked' may result in 0.00 rates.\n\nPlease ensure a date is entered or the Backend applies a fallback."
              );
            } else {
              console.log(">> Date EXISTS. Skipping Popup.");
            }
          } else {
            console.error(">> ERROR: Could not find Header Binding Context!");
          }
        } else {
          console.log(">> Selection is 'Prevailing' (P). No popup required.");
        }
        console.log("---------------- DEBUG END ----------------");

        // --- EXISTING SAVE LOGIC ---
        var oContext = oRadioGroup.getBindingContext();
        if (!oContext) return;

        var oModel = oContext.getModel();
        var sPath = oContext.getPath() + "/calc_option";
        var that = this;

        // Update other rows in the list to match
        var oList = oRadioGroup.getParent().getParent().getParent();
        if (oList && oList.getItems) {
          var aItems = oList.getItems();
          aItems.forEach(function (oItem) {
            var oItemContext = oItem.getBindingContext();
            if (oItemContext) {
              var sItemPath = oItemContext.getPath();
              if (sItemPath !== oContext.getPath()) {
                var sExistingVal = oItemContext.getProperty("calc_option");
                oModel.update(sItemPath, { calc_option: sExistingVal }, { groupId: "changes" });
              }
            }
          });
        }

        // 1. Optimistic Update
        oModel.setProperty(sPath, sValue);

        // 2. Submit Changes
        oModel.submitChanges({
          success: function (oData) {
            if (oData && oData.__batchResponses) {
              var hasError = oData.__batchResponses.some(function (r) {
                return r.response && r.response.statusCode >= 400;
              });
              if (hasError) {
                sap.m.MessageBox.error("Error saving option.");
                return;
              }
            }

            // 3. Trigger Calculation
            var reqGuid = oContext.getProperty("req_uuid");
            oModel.callFunction("/zgc_c_dc_calcltnsCalculate", {
              method: "POST",
              urlParameters: { req_uuid: reqGuid },
              success: function (oData) {
                sap.m.MessageToast.show("Calculation updated.");

                // 4. Safe Refresh
                if (that.extensionAPI && that.extensionAPI.refresh) {
                  that.extensionAPI.refresh();
                } else {
                  if (that.getView().getElementBinding()) {
                    that.getView().getElementBinding().refresh();
                  }
                }
              },
              error: function (oError) { }
            });
          },
          error: function (oError) {
            sap.m.MessageBox.error("Failed to save.");
          }
        });
      },
      // Radio button Insertion Logic
      _insertBelowBill17DeferralPartner: function () {
    var oView = this.getView();
    var aMatches = oView.findAggregatedObjects(true, function (o) {
        return o.getId && o.getId().indexOf("DCHeader-FG2::to_defpartner::id::MultiInput-label") !== -1;
    });

    if (!aMatches.length) return;
    var oLabel = aMatches[0];
    var oGroupElement = oLabel.getParent();
    var oGroup = oGroupElement.getParent();

    if (this._bBill17Inserted) return;
    this._bBill17Inserted = true;

    sap.ui.core.Fragment.load({
        name: "com.gc.dashboard.ext.fragments.Bill17RateOptions",
        controller: this,
        id: oView.getId()
    }).then(function (oFragment) {
        
        this._oBill17List = this.byId("idBill17List");
        
        // >>> FIX: ROBUST EVENT LISTENER <<<
        if (this._oBill17List) {
            var sType = this._oBill17List.getMetadata().getName();
            console.log("[DEBUG_BILL17] List Found! Type:", sType);

            // Case A: sap.m.List or sap.m.Table
            if (this._oBill17List.attachUpdateFinished) {
                this._oBill17List.attachUpdateFinished(function() {
                    console.log("[DEBUG_BILL17] Event 'updateFinished' fired.");
                    this._updateBill17ListState();
                }.bind(this));
            }
            // Case B: sap.ui.table.Table (Grid Table)
            else if (this._oBill17List.attachRowsUpdated) {
                this._oBill17List.attachRowsUpdated(function() {
                    console.log("[DEBUG_BILL17] Event 'rowsUpdated' fired.");
                    this._updateBill17ListState();
                }.bind(this));
            }
        }
        // >>> END FIX <<<

        var oNewGroupElement = new sap.ui.comp.smartform.GroupElement({
            label: "",
            elements: [oFragment]
        });

        var iIndex = oGroup.indexOfGroupElement(oGroupElement);
        if (iIndex > -1) {
            oGroup.insertGroupElement(oNewGroupElement, iIndex);
        } else {
            oGroup.addGroupElement(oNewGroupElement);
        }

        this._updateBill17ListState();

    }.bind(this));
},

      //Create new version on Bill17
      _triggerCreateNewVersion: function (oContext) {
        var oExtensionAPI = this.extensionAPI;
        var that = this;
        var sFunctionName = "ZGC_C_REQUESTS_CDS.ZGC_C_REQUESTS_CDS_Entities/zgc_c_requestsCreate_new_version";

        sap.ui.core.BusyIndicator.show();

        oExtensionAPI.invokeActions(sFunctionName, [oContext])
          .then(function () {
            sap.ui.core.BusyIndicator.hide();
            sap.m.MessageToast.show("New Version Created Successfully");

            // Refresh to show new data
            oExtensionAPI.refresh();
          })
          .catch(function (oError) {
            sap.ui.core.BusyIndicator.hide();

            // Revert checkbox if failed
            if (that.getView().getModel()) {
              that.getView().getModel().setProperty(oContext.getPath() + "/is_bill17_appl", false);
              that.getView().getModel().resetChanges([oContext.getPath() + "/is_bill17_appl"]);
            }

            var sMsg = "Failed to create new version.";
            sap.m.MessageBox.error(sMsg);
          });
      },

      // Function to check Status and Lock/Unlock controls
      _updateBill17Status: function () {
        var oView = this.getView();

        // Safety Check: If View is not ready, stop
        if (!oView) return;

        var oContext = oView.getBindingContext();

        // If no data loaded yet, stop.
        if (!oContext) {
          return;
        }

        // A. GET THE STATUS
        // Ensure "status" is the correct field name from your backend!
        var sStatus = oContext.getProperty("status");

        // --- DEBUG LOG (Check Console F12) ---
        console.log("---------------------------------------------");
        console.log("DEBUG: STATUS FROM BACKEND IS:", sStatus);
        console.log("---------------------------------------------");

        // B. THE LOGIC
        // If Status is 'FIN_APR' (Final Approved), set Editable = FALSE
        // Change 'FIN_APR' to '03' or whatever your real code is if needed
        var bIsEditable = (sStatus !== 'FIN_APR');

        // C. SET THE LOCAL MODEL
        var oLocalModel = oView.getModel("LocalModel");
        if (!oLocalModel) {
          oLocalModel = new sap.ui.model.json.JSONModel();
          oView.setModel(oLocalModel, "LocalModel");
        }

        oLocalModel.setProperty("/isBill17Editable", bIsEditable);
        this._updateBill17ListState();
      },

      // --- NEW HELPER FUNCTION ---
      _updateBill17ListState: function () {
    var oList = this.byId("idBill17List") || this._oBill17List;
    if (!oList) return;

    var oContext = this.getView().getBindingContext();
    var bBill17Active = oContext ? oContext.getProperty("is_bill17_appl") : false;
    
    var oUiModel = this.getView().getModel("ui") || this.getOwnerComponent().getModel("ui");
    var bIsEditable = oUiModel ? oUiModel.getProperty("/editable") : false;

    // Logic: Must be Edit Mode AND Bill 17 Checked
    var bEnableState = bIsEditable && bBill17Active;

    // >>> FIX: ROBUST ITEM RETRIEVAL <<<
    var aItems = [];
    if (oList.getItems) {
        aItems = oList.getItems(); // sap.m.List / sap.m.Table
    } else if (oList.getRows) {
        aItems = oList.getRows();  // sap.ui.table.Table
    }
    // >>> END FIX <<<

    if (aItems.length > 0) {
        console.log("[DEBUG_BILL17] Applying state " + bEnableState + " to " + aItems.length + " items.");
        
        aItems.forEach(function (oItem) {
            var aCells = oItem.getCells ? oItem.getCells() : [];
            aCells.forEach(function (oControl) {
                if (oControl.setEnabled) {
                    oControl.setEnabled(bEnableState);
                }
            });
        });
    } else {
        // Silent wait - the event listener from step 1 will catch it when data arrives
    }
},



      //end of controller


    });
  }
);
