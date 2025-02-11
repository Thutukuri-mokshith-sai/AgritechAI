"// Entry point for the server" 
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const contactRoutes = require('./routes/contactRoutes');
const marketRoutes = require('./routes/marketRoutes');
const bufferStockDetailsRoutes = require('H:/SIH-1647 Project/Backend/routes/bufferStockDetails.js');
const consumerBehaviorDataRoutes = require('./routes/consumerBehaviorData');
const contactFormRoutes = require('./routes/contactForm');
const cropProductionDataRoutes = require('./routes/cropProductionData');
const globalMarketDataRoutes = require('./routes/globalMarketData');
const governmentPolicyDataRoutes = require('./routes/governmentPolicyData');
const historicalPriceDataRoutes = require('./routes/historicalPriceData');
const importExportDataRoutes = require('./routes/importExportData');
const marketIntelligenceDataRoutes = require('./routes/marketIntelligenceData');
const marketDetailsRoutes = require('./routes/marketDetails');
const supplyChainDataRoutes = require('./routes/supplyChainData');
const usersRoutes = require('./routes/users');
const weatherClimateDataRoutes = require('./routes/weatherClimateData');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 9000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);
app.use('/market', marketRoutes);
app.use('/api/contact', contactRoutes);

// Table Routes
app.use('/api/buffer-stock-details', bufferStockDetailsRoutes);
app.use('/api/consumer-behavior-data', consumerBehaviorDataRoutes);
app.use('/api/contact-form', contactFormRoutes);
app.use('/api/crop-production-data', cropProductionDataRoutes);
app.use('/api/globalmarketdata', globalMarketDataRoutes);
app.use('/api/governmentpolicydata', governmentPolicyDataRoutes);
app.use('/api/historicalpricedata', historicalPriceDataRoutes);
app.use('/api/importexportdata', importExportDataRoutes);
app.use('/api/marketintelligencedata', marketIntelligenceDataRoutes);
app.use('/api/marketdetails', marketDetailsRoutes);
app.use('/api/supplychaindata', supplyChainDataRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/weatherclimatedata', weatherClimateDataRoutes);// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
