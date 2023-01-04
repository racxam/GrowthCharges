jQuery.sap.require("com.gc.dashboard.ext.formatter.ObjectPageFormatter");
sap.ui.define(["sap/ui/model/json/JSONModel"],
    function (JSONModel) {
        "use strict";
        return sap.ui.controller("com.gc.dashboard.ext.controller.DetailsExt", {
            onInit: function () {
                try {
                    const oVariantManagement = sap.ui.getCore().byId("com.gc.dashboard::sap.suite.ui.generic.template.ListReport.view.ListReport::zgc_c_requests--template::PageVariant");
                    oVariantManagement.getVariantItems().filter(function (oVariant) {
                        return oVariant.getAuthor() !== sap.ushell.Container.getService("UserInfo").getId();
                    }).forEach(function (oForeignVariant) {
                        oForeignVariant.setProperty("readOnly", true);
                    });
                } catch (error) {
                    //If opened not using FLP, there will be an error              
                }


                this.extensionAPI.attachPageDataLoaded(function (event) {
                    var sPath = event.context.sPath;  // get the path
                    var oData = event.context.getModel().getProperty(sPath); // get the data to use further
                    // write rest of your code here ! happy coding!
                });

                //Invoice Section
                this._sValidPath = "/sap/opu/odata/sap/CV_ATTACHMENT_SRV/OriginalContentSet(Documenttype='GOS',Documentnumber='EXT48000000000002',Documentpart='',Documentversion='',ApplicationId='005056940AD91EDDA2F0473378DA7E15',FileId='005056940AD91EDDA2F0473378DA9E15')/$value";
                this._oModel = new JSONModel({
                    Source: this._sValidPath
                });
                this.getView().byId("PDFViewer").setModel(this._oModel);
            },


            onAfterRendering: function () {

                const setBlocksRight = function () {
                    var blocks = this.getBlocks();
                    for (var i = 0; i < blocks.length; i++) {
                        blocks[i].setLayoutData(new sap.ui.layout.GridData({
                            span: "L12 M12 S12"
                        }));
                    }
                };

                //Set the Grid Layout for the SubSection
                const exmSubSection = sap.ui.getCore().byId("com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--CBC-Exm-SS::SubSection");
                exmSubSection.onAfterRendering = setBlocksRight;

                const kindSubSection = sap.ui.getCore().byId("com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--CBC-InK-SS::SubSection");
                kindSubSection.onAfterRendering = setBlocksRight;

                const demSubSection = sap.ui.getCore().byId("com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--CBC-Dem-SS::SubSection");
                demSubSection.onAfterRendering = setBlocksRight;

                const paymentSection = sap.ui.getCore().byId("com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--Payment-SS::SubSection");
                paymentSection.onAfterRendering = setBlocksRight;

                const refundSection = sap.ui.getCore().byId("com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--Refund-SS::SubSection");
                refundSection.onAfterRendering = setBlocksRight;

                const deferralSection = sap.ui.getCore().byId("com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--Deferral-SS::SubSection");
                deferralSection.onAfterRendering = setBlocksRight;

                //Set the Grid Layout for the SubSection
                const dcExemptionSection = sap.ui.getCore().byId("com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--DC-Exemption-SS::SubSection");
                dcExemptionSection.onAfterRendering = setBlocksRight;
            },

            onBeforeRebindTableExtension: function (oEvent) {
                //Binding parameter change is only for the DC Table anddemolition table
                if (oEvent.getSource().getId() !== "com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--TotalDC-ID::Table" ||
                    oEvent.getSource().getId() !== "com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--DemolitionCred-ID::Table") {
                    return;
                }
                var oBindingParams = oEvent.getParameter("bindingParams");
                oBindingParams.parameters = oBindingParams.parameters || {};
                oBindingParams.parameters.operationMode = "Client";
            },

            onPressDCCalc: function (oEvent) {
                const oModel = this.getView().getModel();
                const reqGuid = this.getView().getBindingContext().getProperty("req_uuid");
                oModel.callFunction("/zgc_c_dc_calcltnsCalculate", {
                    method: "POST",
                    urlParameters: {
                        req_uuid:reqGuid
                    },
                    success: function (oData) {

                    },
                    error: function (oError) {

                    }
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
                } else if (sStatus === "PCILAPP") {
                    return "Warning";
                } else if (sStatus === "CILR") {
                    return "Error";
                } else if (sStatus === "CILA") {
                    return "Success";
                } else if (sStatus === "PFIAPP") {
                    return "Warning";
                } else if (sStatus === "CLSD") {
                    return "Success";
                } else if (sStatus === "HLD") {
                    return "Success";
                } else if (sStatus === "FRJ") {
                    return "Error";
                } else if (sStatus === "PCLSD") {
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
                if (sStatus === "INP") {
                    return "Information";
                } else if (sStatus === "PCILAPP") {
                    return "Warning";
                } else if (sStatus === "CILR") {
                    return "Error";
                } else if (sStatus === "CILA") {
                    return "Success";
                } else if (sStatus === "PFIAPP") {
                    return "Warning";
                } else if (sStatus === "CLSD") {
                    return "Success";
                } else if (sStatus === "HLD") {
                    return "Success";
                } else if (sStatus === "FRJ") {
                    return "Error";
                } else if (sStatus === "PCLSD") {
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
                if (sStatus === "INP") {
                    return "Information";
                } else if (sStatus === "PCILAPP") {
                    return "Warning";
                } else if (sStatus === "CILR") {
                    return "Error";
                } else if (sStatus === "CILA") {
                    return "Success";
                } else if (sStatus === "PFIAPP") {
                    return "Warning";
                } else if (sStatus === "CLSD") {
                    return "Success";
                } else if (sStatus === "HLD") {
                    return "Success";
                } else if (sStatus === "FRJ") {
                    return "Error";
                } else if (sStatus === "PCLSD") {
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
                } else if (sStatus === "PCILAPP") {
                    return "Warning";
                } else if (sStatus === "CILR") {
                    return "Error";
                } else if (sStatus === "CILA") {
                    return "Success";
                } else if (sStatus === "PFIAPP") {
                    return "Warning";
                } else if (sStatus === "CLSD") {
                    return "Success";
                } else if (sStatus === "HLD") {
                    return "Success";
                } else if (sStatus === "FRJ") {
                    return "Error";
                } else if (sStatus === "PCLSD") {
                    return "Success";
                } else {
                    return "None";
                }
            },

            /**
             * Formatter to control state of Hold Processflow
             * @public
             * @param {string} sStatus value
             * @returns {state} State
             */
            getStatusStateForHold: function (sStatus) {
                if (sStatus === "HLD") {
                    return "Success";
                } return "None";
            },

            /**
             * Method to return Confirmation Message(Delete)
             * @public
             * @param {event} oBeforeLineItemDeleteProperties s
             * @returns {msg} oMessageText
             */
            beforeLineItemDeleteExtension: function (oBeforeLineItemDeleteProperties) {
                const oMessageText = {
                    text: "Are you sure you want to delete the row? This action cannot be undone."
                };
                return oMessageText;
            },

            onPressRB: function (oEvent) {
                // const bResLowSelected = oEvent.getParameter("selectedIndex") === 1 ? true : false;

                // if(bResLowSelected){
                //     this.getView().getModel().setProperty(oEvent.getSource().getParent().getBindingContext().getPath() + "/resi_high_med_hidden" , false);
                //     this.getView().getModel().setProperty(oEvent.getSource().getParent().getBindingContext().getPath() + "/resi_low_hidden" , true);
                // }else{
                //     this.getView().getModel().setProperty(oEvent.getSource().getParent().getBindingContext().getPath() + "/resi_high_med_hidden" , true);
                //     this.getView().getModel().setProperty(oEvent.getSource().getParent().getBindingContext().getPath() + "/resi_low_hidden" , false);
                // }
                // this.getView().getModel().submitChanges();
            },

            onPressBuildingType: function (oEvent) {
                const oSource = oEvent.getSource();
                const oBindingContext = oSource.getBindingContext();
                const sPath = oBindingContext.getPath();
                const iSelectedIndex = oEvent.getParameter("selectedIndex");
                const oModel = this.getView().getModel();

                oModel.setProperty(`${sPath}/residential_hidden`, true);
                oModel.setProperty(`${sPath}/non_resi_hidden`, true);
                oModel.setProperty(`${sPath}/to_cilcal/resi_low_hidden`, true);
                oModel.setProperty(`${sPath}/to_cilcal/resi_high_med_hidden`, true);
                oModel.setProperty(`${sPath}/to_cilcal/non_resi_existing_hidden`, true);
                oModel.setProperty(`${sPath}/to_cilcal/non_resi_vacant_hidden`, true);
                oModel.setProperty(`${sPath}/to_cilcal/res_type`, "");
                oModel.setProperty(`${sPath}/to_cilcal/nres_type`, "");
                if (iSelectedIndex === 0) {
                    oModel.setProperty(`${sPath}/to_cilcal/cil_build_type`, "RES");
                } else if (iSelectedIndex === 1) {
                    oModel.setProperty(`${sPath}/to_cilcal/cil_build_type`, "NRS");
                } else {
                    oModel.setProperty(`${sPath}/to_cilcal/cil_build_type`, "MXD");
                }
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
                oModel.setProperty(`${sPath}/residential_hidden`, false);
                if (iSelectedIndex === 0) {
                    oModel.setProperty(`${sPath}/to_cilcal/res_type`, "HDE");
                    oModel.setProperty(`${sPath}/to_cilcal/resi_high_med_hidden`, false);
                    oModel.setProperty(`${sPath}/to_cilcal/resi_low_hidden`, true);
                } else if (iSelectedIndex === 1) {
                    oModel.setProperty(`${sPath}/to_cilcal/res_type`, "MDE");
                    oModel.setProperty(`${sPath}/to_cilcal/resi_high_med_hidden`, false);
                    oModel.setProperty(`${sPath}/to_cilcal/resi_low_hidden`, true);
                }
                else {
                    oModel.setProperty(`${sPath}/to_cilcal/res_type`, "LDE");
                    oModel.setProperty(`${sPath}/to_cilcal/resi_low_hidden`, false);
                    oModel.setProperty(`${sPath}/to_cilcal/resi_high_med_hidden`, true);
                }
            },
            onPressRBGrpNResType: function (oEvent) {
                const oSource = oEvent.getSource();
                const oBindingContext = oSource.getBindingContext();
                const sPath = oBindingContext.getPath();
                const iSelectedIndex = oEvent.getParameter("selectedIndex");
                const oModel = this.getView().getModel();

                oModel.setProperty(`${sPath}/non_resi_hidden`, false);
                if (iSelectedIndex === 0) {
                    oModel.setProperty(`${sPath}/to_cilcal/nres_type`, "VAC");
                    oModel.setProperty(`${sPath}/to_cilcal/non_resi_existing_hidden`, true);
                    oModel.setProperty(`${sPath}/to_cilcal/non_resi_vacant_hidden`, false);
                } else {
                    oModel.setProperty(`${sPath}/to_cilcal/nres_type`, "EXT");
                    oModel.setProperty(`${sPath}/to_cilcal/non_resi_vacant_hidden`, true);
                    oModel.setProperty(`${sPath}/to_cilcal/non_resi_existing_hidden`, false);
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
            }
        });
    });
