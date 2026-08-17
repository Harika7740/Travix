# TRAVIX Selenium Web Application Automated E2E Testing Suite

This repository contains the complete **Selenium WebDriver Automated End-to-End Testing Framework** for the TRAVIX Web Application.

---

## 📁 Folder Structure

```
selenium_testing/
├── config/
│   └── selenium.conf.js        # Selenium WebDriver capabilities configuration (Chrome / Firefox)
├── pages/                      # Page Object Model (POM) modules
│   ├── SeleniumUserPortalPage.js   # Passenger booking, Voice SOS & Invoice POM
│   ├── SeleniumDriverPortalPage.js # Driver onboarding, dispatches & online switch POM
│   └── SeleniumAdminPortalPage.js  # Admin analytics, SOS monitor & Geofence POM
├── specs/                      # E2E test specifications
│   ├── 01_user_portal.spec.js
│   ├── 02_driver_portal.spec.js
│   ├── 03_admin_portal.spec.js
│   └── 04_end_to_end_journey.spec.js
├── utils/
│   └── excelReporter.js        # Excel (.xlsx) report builder using ExcelJS
├── test_reports/               # Output directory for generated Excel analysis reports
│   └── travix_e2e_selenium_report.xlsx
├── runner.js                   # Automated test suite runner script
└── package.json
```

---

## 🚀 Quick Start Guide

### 1. Install Dependencies
```bash
cd selenium_testing
npm install
```

### 2. Run E2E Selenium Test Suite & Generate Excel Report
```bash
node runner.js
```

---

## 📊 Excel Analysis Report Features
The test runner automatically generates a styled Excel spreadsheet at:
`selenium_testing/test_reports/travix_e2e_selenium_report.xlsx`

### Report Highlights:
- **Executive Summary Sheet**: High-level KPI metrics (Total Tests, Passed/Failed count, Pass Rate %, Execution Date, Target Browser).
- **Test Case Details Sheet**: Detailed test log table containing Test ID, Suite Name, Test Scenario Description, Expected vs Actual Results, Duration (ms), Status (PASSED / FAILED with color styling), and Timestamps.
