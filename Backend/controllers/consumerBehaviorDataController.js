const db = require('../config/db');

// Create a new record
exports.create = (req, res) => {
    const { Consumer_ID, Date, Region_ID, Preferred_Commodity, Price_Sensitivity } = req.body;

    const query = `
        INSERT INTO consumerbehaviordata (Consumer_ID, Date, Region_ID, Preferred_Commodity, Price_Sensitivity)
        VALUES (?, ?, ?, ?, ?)`;

    db.query(query, [Consumer_ID, Date, Region_ID, Preferred_Commodity, Price_Sensitivity], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to create record.' });
        }
        res.status(201).json({ id: results.insertId, message: 'Record created successfully.' });
    });
};

// Retrieve all records
exports.getAll = (req, res) => {
    const query = 'SELECT * FROM consumerbehaviordata';

    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to fetch records.' });
        }
        res.status(200).json(results);
    });
};

// Retrieve a single record by ID
exports.getById = (req, res) => {
    const { id } = req.params;

    const query = 'SELECT * FROM consumerbehaviordata WHERE Consumer_ID = ?';

    db.query(query, [id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to fetch record.' });
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
    const { Consumer_ID, Date, Region_ID, Preferred_Commodity, Price_Sensitivity } = req.body;

    const query = `
        UPDATE consumerbehaviordata
        SET Consumer_ID = ?, Date = ?, Region_ID = ?, Preferred_Commodity = ?, Price_Sensitivity = ?
        WHERE Consumer_ID = ?`;

    db.query(query, [Consumer_ID, Date, Region_ID, Preferred_Commodity, Price_Sensitivity, id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to update record.' });
        }
        res.status(200).json({ message: 'Record updated successfully.' });
    });
};

// Delete a record by ID
exports.remove = (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM consumerbehaviordata WHERE Consumer_ID = ?';

    db.query(query, [id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to delete record.' });
        }
        res.status(200).json({ message: 'Record deleted successfully.' });
    });
};