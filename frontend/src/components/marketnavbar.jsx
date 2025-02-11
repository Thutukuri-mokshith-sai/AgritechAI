import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaBoxes, FaDollarSign, FaExchangeAlt, FaRegFileAlt, FaChartBar, FaCogs } from 'react-icons/fa';

const MarketPanel = () => {
    const [showNavLinks, setShowNavLinks] = useState(false);
    const toggleNavLinks = () => {
        setShowNavLinks(!showNavLinks);
    };
    return (
        <div className="market-navbar">
            <style>{`
                .market-navbar {
                    padding: 10px;
                    background-color: #f8f9fa;
                    border-bottom: 1px solid #e0e0e0;
                }
                .btn {
                    padding: 8px 16px;
                    border-radius: 4px;
                    font-size: 18px;
                }
                .btn-outline-primary {
                    border: 1px solid #007bff;
                    color: #007bff;
                    background-color: transparent;
                }
                .btn-outline-primary:hover {
                    background-color: #007bff;
                    color: white;
                }
                .tab-container {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;
                    margin-top: 20px;
                }
                .tab-container.hide {
                    display: none;
                }
                .tab-container.show {
                    display: flex;
                }
            `}</style>

            <NavLink
                className="btn btn-outline-primary my-2"
                to="#"
                onClick={toggleNavLinks}
                style={{ backgroundColor: '#007bff', color: '#fff', fontSize: '18px' }}
            >
                Market Panel
            </NavLink>

            <div className={`tab-container ${showNavLinks ? 'show' : 'hide'}`}>
                <NavLink className="btn btn-outline-primary me-2 mb-2" to="/market-dashboard/" 
                    style={({ isActive }) => ({
                        backgroundColor: isActive ? '#007bff' : 'transparent',
                        color: isActive ? '#fff' : '#007bff',
                    })}
                >
                    <FaTachometerAlt style={{ fontSize: '20px' }} /> Dashboard
                </NavLink>

                <NavLink className="btn btn-outline-primary me-2 mb-2" to="/market-dashboard/market-inventory" 
                    style={({ isActive }) => ({
                        backgroundColor: isActive ? '#007bff' : 'transparent',
                        color: isActive ? '#fff' : '#007bff',
                    })}
                >
                    <FaBoxes style={{ fontSize: '20px' }} /> Inventory
                </NavLink>

                <NavLink className="btn btn-outline-primary me-2 mb-2" to="/market-dashboard/market-pricing" 
                    style={({ isActive }) => ({
                        backgroundColor: isActive ? '#007bff' : 'transparent',
                        color: isActive ? '#fff' : '#007bff',
                    })}
                >
                    <FaDollarSign style={{ fontSize: '20px' }} /> Pricing
                </NavLink>

                <NavLink className="btn btn-outline-primary me-2 mb-2" to="/market-dashboard/market-trade" 
                    style={({ isActive }) => ({
                        backgroundColor: isActive ? '#007bff' : 'transparent',
                        color: isActive ? '#fff' : '#007bff',
                    })}
                >
                    <FaExchangeAlt style={{ fontSize: '20px' }} /> Trade
                </NavLink>

                <NavLink className="btn btn-outline-primary me-2 mb-2" to="/market-dashboard/market-policies" 
                    style={({ isActive }) => ({
                        backgroundColor: isActive ? '#007bff' : 'transparent',
                        color: isActive ? '#fff' : '#007bff',
                    })}
                >
                    <FaRegFileAlt style={{ fontSize: '20px' }} /> Policies
                </NavLink>

                <NavLink className="btn btn-outline-primary me-2 mb-2" to="/market-dashboard/market-intelligence" 
                    style={({ isActive }) => ({
                        backgroundColor: isActive ? '#007bff' : 'transparent',
                        color: isActive ? '#fff' : '#007bff',
                    })}
                >
                    <FaChartBar style={{ fontSize: '20px' }} /> Market Intelligence
                </NavLink>

                <NavLink className="btn btn-outline-primary me-2 mb-2" to="/market-dashboard/market-reports" 
                    style={({ isActive }) => ({
                        backgroundColor: isActive ? '#007bff' : 'transparent',
                        color: isActive ? '#fff' : '#007bff',
                    })}
                >
                    <FaRegFileAlt style={{ fontSize: '20px' }} /> Reports
                </NavLink>

                <NavLink className="btn btn-outline-primary me-2 mb-2" to="/market-dashboard/market-settings" 
                    style={({ isActive }) => ({
                        backgroundColor: isActive ? '#007bff' : 'transparent',
                        color: isActive ? '#fff' : '#007bff',
                    })}
                >
                    <FaCogs style={{ fontSize: '20px' }} /> Settings
                </NavLink>
            </div>
        </div>
    );
};

export default MarketPanel;
