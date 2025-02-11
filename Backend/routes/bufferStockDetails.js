const express = require('express');
const { create, getAll, getById, update, remove } = require('../controllers/bufferStockDetailsController');
const router = express.Router();

router.post('/', create); // Create a record
router.get('/', getAll);  // Retrieve all records
router.get('/:id', getById); // Retrieve a single record by ID
router.put('/:id', update);  // Update a record by ID
router.delete('/:id', remove); // Delete a record by ID

module.exports = router;
