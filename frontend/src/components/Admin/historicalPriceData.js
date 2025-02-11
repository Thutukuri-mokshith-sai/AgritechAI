import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; // Import FontAwesome icons

const API_URL = 'http://localhost:9000/api/historicalpricedata';

const HistoricalPriceData = () => {
    const [records, setRecords] = useState([]);
    const [filteredRecords, setFilteredRecords] = useState([]);
    const [formData, setFormData] = useState({
        Commodity_ID: '',
        Date: '',
        Region_ID: '',
        Retail_Price: '',
        Wholesale_Price: '',
    });
    const [editKey, setEditKey] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const nodeRefs = useRef({});

    const fetchRecords = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            setRecords(data);
            setFilteredRecords(data);
        } catch (error) {
            console.error('Error fetching records:', error);
        }
    };

    useEffect(() => {
        fetchRecords();
    }, []);

    useEffect(() => {
        // Filter records based on search query
        const filtered = records.filter(record =>
            Object.values(record).some(val =>
                String(val).toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
        setFilteredRecords(filtered);
    }, [searchQuery, records]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const method = editKey ? 'PUT' : 'POST';
            const url = editKey
                ? `${API_URL}/${formData.Commodity_ID}/${formData.Date}/${formData.Region_ID}`
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
                Region_ID: '',
                Retail_Price: '',
                Wholesale_Price: '',
            });
            setEditKey(null);
            fetchRecords();
        } catch (error) {
            console.error('Error saving record:', error);
            alert('Error saving record.');
        }
    };

    const handleDelete = async (Commodity_ID, Date, Region_ID) => {
        try {
            await fetch(`${API_URL}/${Commodity_ID}/${Date}/${Region_ID}`, { method: 'DELETE' });
            fetchRecords();
        } catch (error) {
            console.error('Error deleting record:', error);
        }
    };

    const handleEdit = (record) => {
        setEditKey(`${record.Commodity_ID}-${record.Date}-${record.Region_ID}`);
        setFormData(record);
    };

    return (
        <div className="container my-5">
            <h1 className="text-center mb-4">Historical Price Data</h1>


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
                            type="number"
                            name="Retail_Price"
                            className="form-control"
                            placeholder="Retail Price"
                            value={formData.Retail_Price}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-3">
                        <input
                            type="number"
                            name="Wholesale_Price"
                            className="form-control"
                            placeholder="Wholesale Price"
                            value={formData.Wholesale_Price}
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
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by any field"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <span><strong>No. of Entries:</strong> {filteredRecords.length}</span>
            </div>
            <table className="table table-bordered table-striped">
                <thead className="table-dark">
                    <tr>
                        <th>Commodity ID</th>
                        <th>Date</th>
                        <th>Region ID</th>
                        <th>Retail Price</th>
                        <th>Wholesale Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <TransitionGroup component="tbody">
                    {filteredRecords.map((record) => {
                        const recordKey = `${record.Commodity_ID}-${record.Date}-${record.Region_ID}`;
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
                                    <td>{record.Region_ID}</td>
                                    <td>{record.Retail_Price}</td>
                                    <td>{record.Wholesale_Price}</td>
                                    <td>
                                        <button
                                            className="btn btn-warning btn-sm me-2"
                                            onClick={() => handleEdit(record)}
                                        >
                                            <FaEdit /> Edit
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() =>
                                                handleDelete(record.Commodity_ID, record.Date, record.Region_ID)
                                            }
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

export default HistoricalPriceData;
