// Track app start time for uptime calculation
const startTime = Date.now();

/**
 * Health check endpoint
 * GET /healthz
 */
const healthCheck = (req, res) => {
  const uptime = Math.floor((Date.now() - startTime) / 1000);
  res.status(200).json({
    ok: true,
    version: '1.0',
    uptime: uptime,
    timestamp: new Date().toISOString()
  });
};

module.exports = { healthCheck };
