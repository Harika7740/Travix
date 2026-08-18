# TRAVIX Appium & Mobile Web E2E Automated Testing Suite

This repository contains the complete **Appium & WebDriverIO Automated End-to-End Testing Framework** for the TRAVIX platform.

---

## 📁 Folder Structure

```
appium_testing/
├── config/
│   └── appium.conf.js          # Appium & WebDriverIO capabilities configuration
├── pages/                      # Page Object Model (POM) modules
│   ├── UserPortalPage.js       # Passenger booking, Voice SOS & Invoice POM
│   ├── DriverPortalPage.js     # Driver onboarding, dispatches & online switch POM
│   └── AdminPortalPage.js      # Admin analytics, SOS monitor & Geofence POM
├── specs/                      # E2E test specifications
│   ├── 01_user_portal.spec.js
│   ├── 02_driver_portal.spec.js
│   ├── 03_admin_portal.spec.js
│   └── 04_end_to_end_journey.spec.js
├── utils/
│   └── excelReporter.js        # Excel (.xlsx) report builder with ExcelJS
├── test_reports/               # Output directory for generated Excel analysis reports
│   └── travix_e2e_appium_report.xlsx
├── runner.js                   # Automated test suite runner script
└── package.json
```

---

## 🚀 Quick Start Guide

### 1. Install Dependencies
```bash
cd appium_testing
npm install
```

### 2. Run E2E Test Suite & Generate Excel Report
```bash
npm test
```
Or run directly with Node:
```bash
node runner.js
```

---

## 📊 Excel Analysis Report Features
The test runner automatically generates a formatted Excel spreadsheet at:
`appium_testing/test_reports/travix_e2e_appium_report.xlsx`

### Report Highlights:
- **Executive Summary Sheet**: High-level KPI metrics (Total Tests, Passed/Failed count, Pass Rate %, Execution Date, Target Platform).
- **Test Case Details Sheet**: Detailed test log table containing Test ID, Suite Name, Test Scenario Description, Expected vs Actual Results, Duration (ms), Status (PASSED / FAILED with color styling), and Timestamps.
