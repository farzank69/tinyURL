const cors = require('cors');

/**
 * CORS middleware configuration
 * Allows requests from the React frontend
 */
const corsMiddleware = cors({
  origin:'https://tiny-link-silk.vercel.app/',
  credentials: true,
});

module.exports = corsMiddleware;
