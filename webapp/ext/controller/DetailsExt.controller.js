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
        //DC Tables
        const oDCTable = sap.ui.getCore().byId("com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--TotalDC-ID::Table");
        oDCTable.setUseVariantManagement(true);
        oDCTable.setUseExportToExcel(true);
        oDCTable.setShowFullScreenButton(true);
        const oSec14Table = sap.ui.getCore().byId("com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--Section-14-ID::Table");
        oSec14Table.setUseVariantManagement(true);
        oSec14Table.setUseExportToExcel(true);
        oSec14Table.setShowFullScreenButton(true);
        const demoTable = sap.ui.getCore().byId("com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--DemolitionCred-ID::Table");
        demoTable.setUseVariantManagement(true);
        demoTable.setUseExportToExcel(true);
        demoTable.setShowFullScreenButton(true);
        const totalNonIndDCTable = sap.ui.getCore().byId("com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--TotalDC-ID-NonInd::Table");
        totalNonIndDCTable.setUseVariantManagement(true);
        totalNonIndDCTable.setUseExportToExcel(true);
        totalNonIndDCTable.setShowFullScreenButton(true);
        const oExemptionDCTable = sap.ui.getCore().byId("com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--DCExemption-ID::Table");
        oExemptionDCTable.setUseVariantManagement(true);
        oExemptionDCTable.setUseExportToExcel(true);
        oExemptionDCTable.setShowFullScreenButton(true);
        const oDeferralDCTable = sap.ui.getCore().byId("com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--DCDeferralTable-ID::Table");
        oDeferralDCTable.setUseVariantManagement(true);
        oDeferralDCTable.setUseExportToExcel(true);
        oDeferralDCTable.setShowFullScreenButton(true);
        const oPrvBuidlingPermitDCTable = sap.ui.getCore().byId("com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--Previous-Building-Permit-Credit-ID::Table");
        oPrvBuidlingPermitDCTable.setUseVariantManagement(true);
        oPrvBuidlingPermitDCTable.setUseExportToExcel(true);
        oPrvBuidlingPermitDCTable.setShowFullScreenButton(true);

        //CBC Tables
        const oCBCExemptTable = sap.ui.getCore().byId("com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--ExemptionCBC-ID::Table");
        oCBCExemptTable.setUseVariantManagement(true);
        oCBCExemptTable.setShowFullScreenButton(true);
        const oCBCInKindTable = sap.ui.getCore().byId("com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--InKindContr-ID::Table");
        oCBCInKindTable.setUseVariantManagement(true);
        oCBCInKindTable.setShowFullScreenButton(true);
        const oCBCDemoTable = sap.ui.getCore().byId("com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--DemoExm-ID::Table");
        oCBCDemoTable.setUseVariantManagement(true);
        oCBCDemoTable.setShowFullScreenButton(true);

        //Payment Table
        const oPaymentInfoPaymentTable = sap.ui.getCore().byId("com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--PaymentInfo-ID::Table");
        oPaymentInfoPaymentTable.setUseVariantManagement(true);
        oPaymentInfoPaymentTable.setShowFullScreenButton(true);
        const oRefundInfoPaymentTable = sap.ui.getCore().byId("com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--RefundInfo-ID::Table");
        oRefundInfoPaymentTable.setUseVariantManagement(true);
        oRefundInfoPaymentTable.setShowFullScreenButton(true);
        const oDeferralPaymentTable = sap.ui.getCore().byId("com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--DeferralInfo-ID::Table");
        oDeferralPaymentTable.setUseVariantManagement(true);
        oDeferralPaymentTable.setShowFullScreenButton(true);
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
                formatter: function(bEditable, sStatus) {
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
          // this._updateBill17AmountFieldsState(oRequest.status);// bill17 

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
        // --- END OF NEW CODE ---
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
          // var sStatus = oContext.getProperty("status"); // bill17 case for TOTAL_NON_DEF_INVOICE_AMT,TOTAL_DEF_NON_DC_PAYABLE , they should be greyed out after DC1_PND status
          // this._updateBill17AmountFieldsState(sStatus);

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
        //Add $select for payment table
        if (oEvent.getSource().getId() === "com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--PaymentInfo-ID::Table") {
          oEvent.getParameter("bindingParams").parameters = oEvent.getParameter("bindingParams").parameters || {};
          // Add property 'Gen_pay_receipt_ac' to $select
          oEvent.getParameter("bindingParams").parameters.select = oEvent.getParameter("bindingParams").parameters.select + ",Gen_pay_receipt_ac,deferral_adjust";
          oEvent.getParameter("bindingParams").sorter = [
            new sap.ui.model.Sorter("sort_date", false),
            new sap.ui.model.Sorter("sort_document", false)
          ];
        }
        if (oEvent.getSource().getId() ===
          "com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--Previous-Building-Permit-Credit-ID::Table") {
          var oBindingParams = oEvent.getParameter("bindingParams");
          oBindingParams.parameters = oBindingParams.parameters || {};
          oBindingParams.parameters.operationMode = "Client";
        }
        if (oEvent.getSource().getId() ===
          "com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--Section-14-ID::Table") {
          var oBindingParams = oEvent.getParameter("bindingParams");
          oBindingParams.parameters = oBindingParams.parameters || {};
          oBindingParams.parameters.operationMode = "Client";
        }
        //Binding parameter change is only for the DC Table, Speculative, Exemption, Demolition table
        if (
          oEvent.getSource().getId() ===
          "com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--TotalDC-ID::Table" ||
          oEvent.getSource().getId() ===
          "com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--DemolitionCred-ID::Table" ||
          oEvent.getSource().getId() ===
          "com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--TotalDC-ID-NonInd::Table" ||
          oEvent.getSource().getId() ===
          "com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--DCExemption-ID::Table"
        ) {
          var oBindingParams = oEvent.getParameter("bindingParams");
          oBindingParams.parameters = oBindingParams.parameters || {};
          oBindingParams.parameters.operationMode = "Client";
          oBindingParams.parameters.select = oBindingParams.parameters.select + ",is_rate_edited,is_bill17_appl";
        }

        //Default sorting by sort_order, dc_type, hierarchy_level, sub_service_id
        if ((oEvent.getSource().getId() === "com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--TotalDC-ID::Table")
          || (oEvent.getSource().getId() === "com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--DemolitionCred-ID::Table")
          || (oEvent.getSource().getId() === "com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--TotalDC-ID-NonInd::Table")
          || (oEvent.getSource().getId() === "com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--Section-14-ID::Table")
          || (oEvent.getSource().getId() === "com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--Previous-Building-Permit-Credit-ID::Table")
        ) {
          if (oEvent.getParameter("bindingParams").parameters.select.indexOf("sort_order") === -1) {
            oEvent.getParameter("bindingParams").parameters.select = oEvent.getParameter("bindingParams").parameters.select + ",sort_order";
          }
          oEvent.getParameter("bindingParams").sorter = [
            new sap.ui.model.Sorter("sort_order", false),
            new sap.ui.model.Sorter("dc_type", false),
            new sap.ui.model.Sorter("hierarchy_level", false),
            new sap.ui.model.Sorter("sub_service_id", false)
          ];
        }
        // Temporary Comments for Exemption Side effects issues
        // if ((oEvent.getSource().getId() === "com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--DCExemption-ID::Table")) {
        //   if (oEvent.getParameter("bindingParams").parameters.select.indexOf("sort_order") === -1) {
        //     oEvent.getParameter("bindingParams").parameters.select = oEvent.getParameter("bindingParams").parameters.select + ",sort_order";
        //   }
        //   oEvent.getParameter("bindingParams").sorter = [
        //     new sap.ui.model.Sorter("sort_order", false),
        //     new sap.ui.model.Sorter("dc_type", false)
        //   ];
        // }
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

      /**
       * Handler for F4 Input fields
       * @public
       * @param {sap.ui.base.event} oEvent Event for the input field
       * @param {string} label of the associated field
       */
      onValueHelpRequested: function (oEvent) {
        //For the custom control, enable side effects
        this._prepareSideEffects(oEvent);
        this.VHInput = oEvent.getSource();
        const fragment = Fragment.load({
          name: "com.gc.dashboard.ext.fragment.DCRateValueHelp",
          controller: this
        });
        //Date filter
        //If site-plan approved date is more than 2 years old than the invoice calculation date,
        //use the invoice calculation date. If not, check if interest applied date is available. If yes, use that date.
        //If not, use the invoice calculation date.

        const sitePlanApprovedDate = this.getView()
          .getBindingContext()
          .getObject().site_plan_approved_date;
        const invoiceCalculationDate = this.getView()
          .getBindingContext()
          .getObject().invoice_calculation_date;
        const interestAppliedDate = this.getView()
          .getBindingContext()
          .getObject().interest_applied_date;
        let dateFilter = "";
        if (sitePlanApprovedDate) {
          let date1 = new Date(sitePlanApprovedDate);
          date1.setFullYear(date1.getFullYear() + 2); //Two years from site plan approved date
          const date2 = new Date(invoiceCalculationDate);
          if (date2 > date1) {
            dateFilter = invoiceCalculationDate;
          }
        }
        if (interestAppliedDate && !dateFilter) {
          dateFilter = interestAppliedDate;
        } else {
          dateFilter = invoiceCalculationDate;
        }
        const startDateFilter = new Filter(
          "start_date",
          "LE",
          dateFilter
        );
        const endDateFilter = new Filter(
          "end_date",
          "GE",
          dateFilter
        );
        const dcFilter = new Filter(
          "dc_type",
          "EQ",
          oEvent.getSource().getBindingContext().getObject().dc_type
        );
        this.rateFilters = [startDateFilter, endDateFilter, dcFilter];
        fragment.then(
          function (oDialog) {
            this._oValueHelpDialog = oDialog;
            this.getView().addDependent(oDialog);
            oDialog.getTableAsync().then(
              function (oTable) {
                oTable.setModel(this.getView().getModel());
                // For Desktop and tabled the default table is sap.ui.table.Table
                if (oTable.bindRows) {
                  // Bind rows to the ODataModel and add columns
                  oTable.bindRows({
                    path: "/zgc_dcrates_vh",
                    filters: this.rateFilters,
                    events: {
                      dataRequested: function () {
                        this.getView().getModel("LocalModel").setProperty("/busy", true);
                      }.bind(this),
                      dataReceived: function () {
                        this.getView().getModel("LocalModel").setProperty("/busy", false);
                        oDialog.update();
                      }.bind(this)
                    }
                  });
                  // Only two decimal places
                  const dcRateTemplate = new Text({
                    text: "{ path: 'dc_rate',type: 'sap.ui.model.type.Float', formatOptions: {minFractionDigits: 2, maxFractionDigits: 2}}"
                  });
                  const startDateTemplate = new Text({
                    text: "{path: 'start_date', type: 'sap.ui.model.type.Date', formatOptions: {datePattern: 'MM/dd/yyyy'}}"
                  });
                  const endDateTemplate = new Text({
                    text: "{path: 'end_date', type: 'sap.ui.model.type.Date', formatOptions: {datePattern: 'MM/dd/yyyy'}}"
                  });
                  const rateComments = new Text({ text: "{rate_note}" });
                  oTable.addColumn(
                    new UIColumn({ label: "DC Rate", template: dcRateTemplate })
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
                  oTable.addColumn(
                    new UIColumn({
                      label: "Comments",
                      template: rateComments
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

      onValueHelpOkPress: function (oEvent) {
        let selectedValue = oEvent.getParameter("tokens")[0].getKey();
        //Convert to two decimal digits
        selectedValue = parseFloat(selectedValue).toFixed(2);
        this.VHInput.setValue(selectedValue);
        oEvent.getSource().close();
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

        // --- Logic 1: Permit Issued ---
        if (sPath === "permit_issued") {

          // A. Update Field State (Existing)
          if (this._updatePartnerFieldState) {
            this._updatePartnerFieldState(oValue);
          }
          
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
          MessageBox.warning("Once you save the request, you will not be able to edit the DC Clearance Date.");
        }
      },

      _updatePartnerFieldState: function (bPermitIssued) {
        var sRelativeId = "DCHeader-FG2::to_defpartner::id::MultiInput";
        var oSmartField = this.getView().byId(sRelativeId);

        if (oSmartField) {
          // 1. Force SmartField to be Editable (to show tokens)
          oSmartField.setEditable(true);

          var fnFix = function () {
            var aInner = oSmartField.getInnerControls();
            if (aInner && aInner.length > 0) {
              var oCtrl = aInner[0];

              // 2. Disable the Input (Grey Out)
              if (oCtrl.setEnabled) {
                oCtrl.setEnabled(!bPermitIssued);
              }

              // 3. PERMANENT FIX FOR "1 More"
              if (oCtrl.getAggregation) {
                var oTokenizer = oCtrl.getAggregation("tokenizer");
                if (oTokenizer) {

                  // A. Set it immediately
                  if (oTokenizer.setRenderMode) {
                    oTokenizer.setRenderMode("Loose");
                  }

                  // B. Add a Delegate to re-apply it every time Fiori tries to reset it
                  oTokenizer.addEventDelegate({
                    onAfterRendering: function () {
                      if (this.getRenderMode() !== "Loose") {
                        this.setRenderMode("Loose");
                      }
                    }
                  }, oTokenizer);
                }
              }
            }
          };

          // Run immediately
          fnFix();

          // Run again when controls are created (lazy loading)
          oSmartField.attachEvent("innerControlsCreated", fnFix);
        }
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

      _isBill17Active: function(vDefPartner) {
          if (!vDefPartner) return false;
          // OData V2 often returns { results: [...] } for expanded navigation
          if (vDefPartner.results && vDefPartner.results.length > 0) {
              return true;
          }
          // Fallback for direct arrays
          if (Array.isArray(vDefPartner) && vDefPartner.length > 0) {
              return true;
          }
          return false;
      },

      // --- 1. CIL PILL ---
      getStatusStateForCIL: function (sStatus) {
        // Pending -> Orange
        if (sStatus === "CIL1_PND" || sStatus === "CIL2_PND") {
          return "Warning";
        } 
        // Rejected -> Red
        else if (sStatus === "CIL1_REJ" || sStatus === "CIL2_REJ" || sStatus === "FIN_REJ") {
          return "Error";
        } 
        // Approved/Success States -> Green
        // (Includes Bill 17 states so CIL stays green during that process)
        else if (sStatus === "CIL_APR" || sStatus === "FIN_APR" || sStatus === "FIN_PND" ||
                 sStatus === "DC1_APR" || sStatus === "DC1_PND" || sStatus === "CLSD" || sStatus === "PCLSD") {
          return "Success";
        } 
        // Default (INP) -> Blue
        else {
          return "Information";
        }
      },

      // --- 2. GENERIC DC PILL ---
      // Logic: Visible ONLY if DC is Applicable AND Bill 17 is NOT active.
      _isDCPillVisible: function (bDcApplicable, vDefPartner) {
        // If Bill 17 is Active (Has Partners), HIDE generic DC pill.
        // (The Level 1 pill takes its place).
        if (this._isBill17Active(vDefPartner)) {
          return false; 
        }
        return !!bDcApplicable;
      },

      getStatusStateForDC: function (sStatus) {
        if (sStatus === "FIN_PND" || sStatus === "DC1_PND") return "Warning"; // Orange
        if (sStatus === "FIN_REJ" || sStatus === "DC1_REJ") return "Error";   // Red
        if (sStatus === "FIN_APR" || sStatus === "DC1_APR" || sStatus === "CLSD" || sStatus === "PCLSD") return "Success"; // Green
        return "Information"; // Blue
      },

      // --- 3. BILL 17: LEVEL 1 PILL ---
      // Logic: Visible only during Level 1. Hides when we move to Final Approval.
      _isBill17PillVisible: function (vDefPartner, sStatus) {
        // 1. Must be Bill 17 case
        if (!this._isBill17Active(vDefPartner)) return false;

        // 2. Must be in Level 1 Statuses
        var aVisibleStatuses = ["DC1_PND", "DC1_APR", "DC1_REJ"];
        return aVisibleStatuses.includes(sStatus);
      },

      getBill17Level1State: function (sStatus) {
        if (sStatus === "DC1_PND") return "Information"; // Blue (Pending)
        if (sStatus === "DC1_APR") return "Success";     // Green (Approved)
        if (sStatus === "DC1_REJ") return "Error";       // Red (Rejected)
        return "None";
      },

      getBill17Level1Text: function (sStatus) {
        if (sStatus === "DC1_PND") return "DC Level 1 Approval";
        if (sStatus === "DC1_APR") return "DC Level 1 Approved";
        if (sStatus === "DC1_REJ") return "DC Level 1 Rejected";
        return "";
      },

      // --- 4. BILL 17: FINAL APPROVAL PILL ---
      // Logic: Visible if DC1 Approved (as "Next Step") OR Final Approved (as "Done").
      _isBill17FinalPillVisible: function (vDefPartner, sStatus) {
        // 1. Must be Bill 17 case
        if (!this._isBill17Active(vDefPartner)) return false;

        // 2. Show if Final Approved OR if waiting for Final (DC1_APR)
        return (sStatus === "FIN_APR" || sStatus === "DC1_APR");
      },

      getBill17FinalPillState: function (sStatus) {
        // PENDING STATE: DC1 done, waiting for Final -> ORANGE
        if (sStatus === "DC1_APR") return "Warning"; 
        
        // DONE STATE: Final done -> GREEN
        if (sStatus === "FIN_APR" || sStatus === "CLSD" || sStatus === "PCLSD") return "Success"; 
        
        return "None";
      },

      getBill17FinalPillText: function (sStatus) {
        // Noun (The Pending Task)
        if (sStatus === "DC1_APR") return "Final Approval";
        // Adjective (The Completed State)
        return "Final Approved";
      },

      // --- 5. CBC PILL ---
      getStatusStateForCBC: function (sStatus) {
        // PENDING / WARNING States -> ORANGE
        // Note: DC1_APR means "Waiting for Final", so CBC is also waiting.
        if (sStatus === "FIN_PND" || sStatus === "DC1_APR") {
          return "Warning";
        } 
        // ERROR -> RED
        else if (sStatus === "FIN_REJ") {
          return "Error";
        } 
        // SUCCESS -> GREEN
        else if (sStatus === "FIN_APR" || sStatus === "CLSD" || sStatus === "PCLSD") {
          return "Success";
        } 
        // DEFAULT -> BLUE
        else {
          return "Information";
        }
      },

      // --- 6. SEPARATOR LOGIC ---
      _isStatusPillVisible: function (sStatus) {
        return sStatus === "CLSD" || sStatus === "PCLSD" || sStatus === "HLD";
      },

      getSeparatorForCIL: function (bDc, vDefPartner, bCbc, sStatus) {
        // 1. Is Generic DC Visible?
        var bGenericDcVisible = this._isDCPillVisible(bDc, vDefPartner);
        
        // 2. Is Bill 17 (Level 1 or Final) Visible?
        var bBill17Visible = this._isBill17PillVisible(vDefPartner, sStatus) || this._isBill17FinalPillVisible(vDefPartner, sStatus);
        
        // Show line if ANY subsequent pill is visible
        return !!(bGenericDcVisible || bBill17Visible || bCbc || this._isStatusPillVisible(sStatus));
      },

      getSeparatorForDC: function (vDefPartner, bCbc, sStatus) {
        // Separator after Generic DC (used for Bill 17 spacing if needed)
        var bBill17Visible = this._isBill17PillVisible(vDefPartner, sStatus) || this._isBill17FinalPillVisible(vDefPartner, sStatus);
        return !!(bBill17Visible || bCbc || this._isStatusPillVisible(sStatus));
      },

      getSeparatorForBill17: function (vDefPartner, bCbc, sStatus) {
        // Separator after Bill 17 Level 1
        // Show if Final Pill is visible (at DC1_APR) OR CBC is next
        var bFinalVisible = this._isBill17FinalPillVisible(vDefPartner, sStatus);
        return !!(bFinalVisible || bCbc || this._isStatusPillVisible(sStatus));
      },

      getSeparatorForBill17Final: function (bCbc, sStatus) {
        // Separator after Bill 17 Final
        return !!(bCbc || this._isStatusPillVisible(sStatus));
      },

      getSeparatorForCBC: function (sStatus) {
        return !!(this._isStatusPillVisible(sStatus));
      },

      // --- 7. STANDARD LEGACY LOGIC ---
      getStatusStateForClosed: function (sStatus) {
        if (sStatus === "INP") return "Information";
        else if (sStatus === "CIL1_PND" || sStatus === "CIL2_PND" || sStatus === "FIN_PND") return "Warning";
        else if (sStatus === "CIL1_REJ" || sStatus === "CIL2_REJ" || sStatus === "FIN_REJ") return "Error";
        else if (sStatus === "CIL_APR" || sStatus === "FIN_APR" || sStatus === "CLSD" || sStatus === "PCLSD") return "Success";
        else return "None";
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

      // --- LOGIC TO DISABLE BILL 17 AMOUNT FIELDS ---
      _updateBill17AmountFieldsState: function (sStatus) {
        // 1. Define the Statuses where fields should be GREYED OUT (Read Only)
        var aDisabledStatuses = ["DC1_PND", "DC1_APR", "DC1_REJ", "FIN_APR"];
        
        // If status matches list -> Disable (bEditable = false)
        var bShouldDisable = aDisabledStatuses.includes(sStatus);
        var bEditable = !bShouldDisable; 

        // 2. Define the exact property paths to target (lowercase as requested)
        var aFieldsToUpdate = [
            "total_non_def_invoice_amt",
            "total_def_non_dc_payable"
        ];

        // 3. Find Controls and Set Editable Property
        // We use findAggregatedObjects because we don't have stable IDs for these SmartFields
        aFieldsToUpdate.forEach(function(sPath) {
            var aControls = this.getView().findAggregatedObjects(true, function(oControl) {
                // Look for SmartFields or Inputs bound to this path
                return (oControl.getBindingPath && oControl.getBindingPath("value") === sPath);
            });

            aControls.forEach(function(oControl) {
                // If it's a SmartField or Input, toggle Editable
                if (oControl.setEditable) {
                    oControl.setEditable(bEditable); 
                } 
                // Fallback for other controls like Buttons/Inputs
                else if (oControl.setEnabled) {
                    oControl.setEnabled(bEditable);
                }
            });
        }.bind(this));
      },

      //end of controller


    });
  }
);
