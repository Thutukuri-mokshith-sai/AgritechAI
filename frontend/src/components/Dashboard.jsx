import React, { useState, useEffect } from 'react';
import '../App.css'; // Importing CSS file
import Header from './Header.jsx'; // Importing Header component
import Footer from '../header/footer/footer.js';
import PriceSlider from './Price_slider.js';
import { AuthProvider } from '../context/AuthContext.js';
import Login from './Login.js';
import Signup from './Signup.js';
import BufferStock from './Bufferstock.js';
const App = () => {
  const [isDanger, setIsDanger] = useState(false);
  const [isWarning, setIsWarning] = useState(false);
  const [error, setError] = useState('');
  return (
    <div className="page-container">
      <Header /> {/* Include the Header component here */}
      {/* Error Message */}
      {error && <div className="error-message">{error}</div>}
      <BufferStock/>
      <Footer />
    </div>
  );
};
export default App;
