import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const MarketDetails = () => {
  const [marketDetails, setMarketDetails] = useState([]);
  const [formData, setFormData] = useState({
    market_id: '',
    market_name: '',
    district: '',
    state: '',
    user_id: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    fetchMarketDetails();
  }, []);

  // Fetch market details from backend
  const fetchMarketDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:9000/api/marketdetails');
      setMarketDetails(response.data);
    } catch (error) {
      setErrorMessage('Error fetching market details.');
    } finally {
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle filter text changes
  const handleFilterChange = (e) => {
    setFilterText(e.target.value);
  };

  // Filter the market details based on the search query
  const filterTable = () => {
    const filter = filterText.toUpperCase();
    return marketDetails.filter(
      (row) =>
        row.market_name.toUpperCase().includes(filter) ||
        row.district.toUpperCase().includes(filter) ||
        row.state.toUpperCase().includes(filter) ||
        row.market_id.toUpperCase().includes(filter)
    );
  };

  // Handle Create
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:9000/api/marketdetails', formData);
      fetchMarketDetails();
      resetForm();
    } catch (error) {
      setErrorMessage('Error creating market details.');
    }
  };

  // Handle Update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:9000/api/marketdetails/${currentId}`, formData);
      fetchMarketDetails();
      resetForm();
    } catch (error) {
      setErrorMessage('Error updating market details.');
    }
  };

  // Handle Edit
  const handleEdit = (id) => {
    const marketToEdit = marketDetails.find((market) => market.id === id);
    setFormData(marketToEdit);
    setIsEditing(true);
    setCurrentId(id);
  };

  // Handle Delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:9000/api/marketdetails/${id}`);
      fetchMarketDetails();
    } catch (error) {
      setErrorMessage('Error deleting market details.');
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      market_id: '',
      market_name: '',
      district: '',
      state: '',
      user_id: '',
    });
    setIsEditing(false);
    setCurrentId(null);
  };

  return (
    <div className="container mt-5">
      <h2>Market Details</h2>
      <h1>Total Markets: {marketDetails.length}</h1>

      {loading && <div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div>}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      {/* Form for Create and Update */}
      <form onSubmit={isEditing ? handleUpdate : handleCreate}>
        <div className="mb-3">
          <label htmlFor="market_id" className="form-label">Market ID</label>
          <input
            type="text"
            className="form-control"
            id="market_id"
            name="market_id"
            value={formData.market_id}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="market_name" className="form-label">Market Name</label>
          <input
            type="text"
            className="form-control"
            id="market_name"
            name="market_name"
            value={formData.market_name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="district" className="form-label">District</label>
          <input
            type="text"
            className="form-control"
            id="district"
            name="district"
            value={formData.district}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="state" className="form-label">State</label>
          <input
            type="text"
            className="form-control"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="user_id" className="form-label">User ID</label>
          <input
            type="text"
            className="form-control"
            id="user_id"
            name="user_id"
            value={formData.user_id}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {isEditing ? 'Update Market' : 'Create Market'}
        </button>
        {isEditing && (
          <button type="button" className="btn btn-secondary ms-2" onClick={resetForm}>
            Cancel
          </button>
        )}
      </form>

      {/* Filter Market */}
      <div className="mb-3">
        <h1>Filter Market</h1>
        <input
          type="text"
          id="filterInput"
          placeholder="Search Market"
          value={filterText}
          onChange={handleFilterChange}
          className="form-control"
        />
      </div>

      {/* Table for displaying market details */}
      <h3 className="mt-4">Market Details List</h3>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Market ID</th>
            <th>Market Name</th>
            <th>District</th>
            <th>State</th>
            <th>User ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filterTable().map((market) => (
            <tr key={market.id}>
              <td>{market.market_id}</td>
              <td>{market.market_name}</td>
              <td>{market.district}</td>
              <td>{market.state}</td>
              <td>{market.user_id}</td>
              <td>
                <button className="btn btn-warning btn-sm" onClick={() => handleEdit(market.id)}>
                  Edit
                </button>
                <button className="btn btn-danger btn-sm ms-2" onClick={() => handleDelete(market.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MarketDetails;
