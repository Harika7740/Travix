/**
 * Load Testing Configuration Parameters for TRAVIX Baseline Benchmark
 */
module.exports = {
  baseUrl: process.env.BASE_URL || 'http://127.0.0.1:5000',
  virtualUsers: parseInt(process.env.VIRTUAL_USERS || '100'),
  durationSeconds: parseInt(process.env.DURATION_SECONDS || '60'), // 1 Minute
  rampUpSeconds: 5,
  pacingMs: 50, // 50ms pacing between requests per VU to maintain steady ~150 RPS load
  endpoints: [
    { name: 'API Health Check', method: 'GET', path: '/api/v1/health', weight: 30 },
    { name: 'Root Web App', method: 'GET', path: '/', weight: 25 },
    { name: 'Fare Estimation', method: 'POST', path: '/api/v1/rides/estimate', payload: { pickup: { lat: 37.7749, lng: -122.4194 }, dropoff: { lat: 37.7833, lng: -122.4167 }, femaleDriverPriority: true }, weight: 20 },
    { name: 'Emergency Contacts', method: 'GET', path: '/api/v1/safety/contacts', weight: 15 },
    { name: 'Admin Analytics', method: 'GET', path: '/api/v1/admin/analytics', weight: 10 }
  ]
};
