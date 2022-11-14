sap.ui.define([
    "sap/m/Dialog",
    "sap/m/TextArea",
    "sap/m/Button"
],
function (Dialog,TextArea,Button){
    "use strict";
    return sap.ui.controller("com.gc.dashboard.ext.controller.ListReportExt", {
      
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
        
        showStatusRefund : function(sStatus){
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
        showStatusPayment : function(sStatus){
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

        setIcon : function(){
            sap.ui.core.IconPool.addIcon("CIL", "customfont", "icomoon", "e900");
            return "./img/CIL.png";
        }
    
    });
    });
    