import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Ensure axios is installed with: npm install axios
import '../App.css'; // Optional: Add custom CSS for the landing page

const LandingPage = () => {
    const [tournaments, setTournaments] = useState([]);

    // Fetch tournaments from MongoDB when the component mounts
    useEffect(() => {
        const fetchTournaments = async () => {
            try {
                const response = await axios.get('/api/tournaments'); // Adjust the API endpoint if needed
                setTournaments(response.data); // Assuming response contains the tournament data
            } catch (error) {
                console.error('Error fetching tournaments:', error);
            }
        };

        fetchTournaments();
    }, []);

    return (
        <div className="landing">
            <h1>Welcome to the Tournament Auction Platform</h1>
            <div className="card-grid">
                {/* Dynamically render the tournaments */}
                {tournaments.length > 0 ? (
                    tournaments.map((tournament, index) => (
                        <div key={index} className="card card-large">
                            <h2>{tournament.name}</h2>
                            <p>Auction Date: {new Date(tournament.auctionDate).toLocaleDateString()}</p>
                            <p>Teams: {tournament.teams.join(', ')}</p>
                        </div>
                    ))
                ) : (
                    <p>No tournaments available. Please create a new tournament.</p>
                )}
            </div>
        </div>
    );
};

export default LandingPage;
