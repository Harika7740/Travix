const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');

/**
 * Custom Excel Test Report Generator for TRAVIX Selenium Web E2E Suite
 */
class ExcelReporter {
  static async generateReport(testResults, outputPath) {
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'TRAVIX Automated Selenium Web QA Suite';
    workbook.created = new Date();

    // -------------------------------------------------------------
    // Sheet 1: Executive Summary
    // -------------------------------------------------------------
    const summarySheet = workbook.addWorksheet('Executive Summary');

    // Title Banner
    summarySheet.mergeCells('A1:E2');
    const titleCell = summarySheet.getCell('A1');
    titleCell.value = 'TRAVIX SELENIUM WEB AUTOMATION TEST REPORT';
    titleCell.font = { name: 'Arial', size: 16, bold: true, color: { argb: 'FFFFFF' } };
    titleCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '0284C7' } };
    titleCell.alignment = { horizontal: 'center', vertical: 'middle' };

    // Metadata
    const totalTests = testResults.length;
    const passedTests = testResults.filter(t => t.status === 'PASSED').length;
    const failedTests = testResults.filter(t => t.status === 'FAILED').length;
    const passRate = totalTests > 0 ? ((passedTests / totalTests) * 100).toFixed(1) + '%' : '0%';

    summarySheet.addRow([]);
    summarySheet.addRow(['Execution Date:', new Date().toLocaleString()]);
    summarySheet.addRow(['Target Browser:', 'Chrome WebDriver (Headless/Desktop)']);
    summarySheet.addRow(['Target Application:', 'TRAVIX Web App (http://localhost:5000)']);
    summarySheet.addRow([]);

    // KPI Metrics Table Header
    const metricHeaderRow = summarySheet.addRow(['Total Test Cases', 'Passed', 'Failed', 'Pass Rate %', 'Execution Status']);
    metricHeaderRow.font = { bold: true, color: { argb: 'FFFFFF' } };
    metricHeaderRow.eachCell(cell => {
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '0369A1' } };
      cell.alignment = { horizontal: 'center' };
    });

    const metricValueRow = summarySheet.addRow([totalTests, passedTests, failedTests, passRate, failedTests === 0 ? 'SUCCESSFUL' : 'ATTENTION REQUIRED']);
    metricValueRow.font = { size: 12, bold: true };
    metricValueRow.getCell(2).font = { color: { argb: '16A34A' }, bold: true };
    if (failedTests > 0) metricValueRow.getCell(3).font = { color: { argb: 'DC2626' }, bold: true };

    summarySheet.columns = [
      { width: 22 },
      { width: 16 },
      { width: 16 },
      { width: 16 },
      { width: 25 }
    ];

    // -------------------------------------------------------------
    // Sheet 2: Detailed Test Execution Log
    // -------------------------------------------------------------
    const logSheet = workbook.addWorksheet('Test Case Details');

    // Header Row
    const headers = ['Test ID', 'Suite Name', 'Test Scenario', 'Expected Result', 'Actual Result', 'Duration (ms)', 'Status', 'Timestamp'];
    const headerRow = logSheet.addRow(headers);
    headerRow.font = { name: 'Arial', size: 11, bold: true, color: { argb: 'FFFFFF' } };
    headerRow.eachCell(cell => {
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '0F172A' } };
      cell.alignment = { horizontal: 'center', vertical: 'middle' };
    });

    testResults.forEach(result => {
      const row = logSheet.addRow([
        result.id,
        result.suite,
        result.name,
        result.expected,
        result.actual,
        result.duration,
        result.status,
        result.timestamp
      ]);

      const statusCell = row.getCell(7);
      statusCell.alignment = { horizontal: 'center' };
      if (result.status === 'PASSED') {
        statusCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'DCFCE7' } };
        statusCell.font = { color: { argb: '15803D' }, bold: true };
      } else {
        statusCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FEE2E2' } };
        statusCell.font = { color: { argb: 'B91C1C' }, bold: true };
      }
    });

    logSheet.columns = [
      { width: 18 },
      { width: 26 },
      { width: 45 },
      { width: 35 },
      { width: 35 },
      { width: 15 },
      { width: 14 },
      { width: 22 }
    ];

    // Ensure output directory exists
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    await workbook.xlsx.writeFile(outputPath);
    console.log(`[EXCEL REPORTER] Selenium Test Analysis Report generated: ${outputPath}`);
  }
}

module.exports = ExcelReporter;
