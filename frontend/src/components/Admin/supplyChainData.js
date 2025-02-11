import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEdit, FaTrashAlt, FaSearch } from 'react-icons/fa';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SupplyChainData = () => {
  const [supplyChainData, setSupplyChainData] = useState([]);
  const [formData, setFormData] = useState({
    Commodity_ID: '',
    Region_ID: '',
    Storage_Capacity: '',
    Transport_Cost_Per_Unit: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    fetchSupplyChainData();
  }, []);

  const fetchSupplyChainData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:9000/api/supplychaindata');
      setSupplyChainData(response.data);
    } catch (error) {
      setErrorMessage('Error fetching supply chain data.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:9000/api/supplychaindata', formData);
      fetchSupplyChainData();
      resetForm();
    } catch (error) {
      setErrorMessage('Error creating supply chain data.');
    }
  };

  const handleEdit = (id) => {
    const data = supplyChainData.find((item) => item.Commodity_ID === id);
    setFormData({
      Commodity_ID: data.Commodity_ID,
      Region_ID: data.Region_ID,
      Storage_Capacity: data.Storage_Capacity,
      Transport_Cost_Per_Unit: data.Transport_Cost_Per_Unit,
    });
    setIsEditing(true);
    setCurrentId(id);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:9000/api/supplychaindata/${currentId}`, formData);
      fetchSupplyChainData();
      resetForm();
    } catch (error) {
      setErrorMessage('Error updating supply chain data.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:9000/api/supplychaindata/${id}`);
      fetchSupplyChainData();
    } catch (error) {
      setErrorMessage('Error deleting supply chain data.');
    }
  };

  const resetForm = () => {
    setFormData({
      Commodity_ID: '',
      Region_ID: '',
      Storage_Capacity: '',
      Transport_Cost_Per_Unit: '',
    });
    setIsEditing(false);
    setCurrentId(null);
  };

  const filterSupplyChainData = () => {
    const filter = filterText.toUpperCase();
    return supplyChainData.filter((row) => {
      return (
        String(row.Commodity_ID).toUpperCase().includes(filter) ||
        String(row.Region_ID).toUpperCase().includes(filter) ||
        String(row.Storage_Capacity).toUpperCase().includes(filter) ||
        String(row.Transport_Cost_Per_Unit).toUpperCase().includes(filter)
      );
    });
  };

  // Chart.js Data for visualization
  const chartData = {
    labels: supplyChainData.map(data => data.Commodity_ID),
    datasets: [{
      label: 'Storage Capacity',
      data: supplyChainData.map(data => data.Storage_Capacity),
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(75, 192, 192, 0.4)',
      hoverBorderColor: 'rgba(75, 192, 192, 1)',
    }],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw} units`;
          }
        }
      },
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Commodity ID',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Storage Capacity',
        },
      },
    },
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Supply Chain Data</h2>

      {loading && <div className="text-center"><div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div></div>}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      {/* Form for Create and Update */}
      <div className="card shadow-sm">
        <div className="card-body">
          <form onSubmit={isEditing ? handleUpdate : handleCreate}>
            <h4>{isEditing ? 'Edit Supply Chain' : 'Create Supply Chain'}</h4>
            <div className="mb-3">
              <label htmlFor="Commodity_ID" className="form-label">Commodity ID</label>
              <input type="text" className="form-control" id="Commodity_ID" name="Commodity_ID" value={formData.Commodity_ID} onChange={handleInputChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="Region_ID" className="form-label">Region ID</label>
              <input type="text" className="form-control" id="Region_ID" name="Region_ID" value={formData.Region_ID} onChange={handleInputChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="Storage_Capacity" className="form-label">Storage Capacity</label>
              <input type="text" className="form-control" id="Storage_Capacity" name="Storage_Capacity" value={formData.Storage_Capacity} onChange={handleInputChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="Transport_Cost_Per_Unit" className="form-label">Transport Cost Per Unit</label>
              <input type="text" className="form-control" id="Transport_Cost_Per_Unit" name="Transport_Cost_Per_Unit" value={formData.Transport_Cost_Per_Unit} onChange={handleInputChange} required />
            </div>
            <button type="submit" className="btn btn-primary w-100">{isEditing ? 'Update Supply Chain' : 'Create Supply Chain'}</button>
            {isEditing && <button type="button" className="btn btn-secondary w-100 mt-3" onClick={resetForm}>Cancel</button>}
          </form>
        </div>
      </div>

      {/* Search Filter */}
      <div className="mt-4">
        <h5>Search Filter</h5>
        <div className="input-group">
          <span className="input-group-text"><FaSearch /></span>
          <input
            type="text"
            className="form-control"
            placeholder="Search Supply Chain Data"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
        </div>
      </div>


      {/* Table for Displaying Supply Chain Data */}
      <div className="mt-5">
        <h4>Supply Chain Data List</h4>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Commodity ID</th>
              <th>Region ID</th>
              <th>Storage Capacity</th>
              <th>Transport Cost</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filterSupplyChainData().map((data) => (
              <tr key={`${data.Commodity_ID}-${data.Region_ID}`}>
                <td>{data.Commodity_ID}</td>
                <td>{data.Region_ID}</td>
                <td>{data.Storage_Capacity}</td>
                <td>{data.Transport_Cost_Per_Unit}</td>
                <td>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(data.Commodity_ID)}><FaEdit /> Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(data.Commodity_ID)}><FaTrashAlt /> Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Chart.js Visualization */}
      <div className="mt-5">
        <h5>Storage Capacity Visualization</h5>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default SupplyChainData;
