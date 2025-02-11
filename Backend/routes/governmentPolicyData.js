const express = require('express');
const {
    create,
    getAll,
    getById,
    update,
    remove
} = require('../controllers/governmentPolicyDataController');

const router = express.Router();

// Create a new government policy data entry
router.post('/', create);

// Retrieve all government policy data entries
router.get('/', getAll);

// Retrieve a single government policy data entry by ID
router.get('/:id', getById);

// Update a government policy data entry by ID
router.put('/:id', update);

// Delete a government policy data entry by ID
router.delete('/:id', remove);

module.exports = router;
