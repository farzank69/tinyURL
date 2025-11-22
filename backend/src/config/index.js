require('dotenv').config({ path: require('path').resolve(__dirname, '..', '..', '.env') });

module.exports = {
  port: process.env.PORT || 3000,
  baseUrl: process.env.BASE_URL || `http://localhost:${process.env.PORT || 3000}`,
  nodeEnv: process.env.NODE_ENV || 'development',
  databaseUrl: process.env.DATABASE_URL,
  clientOrigin: process.env.VITE_CLIENT_ORIGIN, // Use VITE_CLIENT_ORIGIN from global .env
};
