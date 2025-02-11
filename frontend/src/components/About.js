import React from 'react';
import './About.css'
const About = () => {
  return (
    <div>
      <header className="header">
        <h1>AgriTech AI</h1>
        <p>Revolutionizing Agriculture with Artificial Intelligence</p>
      </header>

      <section className="mission">
        <h2>Our Mission</h2>
        <p>
          AgriTech AI's mission is to bridge the gap between technology and agriculture, offering solutions that improve productivity, sustainability, and decision-making for all stakeholders. We leverage AI, machine learning, and predictive analytics to help farmers optimize crop yield, minimize losses, and manage risk, ultimately improving food security and profitability.
        </p>
      </section>

      <section className="vision">
        <h2>Our Vision</h2>
        <p>
          Our vision is to reshape the agricultural landscape by making it more intelligent, resilient, and sustainable. We envision a world where farmers can rely on AI-driven insights to make proactive, informed decisions, manage resources efficiently, and tackle market uncertainties. By harnessing the power of data and AI, we aim to create a more stable, efficient, and profitable agricultural ecosystem for the future.
        </p>
      </section>

      <section className="core-values">
        <h2>Core Values</h2>
        <div className="value-item">
          <h3>Innovation</h3>
          <p>We prioritize technological innovation to solve complex agricultural challenges.</p>
        </div>
        <div className="value-item">
          <h3>Sustainability</h3>
          <p>We are committed to supporting farming practices that are environmentally responsible and economically viable.</p>
        </div>
        <div className="value-item">
          <h3>Accessibility</h3>
          <p>We aim to make AI solutions accessible to farmers of all scales, from smallholder farmers to large agricultural enterprises.</p>
        </div>
        <div className="value-item">
          <h3>Collaboration</h3>
          <p>We believe in the power of collaboration with stakeholders, including farmers, government agencies, and research institutions, to ensure effective solutions.</p>
        </div>
      </section>

      <section className="key-solutions">
        <h2>Key Solutions We Provide</h2>
        <div className="solution-item">
          <h3>Price Prediction and Market Volatility Management</h3>
          <p>AgriTech AI’s advanced AI algorithms predict price trends and market demands with high accuracy, helping farmers, traders, and government organizations plan ahead.</p>
        </div>
        <div className="solution-item">
          <h3>Buffer Stock Management</h3>
          <p>Our AI-driven system enables governments and organizations to manage buffer stocks effectively to stabilize prices and prevent crises like food shortages.</p>
        </div>
        <div className="solution-item">
          <h3>AI-Powered Crop Management</h3>
          <p>AI tools for precision farming optimize every aspect of crop management, from seed selection to harvesting, helping farmers increase yields and reduce waste.</p>
        </div>
        <div className="solution-item">
          <h3>Predictive Analytics for Pest and Disease Management</h3>
          <p>AI-based monitoring systems predict pest and disease outbreaks, allowing farmers to take proactive measures to protect crops and improve food security.</p>
        </div>
        <div className="solution-item">
          <h3>Water and Resource Optimization</h3>
          <p>Our AI tools provide real-time recommendations on optimizing water usage, reducing waste, and improving irrigation efficiency for sustainable farming practices.</p>
        </div>
        <div className="solution-item">
          <h3>Supply Chain Optimization</h3>
          <p>AI helps streamline agricultural supply chains by improving logistics, reducing waste, and ensuring efficient distribution from production to consumers.</p>
        </div>
        <div className="solution-item">
          <h3>Climate-Resilient Farming</h3>
          <p>AI solutions help farmers adapt to changing climate conditions by providing insights on optimal planting times, crop varieties, and weather patterns.</p>
        </div>
        <div className="solution-item">
          <h3>Automated Reporting and Decision Support Systems</h3>
          <p>AI-driven reporting tools automate data collection and analysis, enabling farmers and agricultural businesses to make data-backed decisions in real-time.</p>
        </div>
        <div className="solution-item">
          <h3>Sustainable Agriculture Practices</h3>
          <p>We provide recommendations for reducing pesticide use, optimizing fertilizer application, and improving soil health to promote long-term sustainability in agriculture.</p>
        </div>
      </section>

      <section className="benefits">
        <h2>Benefits for Stakeholders</h2>
        <div className="stakeholder">
          <h3>Farmers</h3>
          <ul>
            <li>Access to real-time data and predictive analytics for informed decision-making.</li>
            <li>Improved crop yields and reduced resource waste.</li>
            <li>Reduced risk from market price fluctuations and pest/disease outbreaks.</li>
            <li>Enhanced sustainability and environmental responsibility.</li>
          </ul>
        </div>
        <div className="stakeholder">
          <h3>Governments and Policymakers</h3>
          <ul>
            <li>Better management of agricultural policies and interventions.</li>
            <li>Improved food security through better price predictions and market stability.</li>
            <li>Data-driven insights for implementing long-term sustainability initiatives.</li>
          </ul>
        </div>
        <div className="stakeholder">
          <h3>Agricultural Businesses and Traders</h3>
          <ul>
            <li>Access to accurate market forecasts and trends.</li>
            <li>Optimized supply chain and reduced operational costs.</li>
            <li>Data-driven insights for pricing strategies and business growth.</li>
          </ul>
        </div>
        <div className="stakeholder">
          <h3>Consumers</h3>
          <ul>
            <li>More stable prices and greater availability of agricultural products.</li>
            <li>Increased food security, ensuring consistent and affordable food supply.</li>
          </ul>
        </div>
      </section>

      <section className="future">
        <h2>Future of AgriTech AI</h2>
        <p>
          We are continuously innovating and expanding our capabilities. AgriTech AI aims to integrate even more advanced technologies such as blockchain for traceability, Internet of Things (IoT) sensors for real-time monitoring, and cloud computing for enhanced data storage and analysis. By doing so, we aim to provide a comprehensive platform that not only addresses current agricultural challenges but also anticipates future needs.
        </p>
        <p>
          AgriTech AI is committed to shaping the future of agriculture—making farming smarter, more sustainable, and more profitable for generations to come.
        </p>
      </section>

      <footer className="footer">
        <p>&copy; 2025 AgriTech AI. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default About;
