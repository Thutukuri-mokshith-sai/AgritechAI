import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { FaEdit, FaTrashAlt, FaSearch } from 'react-icons/fa'; // Adding icons for better interaction

const API_URL = 'http://localhost:9000/api/consumer-behavior-data';

const ConsumerBehaviorData = () => {
    const [records, setRecords] = useState([]);
    const [filteredRecords, setFilteredRecords] = useState([]);
    const [formData, setFormData] = useState({
        Date: '',
        Region_ID: '',
        Preferred_Commodity: '',
        Price_Sensitivity: '',
    });
    const [editId, setEditId] = useState(null);
    const [filterText, setFilterText] = useState('');
    const nodeRefs = useRef({});

    const fetchRecords = async () => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error(`Error fetching records: ${response.statusText}`);
            }
            const data = await response.json();
            setRecords(data);
            setFilteredRecords(data); // Set initial records as filtered records
        } catch (error) {
            console.error(error.message);
            alert('Failed to fetch records. Please try again later.');
        }
    };

    useEffect(() => {
        fetchRecords();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const method = editId ? 'PUT' : 'POST';
            const url = editId ? `${API_URL}/${editId}` : API_URL;

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to save record.');
            }

            setFormData({
                Date: '',
                Region_ID: '',
                Preferred_Commodity: '',
                Price_Sensitivity: '',
            });
            setEditId(null);
            fetchRecords();
        } catch (error) {
            console.error(error.message);
            alert('Error saving record. Please try again later.');
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            if (!response.ok) {
                throw new Error('Failed to delete the record.');
            }
            fetchRecords();
        } catch (error) {
            console.error(error.message);
            alert('Error deleting record. Please try again later.');
        }
    };

    const handleEdit = (record) => {
        setEditId(record.Consumer_ID);
        setFormData({
            Date: record.Date,
            Region_ID: record.Region_ID,
            Preferred_Commodity: record.Preferred_Commodity,
            Price_Sensitivity: record.Price_Sensitivity,
        });
    };

    const handleFilterChange = (e) => {
        const value = e.target.value.toLowerCase();
        setFilterText(value);

        // Filter records based on the value typed in the filter input
        const filtered = records.filter((record) => {
            return (
                String(record.Consumer_ID).toLowerCase().includes(value) ||
                String(record.Date).toLowerCase().includes(value) ||
                String(record.Region_ID).toLowerCase().includes(value) ||
                String(record.Preferred_Commodity).toLowerCase().includes(value) ||
                String(record.Price_Sensitivity).toLowerCase().includes(value)
            );
        });

        setFilteredRecords(filtered);
    };

    return (
        <div className="container my-5">
            <h1 className="text-center mb-4">Consumer Behavior Data</h1>


            {/* Form for Adding/Editing Records */}
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="row g-3">
                    <div className="col-md-3">
                        <input
                            type="date"
                            name="Date"
                            className="form-control"
                            value={formData.Date}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-3">
                        <input
                            type="text"
                            name="Region_ID"
                            className="form-control"
                            placeholder="Region ID"
                            value={formData.Region_ID}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-3">
                        <input
                            type="text"
                            name="Preferred_Commodity"
                            className="form-control"
                            placeholder="Preferred Commodity"
                            value={formData.Preferred_Commodity}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-3">
                        <input
                            type="number"
                            name="Price_Sensitivity"
                            className="form-control"
                            placeholder="Price Sensitivity"
                            value={formData.Price_Sensitivity}
                            onChange={handleChange}
                            required
                            min="0"
                        />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary mt-3">
                    {editId ? 'Update' : 'Create'} Record
                </button>
            </form>
            
            {/* Filter Input */}
            <div className="mb-4">
                <div className="input-group">
                    <span className="input-group-text"><FaSearch /></span>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by Consumer ID, Date, Region, etc."
                        value={filterText}
                        onChange={handleFilterChange}
                    />
                </div>
            </div>
            {/* Records Table */}
            <table className="table table-bordered table-striped">
                <thead className="table-dark">
                    <tr>
                        <th>Consumer ID</th>
                        <th>Date</th>
                        <th>Region ID</th>
                        <th>Preferred Commodity</th>
                        <th>Price Sensitivity</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <TransitionGroup component="tbody">
                    {filteredRecords.map((record) => {
                        if (!nodeRefs.current[record.Consumer_ID]) {
                            nodeRefs.current[record.Consumer_ID] = React.createRef();
                        }
                        return (
                            <CSSTransition
                                key={record.Consumer_ID}
                                nodeRef={nodeRefs.current[record.Consumer_ID]}
                                timeout={500}
                                classNames="fade"
                            >
                                <tr ref={nodeRefs.current[record.Consumer_ID]}>
                                    <td>{record.Consumer_ID}</td>
                                    <td>{record.Date}</td>
                                    <td>{record.Region_ID}</td>
                                    <td>{record.Preferred_Commodity}</td>
                                    <td>{record.Price_Sensitivity}</td>
                                    <td>
                                        <button
                                            className="btn btn-warning btn-sm me-2"
                                            onClick={() => handleEdit(record)}
                                        >
                                            <FaEdit /> Edit
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDelete(record.Consumer_ID)}
                                        >
                                            <FaTrashAlt /> Delete
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

export default ConsumerBehaviorData;
