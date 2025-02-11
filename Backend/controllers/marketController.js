exports.marketData = (req, res) => {
    // Sample market data retrieval from the database
    const query = 'SELECT * FROM market_details';
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching market data.' });
        }
        res.json({ data: result });
    });
};
