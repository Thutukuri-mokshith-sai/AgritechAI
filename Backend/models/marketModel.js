// Market model for interacting with the 'market_details' table
const db = require('../config/db');

const addMarketDetails = (marketId, marketName, district, state, userId) => {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO market_details (market_id, market_name, district, state, user_id) VALUES (?, ?, ?, ?, ?)`;
        db.query(query, [marketId, marketName, district, state, userId], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

module.exports = {
    addMarketDetails,
};
