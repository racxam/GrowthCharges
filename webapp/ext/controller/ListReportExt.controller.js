sap.ui.define([
    "sap/m/Dialog",
    "sap/m/TextArea",
    "sap/m/Button"
],
function (Dialog,TextArea,Button){
    "use strict";
    return sap.ui.controller("com.gc.dashboard.ext.controller.ListReportExt", {
        onInit: function() {
            var oMySmartFilterBar = this.getView().byId("listReportFilter");
            var liveMode = oMySmartFilterBar.getLiveMode();
            if(!liveMode) {
                oMySmartFilterBar.setLiveMode(true);
            }
            oMySmartFilterBar.setShowClearOnFB(true);  
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

        // Formatter to handle visiblity of Status Icons based on Application Charges

        showCILStatusIcon : function(bCIL){
            if(!bCIL){
                return true;
            }return false;
        },

        showCBCStatusIcon : function(bCBC){
            if(!bCBC){
                return true;
            }return false;
        },

        showDCStatusIcon : function(bDC){
            if(!bDC){
                return true;
            }return false;
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
        }
    
    });
    });
    