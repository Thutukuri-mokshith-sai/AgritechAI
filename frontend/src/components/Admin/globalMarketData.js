import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { FaEdit, FaTrash } from 'react-icons/fa';

const API_URL = 'http://localhost:9000/api/globalmarketdata';

const GlobalMarketData = () => {
    const [records, setRecords] = useState([]);
    const [filteredRecords, setFilteredRecords] = useState([]);
    const [formData, setFormData] = useState({
        Commodity_ID: '',
        Date: '',
        Global_Price: '',
        Trade_Policy_Impact: '',
    });
    const [editId, setEditId] = useState(null);
    const [filterText, setFilterText] = useState('');

    const nodeRefs = useRef({});

    const fetchRecords = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            setRecords(data);
            setFilteredRecords(data); // Initially, set filtered records to all records
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
                Commodity_ID: '',
                Date: '',
                Global_Price: '',
                Trade_Policy_Impact: '',
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
        setEditId(record.Commodity_ID);
        setFormData({
            Commodity_ID: record.Commodity_ID,
            Date: record.Date,
            Global_Price: record.Global_Price,
            Trade_Policy_Impact: record.Trade_Policy_Impact,
        });
    };

    const handleFilterChange = (e) => {
        const value = e.target.value;
        setFilterText(value);

        // Filter the records based on the Commodity_ID or Trade_Policy_Impact
        const filtered = records.filter((record) =>
            String(record.Commodity_ID).toLowerCase().includes(value.toLowerCase()) ||
            String(record.Trade_Policy_Impact).toLowerCase().includes(value.toLowerCase())
        );
        setFilteredRecords(filtered);
    };

    return (
        <div className="container my-5">
            <h1 className="text-center mb-4">Global Market Data</h1>

            <form onSubmit={handleSubmit} className="mb-4">
                <div className="row g-3">
                    <div className="col-md-3">
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
                            type="number"
                            step="0.01"
                            name="Global_Price"
                            className="form-control"
                            placeholder="Global Price"
                            value={formData.Global_Price}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-3">
                        <input
                            type="text"
                            name="Trade_Policy_Impact"
                            className="form-control"
                            placeholder="Trade Policy Impact"
                            value={formData.Trade_Policy_Impact}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary mt-3">
                    {editId ? 'Update' : 'Create'} Record
                </button>
            </form>

            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Filter by Commodity ID or Policy Impact"
                    value={filterText}
                    onChange={handleFilterChange}
                />
            </div>

            <div className="mb-2">
                <span>Total Records: {filteredRecords.length}</span>
            </div>

            <table className="table table-bordered table-striped">
                <thead className="table-dark">
                    <tr>
                        <th>Commodity ID</th>
                        <th>Date</th>
                        <th>Global Price</th>
                        <th>Trade Policy Impact</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <TransitionGroup component="tbody">
                    {filteredRecords.map((record) => {
                        if (!nodeRefs.current[record.Commodity_ID]) {
                            nodeRefs.current[record.Commodity_ID] = React.createRef();
                        }
                        return (
                            <CSSTransition
                                key={record.Commodity_ID}
                                nodeRef={nodeRefs.current[record.Commodity_ID]}
                                timeout={500}
                                classNames="fade"
                            >
                                <tr ref={nodeRefs.current[record.Commodity_ID]}>
                                    <td>{record.Commodity_ID}</td>
                                    <td>{record.Date}</td>
                                    <td>{record.Global_Price}</td>
                                    <td>{record.Trade_Policy_Impact}</td>
                                    <td>
                                        <button
                                            className="btn btn-warning btn-sm me-2"
                                            onClick={() => handleEdit(record)}
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDelete(record.Commodity_ID)}
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

export default GlobalMarketData;
