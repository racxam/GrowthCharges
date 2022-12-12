sap.ui.define([
    "sap/m/Dialog",
    "sap/m/TextArea",
    "sap/m/Button",
    "sap/ui/model/Filter", 
    "sap/ui/comp/smartfilterbar/SmartFilterBar", 
    "sap/m/MultiComboBox"
],
function (Dialog,TextArea,Button,Filter, SmartFilterBar, MultiComboBox){
    "use strict";
    return sap.ui.controller("com.gc.dashboard.ext.controller.ListReportExt", {
        onInit: function() {
            const oMySmartFilterBar = this.getView().byId("listReportFilter");
            const liveMode = oMySmartFilterBar.getLiveMode();
            if(!liveMode) {
                oMySmartFilterBar.setLiveMode(true);
            }
            oMySmartFilterBar.setShowClearOnFB(true);  

            const oClearButton = this.getView().byId("com.gc.dashboard::sap.suite.ui.generic.template.ListReport.view.ListReport::zgc_c_requests--listReportFilter-btnClear");
            oClearButton.attachPress(this.onClearButtonPress, this);
        },

         /**
         * handler to clear filters 
         * @public
         */
        onClearButtonPress: function () {
            // Get a reference to all the custom filters to be cleared 
            this.byId("AppChargesId").setSelectedKeys([]);
          },

        getCustomAppStateDataExtension: function (oCustomData) {
            //the content of the custom field will be stored in the app state, so that it can be restored later, for example after a back navigation.
            //The developer has to ensure that the content of the field is stored in the object that is passed to this method.
            if (oCustomData) {
                var oCustomField1 = this.oView.byId("AppChargesId");
                if (oCustomField1) {
                    oCustomData.AppCharges = oCustomField1.getSelectedKeys();
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

        onBeforeRebindTableExtension: function(oEvent) {
            var oBindingParams = oEvent.getParameter("bindingParams");
            oBindingParams.parameters = oBindingParams.parameters || {};

            const oSmartTable = oEvent.getSource();
            const oSmartFilterBar = this.byId(oSmartTable.getSmartFilterId());
            if (oSmartFilterBar instanceof SmartFilterBar) {
                var oCustomControl = oSmartFilterBar.getControlByKey("AppCharges");
                if (oCustomControl instanceof MultiComboBox) {
                    let aKeys = oCustomControl.getSelectedKeys();
                    if (aKeys.length === 0) {
						return null;
					}
					aKeys.forEach((oElement) => {
                        switch (oElement) {
                            case "DC" :
                                oBindingParams.filters.push(new Filter("dc_applicable", "EQ", true));
                                break;
                            case "CBC" :
                                oBindingParams.filters.push(new Filter("cbc_applicable", "EQ", true));
                                break;
                            case "CIL" :
                                oBindingParams.filters.push(new Filter("cil_applicable", "EQ", true));
                                break;
                            default:
                                break;
                        }
					});

                    
                }
            }
        },

        onPressComments: function (oEvent,sKey) {
            const oListCommentDialog = {"CIL":"","CBC":"","DC":""};
            let sFieldText = "";
            if(sKey === "DC"){
                sFieldText = "dc_int_comments_sap";
            }else if(sKey === "CBC"){
                sFieldText = "cbcComments";
            }else{
                sFieldText = "cilComments";
            }

            if (!oListCommentDialog[sKey]) {
                oListCommentDialog[sKey] = new Dialog({
                    title: "Comments",
                    class:"sapUiSmallMarginBottom",
                    content: new TextArea({
                        value:`{${sFieldText}}`,
                        class: "sapUiMediumMargin",
                        width: "100%",
                        editable:false,
                        enabled:false,
                        growing:true,
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
        getStatusStateForCIL : function(sStatus){
            if(sStatus === "INP"){
                return "Information";
            } else if(sStatus === "PCILAPP"){
                return "Warning";
            }else if(sStatus === "CILR"){
                return "Error";
            }else if(sStatus === "CILA"){
                return "Success";
            }else if(sStatus === "PFIAPP"){
                return "Warning";
            }else if(sStatus === "CLSD"){
                return "Success";
            }else if(sStatus === "HLD"){
                return "Success";
            }else if(sStatus === "FRJ"){
                return "Error";
            }else if(sStatus === "PCLSD"){
                return "Success";
            }else{
                return "None";
            }
        }, 

        showStatusCIL : function(sStatus){
            if(sStatus === "INP"){
                return "Information";
            } else if(sStatus === "PCILAPP"){
                return "Warning";
            }else if(sStatus === "PCILAPP"){
                return "Error";
            }else if(sStatus === "CILA"){
                return "Success";
            }else if(sStatus === "PFIAPP"){
                return "Success";
            }else if(sStatus === "CLSD"){
                return "Information";
            }else if(sStatus === "HLD"){
                return "Information";
            }else if(sStatus === "FRJ"){
                return "Error";
            }else if(sStatus === "PCLSD"){
                return "Information";
            }else{
                return "None";
            }
        }, 
        showStatusCBC : function(sStatus){
            if(sStatus === "INP"){
                return "Information";
            } else if(sStatus === "PCILAPP"){
                return "Warning";
            }else if(sStatus === "PCILAPP"){
                return "Error";
            }else if(sStatus === "CILA"){
                return "Success";
            }else if(sStatus === "PFIAPP"){
                return "Success";
            }else if(sStatus === "CLSD"){
                return "Information";
            }else if(sStatus === "HLD"){
                return "Information";
            }else if(sStatus === "FRJ"){
                return "Error";
            }else if(sStatus === "PCLSD"){
                return "Information";
            }else{
                return "None";
            }
        }, 
        showStatusDC : function(sStatus){
            if(sStatus === "INP"){
                return "Information";
            } else if(sStatus === "PCILAPP"){
                return "Warning";
            }else if(sStatus === "PCILAPP"){
                return "Error";
            }else if(sStatus === "CILA"){
                return "Success";
            }else if(sStatus === "PFIAPP"){
                return "Success";
            }else if(sStatus === "CLSD"){
                return "Information";
            }else if(sStatus === "HLD"){
                return "Information";
            }else if(sStatus === "FRJ"){
                return "Error";
            }else if(sStatus === "PCLSD"){
                return "Information";
            }else{
                return "None";
            }
        },
        
        /**
         * Formatter to control state of Closed Processflow
         * @public
         * @param {string} sStatus value
         * @returns {state} State
         */
        showStatusClosed : function(sStatus){
            if(sStatus === "INP"){
                return "Information";
            } else if(sStatus === "PCILAPP"){
                return "Warning";
            }else if(sStatus === "PCILAPP"){
                return "Error";
            }else if(sStatus === "CILA"){
                return "Success";
            }else if(sStatus === "PFIAPP"){
                return "Success";
            }else if(sStatus === "CLSD"){
                return "Information";
            }else if(sStatus === "HLD"){
                return "Information";
            }else if(sStatus === "FRJ"){
                return "Error";
            }else if(sStatus === "PCLSD"){
                return "Information";
            }else{
                return "None";
            }
        },
        /**
         * Formatter to control state of Hold Processflow
         * @public
         * @param {string} sStatus value
         * @returns {state} State
         */
        showStatusHold : function(sStatus){
            if(sStatus === "HLD"){
                return "Success";
            }return "None";
        },

        showDCComments : function(sComments){
            if(sComments){
                return true;
            }
            return false;
        },

        showCBCComments : function(sComments){
            if(sComments){
                return true;
            }
            return false;
        },

        showCILComments : function(sComments){
            if(sComments){
                return true;
            }
            return false;
        },

        showApplicationCharges : function(bDC,bCIL,bCBC){
            
            let sAppCharges = ""; 
            if(bDC){
                sAppCharges = sAppCharges + "DC" + ",";
            }
            if(bCIL){
                sAppCharges = sAppCharges + "CIL" + ",";
            }
            if(bCBC){
                sAppCharges = sAppCharges + "CBC" + ",";
            }
            let iLastIndex = sAppCharges.lastIndexOf(",");
            sAppCharges = sAppCharges.substring(0,iLastIndex);
            return sAppCharges;
        }
    
    });
    });
    