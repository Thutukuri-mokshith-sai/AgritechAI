const express = require('express');
const {
    create,
    getAll,
    getById,
    update,
    remove
} = require('../controllers/historicalPriceDataController');

const router = express.Router();

// Create a new historical price data entry
router.post('/', create);

// Retrieve all historical price data entries
router.get('/', getAll);

// Retrieve a single historical price data entry by ID
router.get('/:id', getById);

// Update a historical price data entry by ID
router.put('/:id', update);

// Delete a historical price data entry by ID
router.delete('/:id', remove);

module.exports = router;
