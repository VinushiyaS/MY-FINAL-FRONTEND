// Subscription.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Subscription = () => {
    const [subscriptions, setSubscriptions] = useState([]);

    useEffect(() => {
        axios.get('/api/subscriptions/committee-leaders')
            .then(response => {
                console.log('Subscriptions data:', response.data);
                setSubscriptions(response.data);
            })
            .catch(error => console.error('Error fetching subscriptions:', error));
    }, []);

    return (
        <div>
            <h2>Subscription Details</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Subscription Type</th>
                        <th>Start Date</th>
                        <th>Expiry Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {subscriptions.length > 0 ? (
                        subscriptions.map((subscription, index) => (
                            <tr key={index}>
                                <td>{subscription.name}</td>
                                <td>{subscription.email}</td>
                                <td>{subscription.type}</td>
                                <td>{subscription.startDate}</td>
                                <td>{subscription.expiryDate}</td>
                                <td>{subscription.status}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">No subscriptions found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Subscription;
