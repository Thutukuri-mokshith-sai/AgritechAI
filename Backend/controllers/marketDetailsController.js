const db = require('../config/db');

// Create a new market details entry
exports.create = (req, res) => {
    const { market_id, market_name, district, state, user_id } = req.body;

    if (!market_id || !market_name || !district || !state || !user_id) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    const query = `INSERT INTO market_details (market_id, market_name, district, state, user_id) 
                   VALUES (?, ?, ?, ?, ?)`;
    db.query(query, [market_id, market_name, district, state, user_id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.insertId, message: 'Market details entry created successfully.' });
    });
};

// Retrieve all market details entries
exports.getAll = (req, res) => {
    const query = 'SELECT * FROM market_details';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
};

// Retrieve a single market details entry by primary key
exports.getById = (req, res) => {
    const { id } = req.params;

    const query = 'SELECT * FROM market_details WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Market details entry not found.' });
        }
        res.status(200).json(results[0]);
    });
};

// Update a market details entry by primary key
exports.update = (req, res) => {
    const { id } = req.params;
    const { market_id, market_name, district, state, user_id } = req.body;

    const query = `UPDATE market_details 
                   SET market_id = ?, market_name = ?, district = ?, state = ?, user_id = ? 
                   WHERE id = ?`;
    db.query(query, [market_id, market_name, district, state, user_id, id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Market details entry not found.' });
        }
        res.status(200).json({ message: 'Market details entry updated successfully.' });
    });
};

// Delete a market details entry by primary key
exports.remove = (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM market_details WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Market details entry not found.' });
        }
        res.status(200).json({ message: 'Market details entry deleted successfully.' });
    });
};
