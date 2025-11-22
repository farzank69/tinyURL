const cors = require('cors');
const config = require('../config'); // Import config

/**
 * CORS middleware configuration
 * Allows requests from the React frontend
 */
const allowedOrigins = [
  config.clientOrigin, // Frontend deployed URL without trailing slash
  `${config.clientOrigin}/`, // Frontend deployed URL with trailing slash
  'http://localhost:5173', // Frontend development URL
];

const corsMiddleware = cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
});

module.exports = corsMiddleware;

