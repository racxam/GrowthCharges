jQuery.sap.require("com.gc.dashboard.ext.formatter.ObjectPageFormatter");
sap.ui.define([],
function (){
    "use strict";
    return sap.ui.controller("com.gc.dashboard.ext.controller.DetailsExt", {
        onInit: function() {
            var oTable = this.getView().getContent()[0].getAggregation("sections")[2].getSubSections()[1].getBlocks()[0].getContent()[0];
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

        /**
         * Formatter to control state of CBC Processflow
         * @public
         * @param {string} sStatus value
         * @returns {state} State
         */
        getStatusStateForCBC : function(sStatus){
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

        /**
         * Formatter to control state of DC Processflow
         * @public
         * @param {string} sStatus value
         * @returns {state} State
         */
        getStatusStateForDC : function(sStatus){
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

        /**
         * Formatter to control state of Closed Processflow
         * @public
         * @param {string} sStatus value
         * @returns {state} State
         */
        getStatusStateForClosed : function(sStatus){
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

        /**
         * Formatter to control state of Hold Processflow
         * @public
         * @param {string} sStatus value
         * @returns {state} State
         */
        getStatusStateForHold : function(sStatus){
            if(sStatus === "HLD"){
                return "Success";
            }return "None";
        },

        /**
         * Method to return Confirmation Message(Delete)
         * @public
         * @param {event} oBeforeLineItemDeleteProperties s
         * @returns {msg} oMessageText
         */
        beforeLineItemDeleteExtension : function(oBeforeLineItemDeleteProperties){
            const oMessageText = {
                text: "Are you sure you want to delete the row? This action cannot be undone."
            };
            return oMessageText;
        }    
    });
    });
    