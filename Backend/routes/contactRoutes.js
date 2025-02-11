const express = require('express');
const { submitForm, getAllSubmissions } = require('../controllers/contactController');
const router = express.Router();

// POST route for submitting the contact form
router.post('/submit_form', submitForm);

// GET route for fetching all contact form submissions (admin dashboard)
router.get('/admin/dashboard', getAllSubmissions);

module.exports = router;
