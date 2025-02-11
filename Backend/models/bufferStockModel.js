// Buffer Stock model for interacting with the 'buffer_stock_details' table
const db = require('../config/db');

const addBufferStockDetails = (godownId, district, state, userId) => {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO buffer_stock_details (godown_id, district, state, user_id) VALUES (?, ?, ?, ?)`;
        db.query(query, [godownId, district, state, userId], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

module.exports = {
    addBufferStockDetails,
};
