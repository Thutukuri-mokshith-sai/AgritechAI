import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Modal, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import { FaChartLine, FaRegHandshake, FaSeedling, FaBullhorn, FaCheck } from 'react-icons/fa';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary components for the line chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

// Sample data for charts (replace with actual data from an API or database)
const priceData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'Wheat Prices (USD)',
            data: [220, 230, 240, 250, 245, 260, 275],
            fill: false,
            borderColor: '#36a2eb',
            tension: 0.1,
        },
        {
            label: 'Rice Prices (USD)',
            data: [150, 160, 170, 165, 180, 190, 210],
            fill: false,
            borderColor: '#ff6347',
            tension: 0.1,
        },
    ],
};

const MarketTrade = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedOpportunities, setSelectedOpportunities] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState('Global');

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    const handleSelectOpportunity = (opportunity) => {
        setSelectedOpportunities((prevState) => [...prevState, opportunity]);
    };

    const handleRegionChange = (region) => {
        setSelectedRegion(region);
    };

    return (
        <div className="markettrade-container">
            {/* Header Section */}
            <div className="markettrade-header text-center py-4">
                <h2 className="fw-bold">Agricultural Market Trading Opportunities</h2>
                <p className="lead">
                    Discover the latest market trends, trading activities, and investment opportunities in the agricultural
                    sector. Make informed decisions with real-time data and expert insights.
                </p>
            </div>

            {/* Region Selector */}
            <div className="region-selector text-center py-3">
                <h4>Select Region</h4>
                <DropdownButton
                    variant="outline-primary"
                    id="region-dropdown"
                    title={selectedRegion}
                    onSelect={handleRegionChange}
                >
                    <Dropdown.Item eventKey="Global">Global</Dropdown.Item>
                    <Dropdown.Item eventKey="Asia">Asia</Dropdown.Item>
                    <Dropdown.Item eventKey="Europe">Europe</Dropdown.Item>
                    <Dropdown.Item eventKey="North America">North America</Dropdown.Item>
                    <Dropdown.Item eventKey="South America">South America</Dropdown.Item>
                </DropdownButton>
            </div>

            {/* Chart Section */}
            <div className="chart-section py-4">
                <h4 className="text-center">Agricultural Price Trends</h4>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <Line data={priceData} options={{ responsive: true }} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Latest Market News */}
            <div className="latest-news py-4">
                <h4 className="text-center">Latest Agricultural Market News</h4>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="news-card p-4 border rounded-3">
                                <h5>Global Grain Trade Shifts</h5>
                                <p>The grain market is undergoing significant shifts, with new trade agreements...</p>
                                <Button variant="primary" onClick={handleShowModal}>
                                    Read More
                                </Button>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="news-card p-4 border rounded-3">
                                <h5>Sustainability in Agri-Farming</h5>
                                <p>Growing concern over sustainability is shaping new trends in farming practices...</p>
                                <Button variant="primary" onClick={handleShowModal}>
                                    Read More
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Investment Opportunities */}
            <div className="investment-opportunities py-4">
                <h4 className="text-center">Top Agricultural Market Investment Opportunities</h4>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="investment-card p-4 border rounded-3">
                                <h5><FaSeedling /> Urban Farming</h5>
                                <p>Investing in vertical farming and urban agriculture to support local food supply.</p>
                                <Button
                                    variant="success"
                                    onClick={() => handleSelectOpportunity('Urban Farming')}
                                >
                                    Select Opportunity
                                </Button>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="investment-card p-4 border rounded-3">
                                <h5><FaChartLine /> Agri-Tech Solutions</h5>
                                <p>Exploring innovations in agricultural technology, including precision farming.</p>
                                <Button
                                    variant="success"
                                    onClick={() => handleSelectOpportunity('Agri-Tech Solutions')}
                                >
                                    Select Opportunity
                                </Button>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="investment-card p-4 border rounded-3">
                                <h5><FaRegHandshake /> Agricultural Commodities Trading</h5>
                                <p>Engage in global trade of agricultural commodities like wheat, rice, and coffee.</p>
                                <Button
                                    variant="success"
                                    onClick={() => handleSelectOpportunity('Agri-Commodities Trading')}
                                >
                                    Select Opportunity
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Selected Opportunities */}
            <div className="selected-opportunities py-4">
                <h4 className="text-center">Selected Investment Opportunities</h4>
                <div className="container">
                    <ul className="list-group">
                        {selectedOpportunities.length > 0 ? (
                            selectedOpportunities.map((opportunity, index) => (
                                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                    {opportunity}
                                    <FaCheck />
                                </li>
                            ))
                        ) : (
                            <p>No opportunities selected yet.</p>
                        )}
                    </ul>
                </div>
            </div>

            {/* Modal for Latest News */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Full News Article</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>This is where you can read the full article about the agricultural market news. Provide all the detailed insights here...</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Footer Section */}
            <div className="footer text-center py-4">
                <p className="text-muted">
                    Stay ahead in the agricultural market. Join us and explore more investment opportunities.
                </p>
                <Button variant="primary">Get Started</Button>
            </div>
        </div>
    );
};

export default MarketTrade;
