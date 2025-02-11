import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import MarketDashboard from './components/MarketDashboard';
import BufferDashboard from './components/BufferDashboard';
import Admin from './components/Admin';
import BufferStock from './components/Bufferstock';
import HelpAndSupport from './components/Help_and_support';
import Header from './components/Header';
import Footer from './components/footer/footer';
import News from './components/News';
import Contact from './components/Contact';
import About from './components/About';
import PriceSlider from './components/Price_slider';
import WeatherApp from './components/WeatherData';
import Prices from './components/TodaysPrices';
import EssentialCommodities from './components/Home';
import Drop from './components/PricePrediction';
import GovernmentPolicies from './components/GovernmentPolicies';
import UserNavbar from './components/UserNavbar';
import AdminNavbar from './components/Adminnavbar';
import BufferStockDetails from './components/Admin/bufferStockDetails';
import ConsumerBehaviorData from './components/Admin/consumerBehaviorData';
import ContactFormManager from './components/Admin/contactForm';
import CropProductionData from './components/Admin/cropProductionData';
import GlobalMarketData from './components/Admin/globalMarketData';
import GovernmentPolicyData from './components/Admin/governmentPolicyData';
import HistoricalPriceData from './components/Admin/historicalPriceData';
import ImportExportData from './components/Admin/importExportData';
import MarketIntelligencePage from './components/Admin/marketIntelligenceData';
import MarketDetails from './components/Admin/marketDetails';
import UserManagement from './components/Admin/users';
import SupplyChainData from './components/Admin/supplyChainData';
import MarketPanel from './components/marketnavbar';
import Dashboard from './components/market-panel/Dashboard';
import MarketInventory from './components/market-panel/MarketInventory';
import MarketPricing from './components/market-panel/MarketPricing';
import MarketTrade from './components/market-panel/MarketTrade';
import MarketPolicies from './components/market-panel/MarketPolicies';
import MarketIntelligence from './components/market-panel/MarketIntelligence';
import MarketReports from './components/market-panel/MarketReports';
import MarketSettings from './components/market-panel/MarketSettings';
import Inventory from './components/market-panel/inventory';
import AdminHelpAndSupport from './components/Help_and_support';

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Auth Routes */}
                <Route path="/" element={<AuthForm />} />
                <Route path="/market-dashboard" element={
                    <div className="page-container">
                        <Header />
                        <MarketPanel />
                        <Outlet />
                        <Footer />
                    </div>
                }>
                    <Route index element={<Dashboard />} />
                    <Route path="market-inventory" element={<MarketInventory />} />
                    <Route path="market-pricing" element={<MarketPricing />} />
                    <Route path="market-trade" element={<MarketTrade />} />
                    <Route path="market-policies" element={<MarketPolicies />} />
                    <Route path="market-intelligence" element={<MarketIntelligence />} />
                    <Route path="market-reports" element={<MarketReports />} />
                    <Route path="market-settings" element={<MarketSettings />} />
                    <Route path="inventory-details" element={<Inventory />} />
                </Route>
                
                {/* Buffer Dashboard */}
                <Route path="/buffer-dashboard" element={<BufferDashboard />} />
                
                {/* Admin Dashboard Routes */}
                <Route path='/admin-dashboard' element={
                    <div className="page-container">
                        <Header />
                        <AdminNavbar />
                        <Outlet />
                        <Footer />
                    </div>
                }>
                    <Route path="buffer-stock-details" element={<BufferStockDetails />} />
                    <Route path="consumer-behavior-data" element={<ConsumerBehaviorData />} />
                    <Route path="contact-form-manager" element={<ContactFormManager />} />
                    <Route path="crop-production-data" element={<CropProductionData />} />
                    <Route path="global-market-data" element={<GlobalMarketData />} />
                    <Route path="government-policy-data" element={<GovernmentPolicyData />} />
                    <Route path="historical-price-data" element={<HistoricalPriceData />} />
                    <Route path="import-export-data" element={<ImportExportData />} />
                    <Route path="market-intelligence" element={<MarketIntelligencePage />} />
                    <Route path="market-details" element={<MarketDetails />} />
                    <Route path="user-management" element={<UserManagement />} />
                    <Route path="supply-chain-data" element={<SupplyChainData />} />
                </Route>
                
                {/* User Dashboard Routes */}
                <Route path="/user-dashboard" element={
                    <div className="page-container">
                        <Header />
                        <UserNavbar />
                        <Outlet />
                        <Footer />
                    </div>
                }>
                    <Route path="user-home" element={<EssentialCommodities />} />
                    <Route path="todays-prices" element={<Prices />} />
                    <Route path="price-prediction" element={<Drop />} />
                    <Route path="weather-data" element={<WeatherApp />} />
                    <Route path="government-policies" element={<GovernmentPolicies />} />
                    <Route path="news" element={<News />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="about" element={<About />} />
                </Route>
                
                {/* Help and Support Dashboard */}
                <Route path="/help-dashboard" element={<div className="page-container">
                        <Header />
                        <AdminHelpAndSupport/>
                        <Outlet />
                        <Footer />
                    </div>} />
                
                {/* Fallback route for unmatched paths */}
                <Route path="*" element={<div>Page Not Found</div>} />
            </Routes>
        </Router>
    );
};

export default App;
