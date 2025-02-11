const express = require('express');
const { marketData } = require('../controllers/marketController');

const router = express.Router();

// Market routes
router.get('/data', marketData);

module.exports = router;
