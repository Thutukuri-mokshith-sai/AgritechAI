import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { FaEdit, FaTrashAlt, FaSearch } from 'react-icons/fa'; // Importing icons

const API_URL = 'http://localhost:9000/api/crop-production-data';

const CropProductionData = () => {
    const [records, setRecords] = useState([]);
    const [formData, setFormData] = useState({
        Crop_ID: '',
        Region_ID: '',
        Sowing_Date: '',
        Harvest_Date: '',
        Yield_Per_Hectare: '',
        Total_Production: '',
    });
    const [editId, setEditId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const nodeRefs = useRef({});

    const fetchRecords = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            setRecords(data);
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
                console.error('Error response from server:', errorData);
                alert(`Error: ${errorData.error || 'Unknown error'}`);
                return;
            }

            setFormData({
                Crop_ID: '',
                Region_ID: '',
                Sowing_Date: '',
                Harvest_Date: '',
                Yield_Per_Hectare: '',
                Total_Production: '',
            });
            setEditId(null);
            fetchRecords();
        } catch (error) {
            console.error('Error saving record:', error);
            alert('Error saving record. Please check the console for details.');
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
        setEditId(record.Crop_ID);
        setFormData({
            Crop_ID: record.Crop_ID,
            Region_ID: record.Region_ID,
            Sowing_Date: record.Sowing_Date,
            Harvest_Date: record.Harvest_Date,
            Yield_Per_Hectare: record.Yield_Per_Hectare,
            Total_Production: record.Total_Production,
        });
    };

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);
    };

    const filteredRecords = records.filter((record) => 
        String(record.Crop_ID).toLowerCase().includes(searchTerm) ||
        String(record.Region_ID).toLowerCase().includes(searchTerm) ||
        String(record.Sowing_Date).toLowerCase().includes(searchTerm) ||
        String(record.Harvest_Date).toLowerCase().includes(searchTerm) ||
        String(record.Yield_Per_Hectare).toLowerCase().includes(searchTerm) ||
        String(record.Total_Production).toLowerCase().includes(searchTerm)
    );

    return (
        <div className="container my-5">
            <h1 className="text-center mb-4">Crop Production Data</h1>


            <form onSubmit={handleSubmit} className="mb-4">
                <div className="row g-3">
                    <div className="col-md-2">
                        <input
                            type="text"
                            name="Crop_ID"
                            className="form-control"
                            placeholder="Crop ID"
                            value={formData.Crop_ID}
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
                    <div className="col-md-2">
                        <input
                            type="date"
                            name="Sowing_Date"
                            className="form-control"
                            value={formData.Sowing_Date}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-2">
                        <input
                            type="date"
                            name="Harvest_Date"
                            className="form-control"
                            value={formData.Harvest_Date}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-md-2">
                        <input
                            type="number"
                            name="Yield_Per_Hectare"
                            className="form-control"
                            placeholder="Yield/Hectare"
                            value={formData.Yield_Per_Hectare}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-md-2">
                        <input
                            type="number"
                            name="Total_Production"
                            className="form-control"
                            placeholder="Total Production"
                            value={formData.Total_Production}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary mt-3">
                    {editId ? <FaEdit /> : <FaSearch />} {editId ? 'Update' : 'Create'} Record
                </button>
            </form>
            
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search records..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <span className="input-group-text">
                    <FaSearch />
                </span>
            </div>
            <table className="table table-bordered table-striped">
                <thead className="table-dark">
                    <tr>
                        <th>Crop ID</th>
                        <th>Region ID</th>
                        <th>Sowing Date</th>
                        <th>Harvest Date</th>
                        <th>Yield/Hectare</th>
                        <th>Total Production</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <TransitionGroup component="tbody">
                    {filteredRecords.map((record) => {
                        if (!nodeRefs.current[record.Crop_ID]) {
                            nodeRefs.current[record.Crop_ID] = React.createRef();
                        }
                        return (
                            <CSSTransition
                                key={record.Crop_ID}
                                nodeRef={nodeRefs.current[record.Crop_ID]}
                                timeout={500}
                                classNames="fade"
                            >
                                <tr ref={nodeRefs.current[record.Crop_ID]}>
                                    <td>{record.Crop_ID}</td>
                                    <td>{record.Region_ID}</td>
                                    <td>{record.Sowing_Date}</td>
                                    <td>{record.Harvest_Date}</td>
                                    <td>{record.Yield_Per_Hectare}</td>
                                    <td>{record.Total_Production}</td>
                                    <td>
                                        <button
                                            className="btn btn-warning btn-sm me-2"
                                            onClick={() => handleEdit(record)}
                                        >
                                            <FaEdit /> Edit
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDelete(record.Crop_ID)}
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

            <div className="text-center mt-4">
                <strong>Total Entries: {filteredRecords.length}</strong>
            </div>
        </div>
    );
};

export default CropProductionData;
