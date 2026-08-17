/**
 * Page Object Model for TRAVIX Driver Portal (Appium / Mobile Web)
 */
class DriverPortalPage {
  // Selectors
  get portalButton() { return '#btn-portal-driver'; }
  get onlineToggle() { return '#driver-status-toggle'; }
  get simulateDispatchBtn() { return 'button[onclick*="simulateRideOffer"]'; }
  get acceptRideBtn() { return 'button[onclick*="acceptRide"]'; }
  get declineRideBtn() { return 'button[onclick*="rejectRide"]'; }
  get tripsTab() { return 'div.nav-item[onclick*="trips"]'; }
  get verificationTab() { return 'div.nav-item[onclick*="verification"]'; }

  // Actions
  async openDriverPortal(driver) {
    if (driver) {
      const btn = await driver.$(this.portalButton);
      await btn.click();
    }
  }

  async toggleStatus(driver, online) {
    if (driver) {
      const toggle = await driver.$(this.onlineToggle);
      const isChecked = await toggle.isSelected();
      if (isChecked !== online) {
        await toggle.click();
      }
    }
  }
}

module.exports = new DriverPortalPage();
