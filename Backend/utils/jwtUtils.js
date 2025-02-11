const jwt = require('jsonwebtoken');
const SECRET_KEY = 'mySuperSecretKey123!';

// Utility function to generate JWT token
const generateToken = (id, role) => {
    return jwt.sign({ id, role }, SECRET_KEY, { expiresIn: '1h' });
};

module.exports = { generateToken };
