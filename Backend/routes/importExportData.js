const express = require('express');
const {
    create,
    getAll,
    getById,
    update,
    remove
} = require('../controllers/importExportDataController');

const router = express.Router();

// Create a new import/export data entry
router.post('/', create);

// Retrieve all import/export data entries
router.get('/', getAll);

// Retrieve a single import/export data entry by ID
router.get('/:id', getById);

// Update an import/export data entry by ID
router.put('/:id', update);

// Delete an import/export data entry by ID
router.delete('/:id', remove);

module.exports = router;
