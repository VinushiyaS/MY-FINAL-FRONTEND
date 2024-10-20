// src/components/TournamentDetails.js
import React from 'react';
import { useLocation } from 'react-router-dom';

const TournamentDetails = () => {
    const location = useLocation();
    const { tournament } = location.state; // Get the tournament data passed via navigation

    return (
        <div className="tournament-details">
            <h1>{tournament.name} - Player Details</h1>
            <p>Auction Date: {tournament.auctionDate}</p>

            <div className="player-list">
                <h2>Players</h2>
                {tournament.players && tournament.players.length > 0 ? (
                    <ul>
                        {tournament.players.map((player, index) => (
                            <li key={index}>
                                <p>Player Name: {player.name}</p>
                                <p>Bid Points: {player.bidPoints}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No players available for this tournament.</p>
                )}
            </div>
        </div>
    );
};

export default TournamentDetails;
