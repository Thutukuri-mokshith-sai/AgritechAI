// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');

const SECRET_KEY = 'moksh123';

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(403).send('Access Denied');
    
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).send('Invalid Token');
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;
