import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const MarketIntelligence = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [customInsights, setCustomInsights] = useState([]);

    const insights = [
        { id: 1, title: "📈 Rising Commodity Prices", description: "Global demand increases lead to higher market rates." },
        { id: 2, title: "📊 Inflation Impact", description: "Economic inflation affects production and supply chains." },
        { id: 3, title: "🌍 International Trade", description: "New tariffs affect import-export balance worldwide." },
        { id: 4, title: "💰 Investment Trends", description: "Smart investors are shifting towards sustainable markets." },
        { id: 5, title: "⚡ Technology in Markets", description: "AI-driven stock predictions gain momentum in financial markets." }
    ];

    const marketNews = [
        "🌟 Gold prices surge amid global uncertainty.",
        "📢 Stock market hits record highs in Q3.",
        "🚜 Agricultural exports reach new milestones.",
        "🔍 Crypto market sees major volatility this week."
    ];

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleAddInsight = () => {
        const newInsight = prompt("Enter your custom market insight:");
        if (newInsight) {
            setCustomInsights([...customInsights, { id: insights.length + customInsights.length + 1, title: "🔹 User Insight", description: newInsight }]);
        }
    };

    const filteredInsights = insights.filter((insight) =>
        insight.title.toUpperCase().includes(searchValue.toUpperCase())
    );

    return (
        <div className={`container p-4 ${isDarkMode ? "bg-dark text-white" : "bg-light text-dark"}`} style={{ minHeight: "100vh" }}>
            {/* Header */}
            <header className="d-flex justify-content-between align-items-center p-3 bg-gradient bg-success text-white rounded shadow">
                <h3>📊 Market Intelligence Dashboard</h3>
                
            </header>

            {/* Market News Ticker */}
            <div className="card mt-3 shadow">
                <div className="card-body">
                    <h5 className="card-title">📢 Market Trends</h5>
                    <marquee className="fw-bold text-danger">{marketNews.join(" | ")}</marquee>
                </div>
            </div>

            {/* Search Box */}
            <div className="card mt-3 shadow">
                <div className="card-body">
                    <h5 className="card-title">🔍 Search Market Insights</h5>
                    <input
                        type="text"
                        value={searchValue}
                        onChange={handleSearchChange}
                        className="form-control border-success"
                        placeholder="Search insights..."
                    />
                </div>
            </div>

            {/* Market Insights Section */}
            <div className="card mt-4 shadow">
                <div className="card-body">
                    <h5 className="card-title">📊 Market Insights & Analysis</h5>
                    <div className="row">
                        {filteredInsights.concat(customInsights).map((insight) => (
                            <div key={insight.id} className="col-md-6 mb-3">
                                <div className="card border-info shadow-lg">
                                    <div className="card-header bg-info text-white fw-bold">
                                        {insight.title}
                                    </div>
                                    <div className="card-body">
                                        <p>{insight.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button onClick={handleAddInsight} className="btn btn-outline-primary mt-3 fw-bold">
                        ➕ Add Custom Insight
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MarketIntelligence;
