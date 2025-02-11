import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported

const AuthForm = () => {
    const [isSignup, setIsSignup] = useState(false);
    const [role, setRole] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: '',
        market_id: '',
        market_name: '',
        district: '',
        state: '',
        godown_id: '',
        buffer_district: '',
        buffer_state: ''
    });
    const [passwordValid, setPasswordValid] = useState({
        lowercase: false,
        uppercase: false,
        number: false,
        length: false
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleRoleChange = (e) => {
        setRole(e.target.value);
        setFormData({ ...formData, role: e.target.value });
    };

    const toggleForm = () => {
        setIsSignup(!isSignup);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate password before submitting
        if (Object.values(passwordValid).includes(false)) {
            alert('Password does not meet the required criteria');
            return;
        }

        const url = isSignup ? 'http://localhost:9000/auth/signup' : 'http://localhost:9000/auth/login';
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await response.json();

            if (data.token) {
                localStorage.setItem('token', data.token); // Store the token
                alert(data.message || 'Login successful');

                // Redirect based on user role
                if (data.role === 'Market') {
                    navigate('/market-dashboard');
                } else if (data.role === 'Buffer Stock') {
                    navigate('/buffer-dashboard');
                } else if (data.role === 'Super Admin') {
                    navigate('/admin-dashboard');
                } else if (data.role === 'Help and Support') {
                    navigate('/help-dashboard');
                }  
                else {
                    navigate('/user-dashboard');
                }
            } else {
                alert(data.message || 'Error during login');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    };

    // Password validation checks
    const validatePassword = (password) => {
        const lowercase = /[a-z]/.test(password);
        const uppercase = /[A-Z]/.test(password);
        const number = /[0-9]/.test(password);
        const length = password.length >= 8;

        setPasswordValid({
            lowercase,
            uppercase,
            number,
            length
        });
    };

    const handlePasswordChange = (e) => {
        const { value } = e.target;
        handleChange(e);
        validatePassword(value);
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">{isSignup ? 'Sign Up' : 'Login'}</h2>
            <form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">
                {/* Email Field */}
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        required
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>

                {/* Password Field */}
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="form-control"
                        required
                        value={formData.password}
                        onChange={handlePasswordChange}
                    />
                </div>

                {/* Password Validation Message */}
                {isSignup && (
                    <div id="message" className="alert alert-info mt-3">
                        <h6>Password must contain the following:</h6>
                        <p className={passwordValid.lowercase ? 'text-success' : 'text-danger'}>
                            A <b>lowercase</b> letter
                        </p>
                        <p className={passwordValid.uppercase ? 'text-success' : 'text-danger'}>
                            A <b>capital (uppercase)</b> letter
                        </p>
                        <p className={passwordValid.number ? 'text-success' : 'text-danger'}>
                            A <b>number</b>
                        </p>
                        <p className={passwordValid.length ? 'text-success' : 'text-danger'}>
                            Minimum <b>8 characters</b>
                        </p>
                    </div>
                )}

                {/* Role Field (for signup) */}
                {isSignup && (
                    <div className="mb-3">
                        <label htmlFor="role" className="form-label">Role:</label>
                        <select
                            id="role"
                            name="role"
                            className="form-select"
                            value={formData.role}
                            onChange={handleRoleChange}
                        >
                            <option value="User">User</option>
                            <option value="Market">Market</option>
                            <option value="Buffer Stock">Buffer Stock</option>
                            <option value="Super Admin">Super Admin</option>
                        </select>

                        {/* Conditional fields based on role */}
                        {role === 'Market' && (
                            <div className="mt-3">
                                <div className="mb-3">
                                    <label htmlFor="market_id" className="form-label">Market ID:</label>
                                    <input
                                        type="text"
                                        id="market_id"
                                        name="market_id"
                                        className="form-control"
                                        value={formData.market_id}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="market_name" className="form-label">Market Name:</label>
                                    <input
                                        type="text"
                                        id="market_name"
                                        name="market_name"
                                        className="form-control"
                                        value={formData.market_name}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="district" className="form-label">District:</label>
                                    <input
                                        type="text"
                                        id="district"
                                        name="district"
                                        className="form-control"
                                        value={formData.district}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="state" className="form-label">State:</label>
                                    <input
                                        type="text"
                                        id="state"
                                        name="state"
                                        className="form-control"
                                        value={formData.state}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        )}

                        {role === 'Buffer Stock' && (
                            <div className="mt-3">
                                <div className="mb-3">
                                    <label htmlFor="godown_id" className="form-label">Godown ID:</label>
                                    <input
                                        type="text"
                                        id="godown_id"
                                        name="godown_id"
                                        className="form-control"
                                        value={formData.godown_id}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="buffer_district" className="form-label">District:</label>
                                    <input
                                        type="text"
                                        id="buffer_district"
                                        name="buffer_district"
                                        className="form-control"
                                        value={formData.buffer_district}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="buffer_state" className="form-label">State:</label>
                                    <input
                                        type="text"
                                        id="buffer_state"
                                        name="buffer_state"
                                        className="form-control"
                                        value={formData.buffer_state}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Submit Button */}
                <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-primary">{isSignup ? 'Sign Up' : 'Login'}</button>
                </div>
            </form>

            <div className="text-center mt-3">
                <span>{isSignup ? 'Already have an account?' : 'Don’t have an account?'}</span>
                <a href="#" onClick={toggleForm}>{isSignup ? 'Login' : 'Sign up'}</a>
            </div>
        </div>
    );
};

export default AuthForm;
