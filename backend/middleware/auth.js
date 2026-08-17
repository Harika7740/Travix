const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'travix_super_secret_jwt_token_key_2026_production';

/**
 * Middleware to verify JWT authentication token
 */
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    // For demo purposes, allow demo header or fall back to mock default user
    if (req.headers['x-demo-role']) {
      req.user = {
        uid: req.headers['x-demo-uid'] || 'usr_99812',
        role: req.headers['x-demo-role'],
        email: 'demo@travix.com'
      };
      return next();
    }
    return res.status(401).json({ success: false, message: 'Authentication token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Invalid or expired authentication token' });
    }
    req.user = decoded;
    next();
  });
};

/**
 * Middleware for Role-Based Access Control
 * @param {Array<string>} roles Allowed roles e.g. ['passenger', 'driver', 'admin']
 */
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'User context missing' });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Requires one of roles: [${roles.join(', ')}]. Current: ${req.user.role}`
      });
    }
    next();
  };
};

module.exports = {
  authenticateToken,
  authorizeRoles,
  JWT_SECRET
};
