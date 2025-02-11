import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JS bundle
import './Header.css'; // Assuming you will create a separate CSS file for styles
import { FaHome, FaSearch, FaEnvelope, FaGlobe, FaTrash } from 'react-icons/fa'; // Importing specific FontAwesome icons

const Header = () => {
    const [currentTime, setCurrentTime] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(false); // State for dark mode

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString());
        };

        updateTime();
        const intervalId = setInterval(updateTime, 1000); // Update time every second

        // Apply dark mode class to the body element when isDarkMode changes
        document.body.classList.toggle('dark-mode', isDarkMode);

        return () => clearInterval(intervalId); // Cleanup on unmount
    }, [isDarkMode]);

    const handleSearch = (e) => {
        e.preventDefault();
        alert(`You searched for: ${searchQuery}`);
    };

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <div>
            <div className="top-bar d-flex justify-content-between align-items-center px-3 py-2">
                <div className="logo d-flex align-items-center">
                    <img src="https://cdn-icons-png.flaticon.com/512/4086/4086679.png" alt="Agri Logo" className="logo-img" />
                    <h1 className="ms-2">AgriTech AI</h1>
                </div>

                <form className="search-bar d-flex" onSubmit={handleSearch}>
                    <input
                        type="text"
                        className="form-control me-2"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit" className="btn btn-primary">Search</button>
                </form>

                <ul className="nav-items d-flex list-unstyled mb-0">
                    <li><a href="#"><FaHome /> Home</a></li>
                    <li><a href="#"><FaSearch /> Search</a></li>
                    <li><a href="#"><FaEnvelope /> Messages</a></li>
                    <li><a href="#"><FaGlobe /> Global</a></li>
                    <li><a href="#"><FaTrash /> Trash</a></li>
                </ul>

                <button className="btn btn-secondary" onClick={toggleDarkMode}>
                    {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
            </div>

            <div className="banner position-relative text-center">
                <img
                    src="https://cdn.arstechnica.net/wp-content/uploads/2016/09/Corn.jpg"
                    alt="Agriculture Image"
                    className="w-100"
                />
                <div className="header-text position-absolute top-50 start-50 translate-middle">
                    <h2 className="text-white fw-bold">Transforming Agriculture with AI</h2>
                    <button className="btn btn-warning mt-3">Learn More</button>
                </div>
            </div>

            <div className="content text-center mt-4">
                <h2>Welcome to the Future of Agriculture</h2>
                <p>Current Time: {currentTime}</p>
                <p>Discover how AI and machine learning are revolutionizing farming techniques for improved yields and sustainable practices.</p>
            </div>
        </div>
    );
};

export default Header;
