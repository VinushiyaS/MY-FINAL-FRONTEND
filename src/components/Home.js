import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';

// Connect to the Socket.io server
const socket = io('http://localhost:5000');

const Home = () => {

  const [tournamentName, setTournamentName] = useState('');
  const [auctionDate, setAuctionDate] = useState('');
  const [numberOfTeams, setNumberOfTeams] = useState('');
  const [teamNames, setTeamNames] = useState(['']);
  const [tournaments, setTournaments] = useState([]); // State to hold tournaments
  const [players, setPlayers] = useState([]); // State to hold players
  const [newPlayerName, setNewPlayerName] = useState('');
  const [newPlayerImage, setNewPlayerImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null); // Preview for image
  const [editIndex, setEditIndex] = useState(null); // State to track the player being edited
  const [editTournamentIndex, setEditTournamentIndex] = useState(null); // State to track the tournament being edited
  const [bids, setBids] = useState([]); // Store the bids
  const [currentBid, setCurrentBid] = useState(0); // Current bid
  const [selectedPlayer, setSelectedPlayer] = useState(''); // Player being bid on

  // Load tournaments and players from localStorage on component mount
  useEffect(() => {
    const savedTournaments = JSON.parse(localStorage.getItem('tournaments')) || [];
    setTournaments(savedTournaments);
    
    const savedPlayers = JSON.parse(localStorage.getItem('players')) || [];
    setPlayers(savedPlayers);
  }, []);

  // Listen for new bids from the server
  useEffect(() => {
    socket.on('newBid', (bidData) => {
      setBids((prevBids) => [...prevBids, bidData]);
    });

    // Cleanup socket listener on unmount
    return () => {
      socket.off('newBid');
    };
  }, []);

  // Handle image preview and revoke object URL to avoid memory leak
  useEffect(() => {
    if (newPlayerImage) {
      const imageURL = URL.createObjectURL(newPlayerImage);
      setPreviewImage(imageURL);
      
      // Cleanup on component unmount or image change
      return () => URL.revokeObjectURL(imageURL);
    }
  }, [newPlayerImage]);

  const handleAddPlayer = () => {
    if (newPlayerName && newPlayerImage) {
      const playerData = { name: newPlayerName, image: previewImage }; // Use previewImage for display
      
      let updatedPlayers;
      if (editIndex !== null) {
        updatedPlayers = [...players];
        updatedPlayers[editIndex] = playerData; // Update the player at the editIndex
        setEditIndex(null); // Reset edit index
      } else {
        updatedPlayers = [...players, playerData]; // Add new player if not editing
      }

      setPlayers(updatedPlayers);

      // Save players to localStorage
      localStorage.setItem('players', JSON.stringify(updatedPlayers));

      setNewPlayerName('');
      setNewPlayerImage(null);
      setPreviewImage(null); // Reset preview
    } else {
      alert('Please provide player name and image.');
    }
  };

  const handleCreateTournament = () => {
    const newTournament = {
      name: tournamentName,
      auctionDate: auctionDate,
      teams: teamNames.filter(name => name !== ''), // Filter out empty team names
    };

    const updatedTournaments = editTournamentIndex !== null 
      ? tournaments.map((tournament, index) => 
          index === editTournamentIndex ? newTournament : tournament
        )
      : [...tournaments, newTournament]; // Add new tournament if not editing

    setTournaments(updatedTournaments); // Save tournament

    // Save tournaments to localStorage
    localStorage.setItem('tournaments', JSON.stringify(updatedTournaments));

    // Reset fields after creation
    setTournamentName('');
    setAuctionDate('');
    setNumberOfTeams('');
    setTeamNames(['']);
    setEditTournamentIndex(null); // Reset edit tournament index
  };

  const handleAddTeamName = (index, value) => {
    const newTeamNames = [...teamNames];
    newTeamNames[index] = value;
    setTeamNames(newTeamNames);
  };

  // Handle deleting a tournament
  const handleDeleteTournament = (index) => {
    const updatedTournaments = tournaments.filter((_, i) => i !== index);
    setTournaments(updatedTournaments);

    // Update localStorage
    localStorage.setItem('tournaments', JSON.stringify(updatedTournaments));
  };

  // Handle editing a tournament
  const handleEditTournament = (index) => {
    const tournamentToEdit = tournaments[index];
    setTournamentName(tournamentToEdit.name);
    setAuctionDate(tournamentToEdit.auctionDate);
    setTeamNames(tournamentToEdit.teams); // Set team names for editing
    setEditTournamentIndex(index); // Set the edit index to the tournament's index
  };

  // Handle deleting a player
  const handleDeletePlayer = (index) => {
    const updatedPlayers = players.filter((_, i) => i !== index);
    setPlayers(updatedPlayers);

    // Update localStorage
    localStorage.setItem('players', JSON.stringify(updatedPlayers));
  };

  // Handle editing a player
  const handleEditPlayer = (index) => {
    const playerToEdit = players[index];
    setNewPlayerName(playerToEdit.name);
    setPreviewImage(playerToEdit.image); // Show the preview image
    setEditIndex(index); // Set the edit index to the player's index
  };

  const handlePlaceBid = () => {
    if (selectedPlayer && currentBid > 0) {
      const bidData = {
        player: selectedPlayer,
        bid: currentBid,
      };

      // Send the bid to the server
      socket.emit('newBid', bidData);

      // Reset the current bid after placing it
      setCurrentBid(0);
    } else {
      alert('Please select a player and enter a valid bid.');
    }
  };

  return (
    <div className='homee'>
      <h1>You Can Do Your Auction Here!</h1>

      <h2>Create My Tournament</h2>
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
        onChange={(e) => setNumberOfTeams(Number(e.target.value))} // Ensure it's a number
      />
      {Array.from({ length: Number(numberOfTeams) }).map((_, index) => (
        <input
          key={index}
          type="text"
          placeholder={`Team Name ${index + 1}`}
          onChange={(e) => handleAddTeamName(index, e.target.value)}
        />
      ))}
      <button onClick={handleCreateTournament}>{editTournamentIndex !== null ? 'Update Tournament' : 'Create Tournament'}</button>

      <h3>Tournaments Details</h3>
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Tournament Name</th>
            <th>Auction Date</th>
            <th>Teams</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tournaments.map((tournament, index) => (
            <tr key={index}>
              <td>{tournament.name}</td>
              <td>{tournament.auctionDate}</td>
              <td>{tournament.teams.join(', ')}</td>
              <td>
                <button onClick={() => handleEditTournament(index)}>Edit</button>
                <button onClick={() => handleDeleteTournament(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>{editIndex !== null ? 'Edit Player' : 'Add Player'}</h2>
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
      {previewImage && <img src={previewImage} alt="Preview" style={{ width: '100px', height: 'auto' }} />}
      <button onClick={handleAddPlayer}>{editIndex !== null ? 'Update Player' : 'Add Player'}</button>

      <h3>Player List</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {players.map((player, index) => (
          <div key={index} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <img src={player.image} alt={player.name} style={{ width: '100px', height: 'auto' }} />
            <h4>{player.name}</h4>
            <button onClick={() => handleEditPlayer(index)}>Edit</button>
            <button onClick={() => handleDeletePlayer(index)}>Delete</button>
          </div>
        ))}
      </div>

      <h2>Live Bidding</h2>
      <select onChange={(e) => setSelectedPlayer(e.target.value)} value={selectedPlayer}>
        <option value="">Select a player</option>
        {players.map((player, index) => (
          <option key={index} value={player.name}>{player.name}</option>
        ))}
      </select>
      <input
        type="number"
        placeholder="Bid Amount"
        value={currentBid}
        onChange={(e) => setCurrentBid(Number(e.target.value))} // Ensure it's a number
      />
      <button onClick={handlePlaceBid}>Place Bid</button>

      <h3>Current Bids</h3>
      <ul>
        {bids.map((bid, index) => (
          <li key={index}>{bid.player}: {bid.bid}</li>
        ))}
      </ul>
    </div>
    
  );
};

export default Home;
