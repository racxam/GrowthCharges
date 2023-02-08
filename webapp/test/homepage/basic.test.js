const { wdi5 } = require("wdio-ui5-service")

describe("Load the app", () => {
//   before(async () => {
//     await wdi5.goTo("#comgcdashboard-tile")
//   })

  it("SmartFilterbar has loaded", async () => {
    const filterBar = {
        selector: {
            controlType: "sap.ui.comp.smartfilterbar.SmartFilterBar",
            interactable: true
        }
    }
    const prop = await browser.asControl(filterBar).getProperty("visible");
    expect(prop).toEqual(true);
  })
})