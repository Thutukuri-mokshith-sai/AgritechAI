import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';

const Header = () => {
    const [currentTime, setCurrentTime] = useState('');
    const [currentDay, setCurrentDay] = useState('');
    const [currentDate, setCurrentDate] = useState('');
    const [timeZone, setTimeZone] = useState('');
    const [is24Hour, setIs24Hour] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [users, setUsers] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(true); // Assuming user is logged in
    const [showProfile, setShowProfile] = useState(false); // Toggle for showing profile info
    const [userProfile, setUserProfile] = useState(null); // Store user profile data

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const options = {
                hour12: !is24Hour,
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            };

            const formattedTime = now.toLocaleTimeString('en-US', { hour12: !is24Hour });
            const formattedDay = now.toLocaleDateString('en-US', { weekday: 'long' });
            const formattedDate = now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
            const timeZoneName = now.toLocaleTimeString('en-US', { timeZoneName: 'short' });

            setCurrentTime(formattedTime);
            setCurrentDay(formattedDay);
            setCurrentDate(formattedDate);
            setTimeZone(timeZoneName);
        };

        updateTime();
        const intervalId = setInterval(updateTime, 1000);
        document.body.classList.toggle('dark-mode', isDarkMode);

        return () => clearInterval(intervalId);
    }, [is24Hour, isDarkMode]);

    const toggleTimeFormat = () => {
        setIs24Hour(!is24Hour);
    };

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    const fetchUsers = async () => {
        if (isLoggedIn) {
            try {
                const response = await fetch('http://localhost:9000/api/users');
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [isLoggedIn]);

    const toggleProfile = async () => {
        setShowProfile(!showProfile);
        if (!userProfile) {
            try {
                const response = await fetch('http://localhost:9000/api/profile');
                const data = await response.json();
                setUserProfile(data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        }
    };

    return (
        <div>
            {/* Top Bar */}
            <div className="top-bar d-flex justify-content-between align-items-center px-3 py-2">
                <div className="logo d-flex align-items-center">
                    <img src="https://cdn-icons-png.flaticon.com/512/4086/4086679.png" alt="Agri Logo" className="logo-img" style={{ width: '40px', height: '40px' }} />
                    <h3 className="ms-2 text-Green fw-bold">AGRITECH AI</h3>
                </div>
                <div className="d-flex align-items-center">
                    {/* Live Time Display */}
                    <div
                        className="time-display p-2 rounded-3 me-3 d-flex align-items-center"
                        style={{
                            color: '#fff',
                            fontSize: '16px',
                            cursor: 'pointer',
                            backgroundColor: isDarkMode ? '#333' : '#007bff',
                            transition: 'background-color 0.3s ease, color 0.3s ease',
                        }}
                        onClick={toggleTimeFormat}
                        title="Click to toggle time format"
                    >
                        <span className="me-3">{currentTime}</span>
                        <span className="me-3">{currentDay}</span>
                        <span className="me-3">{currentDate}</span>
                        <span>{timeZone}</span>
                    </div>

                    {/* Dark Mode Toggle Button */}
                    <button className="btn btn-secondary me-2" onClick={toggleDarkMode}>
                        {isDarkMode ? 'Light' : 'Dark'}
                    </button>

                    {/* Profile and Logout Icons */}
                    <button className="btn btn-outline-light me-2 d-flex align-items-center" onClick={toggleProfile}>
                        <FaUser className="me-1" />
                        Profile
                    </button>
                    <NavLink className="btn btn-outline-light d-flex align-items-center" to="/">
                        <FaSignOutAlt className="me-1" />
                        Logout
                    </NavLink>
                </div>
            </div>

            {/* Banner */}
            <div className="banner position-relative text-center" style={{ marginTop: '0', height: '400px' }}>
                <img
                    src="https://cdn.arstechnica.net/wp-content/uploads/2016/09/Corn.jpg"
                    alt="Agriculture"
                    className="w-100 h-100 object-fit-cover"
                    style={{ marginTop: '0' }}
                />
                <div className="header-text position-absolute top-50 start-50 translate-middle">
                    <h2 className="text-white fw-bold text-shadow">Transforming Agriculture with AI</h2>
                    <button className="btn btn-warning mt-3">Learn More</button>
                </div>
            </div>

            {/* Profile Information */}
            {showProfile && userProfile && (
                <div className="profile-info mt-4 p-3">
                    <h4 className="text-center">Profile Information</h4>
                    <div className="profile-details">
                        <p><strong>Name:</strong> {userProfile.name}</p>
                        <p><strong>Email:</strong> {userProfile.email}</p>
                        <p><strong>Role:</strong> {userProfile.role}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Header;
