const { wdi5 } = require("wdio-ui5-service")

describe("Load the app", () => {

  // it("SmartFilterbar has loaded", async () => {
  //   const filterBar = {
  //       selector: {
  //           controlType: "sap.ui.comp.smartfilterbar.SmartFilterBar"
  //       }
  //   }
  //   const prop = await browser.asControl(filterBar).getProperty("visible");
  //   expect(prop).toEqual(true);
  // });

  // it("should open list page succesfully",async ()=>{

  //   const filterBar = {
  //           selector: {
  //               controlType: "sap.ui.comp.smartfilterbar.SmartFilterBar"
  //           }
  //       };
  //       // const _button = await browser.asControl(filterBar)._oSearchButton();
  //   const _button = {
  //     selector:{
  //       id:"listReportFilter-btnGo",
  //       viewName: "com.gc.dashboard::sap.suite.ui.generic.template.ListReport.view.ListReport::zgc_c_requests"
  //     }
  //   }
  //   browser.asControl(_button).firePress();

  //   const tableSelector = {
  //           selector: {
  //               id: "com.gc.dashboard::sap.suite.ui.generic.template.ListReport.view.ListReport::zgc_c_requests--responsiveTable"
  //           }
  //       }

  //       const rowCount = browser.asControl(tableSelector).getItems().length;

  //       expect(rowCount).toBeGreaterThan(0);
  // }); 

  it("control by id", async () => {

    const titleText = await browser.asControl({
      selector: {
        id: "com.gc.dashboard::sap.suite.ui.generic.template.ListReport.view.ListReport::zgc_c_requests--listReportFilter-btnGo",
      }
    }).press();


    const tableSelector = await browser.asControl({
      selector: {
        id: "com.gc.dashboard::sap.suite.ui.generic.template.ListReport.view.ListReport::zgc_c_requests--responsiveTable",
        controlType: "sap.m.ColumnListItem",
        viewName: "sap.suite.ui.generic.template.ListReport.view.ListReport",
      }
    });

    await browser.asControl({
      selector: {
        controlType: "sap.m.ColumnListItem",
        viewName: "sap.suite.ui.generic.template.ListReport.view.ListReport",
        bindingPath: {
          path: "/zgc_c_requests(req_uuid=guid'00505694-0ad9-1edd-9ac5-ffd356583193',IsActiveEntity=true)",
          propertyPath: "IsActiveEntity",
        }
      }
    }).press();

    // const tableSelector = await browser.asControl({
    //   selector: {
    //     controlType: "sap.m.ColumnListItem",
    //     viewName: "sap.suite.ui.generic.template.ListReport.view.ListReport"
    //   }
    // }).getItems().length;

    // expect(tableSelector).toBeGreaterThan(0);



  })

});