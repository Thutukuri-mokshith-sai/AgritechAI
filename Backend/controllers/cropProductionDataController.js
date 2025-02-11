const db = require('../config/db');

// Create a new crop production data entry
exports.create = (req, res) => {
    const { Crop_ID, Region_ID, Sowing_Date, Harvest_Date, Yield_Per_Hectare, Total_Production } = req.body;

    if (!Crop_ID || !Region_ID) {
        return res.status(400).json({ error: 'Crop_ID and Region_ID are required.' });
    }

    const query = `INSERT INTO cropproductiondata (Crop_ID, Region_ID, Sowing_Date, Harvest_Date, Yield_Per_Hectare, Total_Production) 
                   VALUES (?, ?, ?, ?, ?, ?)`;
    db.query(query, [Crop_ID, Region_ID, Sowing_Date, Harvest_Date, Yield_Per_Hectare, Total_Production], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.insertId, message: 'Crop production data entry created successfully.' });
    });
};

// Retrieve all crop production data entries
exports.getAll = (req, res) => {
    const query = 'SELECT * FROM cropproductiondata';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
};

// Retrieve a single crop production data entry by ID
exports.getById = (req, res) => {
    const { id } = req.params;

    const query = 'SELECT * FROM cropproductiondata WHERE Crop_ID = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Crop production data entry not found.' });
        }
        res.status(200).json(results[0]);
    });
};

// Update a crop production data entry by ID
exports.update = (req, res) => {
    const { id } = req.params;
    const { Region_ID, Sowing_Date, Harvest_Date, Yield_Per_Hectare, Total_Production } = req.body;

    const query = `UPDATE cropproductiondata 
                   SET Region_ID = ?, Sowing_Date = ?, Harvest_Date = ?, Yield_Per_Hectare = ?, Total_Production = ? 
                   WHERE Crop_ID = ?`;
    db.query(query, [Region_ID, Sowing_Date, Harvest_Date, Yield_Per_Hectare, Total_Production, id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Crop production data entry not found.' });
        }
        res.status(200).json({ message: 'Crop production data entry updated successfully.' });
    });
};

// Delete a crop production data entry by ID
exports.remove = (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM cropproductiondata WHERE Crop_ID = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Crop production data entry not found.' });
        }
        res.status(200).json({ message: 'Crop production data entry deleted successfully.' });
    });
};
