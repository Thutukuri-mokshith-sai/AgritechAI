const express = require('express');
const {
    create,
    getAll,
    getById,
    update,
    remove
} = require('../controllers/usersController');

const router = express.Router();

// Create a new user
router.post('/', create);

// Retrieve all users
router.get('/', getAll);

// Retrieve a single user by ID
router.get('/:id', getById);

// Update a user by ID
router.put('/:id', update);

// Delete a user by ID
router.delete('/:id', remove);

module.exports = router;
