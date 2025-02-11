import React, { useState } from "react";
import "./footer.css";
import 'font-awesome/css/font-awesome.min.css';

const Footer = () => {
  // State to handle toggling sections
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <footer className="footer">
      <div className="container">
        {/* Commodities Section */}
        <div className="column">
          <h3 onClick={() => toggleSection("commodities")}>
            COMMODITIES <span className="dropdown-icon">&#9662;</span>
          </h3>
          <ul
            className={`dropdown-content ${
              openSection === "commodities" ? "show" : ""
            }`}
          >
            <li>Grains</li>
            <li>Pulses</li>
            <li>Oilseeds</li>
            <li>Fruits</li>
            <li>Vegetables</li>
            <li>Spices</li>
            <li>Dairy Products</li>
          </ul>
        </div>

        {/* Tools Section */}
        <div className="column">
          <h3 onClick={() => toggleSection("tools")}>
            TOOLS <span className="dropdown-icon">&#9662;</span>
          </h3>
          <ul
            className={`dropdown-content ${
              openSection === "tools" ? "show" : ""
            }`}
          >
            <li>Price Prediction Models</li>
            <li>Buffer Stock Management</li>
            <li>Market Trends</li>
            <li>Seasonal Analysis</li>
            <li>Supply Chain Insights</li>
          </ul>
        </div>

        {/* Blog Section */}
        <div className="column">
          <h3 onClick={() => toggleSection("blog")}>
            BLOG <span className="dropdown-icon">&#9662;</span>
          </h3>
          <ul
            className={`dropdown-content ${
              openSection === "blog" ? "show" : ""
            }`}
          >
            <li>Price Forecasting Techniques</li>
            <li>Best Practices for Stock Management</li>
            <li>Technological Innovations in Agriculture</li>
            <li>Global Commodity Trends</li>
          </ul>
        </div>

        {/* Featured Insights Section */}
        <div className="column">
          <h3 onClick={() => toggleSection("insights")}>
            FEATURED INSIGHTS <span className="dropdown-icon">&#9662;</span>
          </h3>
          <div
            className={`dropdown-content ${
              openSection === "insights" ? "show" : ""
            }`}
          >
            <p>
              <strong>COMMODITIES | Grain Market</strong>
            </p>
            <p>How Technology is Transforming Grain Price Predictions</p>
            <span className="featured-symbol">&#9733;</span>
            <hr />
            <p>
              <strong>TOOLS | Buffer Stock Management</strong>
            </p>
            <p>Effective Strategies for Managing Seasonal Surpluses</p>
            <span className="featured-symbol">&#9733;</span>
          </div>
        </div>
      </div>

      {/* Contact Details and Social Media Section */}
      <div className="contact-section">
        <div className="contact-info">
          <p><strong>Contact Us:</strong></p>
          <p>Email: info@example.com</p>
          <p>Phone: (123) 456-7890</p>
          <p>Address: 123 Agriculture St, Farming City, Country</p>
        </div>
{/* Social Media Links */}
<div className="social-media">
  <a href="https://twitter.com" target="_blank" aria-label="Twitter">
    <span role="img" aria-label="Twitter">🐦</span> {/* Twitter bird symbol */}
  </a>
  <a href="https://facebook.com" target="_blank" aria-label="Facebook">
    <span role="img" aria-label="Facebook">📘</span> {/* Facebook book symbol */}
  </a>
  <a href="https://linkedin.com" target="_blank" aria-label="LinkedIn">
    <span role="img" aria-label="LinkedIn">🔗</span> {/* Link symbol for LinkedIn */}
  </a>
</div>
      </div>

      {/* Copyright Section */}
      <div className="copyright">
        <p>&copy; 2025 Agriculture Insights. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
