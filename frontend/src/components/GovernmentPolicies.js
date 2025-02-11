// Install Bootstrap (if using npm):
// npm install bootstrap

// Import Bootstrap in your main entry file (index.js or App.js):
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState } from "react";

const GovernmentPolicies = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleAccordionClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const policies = [
    {
      title: "National Agriculture Market (eNAM)",
      content: (
        <>
          <p>
            <strong>Objective:</strong> To create a unified national market for agricultural commodities.
          </p>
          <ul>
            <li>Integrates existing APMC (Agricultural Produce Market Committee) markets.</li>
            <li>Provides an online trading platform for farmers, traders, and buyers.</li>
            <li>Enhances transparency, competition, and price discovery.</li>
            <li>Ensures better prices for farmers by reducing middlemen.</li>
            <li>Promotes ease of doing business.</li>
          </ul>
        </>
      ),
    },
    {
      title: "Minimum Support Price (MSP) Policy",
      content: (
        <>
          <p>
            <strong>Objective:</strong> To ensure that farmers receive a guaranteed minimum price for their produce.
          </p>
          <ul>
            <li>MSP is announced for specific crops before the sowing season.</li>
            <li>If the market price falls below MSP, the government procures the crop at MSP.</li>
            <li>Aims to protect farmers from market price fluctuations and ensure a livelihood.</li>
            <li>The MSP is revised periodically based on factors such as cost of production, demand-supply balance, and inflation.</li>
          </ul>
        </>
      ),
    },
    {
      title: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
      content: (
        <>
          <p>
            <strong>Objective:</strong> To provide financial support to farmers in case of crop loss due to natural calamities.
          </p>
          <ul>
            <li>Low premium rates for farmers.</li>
            <li>Coverage for all food, oilseed, and horticultural crops.</li>
            <li>Quick claim settlement to farmers.</li>
            <li>Focuses on sustainable agriculture practices.</li>
          </ul>
        </>
      ),
    },
    {
      title: "Soil Health Card Scheme",
      content: (
        <>
          <p>
            <strong>Objective:</strong> To promote balanced use of fertilizers and improve soil health.
          </p>
          <ul>
            <li>Provides soil health cards to farmers.</li>
            <li>Includes crop-wise recommendations for fertilizers and nutrients.</li>
            <li>Aims to enhance productivity and reduce input costs.</li>
          </ul>
        </>
      ),
    },
  ];

  return (
    <div className="container my-4">
      <h2 className="mb-4 text-center">Agriculture Market Policies and Guidelines</h2>
      <div className="accordion" id="policiesAccordion">
        {policies.map((policy, index) => (
          <div className="accordion-item" key={index}>
            <h2 className="accordion-header" id={`heading-${index}`}>
              <button
                className={`accordion-button ${activeIndex === index ? "" : "collapsed"}`}
                type="button"
                onClick={() => handleAccordionClick(index)}
              >
                {policy.title}
              </button>
            </h2>
            <div
              className={`accordion-collapse collapse ${
                activeIndex === index ? "show" : ""
              }`}
              aria-labelledby={`heading-${index}`}
              data-bs-parent="#policiesAccordion"
            >
              <div className="accordion-body">{policy.content}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GovernmentPolicies;
