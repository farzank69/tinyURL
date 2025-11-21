const { customAlphabet } = require('nanoid');

/**
 * Generate a random short code (6 alphanumeric characters)
 * Uses nanoid with custom alphabet for better randomness
 */
const generateCode = customAlphabet(
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
  6
);

module.exports = generateCode;
