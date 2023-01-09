jQuery.sap.require("com.gc.dashboard.ext.formatter.ObjectPageFormatter");
sap.ui.define(["sap/ui/model/json/JSONModel", "sap/ui/core/Fragment", "sap/ui/table/Column", "sap/ui/model/Filter", "sap/m/Text"],
    function (JSONModel, Fragment, UIColumn, Filter, Text) {
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

                const oRouter = this.getOwnerComponent().getRouter();
                const sHashKey = oRouter.getHashChanger().key;
                if (sHashKey === "Child") {
                    sap.ui.getCore().byId("com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--action::ZGC_C_REQUESTS_CDS.ZGC_C_REQUESTS_CDS_Entities::zgc_c_requestsSubmit::Determining").getParent().setVisible(false);
                    sap.ui.getCore().byId("com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--fullScreen").getParent().setVisible(false);
                }
                this.extensionAPI.attachPageDataLoaded(function (event) {
                    const oComponent = sap.ui.getCore().byId("com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests").getParent();
                    const oRouterComp = oComponent.getRouter();
                    const sHKey = oRouterComp.getHashChanger().key;
                    if (sHKey === "Child") {
                        sap.ui.getCore().byId("com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--fullScreen").firePress();
                    }

                    //Calculate Button Visibility 
                    const oCalBtn = sap.ui.getCore().byId("com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--CalculateButton");
                    const bEdit = oComponent.getModel("ui").getProperty("/editable");
                    if (bEdit) {
                        oCalBtn.setVisible(true);
                    } else {
                        oCalBtn.setVisible(false);
                    }
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
                        blocks[i].getLayoutData().setSpanS(12);
                        blocks[i].getLayoutData().setSpanM(12);
                        blocks[i].getLayoutData().setSpanL(12);
                    }
                };
                const cbcGenSubSection = sap.ui.getCore().byId("com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--CBC::SubSection");
                if (cbcGenSubSection) { cbcGenSubSection.onAfterRendering = setBlocksRight; }

                //Set the Grid Layout for the SubSection
                const exmSubSection = sap.ui.getCore().byId("com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--CBC-Exm-SS::SubSection");
                if (exmSubSection) { exmSubSection.onAfterRendering = setBlocksRight; }

                const kindSubSection = sap.ui.getCore().byId("com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--CBC-InK-SS::SubSection");
                if (kindSubSection) { kindSubSection.onAfterRendering = setBlocksRight; }

                const demSubSection = sap.ui.getCore().byId("com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--CBC-Dem-SS::SubSection");
                if (demSubSection) { demSubSection.onAfterRendering = setBlocksRight; }

                const paymentSection = sap.ui.getCore().byId("com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--Payment-SS::SubSection");
                if (paymentSection) { paymentSection.onAfterRendering = setBlocksRight; }

                const refundSection = sap.ui.getCore().byId("com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--Refund-SS::SubSection");
                if (refundSection) { refundSection.onAfterRendering = setBlocksRight; }

                const deferralSection = sap.ui.getCore().byId("com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--Deferral-SS::SubSection");
                if (deferralSection) { deferralSection.onAfterRendering = setBlocksRight; }

                //Set the Grid Layout for the SubSection
                const dcExemptionSection = sap.ui.getCore().byId("com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--DC-Exemption-SS::SubSection");
                if (dcExemptionSection) { dcExemptionSection.onAfterRendering = setBlocksRight; }

                const dcDeferralSection = sap.ui.getCore().byId("com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--DC-Deferral-SS::SubSection");
                if (dcDeferralSection) { dcDeferralSection.onAfterRendering = setBlocksRight; }



            },

            onBeforeRebindTableExtension: function (oEvent) {
                //Binding parameter change is only for the DC Table anddemolition table
                if (oEvent.getSource().getId() !== "com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--TotalDC-ID::Table" &&
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
                        req_uuid: reqGuid
                    },
                    success: function (oData) {
                        debugger;
                        sap.ui.getCore().byId("com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--TotalDC-ID::Table").rebindTable();
                    },
                    error: function (oError) {

                    }
                });
            },

            /**
             * Function to handle the press of the New Credit button to show VH popup
             * @param {*} oEvent 
             */
            onPressNewPBP: function(oEvent) {
                //Load the fragment
                if (!this._oNewPBPDialog) {
                    this._oNewPBPDialog = sap.ui.xmlfragment("com.gc.dashboard.ext.fragment.NewBuildingPermit", this);
                    this.getView().addDependent(this._oNewPBPDialog);
                }
                this._oNewPBPDialog.open();
            },
            /**
             * Function to call the backend action upon selecting a permit
             * @param {*} sStatus 
             * @returns 
             */
            onPressNewPBPConfirm: function(oEvent) {
                const oModel = this.getView().getModel();
                const oSelectedObject = oEvent.getParameter("selectedItem").getBindingContext().getObject();
                const oRequestObject = oEvent.getSource().getBindingContext().getObject();
                const reqGuid = oRequestObject.req_uuid;
                const permitNo = oSelectedObject.build_permit_no;
                oModel.callFunction("/ZGC_C_PRE_BLD_PERMIT_CRDAdd_build_permit", {
                    method: "POST",
                    urlParameters: {
                        pr_build_permit_uuid: "00000000000000000000000000000000",
                        IsActiveEntity: true,
                        PermitNo: permitNo,
                        req_uuid: reqGuid
                    },
                    success: function () {
                        sap.ui.getCore().byId("com.gc.dashboard::sap.suite.ui.generic.template.ObjectPage.view.Details::zgc_c_requests--Previous-Building-Permit-Credit-ID::Table").rebindTable();
                    },
                    error: function (oError) {
                    }
                });
                this._oNewPBPDialog.close();
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
            },
            onValueHelpRequested: function(oEvent) {
            this.rateInput = oEvent.getSource();
            const fragment = Fragment.load({name: "com.gc.dashboard.ext.fragment.DCRateValueHelp", controller: this}); 
            //Date filter
            const invoiceCalculationDate = this.getView().getBindingContext().getObject().invoice_calculation_date;
            const startDateFilter = new Filter("start_date", "LE", invoiceCalculationDate);
            const endDateFilter = new Filter("end_date", "GE", invoiceCalculationDate);
            const dcFilter = new Filter("dc_type", "EQ", oEvent.getSource().getBindingContext().getObject().dc_type);   
            this.rateFilters = [startDateFilter, endDateFilter, dcFilter];            
            fragment.then(function(oDialog) {
                    this._oValueHelpDialog = oDialog;
                    this.getView().addDependent(oDialog);
                    oDialog.getTableAsync().then(function (oTable) {
                        oTable.setModel(this.getView().getModel());    
                        // For Desktop and tabled the default table is sap.ui.table.Table
                        if (oTable.bindRows) {
                            // Bind rows to the ODataModel and add columns
                            oTable.bindAggregation("rows", {
                                path: "/zgc_dcrates_vh",
                                filters: this.rateFilters,
                                events: {
                                    dataReceived: function() {
                                        oDialog.update();
                                    }
                                }
                            });

                            const dcRateTemplate = new Text({text: "{dc_rate}"});
                            const startDateTemplate = new Text({text: "{path: 'start_date', type: 'sap.ui.model.type.Date', formatOptions: {datePattern: 'MM/dd/yyyy'}}"});
                            const endDateTemplate = new Text({text: "{path: 'end_date', type: 'sap.ui.model.type.Date', formatOptions: {datePattern: 'MM/dd/yyyy'}}"});
                            oTable.addColumn(new UIColumn({label: "DC Rate", template: dcRateTemplate}));
                            oTable.addColumn(new UIColumn({label: "Valid From", template: startDateTemplate}));
                            oTable.addColumn(new UIColumn({label: "Valid To", template: endDateTemplate}));
                        }
                        oDialog.update();
                    }.bind(this));      
                    oDialog.open();              
                }.bind(this));
            },
    
            onValueHelpOkPress: function (oEvent) {
                this.rateInput.setValue(oEvent.getParameter("tokens")[0].getKey());
                this._oValueHelpDialog.close();
            },
    
            onValueHelpCancelPress: function () {
                this._oValueHelpDialog.close();
            },
    
            onValueHelpAfterClose: function () {
                this._oValueHelpDialog.destroy();
            }            
        });
    });
