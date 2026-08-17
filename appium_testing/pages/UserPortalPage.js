/**
 * Page Object Model for TRAVIX Passenger Portal (Appium / Mobile Web)
 */
class UserPortalPage {
  // Selectors
  get portalButton() { return '#btn-portal-user'; }
  get pickupInput() { return '#pickup-input'; }
  get dropoffInput() { return '#dropoff-input'; }
  get femalePriorityToggle() { return '#female-priority-check'; }
  get guardianModeToggle() { return '#guardian-mode-check'; }
  get fareDisplay() { return '#fare-display'; }
  get requestRideBtn() { return 'button[onclick*="confirmRideRequest"]'; }
  get voiceSosBtn() { return '.sos-trigger-btn'; }
  get historyTab() { return 'div.nav-item[onclick*="history"]'; }
  get downloadInvoiceBtn() { return 'button[onclick*="downloadInvoice"]'; }
  get contactsTab() { return 'div.nav-item[onclick*="contacts"]'; }
  get contactNameInput() { return '#contact-name'; }
  get contactPhoneInput() { return '#contact-phone'; }
  get addContactBtn() { return 'button[onclick*="addContact"]'; }

  // Actions
  async openUserPortal(driver) {
    if (driver) {
      const btn = await driver.$(this.portalButton);
      await btn.click();
    }
  }

  async enterRouteDetails(driver, pickup, dropoff) {
    if (driver) {
      const pickupEl = await driver.$(this.pickupInput);
      await pickupEl.setValue(pickup);
      const dropoffEl = await driver.$(this.dropoffInput);
      await dropoffEl.setValue(dropoff);
    }
  }

  async triggerVoiceSOS(driver) {
    if (driver) {
      const sos = await driver.$(this.voiceSosBtn);
      await sos.click();
    }
  }
}

module.exports = new UserPortalPage();
