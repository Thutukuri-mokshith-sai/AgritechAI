import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import BufferStockDetails from './Admin/bufferStockDetails';
import ConsumerBehaviorData from './Admin/consumerBehaviorData';
import ContactFormManager from './Admin/contactForm';
import CropProductionData from './Admin/cropProductionData';
import GlobalMarketData from './Admin/globalMarketData';
import GovernmentPolicyData from './Admin/governmentPolicyData';
import HistoricalPriceData from './Admin/historicalPriceData';
import ImportExportData from './Admin/importExportData';
import MarketIntelligencePage from './Admin/marketIntelligenceData';
import MarketDetails from './Admin/marketDetails';
import UserManagement from './Admin/users';
import SupplyChainData from './Admin/supplyChainData';
const Admin = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedRole, setSelectedRole] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Sample user data for testing purposes
        const sampleUsers = [
            { id: 1, email: 'user1@example.com', role: 'Admin' },
            { id: 2, email: 'user2@example.com', role: 'User' },
            { id: 3, email: 'user3@example.com', role: 'Market' },
            { id: 4, email: 'user4@example.com', role: 'Buffer Stock' },
        ];

        // Simulate fetching data with a timeout
        setTimeout(() => {
            setUsers(sampleUsers);
            setLoading(false);
        }, 1000);

        // Uncomment the following code to fetch from API
        // const fetchUsers = async () => {
        //     try {
        //         const response = await fetch('http://localhost:9000/admin/users');
        //         const data = await response.json();
        //         setUsers(data);
        //     } catch (error) {
        //         setError('Failed to load users.');
        //     } finally {
        //         setLoading(false);
        //     }
        // };
        // fetchUsers();
    }, []);

    const handleRoleChange = (userId, newRole) => {
        // Update user role logic
        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user.id === userId ? { ...user, role: newRole } : user
            )
        );

        // Optionally, send updated role to the server
        fetch(`http://localhost:9000/admin/update-role/${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ role: newRole }),
        }).catch((err) => console.error('Error updating role:', err));
    };

    const handleUserDetails = (userId) => {
        // Navigate to user details page
        navigate(`/admin/user-details/${userId}`);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
        <div className="container mt-5">
            <h2 className="text-center">Admin Dashboard</h2>

            <div className="mb-4">
                <button className="btn btn-success" onClick={() => navigate('/admin/add-user')}>
                    Add New User
                </button>
            </div>

            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>{user.email}</td>
                            <td>
                                <select
                                    value={user.role}
                                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                    className="form-select"
                                >
                                    <option value="User">User</option>
                                    <option value="Admin">Admin</option>
                                    <option value="Market">Market</option>
                                    <option value="Buffer Stock">Buffer Stock</option>
                                </select>
                            </td>
                            <td>
                                <button
                                    className="btn btn-info"
                                    onClick={() => handleUserDetails(user.id)}
                                >
                                    View Details
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
            <BufferStockDetails /><ConsumerBehaviorData/> <ContactFormManager/> <CropProductionData/><GlobalMarketData/>
            <GovernmentPolicyData/>
            <HistoricalPriceData/>
            <ImportExportData/>
            <MarketIntelligencePage/>
            <MarketDetails/>
            <SupplyChainData/>
            <UserManagement/>
        </div>

        
    );
};

export default Admin;
