const db = require('../config/db');

// Create a new government policy data entry
exports.create = (req, res) => {
    const { Policy_ID, Commodity_ID, Effective_Date, Policy_Type, Policy_Description } = req.body;

    if (!Commodity_ID || !Effective_Date) {
        return res.status(400).json({ error: 'Commodity_ID and Effective_Date are required.' });
    }

    const query = `INSERT INTO governmentpolicydata (Policy_ID, Commodity_ID, Effective_Date, Policy_Type, Policy_Description) 
                   VALUES (?, ?, ?, ?, ?)`;
    db.query(query, [Policy_ID, Commodity_ID, Effective_Date, Policy_Type, Policy_Description], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.insertId, message: 'Government policy data entry created successfully.' });
    });
};

// Retrieve all government policy data entries
exports.getAll = (req, res) => {
    const query = 'SELECT * FROM governmentpolicydata';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
};

// Retrieve a single government policy data entry by ID
exports.getById = (req, res) => {
    const { id } = req.params;

    const query = 'SELECT * FROM governmentpolicydata WHERE Policy_ID = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Government policy data entry not found.' });
        }
        res.status(200).json(results[0]);
    });
};

// Update a government policy data entry by ID
exports.update = (req, res) => {
    const { id } = req.params;
    const { Commodity_ID, Effective_Date, Policy_Type, Policy_Description } = req.body;

    const query = `UPDATE governmentpolicydata 
                   SET Commodity_ID = ?, Effective_Date = ?, Policy_Type = ?, Policy_Description = ? 
                   WHERE Policy_ID = ?`;
    db.query(query, [Commodity_ID, Effective_Date, Policy_Type, Policy_Description, id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Government policy data entry not found.' });
        }
        res.status(200).json({ message: 'Government policy data entry updated successfully.' });
    });
};

// Delete a government policy data entry by ID
exports.remove = (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM governmentpolicydata WHERE Policy_ID = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Government policy data entry not found.' });
        }
        res.status(200).json({ message: 'Government policy data entry deleted successfully.' });
    });
};
