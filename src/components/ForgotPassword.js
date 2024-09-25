import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ForgotPassword() {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:5000/api/users/forgot-password', { email });

            // Handle success
            alert('Password reset link sent to your email!');
            console.log(response.data);
        } catch (error) {
            // Handle errors
            console.error('Error:', error.response?.data || error.message);
            alert('Failed to send password reset link.');
        }
    };

    return (
        <div className="fp">
            <h2>Forgot Password</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email address</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn">Submit</button>
                <p className="text-center mt-3">
                    Remember your password? <Link to="/login" className='nextlink'>Login</Link>
                </p>
            </form>
        </div>
    );
}

export default ForgotPassword;
