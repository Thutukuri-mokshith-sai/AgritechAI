import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'Admin',  // Default role is 'User'
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch users from the backend
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:9000/api/users');
      setUsers(response.data);
      setFilteredUsers(response.data); // Initialize filteredUsers with all users
    } catch (error) {
      setErrorMessage('Error fetching user data.');
      console.error(error);
    }
  };

  // Handle input changes for the form
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle role change in the dropdown
  const handleRoleChange = (e) => {
    setFormData({
      ...formData,
      role: e.target.value,  // Update role in formData when changed
    });
  };

  // Create a new user
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password || !formData.role) {
      setErrorMessage('Please fill all fields');
      return;
    }

    try {
      await axios.post('http://localhost:9000/api/users', formData);
      fetchUsers();
      resetForm();
    } catch (error) {
      setErrorMessage('Error creating user.');
      console.error(error);
    }
  };

  // Update user details
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password || !formData.role) {
      setErrorMessage('Please fill all fields');
      return;
    }

    try {
      await axios.put(`http://localhost:9000/api/users/${currentId}`, formData);
      fetchUsers();
      resetForm();
    } catch (error) {
      setErrorMessage('Error updating user.');
      console.error(error);
    }
  };

  // Delete a user
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:9000/api/users/${id}`);
      fetchUsers();
    } catch (error) {
      setErrorMessage('Error deleting user.');
      console.error(error);
    }
  };

  // Reset the form to create a new user
  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      role: 'User',  // Reset to default role
    });
    setIsEditing(false);
    setCurrentId(null);
  };

  // Handle search term change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    filterUsers(e.target.value);
  };

  // Filter users based on the search term
  const filterUsers = (term) => {
    if (term) {
      const filtered = users.filter((user) =>
        user.email.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  };

  return (
    <div className="container mt-5">
      <h2>User Management</h2>

      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      {/* Total Entries */}
      <div className="mb-3">
        <h1>Total Users: {filteredUsers.length}</h1>
      </div>

      {/* Form for Create and Update */}
      <form onSubmit={isEditing ? handleUpdate : handleCreate}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="role" className="form-label">
            Role
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleRoleChange}
            className="form-select"
          >
            <option value="User">User</option>
            <option value="Super Admin">Admin</option>
            <option value="Market">Market</option>
            <option value="Buffer Stock">Buffer Stock</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          {isEditing ? 'Update User' : 'Create User'}
        </button>
        {isEditing && (
          <button type="button" className="btn btn-secondary ms-2" onClick={resetForm}>
            Cancel
          </button>
        )}
      </form>

      {/* Table for displaying users */}
      <h3 className="mt-4">User List</h3>
      
      {/* Search Bar */}
      <div className="mb-3">
        <label htmlFor="search" className="form-label">Search Users</label>
        <input
          type="text"
          className="form-control"
          id="search"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by email"
        />
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.email}</td>
              <td>
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  className="form-select"
                >
                  <option value="User">User</option>
                  <option value="Super Admin">Admin</option>
                  <option value="Market">Market</option>
                  <option value="Buffer Stock">Buffer Stock</option>
                </select>
              </td>
              <td>
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => {
                    setFormData({
                      email: user.email,
                      password: '', // Assuming password is not editable
                      role: user.role,
                    });
                    setIsEditing(true);
                    setCurrentId(user.id);
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm ms-2"
                  onClick={() => handleDelete(user.id)}
                >
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

export default UserManagement;
