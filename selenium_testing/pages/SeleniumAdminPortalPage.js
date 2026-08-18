/**
 * Page Object Model for TRAVIX Web Admin Command Dashboard (Selenium WebDriver)
 */
const { By } = require('selenium-webdriver');

class SeleniumAdminPortalPage {
  constructor() {
    this.portalButton = By.id('btn-portal-admin');
    this.sosMonitorTab = By.css('div.nav-item[onclick*="sos-monitor"]');
    this.resolveSosBtn = By.css('button[onclick*="dispatchResponders"]');
    this.verificationTab = By.css('div.nav-item[onclick*="verification"]');
    this.approveDriverBtn = By.css('button[onclick*="APPROVED"]');
    this.unsafeZonesTab = By.css('div.nav-item[onclick*="unsafe-zones"]');
    this.zoneNameInput = By.id('zone-name');
    this.zoneRadiusInput = By.id('zone-radius');
    this.addZoneBtn = By.css('button[onclick*="addZone"]');
  }

  async openAdminPortal(driver) {
    const btn = await driver.findElement(this.portalButton);
    await btn.click();
  }

  async resolveActiveSOS(driver) {
    const tab = await driver.findElement(this.sosMonitorTab);
    await tab.click();
    const resolveBtn = await driver.findElement(this.resolveSosBtn);
    await resolveBtn.click();
  }
}

module.exports = new SeleniumAdminPortalPage();
