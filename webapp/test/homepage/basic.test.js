const { wdi5 } = require("wdio-ui5-service")

describe("Load the app", () => {

  it("SmartFilterbar has loaded", async () => {
    const filterBar = {
        selector: {
            controlType: "sap.ui.comp.smartfilterbar.SmartFilterBar"
        }
    }
    const prop = await browser.asControl(filterBar).getProperty("visible");
    expect(prop).toEqual(true);
  });

  // //Clicking on the Go button should load atleast one entry in the table
  // it("SmartTable has loaded with atleast one row", async () => {
  //   // Go button selector
  //   const goButton = browser.asControl({
  //       selector: {
  //           id: "com.gc.dashboard::sap.suite.ui.generic.template.ListReport.view.ListReport::zgc_c_requests--listReportFilter-btnGo"
  //       }
  //   });

  //   await goButton.Press();

  //   // SmartTable selector
  //   const tableSelector = {
  //       selector: {
  //           id: "com.gc.dashboard::sap.suite.ui.generic.template.ListReport.view.ListReport::zgc_c_requests--responsiveTable"
  //       }
  //   }
  //   // Get the number of rows in the table
  //   const table = await browser.asControl(tableSelector);
  //   const rowCount = table.getItems().length;
  //   // Check if the table has atleast one row
  //   console.log("ROW COUNT");
  //   console.log(rowCount);
  //   expect(rowCount).toBeGreaterThan(0);
  // });
});