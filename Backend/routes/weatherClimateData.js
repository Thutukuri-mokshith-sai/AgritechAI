const express = require('express');
const {
    create,
    getAll,
    getById,
    update,
    remove
} = require('../controllers/weatherClimateDataController');

const router = express.Router();

// Create a new weather and climate data entry
router.post('/', create);

// Retrieve all weather and climate data entries
router.get('/', getAll);

// Retrieve a single weather and climate data entry by ID
router.get('/:id', getById);

// Update a weather and climate data entry by ID
router.put('/:id', update);

// Delete a weather and climate data entry by ID
router.delete('/:id', remove);

module.exports = router;
