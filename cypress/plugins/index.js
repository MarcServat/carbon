// eslint-disable-next-line import/no-extraneous-dependencies
const cucumber = require("cypress-cucumber-preprocessor").default;

// this line is required to avoid memory leak
require("events").EventEmitter.setMaxListeners = 150; // value should be updated due to amount of regression files (150)

module.exports = (on, config) => {
  on("file:preprocessor", cucumber());

  on("task", {
    log(message) {
      console.log(message);
      return null;
    },

    table(message) {
      console.table(message);
      return null;
    },
  });

  on("before:browser:launch", (browser = {}, launchOptions) => {
    if (browser.family === "chromium" && browser.name !== "electron") {
      launchOptions.args.push("--disable-site-isolation-trials");
      launchOptions.args.push("--disable-gpu"); // disable update for chrome for CI

      launchOptions.args.push(
        `--simulate-outdated-no-au='Tue, 31 Dec 2099 23:59:59 GMT'`
      );
    }

    if (browser.name === "firefox") {
      // works only for macOS
      // issue for Win https://bugzilla.mozilla.org/show_bug.cgi?id=855899
      launchOptions.args.push("-new-instance");
    }

    return launchOptions;
  });

  return config; // IMPORTANT to return a config
};
