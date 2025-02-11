import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const MarketPolicies = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [customNews, setCustomNews] = useState([]);
    const [upvotes, setUpvotes] = useState({});

    const policies = [
        { id: 1, name: "PM-KISAN Scheme", description: "Direct income support to farmers to boost their earnings and reduce distress.", color: "primary" },
        { id: 2, name: "Minimum Support Price (MSP)", description: "Ensuring fair prices for farmers by setting a minimum price for essential commodities.", color: "success" },
        { id: 3, name: "National Agriculture Market (eNAM)", description: "A pan-India electronic trading platform for agricultural commodities to facilitate easy access to markets.", color: "warning" },
        { id: 4, name: "Rashtriya Krishi Vikas Yojana (RKVY)", description: "A scheme that encourages states to increase public investment in agriculture and its allied sectors.", color: "danger" },
        { id: 5, name: "Agri Infrastructure Fund", description: "Financing for post-harvest infrastructure like cold storage and warehouses to ensure better commodity handling.", color: "info" },
    ];

    const marketNews = [
        "🌾 Agricultural commodity prices surge due to changing weather conditions.",
        "📢 Government announces subsidy increase for organic farming.",
        "🚜 Farmers gain access to new digital marketplaces with AI-driven pricing.",
        "🔍 Study reveals 20% increase in farmers' income with smart irrigation.",
    ];

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleUpvote = (id) => {
        setUpvotes({
            ...upvotes,
            [id]: (upvotes[id] || 0) + 1
        });
    };

    const handleAddNews = () => {
        const newNews = prompt("Enter your custom news:");
        if (newNews) {
            setCustomNews([...customNews, newNews]);
        }
    };

    const filteredPolicies = policies.filter((policy) =>
        policy.name.toUpperCase().includes(searchValue.toUpperCase())
    );

    return (
        <div className={`container p-4 ${isDarkMode ? "bg-dark text-white" : "bg-light text-dark"}`} style={{ minHeight: "100vh" }}>
            {/* Header Section */}
            <header className="d-flex justify-content-between align-items-center p-3 bg-gradient bg-primary text-white rounded shadow">
                <h3>🌍 Commodity Market News & Policies</h3>
                
            </header>

            {/* Search Box */}
            <div className="card mt-3 shadow">
                <div className="card-body">
                    <h5 className="card-title">🔍 Search Market Policies</h5>
                    <input
                        type="text"
                        value={searchValue}
                        onChange={handleSearchChange}
                        className="form-control border-primary"
                        placeholder="Search policies..."
                    />
                </div>
            </div>

            {/* News Section with Bootstrap Carousel */}
            <div className="card mt-4 shadow">
                <div className="card-body">
                    <h5 className="card-title">📢 Latest Market News</h5>
                    <div id="marketNewsCarousel" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner">
                            {marketNews.map((news, index) => (
                                <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                                    <div className="alert alert-info p-3 text-dark fw-bold">{news}</div>
                                </div>
                            ))}
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#marketNewsCarousel" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon bg-dark rounded-circle" aria-hidden="true"></span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#marketNewsCarousel" data-bs-slide="next">
                            <span className="carousel-control-next-icon bg-dark rounded-circle" aria-hidden="true"></span>
                        </button>
                    </div>
                    <button onClick={handleAddNews} className="btn btn-outline-primary mt-3 fw-bold">
                        ➕ Add Custom News
                    </button>
                    <div className="mt-3">
                        {customNews.map((news, index) => (
                            <div key={index} className="alert alert-warning fw-bold">🔹 {news}</div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Market Policies Section */}
            <div className="card mt-4 shadow">
                <div className="card-body">
                    <h5 className="card-title">📜 Market Policies for Agriculture</h5>
                    <div className="row">
                        {filteredPolicies.map((policy) => (
                            <div key={policy.id} className="col-md-6 mb-3">
                                <div className={`card border-${policy.color} shadow-lg`}>
                                    <div className={`card-header bg-${policy.color} text-white fw-bold`}>
                                        {policy.name}
                                    </div>
                                    <div className="card-body">
                                        <p>{policy.description}</p>
                                        <button
                                            className="btn btn-outline-success btn-sm"
                                            onClick={() => handleUpvote(policy.id)}
                                        >
                                            👍 Upvote ({upvotes[policy.id] || 0})
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarketPolicies;
