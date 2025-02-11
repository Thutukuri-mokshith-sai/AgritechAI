const db = require('../config/db');

// Create a new market intelligence data entry
exports.create = (req, res) => {
    const { Commodity_ID, Date, Supply_Disruption, Demand_Change, Market_Sentiment } = req.body;

    if (!Commodity_ID || !Date) {
        return res.status(400).json({ error: 'Commodity_ID and Date are required.' });
    }

    const query = `INSERT INTO marketintelligencedata (Commodity_ID, Date, Supply_Disruption, Demand_Change, Market_Sentiment) 
                   VALUES (?, ?, ?, ?, ?)`;
    db.query(query, [Commodity_ID, Date, Supply_Disruption, Demand_Change, Market_Sentiment], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.insertId, message: 'Market intelligence data entry created successfully.' });
    });
};

// Retrieve all market intelligence data entries
exports.getAll = (req, res) => {
    const query = 'SELECT * FROM marketintelligencedata';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
};

// Retrieve a single market intelligence data entry by primary key
exports.getById = (req, res) => {
    const { Commodity_ID, Date } = req.params;

    const query = 'SELECT * FROM marketintelligencedata WHERE Commodity_ID = ? AND Date = ?';
    db.query(query, [Commodity_ID, Date], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Market intelligence data entry not found.' });
        }
        res.status(200).json(results[0]);
    });
};

// Update a market intelligence data entry by primary key
exports.update = (req, res) => {
    const { Commodity_ID, Date } = req.params;
    const { Supply_Disruption, Demand_Change, Market_Sentiment } = req.body;

    const query = `UPDATE marketintelligencedata 
                   SET Supply_Disruption = ?, Demand_Change = ?, Market_Sentiment = ? 
                   WHERE Commodity_ID = ? AND Date = ?`;
    db.query(query, [Supply_Disruption, Demand_Change, Market_Sentiment, Commodity_ID, Date], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Market intelligence data entry not found.' });
        }
        res.status(200).json({ message: 'Market intelligence data entry updated successfully.' });
    });
};

// Delete a market intelligence data entry by primary key
exports.remove = (req, res) => {
    const { Commodity_ID, Date } = req.params;

    const query = 'DELETE FROM marketintelligencedata WHERE Commodity_ID = ? AND Date = ?';
    db.query(query, [Commodity_ID, Date], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Market intelligence data entry not found.' });
        }
        res.status(200).json({ message: 'Market intelligence data entry deleted successfully.' });
    });
};
