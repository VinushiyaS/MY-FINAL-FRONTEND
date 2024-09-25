import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility toggle
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if all fields are filled
        if (!userName || !email || !password || !confirmPassword) {
            alert('Please fill in all fields.');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/users/register', {
                email,
                password,
                userName
            });

            // Handle successful signup
            alert('Signup successful!');
            console.log(response.data);

            // Redirect to products landing page
            navigate('/login');
        } catch (error) {
            // Handle errors
            console.error('Error:', error.response?.data || error.message);
            alert(`Signup failed! ${error.response?.data?.message || 'Please try again later.'}`);
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div className="signup">
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>User Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Enter user name"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                    />
                </div>
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
                    <div className="password-container">
                        <input 
                            type={passwordVisible ? "text" : "password"}
                            className="form-control" 
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="button" className="eye-btn" onClick={togglePasswordVisibility}>
                            {passwordVisible ? 'Hide' : 'Show'}
                        </button>
                    </div>
                </div>
                <div className="form-group">
                    <label>Confirm Password</label>
                    <div className="password-container">
                        <input 
                            type={passwordVisible ? "text" : "password"}
                            className="form-control" 
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <button type="button" className="eye-btn" onClick={togglePasswordVisibility}>
                            {passwordVisible ? 'Hide' : 'Show'}
                        </button>
                    </div>
                </div>
                <button type="submit" className="btn">Signup</button>
                <p className="text-center mt-3">
                    Already have an account? <Link to="/login" className='nextlink'>Login</Link>
                </p>
                <p className="text-center mt-3">
                    Forgot your password? <Link to="/forgot-password" className='nextlink'>Reset</Link>
                </p>
            </form>
        </div>
    );
}

export default Signup;
