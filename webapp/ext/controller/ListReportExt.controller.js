sap.ui.define([
    "sap/m/Dialog",
    "sap/m/TextArea",
    "sap/m/Button",
    "sap/ui/model/Filter",
    "sap/ui/comp/smartfilterbar/SmartFilterBar",
    "sap/m/MultiComboBox",
    "sap/f/library"
],
    function (Dialog, TextArea, Button, Filter, SmartFilterBar, MultiComboBox, FioriLibrary) {
        "use strict";
        return sap.ui.controller("com.gc.dashboard.ext.controller.ListReportExt", {

            /**
             * lifecycle, on init
             * @public
             */
            onInit: function () {
                const oClearButton = this.getView().byId("com.gc.dashboard::sap.suite.ui.generic.template.ListReport.view.ListReport::zgc_c_requests--listReportFilter-btnClear");
                oClearButton.attachPress(this.onClearButtonPress, this);
                //Disable popin in smarttable
                const oSmartTable = this.getView().byId("com.gc.dashboard::sap.suite.ui.generic.template.ListReport.view.ListReport::zgc_c_requests--listReport");
                oSmartTable.setDemandPopin(false);
                // Get Inbox HashKey
                const oRouter = this.getOwnerComponent().getRouter();
                const sHashKey = oRouter.getHashChanger().key;
                if (sHashKey === "Child") {
                    const oCoreModel = sap.ui.getCore().getModel("CoreModel");
                    const sGuid = oCoreModel.getProperty("/guid");
                    //Commented old code for Defect 114 layout issue fix
                  /*   oRouter.navTo("zgc_c_requests",
                        { keys1: `req_uuid=guid'${sGuid}',IsActiveEntity=true`},
                        true
                        ); */
                   //Added  new code for Defect 114 layout issue fix
                    oRouter.navTo("zgc_c_requestsquery",
                        {
                            keys1: `req_uuid=guid'${sGuid}',IsActiveEntity=true`, 
                            query: { FCLLayout: "MidColumnFullScreen" }
                        },
                        true
                    );
                }
            },

            /**
            * handler to clear filters 
            * @public
            */
            onClearButtonPress: function () {
                // Get a reference to all the custom filters to be cleared 
                this.byId("AppChargesId").setSelectedKeys([]);
                this.byId("VersionId").setSelectedKeys([]);
            },

            getCustomAppStateDataExtension: function (oCustomData) {
                //the content of the custom field will be stored in the app state, so that it can be restored later, for example after a back navigation.
                //The developer has to ensure that the content of the field is stored in the object that is passed to this method.
                if (oCustomData) {
                    var oCustomField1 = this.oView.byId("AppChargesId");
                    if (oCustomField1) {
                        oCustomData.AppCharges = oCustomField1.getSelectedKeys();
                    }
                    var oCustomField2 = this.oView.byId("VersionId");
                    if (oCustomField2) {
                        oCustomData.Version = oCustomField2.getSelectedKeys();
                    }
                }
            },
            restoreCustomAppStateDataExtension: function (oCustomData) {
                //in order to restore the content of the custom field in the filter bar, for example after a back navigation,
                //an object with the content is handed over to this method. Now the developer has to ensure that the content of the custom filter is set to the control
                if (oCustomData) {
                    if (oCustomData.AppCharges) {
                        var oComboBox = this.oView.byId("AppChargesId");
                        oComboBox.setSelectedKeys(
                            oCustomData.AppCharges
                        );
                    }
                }
            },

            /**
             * Event handler for smart table fired before binding is done.
             * @private
             * @param {sap.ui.base.Event} oEvent event handler for before binding event
             */
            onBeforeRebindTableExtension: function (oEvent) {

                var oBindingParams = oEvent.getParameter("bindingParams");
                if (oBindingParams.parameters.select) {
                    oBindingParams.parameters.select += ",bill17_hidden,status";
                } else {
                    oBindingParams.parameters.select = "bill17_hidden,status";
                }
                oBindingParams.parameters = oBindingParams.parameters || {};
                const oSmartTable = oEvent.getSource();
                const oSmartFilterBar = this.byId(oSmartTable.getSmartFilterId());
                let aFilters = [];
                const oTable = oSmartTable.getTable();
                const aColumns = oTable.getColumns();

                //Width Setting
                for (let i = 0; i < aColumns.length; i++) {
                    if (!aColumns[i].getWidth()) {
                        aColumns[i].setWidth("6rem");
                    }
                }

                if (oSmartFilterBar instanceof SmartFilterBar) {
                    const aCustomFiltersKey = ["AppCharges", "Version"];
                    let oCustomControl = "";
                    aCustomFiltersKey.forEach((mFilterKey) => {
                        oCustomControl = oSmartFilterBar.getControlByKey(mFilterKey);
                        if (oCustomControl instanceof MultiComboBox) {
                            let aKeys = oCustomControl.getSelectedKeys();
                            if (aKeys.length === 0) {
                                return null;
                            }
                            if (mFilterKey === "AppCharges") {
                                aKeys.forEach((oElement) => {
                                    switch (oElement) {
                                        case "DC":
                                            aFilters.push(new Filter("dc_applicable", "EQ", true));
                                            break;
                                        case "CBC":
                                            aFilters.push(new Filter("cbc_applicable", "EQ", true));
                                            break;
                                        case "CIL":
                                            aFilters.push(new Filter("cil_applicable", "EQ", true));
                                            break;
                                        default:
                                            break;
                                    }
                                });
                            } else {
                                let aVFilters = [];
                                aKeys.forEach((mKey) => {
                                    aVFilters.push(new Filter("version", "EQ", mKey));
                                });
                                aFilters.push(new Filter(aVFilters, false));
                            }
                        }
                    });
                    if (aFilters.length > 0) {
                        oBindingParams.filters.push(new Filter(aFilters, true));
                    }
                }
            },

            /**
             * Handler for Opening Comment Dialog
             * @public
             * @param {sap.ui.base.Event} oEvent press event handler
             * @param {string} sKey ColumnKey
             */
            onPressComments: function (oEvent, sKey) {
                const oListCommentDialog = { "CIL": "", "CBC": "", "DC": "" };
                let sFieldText = "";
                if (sKey === "DC") {
                    sFieldText = "dc_int_comments_sap";
                } else if (sKey === "CBC") {
                    sFieldText = "cbcComments";
                } else {
                    sFieldText = "cilComments";
                }

                if (!oListCommentDialog[sKey]) {
                    oListCommentDialog[sKey] = new Dialog({
                        title: "Comments",
                        class: "sapUiSmallMarginBottom",
                        content: new TextArea({
                            value: `{${sFieldText}}`,
                            class: "sapUiMediumMargin",
                            width: "100%",
                            editable: false,
                            enabled: false,
                            growing: true,
                            wrapping: "Soft"
                        }),
                        endButton: new Button({
                            text: "Close",
                            press: function () {
                                oListCommentDialog[sKey].close();
                            }
                        })
                    });

                    // to get access to the controller's model
                    this.getView().addDependent(oListCommentDialog[sKey]);
                }
                const oSelectedItem = oEvent.getSource();
                const oBindingContext = oSelectedItem.getBindingContext();

                oListCommentDialog[sKey].setBindingContext(oBindingContext);
                oListCommentDialog[sKey].open();
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
             * Formatter to show CBC Status
             * @public
             * @param {string} sStatus value
             * @returns {state} State
             */
            showStatusCBC: function (sStatus) {
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
            * Formatter to show DC Status
            * @public
            * @param {string} sStatus value
            * @returns {state} State
            */
            showStatusDC: function (sStatus) {
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
            showStatusClosed: function (sStatus) {
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
            showStatusHold: function (sStatus) {
                if (sStatus === "HLD") { return "None"; }
                return "None";

            },

            /**
             * Formatter to control visibility of DC Comments Icon
             * @public
             * @param {string} sComments value
             * @returns {state} State
             */
            showDCComments: function (sComments) {
                if (sComments) {
                    return true;
                }
                return false;
            },

            /**
             * Formatter to control visibility of CBC Comments Icon
             * @public
             * @param {string} sComments value
             * @returns {state} State
             */
            showCBCComments: function (sComments) {
                if (sComments) {
                    return true;
                }
                return false;
            },

            /**
             * Formatter to control visibility of CIL Comments Icon
             * @public
             * @param {string} sComments value
             * @returns {state} State
             */
            showCILComments: function (sComments) {
                if (sComments) {
                    return true;
                }
                return false;
            },

            /**
             * Formatter to concantentate the Application Charges Column
             * @public
             * @param {boolean} bDC value
             * @param {boolean} bCIL value
             * @param {boolean} bCBC value
             * @returns {string} sAppCharges
             */
            showApplicationCharges: function (bDC, bCIL, bCBC) {
                let sAppCharges = "";
                if (bDC) {
                    sAppCharges = sAppCharges + "DC" + ",";
                }
                if (bCIL) {
                    sAppCharges = sAppCharges + "CIL" + ",";
                }
                if (bCBC) {
                    sAppCharges = sAppCharges + "CBC" + ",";
                }
                let iLastIndex = sAppCharges.lastIndexOf(",");
                sAppCharges = sAppCharges.substring(0, iLastIndex);
                return sAppCharges;
            },

            /**
             * Formatter to concantentate the Application Charges Column
             * @public
             * @param {date} dInvoiceValidUntil value
             * @returns {string} sState
             */
            showInvoiceValidIcon: function (dInvoiceValidUntil) {
                let bState = false;
                if (dInvoiceValidUntil) {
                    const oTodayDate = new Date();
                    const oValidUntilDate = new Date(dInvoiceValidUntil);
                    const iSpent = oTodayDate.getTime() - oValidUntilDate.getTime();
                    bState = Math.floor(iSpent / 86400000) > 0 ? true : false;
                }
                return bState;
            },
          // ====================================================================
      //  STATUS PILL & COLOR CODING LOGIC (DYNAMIC BILL 17)
// ====================================================================
// ====================================================================
      //  STATUS PILL & COLOR CODING LOGIC (FIXED: ENABLE FINAL PILL FOR STANDARD)
      // ====================================================================

      _isBill17Active: function(vDefPartner) {
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

        if ( sStatus === "FIN_PND") return "Warning"; // Pending
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

    // end of controller
        });
    });
