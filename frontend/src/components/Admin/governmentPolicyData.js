import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { FaSearch, FaEdit, FaTrashAlt } from 'react-icons/fa'; // Import React Icons

const API_URL = 'http://localhost:9000/api/governmentpolicydata';

const GovernmentPolicyData = () => {
    const [records, setRecords] = useState([]);
    const [formData, setFormData] = useState({
        Policy_ID: '',
        Commodity_ID: '',
        Effective_Date: '',
        Policy_Type: '',
        Policy_Description: '',
    });
    const [editId, setEditId] = useState(null);
    const [filteredRecords, setFilteredRecords] = useState([]);
    const nodeRefs = useRef({});

    const fetchRecords = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            setRecords(data);
            setFilteredRecords(data); // Set the initial filtered records
        } catch (error) {
            console.error('Error fetching records:', error);
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
                alert(`Error: ${errorData.error || 'Unknown error'}`);
                return;
            }

            setFormData({
                Policy_ID: '',
                Commodity_ID: '',
                Effective_Date: '',
                Policy_Type: '',
                Policy_Description: '',
            });
            setEditId(null);
            fetchRecords();
        } catch (error) {
            console.error('Error saving record:', error);
            alert('Error saving record.');
        }
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            fetchRecords();
        } catch (error) {
            console.error('Error deleting record:', error);
        }
    };

    const handleEdit = (record) => {
        setEditId(record.Policy_ID);
        setFormData({
            Policy_ID: record.Policy_ID,
            Commodity_ID: record.Commodity_ID,
            Effective_Date: record.Effective_Date,
            Policy_Type: record.Policy_Type,
            Policy_Description: record.Policy_Description,
        });
    };

    const handleSearch = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filtered = records.filter((record) => {
            return (
                String(record.Policy_ID).toLowerCase().includes(searchTerm) ||
                String(record.Commodity_ID).toLowerCase().includes(searchTerm) ||
                String(record.Effective_Date).includes(searchTerm) ||
                String(record.Policy_Type).toLowerCase().includes(searchTerm) ||
                String(record.Policy_Description).toLowerCase().includes(searchTerm)
            );
        });
        setFilteredRecords(filtered);
    };

    return (
        <div className="container my-5">
            <h1 className="text-center mb-4">Government Policy Data</h1>


            <form onSubmit={handleSubmit} className="mb-4">
                <div className="row g-3">
                    <div className="col-md-2">
                        <input
                            type="text"
                            name="Policy_ID"
                            className="form-control"
                            placeholder="Policy ID"
                            value={formData.Policy_ID}
                            onChange={handleChange}
                            required
                        />
                    </div>
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
                            name="Effective_Date"
                            className="form-control"
                            value={formData.Effective_Date}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-3">
                        <input
                            type="text"
                            name="Policy_Type"
                            className="form-control"
                            placeholder="Policy Type"
                            value={formData.Policy_Type}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-3">
                        <input
                            type="text"
                            name="Policy_Description"
                            className="form-control"
                            placeholder="Policy Description"
                            value={formData.Policy_Description}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary mt-3">
                    {editId ? 'Update' : 'Create'} Policy
                </button>
            </form>
            
            {/* Search Bar with React Icon */}
            <div className="mb-4 d-flex justify-content-between">
                <div className="input-group w-25">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search"
                        onChange={handleSearch}
                    />
                    <span className="input-group-text">
                        <FaSearch />
                    </span>
                </div>
                <span>Total Entries: {filteredRecords.length}</span> {/* Display the total number of filtered records */}
            </div>
            <table className="table table-bordered table-striped">
                <thead className="table-dark">
                    <tr>
                        <th>Policy ID</th>
                        <th>Commodity ID</th>
                        <th>Effective Date</th>
                        <th>Policy Type</th>
                        <th>Policy Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <TransitionGroup component="tbody">
                    {filteredRecords.map((record) => {
                        if (!nodeRefs.current[record.Policy_ID]) {
                            nodeRefs.current[record.Policy_ID] = React.createRef();
                        }
                        return (
                            <CSSTransition
                                key={record.Policy_ID}
                                nodeRef={nodeRefs.current[record.Policy_ID]}
                                timeout={500}
                                classNames="fade"
                            >
                                <tr ref={nodeRefs.current[record.Policy_ID]}>
                                    <td>{record.Policy_ID}</td>
                                    <td>{record.Commodity_ID}</td>
                                    <td>{record.Effective_Date}</td>
                                    <td>{record.Policy_Type}</td>
                                    <td>{record.Policy_Description}</td>
                                    <td>
                                        <button
                                            className="btn btn-warning btn-sm me-2"
                                            onClick={() => handleEdit(record)}
                                        >
                                            <FaEdit /> Edit
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDelete(record.Policy_ID)}
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

export default GovernmentPolicyData;
