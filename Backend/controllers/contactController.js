const db = require('../config/db');

// Handle form submission (POST request)
const submitForm = (req, res) => {
  const { name, email, message } = req.body;

  const query = 'INSERT INTO contact_form (name, email, message) VALUES (?, ?, ?)';
  const values = [name, email, message];

  db.query(query, values, (error, results) => {
    if (error) {
      console.error('Error inserting data:', error);
      return res.status(500).json({ message: 'Error submitting the form' });
    }
    res.status(200).json({ message: 'Form submitted successfully' });
  });
};

// Fetch all submissions (GET request)
const getAllSubmissions = (req, res) => {
  const query = 'SELECT * FROM contact_form';
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching data:', error);
      return res.status(500).json({ message: 'Error retrieving data' });
    }
    res.status(200).json({ data: results });
  });
};

module.exports = { submitForm, getAllSubmissions };
