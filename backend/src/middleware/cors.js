const cors = require('cors');

/**
 * CORS middleware configuration
 * Allows requests from the React frontend
 */
const corsMiddleware = cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
});

module.exports = corsMiddleware;
