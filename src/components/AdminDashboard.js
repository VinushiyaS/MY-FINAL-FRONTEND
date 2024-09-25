import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminDashboard() {
    const [subscriptions, setSubscriptions] = useState([]);
    const [user, setUser] = useState(null); // State for logged-in user

    useEffect(() => {
        // Get user info from local storage
        const storedUser = JSON.parse(localStorage.getItem('user'));
        setUser(storedUser);

        // Fetch subscription data from the server
        axios.get('http://localhost:5000/api/subscriptions')
            .then(response => {
                const { subscriptions } = response.data;
                setSubscriptions(subscriptions || []);
            })
            .catch(error => console.error('Error fetching subscriptions:', error));
    }, []);

    const handleCancelSubscription = (id) => {
        axios.post(`http://localhost:5000/api/subscriptions/cancel/${id}`)
            .then(() => {
                setSubscriptions(subscriptions.filter(sub => sub._id !== id));
            })
            .catch(error => console.error('Error canceling subscription:', error));
    };

    return (
        <div className="admin-dashboard">
            <h2>Admin Dashboard</h2>

            {/* Display logged-in user information */}
            {user && (
                <div className="user-info">
                    <h3>Logged In User:</h3>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <p>Subscription Type: {user.subscriptionType || 'No Subscription'}</p>
                </div>
            )}

            {/* Subscription Details */}
            <div className="subscription-details">
                <h3>Subscription Details</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Subscription Type</th>
                            <th>Start Date</th>
                            <th>Expiry Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subscriptions.map(subscription => (
                            <tr key={subscription._id}>
                                <td>{subscription.subscriptionType}</td>
                                <td>{new Date(subscription.startDate).toLocaleDateString()}</td>
                                <td>{new Date(subscription.expiryDate).toLocaleDateString()}</td>
                                <td>{subscription.status}</td>
                                <td>
                                    <button onClick={() => handleCancelSubscription(subscription._id)}>
                                        Cancel
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminDashboard;
