const db = require('../config/db');

// Create a new historical price data entry
exports.create = (req, res) => {
    const { Commodity_ID, Date, Region_ID, Retail_Price, Wholesale_Price } = req.body;

    if (!Commodity_ID || !Date || !Region_ID || !Retail_Price || !Wholesale_Price) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    const query = `INSERT INTO historicalpricedata (Commodity_ID, Date, Region_ID, Retail_Price, Wholesale_Price) 
                   VALUES (?, ?, ?, ?, ?)`;
    db.query(query, [Commodity_ID, Date, Region_ID, Retail_Price, Wholesale_Price], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.insertId, message: 'Historical price data entry created successfully.' });
    });
};

// Retrieve all historical price data entries
exports.getAll = (req, res) => {
    const query = 'SELECT * FROM historicalpricedata';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
};

// Retrieve a single historical price data entry by primary key
exports.getById = (req, res) => {
    const { Commodity_ID, Date, Region_ID } = req.params;

    const query = 'SELECT * FROM historicalpricedata WHERE Commodity_ID = ? AND Date = ? AND Region_ID = ?';
    db.query(query, [Commodity_ID, Date, Region_ID], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Historical price data entry not found.' });
        }
        res.status(200).json(results[0]);
    });
};

// Update a historical price data entry by primary key
exports.update = (req, res) => {
    const { Commodity_ID, Date, Region_ID } = req.params;
    const { Retail_Price, Wholesale_Price } = req.body;

    const query = `UPDATE historicalpricedata 
                   SET Retail_Price = ?, Wholesale_Price = ? 
                   WHERE Commodity_ID = ? AND Date = ? AND Region_ID = ?`;
    db.query(query, [Retail_Price, Wholesale_Price, Commodity_ID, Date, Region_ID], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Historical price data entry not found.' });
        }
        res.status(200).json({ message: 'Historical price data entry updated successfully.' });
    });
};

// Delete a historical price data entry by primary key
exports.remove = (req, res) => {
    const { Commodity_ID, Date, Region_ID } = req.params;

    const query = 'DELETE FROM historicalpricedata WHERE Commodity_ID = ? AND Date = ? AND Region_ID = ?';
    db.query(query, [Commodity_ID, Date, Region_ID], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Historical price data entry not found.' });
        }
        res.status(200).json({ message: 'Historical price data entry deleted successfully.' });
    });
};
