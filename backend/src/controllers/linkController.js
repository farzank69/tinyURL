const { pool } = require('../config/database');
const { isValidUrl, isValidCode } = require('../utils/validators');
const generateCode = require('../utils/codeGenerator');
const config = require('../config');

/**
 * Create a new short link
 * POST /api/links
 */
const createLink = async (req, res, next) => {
  try {
    const { target_url, code } = req.body;

    // Validate target URL
    if (!target_url || !isValidUrl(target_url)) {
      return res.status(400).json({ error: 'Invalid URL provided' });
    }

    // Generate or validate custom code
    let shortCode = code;
    if (shortCode) {
      // Validate custom code format
      if (!isValidCode(shortCode)) {
        return res.status(400).json({ error: 'Code must be 6-8 alphanumeric characters' });
      }
    } else {
      // Generate random code
      shortCode = generateCode();
    }

    // Insert into database
    const result = await pool.query(
      'INSERT INTO links (code, target_url) VALUES ($1, $2) RETURNING *',
      [shortCode, target_url]
    );

    const link = result.rows[0];
    res.status(201).json({
      code: link.code,
      target_url: link.target_url,
      short_url: `${config.baseUrl}/${link.code}`,
      clicks: link.clicks,
      created_at: link.created_at
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all links
 * GET /api/links
 */
const getAllLinks = async (req, res, next) => {
  try {
    const result = await pool.query(
      'SELECT code, target_url, clicks, last_clicked, created_at FROM links ORDER BY created_at DESC'
    );
    
    const links = result.rows.map(link => ({
      code: link.code,
      target_url: link.target_url,
      short_url: `${config.baseUrl}/${link.code}`,
      clicks: link.clicks,
      last_clicked: link.last_clicked,
      created_at: link.created_at
    }));

    res.json(links);
  } catch (error) {
    next(error);
  }
};

/**
 * Get stats for a single link
 * GET /api/links/:code
 */
const getLinkStats = async (req, res, next) => {
  try {
    const { code } = req.params;

    const result = await pool.query(
      'SELECT code, target_url, clicks, last_clicked, created_at FROM links WHERE code = $1',
      [code]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Link not found' });
    }

    const link = result.rows[0];
    res.json({
      code: link.code,
      target_url: link.target_url,
      short_url: `${config.baseUrl}/${link.code}`,
      clicks: link.clicks,
      last_clicked: link.last_clicked,
      created_at: link.created_at
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a link
 * DELETE /api/links/:code
 */
const deleteLink = async (req, res, next) => {
  try {
    const { code } = req.params;

    const result = await pool.query(
      'DELETE FROM links WHERE code = $1 RETURNING code',
      [code]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Link not found' });
    }

    res.json({ message: 'Link deleted successfully', code: result.rows[0].code });
  } catch (error) {
    next(error);
  }
};

/**
 * Redirect to target URL and track click
 * GET /:code
 */
const redirectLink = async (req, res, next) => {
  try {
    const { code } = req.params;

    // Validate code format
    if (!isValidCode(code)) {
      return res.status(404).send('Not found');
    }

    // Get the link and increment click count
    const result = await pool.query(
      `UPDATE links 
       SET clicks = clicks + 1, last_clicked = CURRENT_TIMESTAMP 
       WHERE code = $1 
       RETURNING target_url`,
      [code]
    );

    if (result.rows.length === 0) {
      return res.status(404).send('Not found');
    }

    // Perform 302 redirect
    res.redirect(302, result.rows[0].target_url);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createLink,
  getAllLinks,
  getLinkStats,
  deleteLink,
  redirectLink,
};
