/**
 * Validate if a string is a valid HTTP/HTTPS URL
 * @param {string} url - URL to validate
 * @returns {boolean} - True if valid, false otherwise
 */
const isValidUrl = (url) => {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch (e) {
    return false;
  }
};

/**
 * Validate if a code matches the required format (6-8 alphanumeric characters)
 * @param {string} code - Code to validate
 * @returns {boolean} - True if valid, false otherwise
 */
const isValidCode = (code) => {
  return /^[A-Za-z0-9]{6,8}$/.test(code);
};

module.exports = {
  isValidUrl,
  isValidCode,
};
