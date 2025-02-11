const db = require('../config/db');

// Create a new import/export data entry
exports.create = (req, res) => {
    const { Commodity_ID, Date, Import_Quantity, Export_Quantity, Tariff_Rate } = req.body;

    if (!Commodity_ID || !Date) {
        return res.status(400).json({ error: 'Commodity_ID and Date are required.' });
    }

    const query = `INSERT INTO importexportdata (Commodity_ID, Date, Import_Quantity, Export_Quantity, Tariff_Rate) 
                   VALUES (?, ?, ?, ?, ?)`;
    db.query(query, [Commodity_ID, Date, Import_Quantity, Export_Quantity, Tariff_Rate], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.insertId, message: 'Import/export data entry created successfully.' });
    });
};

// Retrieve all import/export data entries
exports.getAll = (req, res) => {
    const query = 'SELECT * FROM importexportdata';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
};

// Retrieve a single import/export data entry by primary key
exports.getById = (req, res) => {
    const { Commodity_ID, Date } = req.params;

    const query = 'SELECT * FROM importexportdata WHERE Commodity_ID = ? AND Date = ?';
    db.query(query, [Commodity_ID, Date], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Import/export data entry not found.' });
        }
        res.status(200).json(results[0]);
    });
};

// Update an import/export data entry by primary key
exports.update = (req, res) => {
    const { Commodity_ID, Date } = req.params;
    const { Import_Quantity, Export_Quantity, Tariff_Rate } = req.body;

    const query = `UPDATE importexportdata 
                   SET Import_Quantity = ?, Export_Quantity = ?, Tariff_Rate = ? 
                   WHERE Commodity_ID = ? AND Date = ?`;
    db.query(query, [Import_Quantity, Export_Quantity, Tariff_Rate, Commodity_ID, Date], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Import/export data entry not found.' });
        }
        res.status(200).json({ message: 'Import/export data entry updated successfully.' });
    });
};

// Delete an import/export data entry by primary key
exports.remove = (req, res) => {
    const { Commodity_ID, Date } = req.params;

    const query = 'DELETE FROM importexportdata WHERE Commodity_ID = ? AND Date = ?';
    db.query(query, [Commodity_ID, Date], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Import/export data entry not found.' });
        }
        res.status(200).json({ message: 'Import/export data entry deleted successfully.' });
    });
};
