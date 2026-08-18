/**
 * Selenium WebDriver Configuration for TRAVIX Web Application E2E Testing
 */
const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

module.exports = {
  baseUrl: process.env.BASE_URL || 'http://localhost:5000',
  browser: process.env.SELENIUM_BROWSER || 'chrome',
  headless: process.env.HEADLESS === 'true',
  implicitTimeoutMs: 10000,
  
  createDriver: async function() {
    const options = new chrome.Options();
    if (this.headless) {
      options.addArguments('--headless=new');
    }
    options.addArguments('--disable-gpu');
    options.addArguments('--no-sandbox');
    options.addArguments('--window-size=1920,1080');

    const driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();

    await driver.manage().setTimeouts({ implicit: this.implicitTimeoutMs });
    return driver;
  }
};
