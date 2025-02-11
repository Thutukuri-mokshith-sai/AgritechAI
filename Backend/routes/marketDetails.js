const express = require('express');
const {
    create,
    getAll,
    getById,
    update,
    remove
} = require('../controllers/marketDetailsController');

const router = express.Router();

// Create a new market details entry
router.post('/', create);

// Retrieve all market details entries
router.get('/', getAll);

// Retrieve a single market details entry by ID
router.get('/:id', getById);

// Update a market details entry by ID
router.put('/:id', update);

// Delete a market details entry by ID
router.delete('/:id', remove);

module.exports = router;
