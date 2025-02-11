const express = require('express');
const {
    create,
    getAll,
    getById,
    update,
    remove
} = require('../controllers/globalMarketDataController');

const router = express.Router();

// Create a new crop production data entry
router.post('/', create);

// Retrieve all crop production data entries
router.get('/', getAll);

// Retrieve a single crop production data entry by ID
router.get('/:id', getById);

// Update a crop production data entry by ID
router.put('/:id', update);

// Delete a crop production data entry by ID
router.delete('/:id', remove);

module.exports = router;
