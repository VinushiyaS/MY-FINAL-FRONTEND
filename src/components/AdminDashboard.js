import React, { useEffect, useState } from 'react';

function AdminDashboard() {
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        // Get the user's email from local storage
        const email = localStorage.getItem('userEmail');
        if (email) {
            setUserEmail(email);
        } else {
            // Optionally, handle the case where email is not found
            console.error('No user email found in local storage');
        }
    }, []);

    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>
            <p1>Logged in as: {userEmail}</p1>
            {/* Other admin dashboard content goes here */}
        </div>
    );
}

export default AdminDashboard;
