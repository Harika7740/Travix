/**
 * Page Object Model for TRAVIX Admin Command Dashboard (Appium / Mobile Web)
 */
class AdminPortalPage {
  // Selectors
  get portalButton() { return '#btn-portal-admin'; }
  get sosMonitorTab() { return 'div.nav-item[onclick*="sos-monitor"]'; }
  get resolveSosBtn() { return 'button[onclick*="dispatchResponders"]'; }
  get verificationTab() { return 'div.nav-item[onclick*="verification"]'; }
  get approveDriverBtn() { return 'button[onclick*="APPROVED"]'; }
  get unsafeZonesTab() { return 'div.nav-item[onclick*="unsafe-zones"]'; }
  get zoneNameInput() { return '#zone-name'; }
  get zoneRadiusInput() { return '#zone-radius'; }
  get addZoneBtn() { return 'button[onclick*="addZone"]'; }

  // Actions
  async openAdminPortal(driver) {
    if (driver) {
      const btn = await driver.$(this.portalButton);
      await btn.click();
    }
  }

  async resolveActiveSOS(driver) {
    if (driver) {
      const tab = await driver.$(this.sosMonitorTab);
      await tab.click();
      const resolveBtn = await driver.$(this.resolveSosBtn);
      await resolveBtn.click();
    }
  }
}

module.exports = new AdminPortalPage();
