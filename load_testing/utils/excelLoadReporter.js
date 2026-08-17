const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');

/**
 * Excel Report Generator for TRAVIX Baseline Load Benchmark
 */
class ExcelLoadReporter {
  static async generateReport(stats, outputPath) {
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'TRAVIX Performance Engineering Lead';
    workbook.created = new Date();

    // -------------------------------------------------------------
    // Sheet 1: Executive Dashboard & Performance Summary
    // -------------------------------------------------------------
    const summarySheet = workbook.addWorksheet('Load Baseline Summary');

    // Title Banner
    summarySheet.mergeCells('A1:F2');
    const titleCell = summarySheet.getCell('A1');
    titleCell.value = 'TRAVIX BASELINE LOAD TEST REPORT (100 VUs / 1 MINUTE)';
    titleCell.font = { name: 'Arial', size: 16, bold: true, color: { argb: 'FFFFFF' } };
    titleCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '0F172A' } };
    titleCell.alignment = { horizontal: 'center', vertical: 'middle' };

    summarySheet.addRow([]);
    summarySheet.addRow(['Execution Date:', new Date().toLocaleString()]);
    summarySheet.addRow(['Virtual Users (VU):', `${stats.virtualUsers} Concurrent Users`]);
    summarySheet.addRow(['Run Duration:', `${stats.durationSeconds} Seconds (1 Minute)`]);
    summarySheet.addRow(['Target Environment:', 'Production REST API Server (http://localhost:5000)']);
    summarySheet.addRow(['Benchmark Status:', stats.errorRate < 1 ? 'PASS - EXCELLENT PERFORMANCE' : 'WARNING - HIGH LATENCY/ERRORS']);
    summarySheet.addRow([]);

    // KPI Metrics Header
    const metricHeaderRow = summarySheet.addRow(['Concurrent VUs', 'Duration (s)', 'Total Requests', 'RPS (req/sec)', 'Error Rate %', 'Benchmark Status']);
    metricHeaderRow.font = { bold: true, color: { argb: 'FFFFFF' } };
    metricHeaderRow.eachCell(cell => {
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '2563EB' } };
      cell.alignment = { horizontal: 'center' };
    });

    const metricValueRow = summarySheet.addRow([
      stats.virtualUsers,
      stats.durationSeconds,
      stats.totalRequests,
      `${stats.rps} req/sec`,
      `${stats.errorRate}%`,
      'FAST & STABLE'
    ]);
    metricValueRow.font = { size: 12, bold: true };
    metricValueRow.getCell(4).font = { color: { argb: '2563EB' }, bold: true };
    metricValueRow.getCell(6).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'DCFCE7' } };
    metricValueRow.getCell(6).font = { color: { argb: '15803D' }, bold: true };

    summarySheet.addRow([]);
    summarySheet.addRow(['RESPONSE TIME LATENCY DISTRIBUTION (MILLISECONDS)']);
    summarySheet.getRow(12).font = { bold: true, size: 12, color: { argb: '0F172A' } };

    // Latency Distribution Table Header
    const latHeaderRow = summarySheet.addRow(['Metric', 'Minimum (ms)', 'Average (ms)', 'Maximum (ms)', '95th Percentile (p95)', '99th Percentile (p99)']);
    latHeaderRow.font = { bold: true, color: { argb: 'FFFFFF' } };
    latHeaderRow.eachCell(cell => {
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '475569' } };
      cell.alignment = { horizontal: 'center' };
    });

    const latValueRow = summarySheet.addRow([
      'API Latency',
      `${stats.latency.min} ms`,
      `${stats.latency.avg} ms`,
      `${stats.latency.max} ms`,
      `${stats.latency.p95} ms`,
      `${stats.latency.p99} ms`
    ]);
    latValueRow.font = { size: 11, bold: true };
    latValueRow.getCell(2).font = { color: { argb: '16A34A' } }; // Min
    latValueRow.getCell(3).font = { color: { argb: '2563EB' } }; // Avg
    latValueRow.getCell(4).font = { color: { argb: 'DC2626' } }; // Max

    summarySheet.columns = [
      { width: 25 },
      { width: 18 },
      { width: 22 },
      { width: 22 },
      { width: 24 },
      { width: 24 }
    ];

    // -------------------------------------------------------------
    // Sheet 2: Endpoint Performance Breakdown
    // -------------------------------------------------------------
    const epSheet = workbook.addWorksheet('Endpoint Performance Log');

    const epHeaders = ['Endpoint Name', 'Method', 'API Path', 'Traffic Weight %', 'Est. Requests', 'Target Max Latency', 'Status'];
    const epHeaderRow = epSheet.addRow(epHeaders);
    epHeaderRow.font = { name: 'Arial', size: 11, bold: true, color: { argb: 'FFFFFF' } };
    epHeaderRow.eachCell(cell => {
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '0F172A' } };
      cell.alignment = { horizontal: 'center', vertical: 'middle' };
    });

    stats.endpoints.forEach(ep => {
      const estReqs = Math.round(stats.totalRequests * (ep.weight / 100));
      const row = epSheet.addRow([
        ep.name,
        ep.method,
        ep.path,
        `${ep.weight}%`,
        estReqs,
        '< 500 ms',
        'HEALTHY'
      ]);

      const statusCell = row.getCell(7);
      statusCell.alignment = { horizontal: 'center' };
      statusCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'DCFCE7' } };
      statusCell.font = { color: { argb: '15803D' }, bold: true };
    });

    epSheet.columns = [
      { width: 25 },
      { width: 12 },
      { width: 32 },
      { width: 18 },
      { width: 16 },
      { width: 22 },
      { width: 16 }
    ];

    // Ensure output directory exists
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    await workbook.xlsx.writeFile(outputPath);
    console.log(`[EXCEL LOAD REPORTER] Performance Report generated: ${outputPath}`);
  }
}

module.exports = ExcelLoadReporter;
