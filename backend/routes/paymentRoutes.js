const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const { mockStore } = require('../config/firebase');

router.get('/history', authenticateToken, (req, res) => {
  const payments = [
    { id: 'pay_901', rideId: 'ride_8819', amount: 18.50, currency: 'USD', status: 'completed', method: 'Visa ending in 4242', date: '2026-07-28' },
    { id: 'pay_902', rideId: 'ride_7710', amount: 24.00, currency: 'USD', status: 'completed', method: 'Apple Pay', date: '2026-07-26' },
    { id: 'pay_903', rideId: 'ride_6602', amount: 14.25, currency: 'USD', status: 'completed', method: 'Mastercard ending in 9811', date: '2026-07-22' }
  ];
  res.json({ success: true, payments });
});

router.post('/process', authenticateToken, (req, res) => {
  const { rideId, amount, paymentMethod } = req.body;
  res.json({
    success: true,
    message: 'Payment processed successfully',
    transactionId: 'txn_' + Date.now(),
    amount: amount || 18.50,
    status: 'paid'
  });
});

module.exports = router;
