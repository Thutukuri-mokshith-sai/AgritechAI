import React from 'react';
import './News.css'; // Assuming the styles are now in a separate CSS file

const News = () => {
  return (
    <div className="container">
      <h1>India's Farm Trade Measures and Agriculture News</h1>

      <div className="article">
        <h2>India's Farm Trade Measures to Placate Farmers</h2>
        <p className="date">Published on September 16, 2024</p>
        <p>
          India has implemented various measures to support farmers ahead of
          local elections, including lifting the minimum export price for
          basmati rice and onions, reducing export taxes, and raising import
          tariffs on key edible oils.
        </p>
        <p className="source">REUTERS</p>
      </div>

      <div className="article">
        <h2>Post-Paddy MSP Hike: Agriculture Stocks Soar Up to 15%</h2>
        <p className="date">Published on October 10, 2024</p>
        <p>
          Following the government's increase in the MSP for paddy, shares of
          agriculture-related companies have surged, with some rising by up to
          15%.
        </p>
        <p className="source">INDIAN EXPRESS</p>
      </div>

      <div className="article">
        <h2>Centre Starts Chana Procurement at MSP for Maintaining Buffer Stock</h2>
        <p className="date">Published on April 9, 2024</p>
        <p>
          The Indian government has begun procuring chana (gram) from farmers
          at MSP to maintain buffer stocks, aiming to stabilize prices and meet
          the demand of states distributing pulses through welfare schemes.
        </p>
        <p className="source">BUSINESS NEWS INDIA</p>
      </div>

      <div className="article">
        <h2>Govt to Procure Tur Directly from Farmers at Market Rates to Build Buffer Stock</h2>
        <p className="date">Published on September 16, 2024</p>
        <p>
          To address the shortage of tur (pigeon pea), the government plans to
          procure the crop directly from farmers at market rates, building buffer
          stocks to stabilize prices.
        </p>
        <p className="source">REUTERS</p>
      </div>

      <div className="article">
        <h2>Why Govt Must Create a Buffer Stock of All Main Food Items</h2>
        <p className="date">Published on September 16, 2024</p>
        <p>
          An analysis discusses the importance of establishing buffer stocks for
          essential food items to mitigate price volatility and ensure food
          security.
        </p>
        <p className="source">REUTERS</p>
      </div>

      <div className="article">
        <h2>Madhya Pradesh: Wheat Prices Fall Below MSP on the Back of Bumper Crop, FCI Open Market Offloading</h2>
        <p className="date">Published on September 27, 2024</p>
        <p>
          In Madhya Pradesh, wheat prices have fallen below the MSP due to a
          bumper crop and the Food Corporation of India's open market
          offloading, affecting farmers' income.
        </p>
        <p className="source">INDIAN EXPRESS</p>
      </div>
    </div>
  );
};

export default News;
