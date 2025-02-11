const db = require('../config/db');

// Create a new supply chain data entry
exports.create = (req, res) => {
    const { Commodity_ID, Region_ID, Storage_Capacity, Transport_Cost_Per_Unit } = req.body;

    if (!Commodity_ID || !Region_ID) {
        return res.status(400).json({ error: 'Commodity_ID and Region_ID are required.' });
    }

    const query = `INSERT INTO supplychaindata (Commodity_ID, Region_ID, Storage_Capacity, Transport_Cost_Per_Unit) 
                   VALUES (?, ?, ?, ?)`;
    db.query(query, [Commodity_ID, Region_ID, Storage_Capacity, Transport_Cost_Per_Unit], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.insertId, message: 'Supply chain data entry created successfully.' });
    });
};

// Retrieve all supply chain data entries
exports.getAll = (req, res) => {
    const query = 'SELECT * FROM supplychaindata';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
};

// Retrieve a single supply chain data entry by primary key
exports.getById = (req, res) => {
    const { Commodity_ID, Region_ID } = req.params;

    const query = 'SELECT * FROM supplychaindata WHERE Commodity_ID = ? AND Region_ID = ?';
    db.query(query, [Commodity_ID, Region_ID], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Supply chain data entry not found.' });
        }
        res.status(200).json(results[0]);
    });
};

// Update a supply chain data entry by primary key
exports.update = (req, res) => {
    const { Commodity_ID, Region_ID } = req.params;
    const { Storage_Capacity, Transport_Cost_Per_Unit } = req.body;

    const query = `UPDATE supplychaindata 
                   SET Storage_Capacity = ?, Transport_Cost_Per_Unit = ? 
                   WHERE Commodity_ID = ? AND Region_ID = ?`;
    db.query(query, [Storage_Capacity, Transport_Cost_Per_Unit, Commodity_ID, Region_ID], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Supply chain data entry not found.' });
        }
        res.status(200).json({ message: 'Supply chain data entry updated successfully.' });
    });
};

// Delete a supply chain data entry by primary key
exports.remove = (req, res) => {
    const { Commodity_ID, Region_ID } = req.params;

    const query = 'DELETE FROM supplychaindata WHERE Commodity_ID = ? AND Region_ID = ?';
    db.query(query, [Commodity_ID, Region_ID], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Supply chain data entry not found.' });
        }
        res.status(200).json({ message: 'Supply chain data entry deleted successfully.' });
    });
};
