import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaClipboardList, FaChartBar, FaIndustry, FaRegCalendarAlt, FaRegFileAlt, FaTruck, FaChartLine, FaBoxes } from 'react-icons/fa';

const AdminNavbar = () => {
    const [showNavLinks, setShowNavLinks] = useState(false);
    const toggleNavLinks = () => {
        setShowNavLinks(!showNavLinks);
    };
    return (
        <div className="admin-navbar">
            {/* Including CSS styles within the component */}
            <style>{`
                .admin-navbar {
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

            {/* User Management Link with Toggle */}
            <NavLink
                className="btn btn-outline-primary my-2"
                to="#"
                onClick={toggleNavLinks}
                style={{
                    backgroundColor: '#007bff',
                    color: '#fff',
                    fontSize: '18px'
                }}
            >
                Data Management
            </NavLink>

            {/* Nav Links Container - Displayed Horizontally when showNavLinks is true */}
            <div className={`tab-container ${showNavLinks ? 'show' : 'hide'}`}>
                <NavLink
                    className="btn btn-outline-primary me-2 mb-2"
                    to="/admin-dashboard/market-details"
                    style={({ isActive }) => ({
                        backgroundColor: isActive ? '#007bff' : 'transparent',
                        color: isActive ? '#fff' : '#007bff',
                    })}
                >
                    <FaTachometerAlt style={{ fontSize: '20px' }} /> Dashboard
                </NavLink>

                <NavLink
                    className="btn btn-outline-primary me-2 mb-2"
                    to="/admin-dashboard/user-management"
                    style={({ isActive }) => ({
                        backgroundColor: isActive ? '#007bff' : 'transparent',
                        color: isActive ? '#fff' : '#007bff',
                    })}
                >
                    <FaUsers style={{ fontSize: '20px' }} /> Users
                </NavLink>

                <NavLink
                    className="btn btn-outline-primary me-2 mb-2"
                    to="/admin-dashboard/buffer-stock-details"
                    style={({ isActive }) => ({
                        backgroundColor: isActive ? '#007bff' : 'transparent',
                        color: isActive ? '#fff' : '#007bff',
                    })}
                >
                    <FaClipboardList style={{ fontSize: '20px' }} /> Buffer Stock
                </NavLink>

                <NavLink
                    className="btn btn-outline-primary me-2 mb-2"
                    to="/admin-dashboard/consumer-behavior-data"
                    style={({ isActive }) => ({
                        backgroundColor: isActive ? '#007bff' : 'transparent',
                        color: isActive ? '#fff' : '#007bff',
                    })}
                >
                    <FaChartBar style={{ fontSize: '20px' }} /> Consumer Behavior
                </NavLink>

                <NavLink
                    className="btn btn-outline-primary me-2 mb-2"
                    to="/admin-dashboard/crop-production-data"
                    style={({ isActive }) => ({
                        backgroundColor: isActive ? '#007bff' : 'transparent',
                        color: isActive ? '#fff' : '#007bff',
                    })}
                >
                    <FaIndustry style={{ fontSize: '20px' }} /> Crop Production
                </NavLink>

                <NavLink
                    className="btn btn-outline-primary me-2 mb-2"
                    to="/admin-dashboard/global-market-data"
                    style={({ isActive }) => ({
                        backgroundColor: isActive ? '#007bff' : 'transparent',
                        color: isActive ? '#fff' : '#007bff',
                    })}
                >
                    <FaRegCalendarAlt style={{ fontSize: '20px' }} /> Global Market Data
                </NavLink>

                <NavLink
                    className="btn btn-outline-primary me-2 mb-2"
                    to="/admin-dashboard/government-policy-data"
                    style={({ isActive }) => ({
                        backgroundColor: isActive ? '#007bff' : 'transparent',
                        color: isActive ? '#fff' : '#007bff',
                    })}
                >
                    <FaRegFileAlt style={{ fontSize: '20px' }} /> Government Policies
                </NavLink>

                <NavLink
                    className="btn btn-outline-primary me-2 mb-2"
                    to="/admin-dashboard/historical-price-data"
                    style={({ isActive }) => ({
                        backgroundColor: isActive ? '#007bff' : 'transparent',
                        color: isActive ? '#fff' : '#007bff',
                    })}
                >
                    <FaChartLine style={{ fontSize: '20px' }} /> Historical Prices
                </NavLink>

                <NavLink
                    className="btn btn-outline-primary me-2 mb-2"
                    to="/admin-dashboard/import-export-data"
                    style={({ isActive }) => ({
                        backgroundColor: isActive ? '#007bff' : 'transparent',
                        color: isActive ? '#fff' : '#007bff',
                    })}
                >
                    <FaTruck style={{ fontSize: '20px' }} /> Import/Export Data
                </NavLink>

                <NavLink
                    className="btn btn-outline-primary me-2 mb-2"
                    to="/admin-dashboard/market-intelligence"
                    style={({ isActive }) => ({
                        backgroundColor: isActive ? '#007bff' : 'transparent',
                        color: isActive ? '#fff' : '#007bff',
                    })}
                >
                    <FaBoxes style={{ fontSize: '20px' }} /> Market Intelligence
                </NavLink>

                <NavLink
                    className="btn btn-outline-primary me-2 mb-2"
                    to="/admin-dashboard/supply-chain-data"
                    style={({ isActive }) => ({
                        backgroundColor: isActive ? '#007bff' : 'transparent',
                        color: isActive ? '#fff' : '#007bff',
                    })}
                >
                    <FaClipboardList style={{ fontSize: '20px' }} /> Supply Chain Data
                </NavLink>
            </div>
        </div>
    );
};

export default AdminNavbar;
