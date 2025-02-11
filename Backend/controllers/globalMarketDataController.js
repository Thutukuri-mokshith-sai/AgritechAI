const db = require('../config/db');

// Create a new global market data entry
exports.create = (req, res) => {
    const { Commodity_ID, Date, Global_Price, Trade_Policy_Impact } = req.body;

    if (!Commodity_ID || !Date) {
        return res.status(400).json({ error: 'Commodity_ID and Date are required.' });
    }

    const query = `INSERT INTO globalmarketdata (Commodity_ID, Date, Global_Price, Trade_Policy_Impact) 
                   VALUES (?, ?, ?, ?)`;
    db.query(query, [Commodity_ID, Date, Global_Price, Trade_Policy_Impact], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.insertId, message: 'Global market data entry created successfully.' });
    });
};

// Retrieve all global market data entries
exports.getAll = (req, res) => {
    const query = 'SELECT * FROM globalmarketdata';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
};

// Retrieve a single global market data entry by ID
exports.getById = (req, res) => {
    const { id } = req.params;

    const query = 'SELECT * FROM globalmarketdata WHERE Commodity_ID = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Global market data entry not found.' });
        }
        res.status(200).json(results[0]);
    });
};

// Update a global market data entry by ID
exports.update = (req, res) => {
    const { id } = req.params;
    const { Date, Global_Price, Trade_Policy_Impact } = req.body;

    const query = `UPDATE globalmarketdata 
                   SET Date = ?, Global_Price = ?, Trade_Policy_Impact = ? 
                   WHERE Commodity_ID = ?`;
    db.query(query, [Date, Global_Price, Trade_Policy_Impact, id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Global market data entry not found.' });
        }
        res.status(200).json({ message: 'Global market data entry updated successfully.' });
    });
};

// Delete a global market data entry by ID
exports.remove = (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM globalmarketdata WHERE Commodity_ID = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Global market data entry not found.' });
        }
        res.status(200).json({ message: 'Global market data entry deleted successfully.' });
    });
};
