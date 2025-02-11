const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
exports.signup = (req, res) => {
    const { email, password, role, marketDetails, bufferStockDetails } = req.body;

    // Hash the password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).json({ message: 'Error hashing password.' });
        }

        const userQuery = `INSERT INTO users (email, password, role) VALUES (?, ?, ?)`;
        db.query(userQuery, [email, hashedPassword, role], (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Error registering user.', error: err });
            }

            const userId = result.insertId;

            if (role === 'Market' && marketDetails) {
                const { market_id, market_name, district, state } = marketDetails;

                // Ensure all market details are present
                if (!market_id || !market_name || !district || !state) {
                    return res.status(400).json({ message: 'Missing market details.' });
                }

                const marketQuery = `INSERT INTO market_details (market_id, market_name, district, state, user_id) VALUES (?, ?, ?, ?, ?)`;
                db.query(marketQuery, [market_id, market_name, district, state, userId], (err) => {
                    if (err) {
                        return res.status(500).json({ message: 'Error saving market details.' });
                    }
                    res.status(201).json({ message: 'Market user registered successfully.' });
                });
            } else if (role === 'Buffer Stock' && bufferStockDetails) {
                const { godown_id, district, state } = bufferStockDetails;

                // Ensure all buffer stock details are present
                if (!godown_id || !district || !state) {
                    return res.status(400).json({ message: 'Missing buffer stock details.' });
                }

                const bufferQuery = `INSERT INTO buffer_stock_details (godown_id, district, state, user_id) VALUES (?, ?, ?, ?)`;
                db.query(bufferQuery, [godown_id, district, state, userId], (err) => {
                    if (err) {
                        return res.status(500).json({ message: 'Error saving buffer stock details.' });
                    }
                    res.status(201).json({ message: 'Buffer stock user registered successfully.' });
                });
            } else {
                res.status(201).json({ message: 'User registered successfully.' });
            }
        });
    });
};
exports.login = (req, res) => {
    const { email, password } = req.body;

    // Step 1: Check if the user exists
    const userQuery = `SELECT * FROM users WHERE email = ?`;
    db.query(userQuery, [email], (err, result) => {
        if (err) {
            console.error('Error fetching user:', err);
            return res.status(500).json({ message: 'Error fetching user.' });
        }

        // Step 2: If user not found, send an error response
        if (result.length === 0) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const user = result[0];

        // Step 3: Compare passwords
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                console.error('Error comparing passwords:', err);
                return res.status(500).json({ message: 'Error comparing passwords.' });
            }
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid credentials.' });
            }

            // Step 4: Generate token based on user role
            let additionalData = {};
            let query = '';

            // Handle specific roles
            if (user.role === 'Market') {
                query = `SELECT * FROM market_details WHERE user_id = ?`;
                db.query(query, [user.id], (err, marketResult) => {
                    if (err) {
                        console.error('Error fetching market details:', err);
                        return res.status(500).json({ message: 'Error fetching market details.' });
                    }
                    additionalData = marketResult[0] || {}; // Use empty object if no data found
                    const token = jwt.sign(
                        { id: user.id, role: user.role, additionalData },
                        process.env.JWT_SECRET,
                        { expiresIn: '1h' }
                    );
                    res.json({ token, role: user.role, additionalData });
                });

            } else if (user.role === 'Buffer Stock') {
                query = `SELECT * FROM buffer_stock_details WHERE user_id = ?`;
                db.query(query, [user.id], (err, bufferResult) => {
                    if (err) {
                        console.error('Error fetching buffer stock details:', err);
                        return res.status(500).json({ message: 'Error fetching buffer stock details.' });
                    }
                    additionalData = bufferResult[0] || {}; // Use empty object if no data found
                    const token = jwt.sign(
                        { id: user.id, role: user.role, additionalData },
                        process.env.JWT_SECRET,
                        { expiresIn: '1h' }
                    );
                    res.json({ token, role: user.role, additionalData });
                });

            } else if (user.role === 'Super Admin' || user.role === 'Help and Support' || user.role === 'User') {
                // Handle Super Admin, Help and Support, and User roles
                const token = jwt.sign(
                    { id: user.id, role: user.role },
                    process.env.JWT_SECRET,
                    { expiresIn: '1h' }
                );
                res.json({
                    message: 'Login successful!',
                    token: token,
                    role: user.role
                });
            } else {
                // For any other role (fallback)
                const token = jwt.sign(
                    { id: user.id, role: user.role },
                    process.env.JWT_SECRET,
                    { expiresIn: '1h' }
                );
                res.json({
                    message: 'Login successful!',
                    token: token,
                    role: user.role
                });
            }
        });
    });
};
