/**
 * Page Object Model for TRAVIX Web Passenger Portal (Selenium WebDriver)
 */
const { By, until } = require('selenium-webdriver');

class SeleniumUserPortalPage {
  constructor() {
    this.portalButton = By.id('btn-portal-user');
    this.pickupInput = By.id('pickup-input');
    this.dropoffInput = By.id('dropoff-input');
    this.femalePriorityCheck = By.id('female-priority-check');
    this.guardianModeCheck = By.id('guardian-mode-check');
    this.requestRideBtn = By.css('button[onclick*="confirmRideRequest"]');
    this.voiceSosBtn = By.css('.sos-trigger-btn');
    this.historyTab = By.css('div.nav-item[onclick*="history"]');
    this.downloadInvoiceBtn = By.css('button[onclick*="downloadInvoice"]');
    this.contactsTab = By.css('div.nav-item[onclick*="contacts"]');
    this.contactNameInput = By.id('contact-name');
    this.contactPhoneInput = By.id('contact-phone');
    this.addContactBtn = By.css('button[onclick*="addContact"]');
  }

  async openUserPortal(driver) {
    const btn = await driver.findElement(this.portalButton);
    await btn.click();
  }

  async enterRouteDetails(driver, pickup, dropoff) {
    const pickupEl = await driver.findElement(this.pickupInput);
    await pickupEl.clear();
    await pickupEl.sendKeys(pickup);

    const dropoffEl = await driver.findElement(this.dropoffInput);
    await dropoffEl.clear();
    await dropoffEl.sendKeys(dropoff);
  }

  async triggerVoiceSOS(driver) {
    const sos = await driver.findElement(this.voiceSosBtn);
    await sos.click();
  }
}

module.exports = new SeleniumUserPortalPage();
