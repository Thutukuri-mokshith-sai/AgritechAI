import React, { useState, useEffect } from 'react';
import { Button, Form, Modal, Dropdown, DropdownButton, InputGroup } from 'react-bootstrap';
import { FaCog, FaCalendarAlt, FaDollarSign, FaTimesCircle, FaCheckCircle } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { FaChartLine, FaRegHandshake } from 'react-icons/fa';
// Register the necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

// Sample data for chart
const sampleChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'Price Trend (USD)',
            data: [100, 120, 150, 180, 170, 200, 220],
            fill: false,
            borderColor: '#36a2eb',
            tension: 0.1,
        },
    ],
};

const MarketSettings = () => {
    const [showModal, setShowModal] = useState(false);
    const [marketCategories, setMarketCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [priceRange, setPriceRange] = useState([0, 100]);
    const [tradingHours, setTradingHours] = useState('9:00 AM - 5:00 PM');
    const [currency, setCurrency] = useState('USD');
    const [selectedData, setSelectedData] = useState([]);

    useEffect(() => {
        // Fetch initial market categories (replace with API call if necessary)
        setMarketCategories([
            'Grains',
            'Livestock',
            'Dairy',
            'Vegetables',
            'Fruits',
            'Seeds & Fertilizers',
        ]);
    }, []);

    const handleModalShow = () => setShowModal(true);
    const handleModalClose = () => setShowModal(false);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const handlePriceRangeChange = (event) => {
        const { value, name } = event.target;
        setPriceRange((prevState) => {
            return name === 'min' ? [value, prevState[1]] : [prevState[0], value];
        });
    };

    const handleTradingHoursChange = (event) => setTradingHours(event.target.value);

    const handleCurrencyChange = (event) => setCurrency(event.target.value);

    const handleDataSelection = (dataType) => {
        setSelectedData((prevData) => [...prevData, dataType]);
    };

    return (
        <div className="market-settings">
            <div className="settings-header text-center py-4">
                <h2 className="fw-bold">Market Settings</h2>
                <p className="lead">
                    Configure and manage market-related settings such as categories, price ranges, trading hours, and
                    more.
                </p>
            </div>

            {/* Market Categories Section */}
            <div className="market-categories py-4">
                <h4 className="text-center">Market Categories</h4>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <Form.Group controlId="categorySelect">
                                <Form.Label>Select Category</Form.Label>
                                <DropdownButton
                                    variant="outline-primary"
                                    id="category-dropdown"
                                    title={selectedCategory || 'Select Category'}
                                    onSelect={handleCategoryChange}
                                >
                                    {marketCategories.map((category, index) => (
                                        <Dropdown.Item key={index} eventKey={category}>
                                            {category}
                                        </Dropdown.Item>
                                    ))}
                                </DropdownButton>
                            </Form.Group>
                        </div>
                    </div>
                </div>
            </div>

            {/* Price Range Section */}
            <div className="price-range py-4">
                <h4 className="text-center">Price Range</h4>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <InputGroup className="mb-3">
                                <InputGroup.Text>Min Price</InputGroup.Text>
                                <Form.Control
                                    type="number"
                                    name="min"
                                    value={priceRange[0]}
                                    onChange={handlePriceRangeChange}
                                    min={0}
                                    max={priceRange[1]}
                                />
                            </InputGroup>
                        </div>
                        <div className="col-md-6">
                            <InputGroup className="mb-3">
                                <InputGroup.Text>Max Price</InputGroup.Text>
                                <Form.Control
                                    type="number"
                                    name="max"
                                    value={priceRange[1]}
                                    onChange={handlePriceRangeChange}
                                    min={priceRange[0]}
                                    max={1000}
                                />
                            </InputGroup>
                        </div>
                    </div>
                </div>
            </div>

            {/* Trading Hours Section */}
            <div className="trading-hours py-4">
                <h4 className="text-center">Trading Hours</h4>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <Form.Group controlId="tradingHours">
                                <Form.Label>Trading Hours</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={tradingHours}
                                    onChange={handleTradingHoursChange}
                                    placeholder="Enter trading hours"
                                />
                            </Form.Group>
                        </div>
                    </div>
                </div>
            </div>

            {/* Currency Selection Section */}
            <div className="currency-selection py-4">
                <h4 className="text-center">Currency</h4>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <Form.Group controlId="currencySelect">
                                <Form.Label>Select Currency</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={currency}
                                    onChange={handleCurrencyChange}
                                >
                                    <option value="USD">USD</option>
                                    <option value="EUR">EUR</option>
                                    <option value="INR">INR</option>
                                    <option value="GBP">GBP</option>
                                </Form.Control>
                            </Form.Group>
                        </div>
                    </div>
                </div>
            </div>

            {/* Data Selection Section */}
            <div className="data-selection py-4">
                <h4 className="text-center">Market Data Selection</h4>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <Button
                                variant="outline-success"
                                className="w-100"
                                onClick={() => handleDataSelection('Price Trends')}
                            >
                                <FaChartLine /> Price Trends
                            </Button>
                        </div>
                        <div className="col-md-4">
                            <Button
                                variant="outline-success"
                                className="w-100"
                                onClick={() => handleDataSelection('Market Volume')}
                            >
                                <FaDollarSign /> Market Volume
                            </Button>
                        </div>
                        <div className="col-md-4">
                            <Button
                                variant="outline-success"
                                className="w-100"
                                onClick={() => handleDataSelection('Trade Transactions')}
                            >
                                <FaRegHandshake /> Trade Transactions
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Selected Data */}
            <div className="selected-data py-4">
                <h4 className="text-center">Selected Data Types</h4>
                <div className="container">
                    <ul className="list-group">
                        {selectedData.length > 0 ? (
                            selectedData.map((data, index) => (
                                <li key={index} className="list-group-item">
                                    {data} <FaCheckCircle className="text-success" />
                                </li>
                            ))
                        ) : (
                            <p>No data selected yet.</p>
                        )}
                    </ul>
                </div>
            </div>

            {/* Chart Section */}
            <div className="chart-section py-4">
                <h4 className="text-center">Market Price Trend Chart</h4>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <Line data={sampleChartData} options={{ responsive: true }} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Settings Modal */}
            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Market Settings</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicText">
                            <Form.Label>Enter Custom Setting</Form.Label>
                            <Form.Control type="text" placeholder="Enter custom settings" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>
                        Close
                    </Button>
                    <Button variant="primary">Save Changes</Button>
                </Modal.Footer>
            </Modal>

            {/* Footer Section */}
            <div className="footer text-center py-4">
                <p className="text-muted">
                    Stay updated with the latest market trends and settings for efficient trading.
                </p>
            </div>
        </div>
    );
};

export default MarketSettings;
