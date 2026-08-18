/**
 * Page Object Model for TRAVIX Web Driver Portal (Selenium WebDriver)
 */
const { By } = require('selenium-webdriver');

class SeleniumDriverPortalPage {
  constructor() {
    this.portalButton = By.id('btn-portal-driver');
    this.onlineToggle = By.id('driver-status-toggle');
    this.simulateDispatchBtn = By.css('button[onclick*="simulateRideOffer"]');
    this.acceptRideBtn = By.css('button[onclick*="acceptRide"]');
    this.declineRideBtn = By.css('button[onclick*="rejectRide"]');
    this.tripsTab = By.css('div.nav-item[onclick*="trips"]');
    this.verificationTab = By.css('div.nav-item[onclick*="verification"]');
  }

  async openDriverPortal(driver) {
    const btn = await driver.findElement(this.portalButton);
    await btn.click();
  }

  async toggleOnlineStatus(driver) {
    const toggle = await driver.findElement(this.onlineToggle);
    await toggle.click();
  }
}

module.exports = new SeleniumDriverPortalPage();
