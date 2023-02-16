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
  //           id: "listReportFilter-btnGo",
  //           viewName: "com.gc.dashboard::sap.suite.ui.generic.template.ListReport.view.ListReport::zgc_c_requests",
  //           interactable: true
  //       }
  //   });
  //   // Click on the Go button
  //   console.log(goButton);
  //   await goButton.Press();

  //   // SmartTable selector
  //   const smartTable = {
  //       selector: {
  //           controlType: "sap.ui.comp.smarttable.SmartTable",
  //           interactable: true
  //       }
  //   }
  //   // Get the number of rows in the table
  //   const rowCount = await browser.asControl(smartTable).getProperty("rowCount");
  //   // Check if the table has atleast one row
  //   expect(rowCount).toBeGreaterThan(0);
  // });
});