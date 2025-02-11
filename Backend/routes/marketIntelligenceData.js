const express = require('express');
const {
    create,
    getAll,
    getById,
    update,
    remove
} = require('../controllers/marketIntelligenceDataController');

const router = express.Router();

// Create a new market intelligence data entry
router.post('/', create);

// Retrieve all market intelligence data entries
router.get('/', getAll);

// Retrieve a single market intelligence data entry by ID
router.get('/:id', getById);

// Update a market intelligence data entry by ID
router.put('/:id', update);

// Delete a market intelligence data entry by ID
router.delete('/:id', remove);

module.exports = router;
