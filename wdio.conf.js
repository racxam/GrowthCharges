exports.config = {
    wdi5: {
         screenshotPath: "./webapp/test/reports/screenshots",
         waitForUI5Timeout: 120000,
         logLevel: "error"
    },
    specs: ["./webapp/test/**/*.test.js"],
    maxInstances: 10,
    capabilities: [
        {
            maxInstances: 5,
            browserName: "chrome",
            "goog:chromeOptions": {
                args:
                    process.argv.indexOf("--headless") > -1
                        ? ["--headless"]
                        : process.argv.indexOf("--debug") > -1
                        ? ["window-size=1440,800", "--auto-open-devtools-for-tabs"]
                        : ["window-size=1440,800"]
            },
            acceptInsecureCerts: true
        }
    ],
    logLevel: "error",
    bail: 0,
    baseUrl: "http://localhost:8080/test/flpSandbox.html#comgcdashboard-tile",
    waitforTimeout: 120000,
    connectionRetryTimeout: process.argv.indexOf("--debug") > -1 ? 1200000 : 120000,
    connectionRetryCount: 3,
    services: ["chromedriver", "ui5"],
    framework: "mocha",
    reporters: ["spec"],
    mochaOpts: {
        ui: "bdd",
        timeout: process.argv.indexOf("--debug") > -1 ? 600000 : 60000
    }
};
