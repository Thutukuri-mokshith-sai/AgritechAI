const express = require('express');
const {
    create,
    getAll,
    getById,
    update,
    remove
} = require('../controllers/supplyChainDataController');

const router = express.Router();

// Create a new supply chain data entry
router.post('/', create);

// Retrieve all supply chain data entries
router.get('/', getAll);

// Retrieve a single supply chain data entry by ID
router.get('/:id', getById);

// Update a supply chain data entry by ID
router.put('/:id', update);

// Delete a supply chain data entry by ID
router.delete('/:id', remove);

module.exports = router;