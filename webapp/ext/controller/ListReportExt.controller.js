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

      // --- HELPER: DETERMINE IF BILL 17 IS ACTIVE ---
      // Logic: Active if 'to_defpartner' association has entries.
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
        // if (!this._isBill17Active(vDefPartner)) return false;

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


    // end of controller
        });
    });
