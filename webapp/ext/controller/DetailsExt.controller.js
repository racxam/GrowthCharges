jQuery.sap.require("com.gc.dashboard.ext.formatter.ObjectPageFormatter");
sap.ui.define([],
function (){
    "use strict";
    return sap.ui.controller("com.gc.dashboard.ext.controller.DetailsExt", {
        onInit: function() {
            var oTable = this.getView().getContent()[0].getAggregation("sections")[2].getSubSections()[1].getBlocks()[0].getContent()[0];
        },
        showStatusCIL1 : function(sStatus){
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
        showStatusCBC1 : function(sStatus){
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
        showStatusDC1 : function(sStatus){
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
        showStatusClosed1 : function(sStatus){
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
        showStatusHold1 : function(sStatus){
            if(sStatus === "HLD"){
                return "Success";
            }return "None";
        },
        beforeLineItemDeleteExtension : function(oBeforeLineItemDeleteProperties){
            const oMessageText = {
                text: "Are you sure you want to delete the row? This action cannot be undone."
            };
            return oMessageText;
        }    
    });
    });
    