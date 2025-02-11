import React, { useState } from 'react';

const Inventory = () => {
    const [stock, setStock] = useState([
        { commodity: 'Wheat', quantity: 10000 },
        { commodity: 'Rice', quantity: 8500 },
        { commodity: 'Sugar', quantity: 5500 }
    ]);

    const [history, setHistory] = useState([
        { date: '2025-02-10', commodity: 'Wheat', quantity: '+200 Units', price: '$100', updatedBy: 'Admin' },
        { date: '2025-02-09', commodity: 'Sugar', quantity: '+500 Units', price: '$150', updatedBy: 'Staff' },
        { date: '2025-02-08', commodity: 'Rice', quantity: '-200 Units', price: '$120', updatedBy: 'Admin' }
    ]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const commodity = e.target.commodity.value;
        const quantity = e.target.quantity.value;
        const price = e.target.price.value;

        setHistory([...history, { date: new Date().toLocaleDateString(), commodity, quantity: `${quantity} Units`, price, updatedBy: 'Admin' }]);
        setStock(stock.map(item =>
            item.commodity === commodity ? { ...item, quantity: item.quantity + parseInt(quantity) } : item
        ));
    };

    return (
        <div className="container mt-5">
            <h2 className="text-primary mb-4">📦 Inventory Management</h2>
            <p>Monitor and manage your stock efficiently. Below are your current stock levels, stock history, and more.</p>

            {/* Add New Inventory Button */}
            <a href="#" className="btn btn-success mb-3">Add New Inventory</a>

            {/* Current Stock Levels */}
            <div className="card mb-4">
                <div className="card-header">
                    <h5>Current Stock Levels</h5>
                </div>
                <div className="card-body">
                    <ul className="list-group">
                        {stock.map((item, index) => (
                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                <strong>{item.commodity}</strong>
                                <span className="badge badge-primary badge-pill">{item.quantity} Units</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Update Stock Form */}
            <div className="card mb-4">
                <div className="card-header">
                    <h5>Update Stock</h5>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="commodity">Commodity Name</label>
                            <input type="text" className="form-control" id="commodity" placeholder="Enter Commodity Name" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="quantity">Quantity</label>
                            <input type="number" className="form-control" id="quantity" placeholder="Enter Quantity" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="price">Unit Price</label>
                            <input type="text" className="form-control" id="price" placeholder="Enter Unit Price" required />
                        </div>
                        <button type="submit" className="btn btn-primary">Update Stock</button>
                    </form>
                </div>
            </div>

            {/* Inventory Update History */}
            <div className="card mb-4">
                <div className="card-header">
                    <h5>Inventory Update History</h5>
                </div>
                <div className="card-body">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Date</th>
                                <th scope="col">Commodity</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Price</th>
                                <th scope="col">Updated By</th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.map((entry, index) => (
                                <tr key={index}>
                                    <td>{entry.date}</td>
                                    <td>{entry.commodity}</td>
                                    <td>{entry.quantity}</td>
                                    <td>{entry.price}</td>
                                    <td>{entry.updatedBy}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Notifications Section */}
            <div className="card mb-4">
                <div className="card-header">
                    <h5>Notifications & Alerts</h5>
                </div>
                <div className="card-body">
                    <ul className="list-group">
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            <strong>Wheat</strong> stock is running low!
                            <span className="badge badge-danger badge-pill">5% remaining</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            <strong>Sugar</strong> stock is sufficient.
                            <span className="badge badge-success badge-pill">OK</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Generate Reports */}
            <div className="card mb-4">
                <div className="card-header">
                    <h5>Generate Inventory Reports</h5>
                </div>
                <div className="card-body">
                    <button className="btn btn-info">Generate Stock Usage Report</button>
                    <button className="btn btn-info">Generate Restock Recommendation</button>
                </div>
            </div>
        </div>
    );
};

export default Inventory;
