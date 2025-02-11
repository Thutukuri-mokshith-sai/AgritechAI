import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { FaSearch, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import Plot from 'react-plotly.js'; // Import Plotly component

const API_URL = 'http://localhost:9000/api/importexportdata';

const ImportExportData = () => {
    const [records, setRecords] = useState([]);
    const [filteredRecords, setFilteredRecords] = useState([]);
    const [formData, setFormData] = useState({
        Commodity_ID: '',
        Date: '',
        Import_Quantity: '',
        Export_Quantity: '',
        Tariff_Rate: '',
    });
    const [editKey, setEditKey] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [entriesCount, setEntriesCount] = useState(5);

    const nodeRefs = useRef({});

    const fetchRecords = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            setRecords(data);
            setFilteredRecords(data.slice(0, entriesCount)); // Set filtered records based on entries count
        } catch (error) {
            console.error('Error fetching records:', error);
        }
    };

    useEffect(() => {
        fetchRecords();
    }, [entriesCount]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const method = editKey ? 'PUT' : 'POST';
            const url = editKey
                ? `${API_URL}/${formData.Commodity_ID}/${formData.Date}`
                : API_URL;

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert(`Error: ${errorData.error || 'Unknown error'}`);
                return;
            }

            setFormData({
                Commodity_ID: '',
                Date: '',
                Import_Quantity: '',
                Export_Quantity: '',
                Tariff_Rate: '',
            });
            setEditKey(null);
            fetchRecords();
        } catch (error) {
            console.error('Error saving record:', error);
            alert('Error saving record.');
        }
    };

    const handleDelete = async (Commodity_ID, Date) => {
        try {
            await fetch(`${API_URL}/${Commodity_ID}/${Date}`, { method: 'DELETE' });
            fetchRecords();
        } catch (error) {
            console.error('Error deleting record:', error);
        }
    };

    const handleEdit = (record) => {
        setEditKey(`${record.Commodity_ID}-${record.Date}`);
        setFormData(record);
    };

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        const filtered = records.filter((record) =>
            record.Commodity_ID &&
            record.Commodity_ID.toString().toLowerCase().includes(query)
        );
        setFilteredRecords(filtered);
    };

    const handleEntriesCount = (e) => {
        setEntriesCount(parseInt(e.target.value));
    };

    // Prepare data for 3D plots
    const importQuantities = filteredRecords.map(record => record.Import_Quantity);
    const exportQuantities = filteredRecords.map(record => record.Export_Quantity);
    const tariffRates = filteredRecords.map(record => record.Tariff_Rate);

    return (
        <div className="container my-5">
            <h1 className="text-center mb-4">Import/Export Data</h1>

            <form onSubmit={handleSubmit} className="mb-4">
                <div className="row g-3">
                    <div className="col-md-2">
                        <input
                            type="text"
                            name="Commodity_ID"
                            className="form-control"
                            placeholder="Commodity ID"
                            value={formData.Commodity_ID}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-2">
                        <input
                            type="date"
                            name="Date"
                            className="form-control"
                            value={formData.Date}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-2">
                        <input
                            type="number"
                            name="Import_Quantity"
                            className="form-control"
                            placeholder="Import Quantity"
                            value={formData.Import_Quantity}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-2">
                        <input
                            type="number"
                            name="Export_Quantity"
                            className="form-control"
                            placeholder="Export Quantity"
                            value={formData.Export_Quantity}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-2">
                        <input
                            type="number"
                            name="Tariff_Rate"
                            className="form-control"
                            placeholder="Tariff Rate"
                            value={formData.Tariff_Rate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary mt-3">
                    {editKey ? 'Update' : 'Create'} Entry
                </button>
            </form>

            <div className="mb-4">
                <div className="row">
                    <div className="col-md-4">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by Commodity ID"
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                    </div>
                    <div className="col-md-4">
                        <select
                            className="form-select"
                            value={entriesCount}
                            onChange={handleEntriesCount}
                        >
                            <option value={5}>5 Entries</option>
                            <option value={10}>10 Entries</option>
                            <option value={15}>15 Entries</option>
                            <option value={20}>20 Entries</option>
                        </select>
                    </div>
                </div>
            </div>

{/* 3D Plots */}
<div className="container">
    <div className="row">
        {/* First Plot */}
        <div className="col-md-6 mb-4">
            <Plot
                data={[
                    {
                        x: importQuantities,
                        y: exportQuantities,
                        z: tariffRates,
                        mode: 'markers',
                        type: 'scatter3d',
                        marker: {
                            size: 8,
                            color: 'rgb(255, 99, 132)', // Vibrant red color for interactivity
                            opacity: 0.8,
                        },
                    },
                ]}
                layout={{
                    title: '3D Plot of Import vs Export vs Tariff Rate',
                    scene: {
                        xaxis: { title: 'Import Quantity' },
                        yaxis: { title: 'Export Quantity' },
                        zaxis: { title: 'Tariff Rate' },
                    },
                    paper_bgcolor: '#f8f9fa', // Light background color
                }}
            />
        </div>

        {/* Second Plot */}
        <div className="col-md-6 mb-4">
            <Plot
                data={[
                    {
                        x: importQuantities,
                        y: exportQuantities,
                        z: tariffRates,
                        mode: 'markers',
                        type: 'scatter3d',
                        marker: {
                            color: 'rgb(23, 190, 207)', // Original blue color
                            size: 8,
                            opacity: 0.8,
                        },
                    },
                ]}
                layout={{
                    title: '3D Visualization of Data',
                    scene: {
                        xaxis: { title: 'Import Quantity' },
                        yaxis: { title: 'Export Quantity' },
                        zaxis: { title: 'Tariff Rate' },
                    },
                    paper_bgcolor: '#f8f9fa', // Light background color for consistency
                }}
            />
        </div>
    </div>
</div>

            {/* Table of Records */}
            <table className="table table-bordered table-striped">
                <thead className="table-dark">
                    <tr>
                        <th>Commodity ID</th>
                        <th>Date</th>
                        <th>Import Quantity</th>
                        <th>Export Quantity</th>
                        <th>Tariff Rate</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <TransitionGroup component="tbody">
                    {filteredRecords.map((record) => {
                        const recordKey = `${record.Commodity_ID}-${record.Date}`;
                        if (!nodeRefs.current[recordKey]) {
                            nodeRefs.current[recordKey] = React.createRef();
                        }
                        return (
                            <CSSTransition
                                key={recordKey}
                                nodeRef={nodeRefs.current[recordKey]}
                                timeout={500}
                                classNames="fade"
                            >
                                <tr ref={nodeRefs.current[recordKey]}>
                                    <td>{record.Commodity_ID}</td>
                                    <td>{record.Date}</td>
                                    <td>{record.Import_Quantity}</td>
                                    <td>{record.Export_Quantity}</td>
                                    <td>{record.Tariff_Rate}</td>
                                    <td>
                                        <button
                                            className="btn btn-warning btn-sm me-2"
                                            onClick={() => handleEdit(record)}
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() =>
                                                handleDelete(record.Commodity_ID, record.Date)
                                            }
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            </CSSTransition>
                        );
                    })}
                </TransitionGroup>
            </table>
        </div>
    );
};

export default ImportExportData;
