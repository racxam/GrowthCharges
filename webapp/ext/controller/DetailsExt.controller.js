jQuery.sap.require("com.gc.dashboard.ext.formatter.ObjectPageFormatter");
sap.ui.define(
  [
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    "sap/ui/table/Column",
    "sap/ui/model/Filter",
    "sap/m/Text",
    "sap/m/MessageBox"
  ],
  function (JSONModel, Fragment, UIColumn, Filter, Text,MessageBox) {
    "use strict";
    return sap.ui.controller("com.gc.dashboard.ext.controller.DetailsExt", {
      onInit: function () {
        try {
          const oVariantManagement = sap.ui
            .getCore()
            .byId(
              "com.gc.dashboard::sap.suite.ui.generic.template.ListReport.view.ListReport::zgc_c_requests--template::PageVariant"
            );
          oVariantManagement
            .getVariantItems()
            .filter(function (oVariant) {
              return (
                oVariant.getAuthor() !==
                sap.ushell.Container.getService("UserInfo").getId()
              );
            })
            .forEach(function (oForeignVariant) {
              oForeignVariant.setProperty("readOnly", true);
            });
        } catch (error) {
          //If opened not using FLP, there will be an error
        }

        const oRouter = this.getOwnerComponent().getRouter();
        const sHashKey = oRouter.getHashChanger().key;
        if (sHashKey === "Child") {
          sap.ui
            .getCore()
            .byId(
              "com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--action::ZGC_C_REQUESTS_CDS.ZGC_C_REQUESTS_CDS_Entities::zgc_c_requestsSubmit::Determining"
            )
            .getParent()
            .setVisible(false);
          sap.ui
            .getCore()
            .byId(
              "com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--fullScreen"
            )
            .getParent()
            .setVisible(false);
        }
        this.extensionAPI.attachPageDataLoaded(function (event) {
          const oComponent = sap.ui
            .getCore()
            .byId(
              "com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests"
            )
            .getParent();
          const oRouterComp = oComponent.getRouter();
          const sHKey = oRouterComp.getHashChanger().key;
          if (sHKey === "Child") {
            sap.ui
              .getCore()
              .byId(
                "com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--fullScreen"
              )
              .firePress();
          }

          //Calculate and Add Credit Button Visibility
          const oCalBtn = sap.ui
            .getCore()
            .byId(
              "com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--CalculateButton"
            );
          const oAddCreditBtn = sap.ui
            .getCore()
            .byId(
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
        const invoice_tech_details = view.getBindingContext().getObject()?.inv_tech_details;
        const aInvoiceTechDetails = invoice_tech_details.split("-");
        this._sValidPath =
          `/sap/opu/odata/sap/CV_ATTACHMENT_SRV/OriginalContentSet(Documenttype='GOS',Documentnumber='${aInvoiceTechDetails[0]}',Documentpart='',Documentversion='',ApplicationId='${aInvoiceTechDetails[1]}',FileId='${aInvoiceTechDetails[2]}')/$value`;
        this._oModel = new JSONModel({
          Source: this._sValidPath
        });
        view.byId("PDFViewer").setModel(this._oModel, "local");          
        });
      },

      onAfterRendering: function () {

        //Value help for CIL capped rate and CIL rate
        this._cilUpdates = {
          "onAfterRendering": function () {
            const id = this.id;
            const input_id = `${id}-input`;
            let rateId = this.rateId;
            var that = this.that;
            const cappedRateSF = sap.ui.getCore().byId(id);
            if (cappedRateSF){
              cappedRateSF.onAfterRendering = function () {
                const cilRate = sap.ui.getCore().byId(input_id);
                if (!cilRate){
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
                  if (!rateId){
                    if (this.getView().byId("idCIL_EditRBGrpNResType").getButtons()[0].getSelected()){
                      rateId = "NON_RES_VAC";
                    }else{
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
        if (cilResLowSS){
          const context = {"that": this, "id": smartFieldId, "rateId": "RES_LOW_DEN"};
          cilResLowSS.addEventDelegate(this._cilUpdates, context);
        }

        //CIL Rate VH for Non Residential scenario - Existing
        const nonResExtSSId = "com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--CIL-NonResVac-SS::SubSection";
        const nonResExtSS_smartFieldId = "com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--CILNonResDensity-ID::cil_rate_nres::Field";
        const nonResExtSS = sap.ui.getCore().byId(nonResExtSSId);
        if (nonResExtSS){
          const context = {"that": this, "id": nonResExtSS_smartFieldId};
          nonResExtSS.addEventDelegate(this._cilUpdates, context);          
        }      

        //CIL Rate VH for Non Residential scenario - Vacant
        const nonResVacSSId = "com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--CIL-NonRes-SS::SubSection";
        const nonResVacSS_smartFieldId = "com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--CILNonResDensityVac-ID::cil_rate_nres::Field";
        const nonResVacSS = sap.ui.getCore().byId(nonResVacSSId);
        if (nonResVacSS){
          const context = {"that": this, "id": nonResVacSS_smartFieldId};
          nonResVacSS.addEventDelegate(this._cilUpdates, context);          
        }          
        
        const setBlocksRight = function () {
          var blocks = this.getBlocks();
          for (var i = 0; i < blocks.length; i++) {
            if(blocks[i].getParent().getParent().getId() === "com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--CBCHeader-GI::SubSection" || blocks[i].getParent().getParent().getId() === "com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--DCHeader-GI::SubSection"){
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

        //Set the Grid Layout for the SubSection
        const exmSubSection = sap.ui
          .getCore()
          .byId(
            "com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--CBC-Exm-SS::SubSection"
          );
        if (exmSubSection) {
          exmSubSection.onAfterRendering = setBlocksRight;
        }

        const kindSubSection = sap.ui
          .getCore()
          .byId(
            "com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--CBC-InK-SS::SubSection"
          );
        if (kindSubSection) {
          kindSubSection.onAfterRendering = setBlocksRight;
        }

        const demSubSection = sap.ui
          .getCore()
          .byId(
            "com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--CBC-Dem-SS::SubSection"
          );
        if (demSubSection) {
          demSubSection.onAfterRendering = setBlocksRight;
        }

        const paymentSection = sap.ui
          .getCore()
          .byId(
            "com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--Payment-SS::SubSection"
          );
        if (paymentSection) {
          paymentSection.onAfterRendering = setBlocksRight;
        }

        const refundSection = sap.ui
          .getCore()
          .byId(
            "com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--Refund-SS::SubSection"
          );
        if (refundSection) {
          refundSection.onAfterRendering = setBlocksRight;
        }

        const deferralSection = sap.ui
          .getCore()
          .byId(
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

        const dcExemptionSection = sap.ui
          .getCore()
          .byId(
            "com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--DC-Exemption-SS::SubSection"
          );
        if (dcExemptionSection) {
          dcExemptionSection.onAfterRendering = setBlocksRight;
        }

        const dcDeferralSection = sap.ui
          .getCore()
          .byId(
            "com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--DC-Deferral-SS::SubSection"
          );
        if (dcDeferralSection) {
          dcDeferralSection.onAfterRendering = setBlocksRight;
        }

        const demoTable = sap.ui
          .getCore()
          .byId(
            "com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--DemolitionCred-ID::Table"
          )
          .getTable();
        demoTable.attachBusyStateChanged(this._onBusyStateChanged);
        const totalDCTable = sap.ui
          .getCore()
          .byId(
            "com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--TotalDC-ID::Table"
          )
          .getTable();
        totalDCTable.attachBusyStateChanged(this._onBusyStateChanged);

        //CBC
        //Exemption Table

        const oCBCExemptTable = sap.ui.getCore().byId(
          "com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--ExemptionCBC-ID::Table"
        )
          .getTable();
        oCBCExemptTable.attachBusyStateChanged(this._onBusyStateChanged);
        
      },

      onBeforeRebindTableExtension: function (oEvent) {
        //Add $select for payment table
        if (oEvent.getSource().getId() === "com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--PaymentInfo-ID::Table") {
          oEvent.getParameter("bindingParams").parameters = oEvent.getParameter("bindingParams").parameters || {};
          // Add property 'Gen_pay_receipt_ac' to $select
          oEvent.getParameter("bindingParams").parameters.select = oEvent.getParameter("bindingParams").parameters.select + ",Gen_pay_receipt_ac";
        }

        //Binding parameter change is only for the DC Table, Speculative and Demolition table
        if (
          oEvent.getSource().getId() !==
          "com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--TotalDC-ID::Table" &&
          oEvent.getSource().getId() !==
          "com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--DemolitionCred-ID::Table" &&
          oEvent.getSource().getId() !==
          "com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--TotalDC-ID-NonInd::Table"
        ) {
          return;
        }
        var oBindingParams = oEvent.getParameter("bindingParams");
        oBindingParams.parameters = oBindingParams.parameters || {};
        oBindingParams.parameters.operationMode = "Client";
       
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
            sap.ui
              .getCore()
              .byId(
                "com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--TotalDC-ID::Table"
              )
              .rebindTable();
             
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
        oModel.callFunction("/ZGC_C_PRE_BLD_PERMIT_CRDAdd_build_permit", {
          method: "POST",
          urlParameters: {
            PermitNo: permitNo,
            req_uuid: reqGuid
          },
          success: function () {
            sap.ui
              .getCore()
              .byId(
                "com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--Previous-Building-Permit-Credit-ID::Table"
              )
              .rebindTable();
          },
          error: function (oError) { }
        });
      },
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
        const oSource = oEvent.getSource();
        const oBindingContext = oSource.getBindingContext();
        const sPath = oBindingContext.getPath();
        const iSelectedIndex = oEvent.getParameter("selectedIndex");
        const oModel = this.getView().getModel();

        let oPayload = {
          "resi_low_hidden": true,
          "resi_high_med_hidden":true,
          "non_resi_existing_hidden":true,
          "non_resi_vacant_hidden":true,
          "res_type":"",
          "nres_type":"",
          "cil_build_type":"MXD",
          "residential_hidden": true,
          "non_resi_hidden":true

        };
       
        if (iSelectedIndex === 0) {
          oPayload.cil_build_type = "RES";
        } else if (iSelectedIndex === 1) {
          oPayload.cil_build_type = "NRS";
        } else {
          oPayload.cil_build_type = "MXD";
        }

        // Do the Update Call
          const sCilCalPath = sap.ui.getCore().byId("com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--CILResDensityLow-ID::lot_frontage::Field-input").getBindingContext().getPath();
          oModel.update(sCilCalPath, oPayload, {
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



      onPressRBGrpResType: function (oEvent) {
        const oSource = oEvent.getSource();
        const oBindingContext = oSource.getBindingContext();
        const sPath = oBindingContext.getPath();
        const iSelectedIndex = oEvent.getParameter("selectedIndex");
        const oModel = this.getView().getModel();

        // Hide the Non - Res Section --> not required because of mixed
        // oModel.setProperty(`${sPath}/to_cilcal/non_resi_existing_hidden` , true);
        // oModel.setProperty(`${sPath}/to_cilcal/non_resi_vacant_hidden` , true);
        let oPayload = {
          "resi_low_hidden": true,
          "resi_high_med_hidden":true,
          "non_resi_existing_hidden":true,
          "non_resi_vacant_hidden":true,
          "res_type":"",
          "residential_hidden": false,
          "non_resi_hidden":true

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
        const sCilCalPath = sap.ui.getCore().byId("com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--CILResDensityLow-ID::lot_frontage::Field-input").getBindingContext().getPath();
        oModel.update(sCilCalPath, oPayload, {
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
      onPressRBGrpNResType: function (oEvent) {
        const oSource = oEvent.getSource();
        const oBindingContext = oSource.getBindingContext();
        const sPath = oBindingContext.getPath();
        const iSelectedIndex = oEvent.getParameter("selectedIndex");
        const oModel = this.getView().getModel();
        let oPayload = {
          "resi_low_hidden": true,
          "resi_high_med_hidden":true,
          "non_resi_existing_hidden":true,
          "non_resi_vacant_hidden":true,
          "nres_type":"",
          "residential_hidden": true,
          "non_resi_hidden":false

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

          // Do the Update Call
          const sCilCalPath = sap.ui.getCore().byId("com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--CILResDensityLow-ID::lot_frontage::Field-input").getBindingContext().getPath();
          oModel.update(sCilCalPath, oPayload, {
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

      cilApplicableChanged: function (oEvent) {
        const oSource = oEvent.getSource();
        const oBindingContext = oSource.getBindingContext();
        const sPath = oBindingContext.getPath();
        const oModel = this.getView().getModel();
        const bCilApplicable = oEvent.getParameter("selected");
        let oPayload = {
          "cil_applicable": bCilApplicable
        };

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
        const oModel = this.getView().getModel();
        const sGuid = oEvent.getSource().getBindingContext().getObject().req_uuid;
        const sCilCalPath = oModel.createKey("/zgc_c_cil_cal", {
          cil_uuid: sGuid,
          IsActiveEntity: false
        });
        let oPayload = {
          "res_gfa": parseInt(oEvent.getParameter("newValue"))
        };

        oModel.update(sCilCalPath, oPayload, {
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

      onUpdateNresGFA: function (oEvent) {
        const oModel = this.getView().getModel();
        const sGuid = oEvent.getSource().getBindingContext().getObject().req_uuid;
        const sCilCalPath = oModel.createKey("/zgc_c_cil_cal", {
          cil_uuid: sGuid,
          IsActiveEntity: false
        });
        let oPayload = {
          "nres_gfa": parseInt(oEvent.getParameter("newValue"))
        };

        oModel.update(sCilCalPath, oPayload, {
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

      onPressRBGrpMngrAppReq: function (oEvent) {
        const oSource = oEvent.getSource();
        const oBindingContext = oSource.getBindingContext();
        const sPath = oBindingContext.getPath();
        const iSelectedIndex = oEvent.getParameter("selectedIndex");
        const oModel = this.getView().getModel();

        if (iSelectedIndex === 0) {
          oModel.setProperty(`${sPath}/to_cilcal/mgr_apr_reqd`, true);
        } else {
          oModel.setProperty(`${sPath}/to_cilcal/mgr_apr_reqd`, false);
        }
      },
      onValueHelpRequested: function (oEvent) {
        this.VHInput = oEvent.getSource();
        const fragment = Fragment.load({
          name: "com.gc.dashboard.ext.fragment.DCRateValueHelp",
          controller: this
        });
        //Date filter
        //If interest applicable, 
        let dateFilter = this.getView()
        .getBindingContext()
        .getObject().interest_applied_date;
        if (!dateFilter){
          dateFilter = this.getView()
          .getBindingContext()
          .getObject().invoice_calculation_date;
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
                      dataReceived: function () {
                        oDialog.update();
                      }
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
      onDNValueHelpRequested: function (oEvent) {
        this.VHInput = oEvent.getSource();
        const fragment = Fragment.load({
          name: "com.gc.dashboard.ext.fragment.DocumentNoValueHelp",
          controller: this
        });
        //Date filter
        const invoice_number = this.getView()
          .getBindingContext()
          .getObject().invoice_number;
        const invoiceFilter = new Filter(
          "doc_ref",
          "EQ",
          invoice_number
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

      _onBusyStateChanged: function (oEvent) {
        var bBusy = oEvent.getParameter("busy");
        if (!bBusy && !this._bColumnOptimizationDone) {
          var oTable = oEvent.getSource();
          var oTpc = null;
          if (sap.ui.table.TablePointerExtension) {
            oTpc = new sap.ui.table.TablePointerExtension(oTable);
          } else {
            oTpc = new sap.ui.table.extensions.Pointer(oTable);
          }
          var aColumns = oTable.getColumns();
          for (var i = aColumns.length; i >= 0; i--) {
            if (
              aColumns[i]?.getId() ===
              "com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--TotalDC-ID::Table-dc_type"
              || "com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--DemolitionCred-ID::Table-dc_type"
            ) {
              aColumns[i]?.setWidth("300px");
            } else {
              oTpc.doAutoResizeColumn(i);
            }
          }
          //This line can be commented if you want the columns to be adjusted on every scroll
          //this._bColumnOptimizationDone = true;
        }
      }
    });
  }
);
