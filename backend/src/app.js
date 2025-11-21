const express = require('express');
const corsMiddleware = require('./middleware/cors');
const errorHandler = require('./middleware/errorHandler');
const routes = require('./routes');
const { redirectLink } = require('./controllers/linkController');

const app = express();

// Middleware
app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', routes);

// Redirect route (must be last to avoid conflicts with API routes)
app.get('/:code', redirectLink);

// Error handling middleware
app.use(errorHandler);

module.exports = app;
