const express = require('express');
const router = express.Router();
const linkRoutes = require('./linkRoutes');
const { healthCheck } = require('../controllers/healthController');

// Health check
router.get('/healthz', healthCheck);

// API routes
router.use('/api/links', linkRoutes);

module.exports = router;
