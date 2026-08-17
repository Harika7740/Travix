# TRAVIX Baseline & Load Testing Suite

This repository contains the **Baseline Load Testing Framework** for the TRAVIX Backend REST API and Web Application.

---

## 📁 Folder Structure

```
load_testing/
├── config/
│   └── load.conf.js            # Load test parameters (100 VUs, 60s duration, endpoint weights)
├── utils/
│   ├── loadGenerator.js        # 100-user concurrent async worker pool simulator
│   └── excelLoadReporter.js    # Performance analysis Excel (.xlsx) report builder
├── test_reports/               # Generated performance report directory
│   └── travix_baseline_load_report.xlsx
├── runner.js                   # Master load test runner script
└── package.json
```

---

## ⚡ Test Specifications

- **Virtual Users (VU)**: `100` Concurrent Users
- **Duration**: `60` Seconds (1 Minute)
- **Target Endpoint**: `http://localhost:5000`
- **Tracked Metrics**:
  - Requests Per Second (RPS)
  - Latency Distribution (Minimum, Average, Maximum, p50, p90, p95, p99)
  - Error Rate % and HTTP Status Code Breakdown

---

## 🚀 How to Run the Load Test

1. Ensure the TRAVIX Backend Server is running:
   ```cmd
   cd backend
   node server.js
   ```

2. Run the load test benchmark:
   ```cmd
   cd load_testing
   npm install
   node runner.js
   ```

3. Open the generated Excel analysis report at:
   `load_testing/test_reports/travix_baseline_load_report.xlsx`
