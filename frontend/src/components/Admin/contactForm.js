import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { FaEdit, FaTrashAlt, FaSearch } from 'react-icons/fa'; // Adding icons for better interaction

const API_URL = 'http://localhost:9000/api/contact-form'; // Update API endpoint

const ContactFormManager = () => {
    const [records, setRecords] = useState([]);
    const [filteredRecords, setFilteredRecords] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [editId, setEditId] = useState(null);
    const [filterText, setFilterText] = useState('');
    const nodeRefs = useRef({});

    const fetchRecords = async () => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error('Error fetching data');
            const data = await response.json();
            setRecords(data);
            setFilteredRecords(data); // Set initial records as filtered records
        } catch (error) {
            console.error('Error fetching records:', error);
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
                console.error('Error response from server:', errorData);
                alert(`Error: ${errorData.error || 'Unknown error'}`);
                return;
            }

            setFormData({ name: '', email: '', message: '' });
            setEditId(null);
            fetchRecords();
        } catch (error) {
            console.error('Error saving record:', error);
            alert('Error saving record. Please check the console for details.');
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            if (!response.ok) throw new Error('Failed to delete record');
            fetchRecords();
        } catch (error) {
            console.error('Error deleting record:', error);
            alert('Failed to delete record. Please try again later.');
        }
    };

    const handleEdit = (record) => {
        setEditId(record.id);
        setFormData({
            name: record.name,
            email: record.email,
            message: record.message,
        });
    };

    const handleFilterChange = (e) => {
        const value = e.target.value.toLowerCase();
        setFilterText(value);

        // Filter records based on the value typed in the filter input
        const filtered = records.filter((record) => {
            return (
                String(record.id).toLowerCase().includes(value) ||
                record.name.toLowerCase().includes(value) ||
                record.email.toLowerCase().includes(value) ||
                record.message.toLowerCase().includes(value)
            );
        });

        setFilteredRecords(filtered);
    };

    return (
        <div className="container my-5">
            <h1 className="text-center mb-4">Contact Form Manager</h1>

            {/* Form for Adding/Editing Records */}
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="row g-3">
                    <div className="col-md-4">
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-4">
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-4">
                        <textarea
                            name="message"
                            className="form-control"
                            placeholder="Message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary mt-3">
                    {editId ? 'Update' : 'Create'} Entry
                </button>
            </form>

            {/* Filter Input */}
            <div className="mb-4">
                <div className="input-group">
                    <span className="input-group-text"><FaSearch /></span>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by ID, Name, Email, Message"
                        value={filterText}
                        onChange={handleFilterChange}
                    />
                </div>
            </div>

            {/* Records Table */}
            <table className="table table-bordered table-striped">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Message</th>
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
                                    <td>{record.name}</td>
                                    <td>{record.email}</td>
                                    <td>{record.message}</td>
                                    <td>
                                        <button
                                            className="btn btn-warning btn-sm me-2"
                                            onClick={() => handleEdit(record)}
                                        >
                                            <FaEdit /> Edit
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDelete(record.id)}
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

export default ContactFormManager;
