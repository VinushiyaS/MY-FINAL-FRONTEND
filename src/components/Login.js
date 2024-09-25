import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user'); // State for role (either 'user' or 'committeeLeader')

    const navigate = useNavigate(); // Hook for navigation

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Sending login request with email, password, and role
            const response = await axios.post('http://localhost:5000/api/users/login', {
                email,
                password,
                role
            });
            console.log("Selected role:", role); // Debug role value
            console.log("Login response:", response.data); // Debug login response

            // Checking if the email belongs to the admin
            if (email === 'vinushiya779@gmail.com') {
                // Redirect to admin dashboard
                navigate('/admin-dashboard');
            } else if (role === 'user') {
                console.log('Redirecting to payment page...');

                // Redirect to payment page if the role is committee leader
                navigate('/payment');
            } 
        } catch (error) {
            // Improved error handling
            console.error('Error:', error.response?.data || error.message);
            if (error.response?.data?.msg) {
                alert(error.response.data.msg);
            } else {
                alert('Login failed!');
            }
        }
    };

    return (
        <div className="login">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email address</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                
                {/* Role Selection */}
                <div className="form-group">
                    <label>Select Role</label>
                    <select 
                        className="form-control" 
                        value={role} 
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="user">Committee Leader</option>
                        {/* <option value="committeeLeader">Committee Leader</option> */}
                        </select>
                </div>

                <button type="submit" className="btn">Login</button>
                <p className="text-center mt-3">
                    Don't have an account? <Link to="/signup" className='nextlink'>Signup</Link>
                </p>
                <p className="text-center mt-3">
                    Forgot your password? <Link to="/forgot-password" className='nextlink'>Reset</Link>
                </p>
            </form>
        </div>
    );
}

export default Login;
