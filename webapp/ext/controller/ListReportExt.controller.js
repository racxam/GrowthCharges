sap.ui.define([
    "sap/m/Dialog",
    "sap/m/ExpandableText",
    "sap/m/Button"
],
function (Dialog,ExpandableText,Button){
    "use strict";
    return sap.ui.controller("com.gc.dashboard.ext.controller.ListReportExt", {

        onPressComments: function (oEvent) {
            if (!this.oDefaultDialog) {
                this.oDefaultDialog = new Dialog({
                    title: "Comments",
                    content: new ExpandableText({
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
        }
    
    });
    });
    