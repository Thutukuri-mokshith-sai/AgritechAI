import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const API_BASE_URL = "http://localhost:9000/api/marketintelligencedata/";

const MarketIntelligencePage = () => {
  const [entries, setEntries] = useState([]);
  const [formData, setFormData] = useState({
    Commodity_ID: "",
    Date: "",
    Supply_Disruption: "",
    Demand_Change: "",
    Market_Sentiment: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [deleteEntry, setDeleteEntry] = useState(null);
  const [filter, setFilter] = useState("");

  // Fetch all entries
  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}`);
      setEntries(response.data);
    } catch (error) {
      console.error("Error fetching entries:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        // Update entry
        await axios.put(
          `${API_BASE_URL}/${formData.Commodity_ID}/${formData.Date}`,
          formData
        );
        alert("Entry updated successfully");
      } else {
        // Create new entry
        await axios.post(`${API_BASE_URL}`, formData);
        alert("Entry created successfully");
      }
      setFormData({
        Commodity_ID: "",
        Date: "",
        Supply_Disruption: "",
        Demand_Change: "",
        Market_Sentiment: "",
      });
      setIsEdit(false);
      fetchEntries();
    } catch (error) {
      console.error("Error saving entry:", error);
    }
  };

  const handleEdit = (entry) => {
    setFormData(entry);
    setIsEdit(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${API_BASE_URL}/${deleteEntry.Commodity_ID}/${deleteEntry.Date}`
      );
      alert("Entry deleted successfully");
      setShowModal(false);
      fetchEntries();
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };

  const confirmDelete = (entry) => {
    setDeleteEntry(entry);
    setShowModal(true);
  };
  const filteredEntries = entries.filter((entry) =>
    entry.Commodity_ID && entry.Commodity_ID.toString().toLowerCase().includes(filter.toLowerCase()) ||
    entry.Date.includes(filter) ||
    (typeof entry.Supply_Disruption === 'string' && entry.Supply_Disruption.toLowerCase().includes(filter.toLowerCase())) ||
    (typeof entry.Demand_Change === 'string' && entry.Demand_Change.toLowerCase().includes(filter.toLowerCase())) ||
    (typeof entry.Market_Sentiment === 'string' && entry.Market_Sentiment.toLowerCase().includes(filter.toLowerCase()))
  );
  
  // Bar chart data
  const chartData = {
    labels: filteredEntries.map((entry) => entry.Commodity_ID),
    datasets: [
      {
        label: 'Supply Disruption',
        data: filteredEntries.map((entry) => parseFloat(entry.Supply_Disruption)),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Demand Change',
        data: filteredEntries.map((entry) => parseFloat(entry.Demand_Change)),
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Market Intelligence Data</h1>

      <form
        onSubmit={handleSubmit}
        className="p-4 border rounded shadow-sm bg-light"
      >
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Commodity ID</label>
            <input
              type="text"
              name="Commodity_ID"
              className="form-control"
              placeholder="Enter Commodity ID"
              value={formData.Commodity_ID}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Date</label>
            <input
              type="date"
              name="Date"
              className="form-control"
              value={formData.Date}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-4">
            <label className="form-label">Supply Disruption</label>
            <input
              type="text"
              name="Supply_Disruption"
              className="form-control"
              placeholder="Enter Supply Disruption"
              value={formData.Supply_Disruption}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Demand Change</label>
            <input
              type="text"
              name="Demand_Change"
              className="form-control"
              placeholder="Enter Demand Change"
              value={formData.Demand_Change}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Market Sentiment</label>
            <input
              type="text"
              name="Market_Sentiment"
              className="form-control"
              placeholder="Enter Market Sentiment"
              value={formData.Market_Sentiment}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary w-100"
          data-bs-toggle="tooltip"
          title={isEdit ? "Update the entry" : "Create a new entry"}
        >
          {isEdit ? "Update Entry" : "Create Entry"}
        </button>
      </form>

      {/* Filter Input */}
      <div className="mt-3 mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search entries..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      {/* Entries Count */}
      <p>Total Entries: {filteredEntries.length}</p>

      <table className="table table-hover mt-5 shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>Commodity ID</th>
            <th>Date</th>
            <th>Supply Disruption</th>
            <th>Demand Change</th>
            <th>Market Sentiment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEntries.map((entry) => (
            <tr key={`${entry.Commodity_ID}-${entry.Date}`}>
              <td>{entry.Commodity_ID}</td>
              <td>{entry.Date}</td>
              <td>{entry.Supply_Disruption}</td>
              <td>{entry.Demand_Change}</td>
              <td>{entry.Market_Sentiment}</td>
              <td>
                <button
                  className="btn btn-success btn-sm me-2"
                  onClick={() => handleEdit(entry)}
                >
                  <FaEdit />
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => confirmDelete(entry)}
                >
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Chart */}
      <div className="mt-4">
        <h3>Supply Disruption vs Demand Change</h3>
        <Bar data={chartData} />
      </div>

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="modal show d-block" style={{ background: "#00000099" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete this entry?
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-danger"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketIntelligencePage;
