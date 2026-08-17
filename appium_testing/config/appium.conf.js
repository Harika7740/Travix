/**
 * Appium & WebDriverIO Configuration for TRAVIX Android & Mobile Web E2E Testing
 */
exports.config = {
  // Appium Server Details
  hostname: process.env.APPIUM_HOST || '127.0.0.1',
  port: parseInt(process.env.APPIUM_PORT || '4723'),
  path: '/',

  // Test Specs
  specs: [
    '../specs/**/*.spec.js'
  ],
  maxInstances: 1,

  // Android UiAutomator2 & Chrome Webview Capabilities
  capabilities: [{
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:deviceName': process.env.ANDROID_DEVICE_NAME || 'Android Emulator',
    'appium:platformVersion': process.env.ANDROID_VERSION || '13.0',
    'appium:browserName': 'Chrome',
    'appium:chromedriverAutodownload': true,
    'appium:newCommandTimeout': 240,
    'appium:ensureWebviewsHavePages': true,
    'appium:nativeWebScreenshot': true
  }],

  logLevel: 'info',
  bail: 0,
  baseUrl: process.env.BASE_URL || 'http://localhost:5000',
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,

  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000
  }
};
