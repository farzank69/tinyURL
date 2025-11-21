/**
 * Global error handling middleware
 * Catches errors and returns appropriate responses
 */
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Database unique constraint violation
  if (err.code === '23505') {
    return res.status(409).json({ error: 'Resource already exists' });
  }

  // Default to 500 server error
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
  });
};

module.exports = errorHandler;
