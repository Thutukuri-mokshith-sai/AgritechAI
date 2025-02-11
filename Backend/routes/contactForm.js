const express = require('express');
const {
    create,
    getAll,
    getById,
    update,
    remove
} = require('../controllers/contactFormController');

const router = express.Router();

// Create a new contact form entry
router.post('/', create);

// Retrieve all contact form entries
router.get('/', getAll);

// Retrieve a single contact form entry by ID
router.get('/:id', getById);

// Update a contact form entry by ID
router.put('/:id', update);

// Delete a contact form entry by ID
router.delete('/:id', remove);

module.exports = router;
