import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaRegMoneyBillAlt, FaChartLine, FaCloudSun, FaRegBuilding, FaNewspaper, FaPhoneAlt, FaInfoCircle } from 'react-icons/fa';

const UserNavbar = () => {
    return (
        <div className="tab-container d-flex justify-content-center my-4">
            <NavLink
                className="btn btn-outline-primary me-2"
                to="/user-dashboard/user-home"
                style={({ isActive }) => ({
                    backgroundColor: isActive ? '#007bff' : 'transparent',
                    color: isActive ? '#fff' : '#007bff',
                })}
            >
                <FaHome style={{ fontSize: '20px' }} /> Home
            </NavLink>

            <NavLink
                className="btn btn-outline-primary me-2"
                to="/user-dashboard/todays-prices"
                style={({ isActive }) => ({
                    backgroundColor: isActive ? '#007bff' : 'transparent',
                    color: isActive ? '#fff' : '#007bff',
                })}
            >
                <FaRegMoneyBillAlt style={{ fontSize: '20px' }} /> Today's Prices
            </NavLink>
            
            <NavLink
                className="btn btn-outline-primary me-2"
                to="/user-dashboard/price-prediction"
                style={({ isActive }) => ({
                    backgroundColor: isActive ? '#007bff' : 'transparent',
                    color: isActive ? '#fff' : '#007bff',
                })}
            >
                <FaChartLine style={{ fontSize: '20px' }} /> Price Prediction
            </NavLink>
            
            <NavLink
                className="btn btn-outline-primary me-2"
                to="/user-dashboard/weather-data"
                style={({ isActive }) => ({
                    backgroundColor: isActive ? '#007bff' : 'transparent',
                    color: isActive ? '#fff' : '#007bff',
                })}
            >
                <FaCloudSun style={{ fontSize: '20px' }} /> Weather Data
            </NavLink>
            
            <NavLink
                className="btn btn-outline-primary me-2"
                to="/user-dashboard/government-policies"
                style={({ isActive }) => ({
                    backgroundColor: isActive ? '#007bff' : 'transparent',
                    color: isActive ? '#fff' : '#007bff',
                })}
            >
                <FaRegBuilding style={{ fontSize: '20px' }} /> Government Policies
            </NavLink>
            
            <NavLink
                className="btn btn-outline-primary me-2"
                to="/user-dashboard/news"
                style={({ isActive }) => ({
                    backgroundColor: isActive ? '#007bff' : 'transparent',
                    color: isActive ? '#fff' : '#007bff',
                })}
            >
                <FaNewspaper style={{ fontSize: '20px' }} /> News
            </NavLink>
            
            <NavLink
                className="btn btn-outline-primary me-2"
                to="/user-dashboard/contact"
                style={({ isActive }) => ({
                    backgroundColor: isActive ? '#007bff' : 'transparent',
                    color: isActive ? '#fff' : '#007bff',
                })}
            >
                <FaPhoneAlt style={{ fontSize: '20px' }} /> Contact
            </NavLink>
            
            <NavLink
                className="btn btn-outline-primary"
                to="/user-dashboard/about"
                style={({ isActive }) => ({
                    backgroundColor: isActive ? '#007bff' : 'transparent',
                    color: isActive ? '#fff' : '#007bff',
                })}
            >
                <FaInfoCircle style={{ fontSize: '20px' }} /> About
            </NavLink>
        </div>
    );
};

export default UserNavbar;
