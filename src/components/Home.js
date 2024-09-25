import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [tournamentName, setTournamentName] = useState('');
  const [auctionDate, setAuctionDate] = useState('');
  const [numberOfTeams, setNumberOfTeams] = useState('');
  const [teamNames, setTeamNames] = useState(['']);
  const [tournaments, setTournaments] = useState([]); // State to hold tournaments

  const [players, setPlayers] = useState([]); // State to hold players
  const [newPlayerName, setNewPlayerName] = useState('');
  const [newPlayerImage, setNewPlayerImage] = useState(null);

  // Load tournaments and players from localStorage on component mount
  useEffect(() => {
    const savedTournaments = JSON.parse(localStorage.getItem('tournaments')) || [];
    setTournaments(savedTournaments);
    
    const savedPlayers = JSON.parse(localStorage.getItem('players')) || [];
    setPlayers(savedPlayers);
  }, []);

  const handleAddPlayer = () => {
    if (newPlayerName && newPlayerImage) {
      const playerData = { name: newPlayerName, image: URL.createObjectURL(newPlayerImage) };
      const updatedPlayers = [...players, playerData];
      setPlayers(updatedPlayers);

      // Save players to localStorage
      localStorage.setItem('players', JSON.stringify(updatedPlayers));

      setNewPlayerName('');
      setNewPlayerImage(null);
    }
  };

  const handleCreateTournament = () => {
    const newTournament = {
      name: tournamentName,
      auctionDate: auctionDate,
      teams: teamNames.filter(name => name !== ''), // Filter out empty team names
    };
    const updatedTournaments = [...tournaments, newTournament];
    setTournaments(updatedTournaments); // Save tournament

    // Save tournaments to localStorage
    localStorage.setItem('tournaments', JSON.stringify(updatedTournaments));

    // Reset fields after creation
    setTournamentName('');
    setAuctionDate('');
    setNumberOfTeams('');
    setTeamNames(['']);
  };

  const handleAddTeamName = (index, value) => {
    const newTeamNames = [...teamNames];
    newTeamNames[index] = value;
    setTeamNames(newTeamNames);
  };

  return (
  <div className='homee'>
    
      <h1>User Dashboard</h1>

      <h2>Create Tournament</h2>
      <input
        type="text"
        placeholder="Tournament Name"
        value={tournamentName}
        onChange={(e) => setTournamentName(e.target.value)}
      />
      <input
        type="date"
        value={auctionDate}
        onChange={(e) => setAuctionDate(e.target.value)}
      />
      <input
        type="number"
        placeholder="Number of Teams"
        value={numberOfTeams}
        onChange={(e) => setNumberOfTeams(e.target.value)}
      />
      {Array.from({ length: numberOfTeams }).map((_, index) => (
        <input
          key={index}
          type="text"
          placeholder={`Team Name ${index + 1}`}
          onChange={(e) => handleAddTeamName(index, e.target.value)}
        />
      ))}
      <button onClick={handleCreateTournament}>Create Tournament</button>

      <h3>Tournaments Created</h3>
      <ul>
        {tournaments.map((tournament, index) => (
          <li key={index}>
            {tournament.name} - {tournament.auctionDate} - Teams: {tournament.teams.join(', ')}
          </li>
        ))}
      </ul>

      <h2>Add Players</h2>
      <input
        type="text"
        placeholder="Player Name"
        value={newPlayerName}
        onChange={(e) => setNewPlayerName(e.target.value)}
      />
      <input
        type="file"
        onChange={(e) => setNewPlayerImage(e.target.files[0])}
      />
      <button onClick={handleAddPlayer}>Add Player</button>

      <h3>Player List</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {players.map((player, index) => (
          <div key={index} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px', width: '150px' }}>
            <img src={player.image} alt={player.name} style={{ width: '100%', height: 'auto' }} />
            <p>{player.name}</p>
          </div>
        ))}
      </div>

      <h2>Live Bidding</h2>
      <p>Live bidding will be displayed here.</p>

      <Link to="/logout">Logout</Link>
  </div>
  );
};

export default Home;
