const db = require('../config/db');

// Create a new weather and climate data entry
exports.create = (req, res) => {
    const { Date, Region_ID, Temperature, Rainfall, Humidity } = req.body;

    if (!Date || !Region_ID) {
        return res.status(400).json({ error: 'Date and Region_ID are required.' });
    }

    const query = `INSERT INTO weatherclimatedata (Date, Region_ID, Temperature, Rainfall, Humidity) 
                   VALUES (?, ?, ?, ?, ?)`;
    db.query(query, [Date, Region_ID, Temperature, Rainfall, Humidity], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.insertId, message: 'Weather and climate data entry created successfully.' });
    });
};

// Retrieve all weather and climate data entries
exports.getAll = (req, res) => {
    const query = 'SELECT * FROM weatherclimatedata';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
};

// Retrieve a single weather and climate data entry by primary key
exports.getById = (req, res) => {
    const { Date, Region_ID } = req.params;

    const query = 'SELECT * FROM weatherclimatedata WHERE Date = ? AND Region_ID = ?';
    db.query(query, [Date, Region_ID], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Weather and climate data entry not found.' });
        }
        res.status(200).json(results[0]);
    });
};

// Update a weather and climate data entry by primary key
exports.update = (req, res) => {
    const { Date, Region_ID } = req.params;
    const { Temperature, Rainfall, Humidity } = req.body;

    const query = `UPDATE weatherclimatedata 
                   SET Temperature = ?, Rainfall = ?, Humidity = ? 
                   WHERE Date = ? AND Region_ID = ?`;
    db.query(query, [Temperature, Rainfall, Humidity, Date, Region_ID], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Weather and climate data entry not found.' });
        }
        res.status(200).json({ message: 'Weather and climate data entry updated successfully.' });
    });
};

// Delete a weather and climate data entry by primary key
exports.remove = (req, res) => {
    const { Date, Region_ID } = req.params;

    const query = 'DELETE FROM weatherclimatedata WHERE Date = ? AND Region_ID = ?';
    db.query(query, [Date, Region_ID], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Weather and climate data entry not found.' });
        }
        res.status(200).json({ message: 'Weather and climate data entry deleted successfully.' });
    });
};
