// User model for interacting with the 'users' table
const db = require('../config/db');

const createUser = (email, password, role) => {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO users (email, password, role) VALUES (?, ?, ?)`;
        db.query(query, [email, password, role], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

module.exports = {
    createUser,
};
