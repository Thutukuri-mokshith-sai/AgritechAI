import React, { useEffect, useState } from 'react';
import './PriceSlider.css';

const PriceSlider = () => {
  const [index, setIndex] = useState(0);
  const [commodity, setCommodity] = useState({
    name: 'Loading...',
    average: 0,
    max: 0,
    min: 0,
  });
  const [isDarkMode, setIsDarkMode] = useState(false); // State for dark mode

  const commodities = [
    { name: "Wheat", average: 147, max: 3275, min: 2825 },
    { name: "Rice", average: 120, max: 2800, min: 2500 },
    { name: "Maize", average: 135, max: 3100, min: 2700 },
    { name: "Barley", average: 112, max: 2900, min: 2400 },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCommodity(commodities[index]);
      setIndex((prevIndex) => (prevIndex + 1) % commodities.length);
    }, 5000);

    // Apply dark mode class to body when mode is toggled
    document.body.classList.toggle('dark-mode', isDarkMode);

    return () => clearInterval(interval);
  }, [index, commodities, isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="price-container">
      <h2>Commodity Prices</h2>
      <div className="commodity-container">
        <div className="commodity">
          <strong>{commodity.name}</strong> : 
          <span className="price">Average: {commodity.average}</span>, 
          <span className="max">Max Price: {commodity.max}</span>, 
          <span className="min">Min Price: {commodity.min}</span>
        </div>
      </div>
      
    </div>
  );
};

export default PriceSlider;
