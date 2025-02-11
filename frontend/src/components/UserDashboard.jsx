import React, { useState, useEffect } from 'react';
import '../App.css'; // Importing CSS file
import Header from './Header.jsx'; // Importing Header component
import Footer from './footer/footer.js';
import BufferStock from './Bufferstock.js'; // Fixed import casing//+

const UserDashboard = () => {
  const [isDanger, setIsDanger] = useState(false);
  const [isWarning, setIsWarning] = useState(false);
  const [error, setError] = useState('');

  return (
    <div className="page-container">
      <Header /> {/* Include the Header component here */}
      {/* Error Message */}
      {error && <div className="error-message">{error}</div>}
      <BufferStock />
      <Footer />
    </div>
  );
};

export default UserDashboard;
