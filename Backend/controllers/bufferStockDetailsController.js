const db = require('../config/db');

// Create a new record
exports.create = (req, res) => {
    const { godown_id, district, state, user_id } = req.body;
    const query = 'INSERT INTO buffer_stock_details (godown_id, district, state, user_id) VALUES (?, ?, ?, ?)';
    db.query(query, [godown_id, district, state, user_id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.insertId, message: 'Record created successfully.' });
    });
};

// Retrieve all records
exports.getAll = (req, res) => {
    const query = 'SELECT * FROM buffer_stock_details';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
};

// Retrieve a single record by ID
exports.getById = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM buffer_stock_details WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Record not found.' });
        }
        res.status(200).json(results[0]);
    });
};

// Update a record by ID
exports.update = (req, res) => {
    const { id } = req.params;
    const { godown_id, district, state, user_id } = req.body;
    const query = 'UPDATE buffer_stock_details SET godown_id = ?, district = ?, state = ?, user_id = ? WHERE id = ?';
    db.query(query, [godown_id, district, state, user_id, id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Record updated successfully.' });
    });
};

// Delete a record by ID
exports.remove = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM buffer_stock_details WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Record deleted successfully.' });
    });
};
