sap.ui.define([
    "sap/m/Dialog",
    "sap/m/Text",
    "sap/m/Button"
],
function (Dialog,Text,Button){
    "use strict";
    return sap.ui.controller("com.gc.dashboard.ext.controller.ListReportExt", {
      
        onPressComments: function (oEvent,sKey) {
            if (!this.oDefaultDialog) {
                this.oDefaultDialog = new Dialog({
                    title: "Comments",
                    content: new Text({
                        text:"{street}"
                    }),
                    beginButton: new Button({
                        text: "OK",
                        press: function () {
                            this.oDefaultDialog.close();
                        }.bind(this)
                    }),
                    endButton: new Button({
                        text: "Close",
                        press: function () {
                            this.oDefaultDialog.close();
                        }.bind(this)
                    })
                });
                
                // to get access to the controller's model
                this.getView().addDependent(this.oDefaultDialog);
            }
            const oSelectedItem = oEvent.getSource();
            const oBindingContext = oSelectedItem.getBindingContext();
           
            this.oDefaultDialog.setBindingContext(oBindingContext);
            this.oDefaultDialog.open();
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
    