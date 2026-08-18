const axios = require('axios');
const http = require('http');
const config = require('../config/load.conf');

/**
 * Concurrency Load Generator for TRAVIX Baseline Performance Benchmark
 */
class LoadGenerator {
  static async executeLoadTest(onProgress) {
    const { baseUrl, virtualUsers, durationSeconds, endpoints } = config;
    console.log(`[LOAD GENERATOR] Initializing ${virtualUsers} Virtual Users for ${durationSeconds}s against ${baseUrl}`);

    const latencies = [];
    const statusCodes = {};
    let totalRequests = 0;
    let failedRequests = 0;

    const startTime = Date.now();
    const endTime = startTime + (durationSeconds * 1000);

    const httpAgent = new http.Agent({ keepAlive: true, maxSockets: 100, maxFreeSockets: 50 });

    const client = axios.create({
      baseURL: baseUrl,
      timeout: 10000,
      httpAgent,
      headers: { 'x-demo-role': 'passenger', 'x-demo-uid': 'usr_99812' }
    });

    // Helper to pick random weighted endpoint
    const getRandomEndpoint = () => {
      const rand = Math.random() * 100;
      let cumulative = 0;
      for (const ep of endpoints) {
        cumulative += ep.weight;
        if (rand <= cumulative) return ep;
      }
      return endpoints[0];
    };

    // Virtual User Worker Loop
    const runWorker = async (workerId) => {
      while (Date.now() < endTime) {
        const ep = getRandomEndpoint();
        const reqStart = Date.now();

        try {
          let response;
          if (ep.method === 'POST') {
            response = await client.post(ep.path, ep.payload || {});
          } else {
            response = await client.get(ep.path);
          }

          const reqLatency = Date.now() - reqStart;
          latencies.push(reqLatency);
          totalRequests++;

          const code = response.status;
          statusCodes[code] = (statusCodes[code] || 0) + 1;

        } catch (error) {
          const reqLatency = Date.now() - reqStart;
          latencies.push(reqLatency);
          totalRequests++;
          failedRequests++;

          const code = error.response ? error.response.status : 500;
          statusCodes[code] = (statusCodes[code] || 0) + 1;
        }

        // Steady pacing delay between requests per virtual user to match target RPS
        const pause = config.pacingMs || 50;
        await new Promise(r => setTimeout(r, pause));
      }
    };

    // Launch 100 concurrent workers
    const workers = [];
    for (let i = 0; i < virtualUsers; i++) {
      workers.push(runWorker(i));
    }

    // Monitor progress loop
    const monitorInterval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const currentRps = Math.round(totalRequests / Math.max(1, elapsed));
      if (onProgress) onProgress({ elapsed, totalRequests, currentRps, failedRequests });
    }, 1000);

    await Promise.all(workers);
    clearInterval(monitorInterval);

    const actualDurationMs = Date.now() - startTime;
    const actualDurationSec = actualDurationMs / 1000;

    // Calculate latency metrics
    latencies.sort((a, b) => a - b);
    const minLatency = latencies.length > 0 ? latencies[0] : 0;
    const maxLatency = latencies.length > 0 ? latencies[latencies.length - 1] : 0;
    const sumLatency = latencies.reduce((a, b) => a + b, 0);
    const avgLatency = latencies.length > 0 ? Math.round(sumLatency / latencies.length) : 0;

    const p50 = latencies.length > 0 ? latencies[Math.floor(latencies.length * 0.50)] : 0;
    const p90 = latencies.length > 0 ? latencies[Math.floor(latencies.length * 0.90)] : 0;
    const p95 = latencies.length > 0 ? latencies[Math.floor(latencies.length * 0.95)] : 0;
    const p99 = latencies.length > 0 ? latencies[Math.floor(latencies.length * 0.99)] : 0;

    const rps = Math.round((totalRequests / actualDurationSec) * 10) / 10;
    const errorRate = totalRequests > 0 ? Math.round((failedRequests / totalRequests) * 10000) / 100 : 0;

    return {
      virtualUsers,
      durationSeconds: Math.round(actualDurationSec),
      totalRequests,
      failedRequests,
      rps,
      errorRate,
      latency: {
        min: minLatency,
        avg: avgLatency,
        max: maxLatency,
        p50,
        p90,
        p95,
        p99
      },
      statusCodes,
      endpoints
    };
  }
}

module.exports = LoadGenerator;
