const db = require('../config/db');

// Create a new user
exports.create = (req, res) => {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
        return res.status(400).json({ error: 'Email, password, and role are required.' });
    }

    const query = `INSERT INTO users (email, password, role) VALUES (?, ?, ?)`;
    db.query(query, [email, password, role], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.insertId, message: 'User created successfully.' });
    });
};

// Retrieve all users
exports.getAll = (req, res) => {
    const query = 'SELECT * FROM users';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
};

// Retrieve a single user by ID
exports.getById = (req, res) => {
    const { id } = req.params;

    const query = 'SELECT * FROM users WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.status(200).json(results[0]);
    });
};

// Update a user by ID
exports.update = (req, res) => {
    const { id } = req.params;
    const { email, password, role } = req.body;

    const query = `UPDATE users SET email = ?, password = ?, role = ? WHERE id = ?`;
    db.query(query, [email, password, role, id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.status(200).json({ message: 'User updated successfully.' });
    });
};

// Delete a user by ID
exports.remove = (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM users WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.status(200).json({ message: 'User deleted successfully.' });
    });
};
