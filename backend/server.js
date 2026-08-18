require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const path = require('path');

const authRoutes = require('./routes/authRoutes');
const rideRoutes = require('./routes/rideRoutes');
const safetyRoutes = require('./routes/safetyRoutes');
const adminRoutes = require('./routes/adminRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Serve Frontend Static Web Application
app.use(express.static(path.join(__dirname, '../frontend')));

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/rides', rideRoutes);
app.use('/api/v1/safety', safetyRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/payments', paymentRoutes);

// API V1 Base Index Endpoint
app.get('/api/v1', (req, res) => {
  res.json({
    service: 'TRAVIX API v1',
    message: 'Welcome to TRAVIX REST API Service',
    webAppUrl: 'http://localhost:5000/',
    endpoints: {
      health: '/api/v1/health',
      auth: '/api/v1/auth',
      rides: '/api/v1/rides',
      safety: '/api/v1/safety',
      admin: '/api/v1/admin',
      payments: '/api/v1/payments'
    }
  });
});

// Health Check Endpoint
app.get('/api/v1/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'TRAVIX REST API',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Root Route - Serve Frontend Web App
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// 404 Route Handler for undefined API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ success: false, message: 'API Endpoint Not Found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[SERVER ERROR]', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`================================================`);
  console.log(`🚀 TRAVIX Backend REST Server active on port ${PORT}`);
  console.log(`📡 Base URL: http://localhost:${PORT}/api/v1`);
  console.log(`================================================`);
});
