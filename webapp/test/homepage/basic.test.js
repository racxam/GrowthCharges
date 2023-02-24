const { wdi5 } = require("wdio-ui5-service")
async function getSmartFilterBar() {
  const oFilterBar = {
    forceSelect: true,
    selector: {
      id: "com.gc.dashboard::sap.suite.ui.generic.template.ListReport.view.ListReport::zgc_c_requests--listReportFilter",
      // viewName: "com.gc.dashboard::sap.suite.ui.generic.template.ListReport.view.ListReport",
      // controlType: "sap.ui.comp.smartfilterbar.SmartFilterBar",
    },
  };

  return await browser.asControl(oFilterBar);
}

async function getSmartTable() {
  const oTable = {
    selector: {
      id: "listReport",
      viewName: "com.gc.dashboard::sap.suite.ui.generic.template.ListReport.view.ListReport",
      controlType: "sap.ui.comp.smarttable.SmartTable",
    },
  };

  return await browser.asControl(oTable);
}

async function getColumnListItems() {
  const oSelector = {
    forceSelect: true,
    selector: {
      controlType: "sap.m.ColumnListItem",
      viewName: "com.gc.dashboard::sap.suite.ui.generic.template.ListReport.view.ListReport",
      interactable: true,
    },
  }}
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

  


  it("Should have the right status", async () => {
    
		const oSmartFilter = await getSmartFilterBar();
		let oFilter = {
			request_id: {
				items: [
					{
						key: "02",
					},
				],
			},
		};
console.log(oSmartFilter)
		await oSmartFilter.setFilterData(oFilter);
		await oSmartFilter.fireSearch();
		browser.pause(3000);

		const aColumnListItem = await getColumnListItems();

		// const oContext = await aColumnListItem[4].getBindingContext();
		// let oObject = await browser.asObject(oContext.getUUID());
		// oObject = await oObject.getObject();

		// expect(oObject.Status).toEqual("Active");
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