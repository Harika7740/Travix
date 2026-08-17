const path = require('path');
const LoadGenerator = require('./utils/loadGenerator');
const ExcelLoadReporter = require('./utils/excelLoadReporter');

/**
 * Master Baseline Load Test Runner for TRAVIX
 */
async function runLoadBenchmark() {
  console.log('===============================================================');
  console.log('⚡ Starting TRAVIX Baseline Load Benchmark (100 VUs / 1 Minute)');
  console.log('===============================================================');

  // Execute Load Test Workload
  const stats = await LoadGenerator.executeLoadTest((progress) => {
    process.stdout.write(`\r⏱️  Elapsed: ${progress.elapsed}s | Reqs: ${progress.totalRequests} | Current RPS: ${progress.currentRps} req/sec | Errors: ${progress.failedRequests}`);
  });

  console.log('\n===============================================================');
  console.log('✅ Baseline Load Benchmark Completed Successfully!');
  console.log('===============================================================');
  console.log(`👥 Virtual Users (VUs):  ${stats.virtualUsers} Concurrent Users`);
  console.log(`⏱️  Duration:            ${stats.durationSeconds} Seconds (1 Minute)`);
  console.log(`📦 Total Requests:       ${stats.totalRequests} Requests`);
  console.log(`⚡ Requests/Sec (RPS):   ${stats.rps} req/sec`);
  console.log(`❌ Error Rate:           ${stats.errorRate}%`);
  console.log('---------------------------------------------------------------');
  console.log(`🚀 Minimum Latency:      ${stats.latency.min} ms`);
  console.log(`📊 Average Latency:      ${stats.latency.avg} ms`);
  console.log(`🐢 Maximum Latency:      ${stats.latency.max} ms`);
  console.log(`📈 95th Percentile (p95): ${stats.latency.p95} ms`);
  console.log(`📈 99th Percentile (p99): ${stats.latency.p99} ms`);
  console.log('===============================================================');

  const reportPath = path.join(__dirname, 'test_reports/travix_baseline_load_report.xlsx');
  await ExcelLoadReporter.generateReport(stats, reportPath);

  console.log(`📁 Performance Analysis Excel Report Saved: ${reportPath}`);
  console.log('===============================================================');
}

runLoadBenchmark().catch(err => {
  console.error('❌ Error executing Baseline Load Benchmark runner:', err);
});
