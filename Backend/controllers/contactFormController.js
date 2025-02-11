const db = require('../config/db');

// Create a new contact form entry
exports.create = (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    const query = 'INSERT INTO contact_form (name, email, message) VALUES (?, ?, ?)';
    db.query(query, [name, email, message], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.insertId, message: 'Contact form entry created successfully.' });
    });
};

// Retrieve all contact form entries
exports.getAll = (req, res) => {
    const query = 'SELECT * FROM contact_form';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
};

// Retrieve a single contact form entry by ID
exports.getById = (req, res) => {
    const { id } = req.params;

    const query = 'SELECT * FROM contact_form WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Contact form entry not found.' });
        }
        res.status(200).json(results[0]);
    });
};

// Update a contact form entry by ID
exports.update = (req, res) => {
    const { id } = req.params;
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    const query = 'UPDATE contact_form SET name = ?, email = ?, message = ? WHERE id = ?';
    db.query(query, [name, email, message, id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Contact form entry not found.' });
        }
        res.status(200).json({ message: 'Contact form entry updated successfully.' });
    });
};

// Delete a contact form entry by ID
exports.remove = (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM contact_form WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Contact form entry not found.' });
        }
        res.status(200).json({ message: 'Contact form entry deleted successfully.' });
    });
};
