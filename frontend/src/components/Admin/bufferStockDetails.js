import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { FaSearch, FaEdit, FaTrashAlt } from 'react-icons/fa'; // Import Font Awesome Icons

const API_URL = 'http://localhost:9000/api/buffer-stock-details';

const BufferStockDetails = () => {
    const [records, setRecords] = useState([]);
    const [filteredRecords, setFilteredRecords] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [formData, setFormData] = useState({ godown_id: '', district: '', state: '', user_id: '' });
    const [editId, setEditId] = useState(null);

    const nodeRefs = useRef({});

    // Fetch all records
    const fetchRecords = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            setRecords(data);
            setFilteredRecords(data); // Initially, display all records
        } catch (error) {
            console.error('Error fetching records:', error);
        }
    };

    useEffect(() => {
        fetchRecords();
    }, []);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission (Create/Update)
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
                console.error('Error response from server:', errorData);
                alert(`Error: ${errorData.error || 'Unknown error'}`);
                return;
            }
    
            setFormData({ godown_id: '', district: '', state: '', user_id: '' });
            setEditId(null);
            fetchRecords();
        } catch (error) {
            console.error('Error saving record:', error);
            alert('Error saving record. Please check the console for details.');
        }
    };

    // Handle record deletion
    const handleDelete = async (id) => {
        try {
            await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            fetchRecords();
        } catch (error) {
            console.error('Error deleting record:', error);
        }
    };

    // Handle edit record
    const handleEdit = (record) => {
        setEditId(record.id);
        setFormData({
            godown_id: record.godown_id,
            district: record.district,
            state: record.state,
            user_id: record.user_id,
        });
    };
    const handleFilterChange = (e) => {
        setFilterText(e.target.value);
        const filtered = records.filter((record) => {
            return (
                String(record.godown_id).toLowerCase().includes(e.target.value.toLowerCase()) ||
                String(record.district).toLowerCase().includes(e.target.value.toLowerCase()) ||
                String(record.state).toLowerCase().includes(e.target.value.toLowerCase()) ||
                String(record.user_id).toLowerCase().includes(e.target.value.toLowerCase())
            );
        });
        setFilteredRecords(filtered);
    };
    
    return (
        <div className="container my-5">
            <h1 className="text-center mb-4">Buffer Stock Details</h1>

            <form onSubmit={handleSubmit} className="mb-4">
                <div className="row g-3">
                    <div className="col-md-3">
                        <input
                            type="text"
                            name="godown_id"
                            className="form-control"
                            placeholder="Godown ID"
                            value={formData.godown_id}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-3">
                        <input
                            type="text"
                            name="district"
                            className="form-control"
                            placeholder="District"
                            value={formData.district}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-3">
                        <input
                            type="text"
                            name="state"
                            className="form-control"
                            placeholder="State"
                            value={formData.state}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-3">
                        <input
                            type="text"
                            name="user_id"
                            className="form-control"
                            placeholder="User ID"
                            value={formData.user_id}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary mt-3">
                    {editId ? 'Update' : 'Create'} Record
                </button>
            </form>

            {/* Filter input */}
            <div className="mb-4">
                <div className="input-group">
                    <span className="input-group-text">
                        <FaSearch /> {/* Search icon */}
                    </span>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Filter records"
                        value={filterText}
                        onChange={handleFilterChange}
                    />
                </div>
            </div>

            <table className="table table-bordered table-striped">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Godown ID</th>
                        <th>District</th>
                        <th>State</th>
                        <th>User ID</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <TransitionGroup component="tbody">
                    {filteredRecords.map((record) => {
                        if (!nodeRefs.current[record.id]) {
                            nodeRefs.current[record.id] = React.createRef();
                        }
                        return (
                            <CSSTransition
                                key={record.id}
                                nodeRef={nodeRefs.current[record.id]}
                                timeout={500}
                                classNames="fade"
                            >
                                <tr ref={nodeRefs.current[record.id]}>
                                    <td>{record.id}</td>
                                    <td>{record.godown_id}</td>
                                    <td>{record.district}</td>
                                    <td>{record.state}</td>
                                    <td>{record.user_id}</td>
                                    <td>
                                        <button
                                            className="btn btn-warning btn-sm me-2"
                                            onClick={() => handleEdit(record)}
                                        >
                                            <FaEdit /> {/* Edit icon */}
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDelete(record.id)}
                                        >
                                            <FaTrashAlt /> {/* Delete icon */}
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

export default BufferStockDetails;
