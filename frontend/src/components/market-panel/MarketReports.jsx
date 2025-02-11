import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const MarketReports = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [customReports, setCustomReports] = useState([]);

    const reports = [
        { id: 1, title: "📈 Stock Market Overview", description: "S&P 500 sees a 1.5% increase, tech stocks rally." },
        { id: 2, title: "📊 Commodity Performance", description: "Gold prices stabilize, oil sees a slight decline." },
        { id: 3, title: "🏦 Banking Sector", description: "Interest rates remain steady, boosting investor confidence." },
        { id: 4, title: "🚀 Tech Industry Growth", description: "AI-driven companies see a 12% rise in stock value." },
        { id: 5, title: "🌍 Global Market Trends", description: "Emerging markets show resilience amid economic shifts." }
    ];

    const marketNews = [
        "📢 Dow Jones hits all-time high!",
        "🌟 Crypto market sees major fluctuations.",
        "🚜 Agricultural exports boost GDP growth.",
        "💰 Investment in renewable energy increases by 30%."
    ];

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleAddReport = () => {
        const newReport = prompt("Enter your custom market performance report:");
        if (newReport) {
            setCustomReports([...customReports, { id: reports.length + customReports.length + 1, title: "🔹 User Report", description: newReport }]);
        }
    };

    const filteredReports = reports.filter((report) =>
        report.title.toUpperCase().includes(searchValue.toUpperCase())
    );

    return (
        <div className={`container p-4 ${isDarkMode ? "bg-dark text-white" : "bg-light text-dark"}`} style={{ minHeight: "100vh" }}>
            {/* Header */}
            <header className="d-flex justify-content-between align-items-center p-3 bg-gradient bg-primary text-white rounded shadow">
                <h3>📊 Market Performance Reports & Analytics</h3>
                <button className="btn btn-warning fw-bold shadow" onClick={toggleDarkMode}>
                    {isDarkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
                </button>
            </header>

            {/* Market News Ticker */}
            <div className="card mt-3 shadow">
                <div className="card-body">
                    <h5 className="card-title">📢 Latest Market News</h5>
                    <marquee className="fw-bold text-danger">{marketNews.join(" | ")}</marquee>
                </div>
            </div>

            {/* Search Box */}
            <div className="card mt-3 shadow">
                <div className="card-body">
                    <h5 className="card-title">🔍 Search Market Reports</h5>
                    <input
                        type="text"
                        value={searchValue}
                        onChange={handleSearchChange}
                        className="form-control border-primary"
                        placeholder="Search reports..."
                    />
                </div>
            </div>

            {/* Market Reports Section */}
            <div className="card mt-4 shadow">
                <div className="card-body">
                    <h5 className="card-title">📊 Market Reports & Analysis</h5>
                    <div className="row">
                        {filteredReports.concat(customReports).map((report) => (
                            <div key={report.id} className="col-md-6 mb-3">
                                <div className="card border-success shadow-lg">
                                    <div className="card-header bg-success text-white fw-bold">
                                        {report.title}
                                    </div>
                                    <div className="card-body">
                                        <p>{report.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button onClick={handleAddReport} className="btn btn-outline-primary mt-3 fw-bold">
                        ➕ Add Custom Report
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MarketReports;
