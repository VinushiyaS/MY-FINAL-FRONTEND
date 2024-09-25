import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManagePlayers = () => {
  const [teamId, setTeamId] = useState('');
  const [players, setPlayers] = useState([]);
  const [name, setName] = useState('');
  const [batsman, setBatsman] = useState('Right');
  const [bowler, setBowler] = useState(false);
  const [allrounder, setAllrounder] = useState(false);
  const [number, setNumber] = useState('');

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get(`/api/players/${teamId}`);
        setPlayers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (teamId) fetchPlayers();
  }, [teamId]);

  const handleAddPlayer = async () => {
    try {
      const response = await axios.post('/api/players', { teamId, name, batsman, bowler, allrounder, number });
      setPlayers([...players, response.data]);
      alert('Player added successfully');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Manage Players</h2>
      <input type="text" placeholder="Team ID" value={teamId} onChange={(e) => setTeamId(e.target.value)} />
      <input type="text" placeholder="Player Name" value={name} onChange={(e) => setName(e.target.value)} />
      <select value={batsman} onChange={(e) => setBatsman(e.target.value)}>
        <option value="Right">Right Handed</option>
        <option value="Left">Left Handed</option>
      </select>
      <label>
        <input type="checkbox" checked={bowler} onChange={(e) => setBowler(e.target.checked)} />
        Bowler
      </label>
      <label>
        <input type="checkbox" checked={allrounder} onChange={(e) => setAllrounder(e.target.checked)} />
        Allrounder
      </label>
      <input type="number" placeholder="Player Number" value={number} onChange={(e) => setNumber(e.target.value)} />
      <button onClick={handleAddPlayer}>Add Player</button>
      <ul>
        {players.map(player => (
          <li key={player._id}>
            {player.name} - {player.batsman} - {player.bowler ? 'Bowler' : ''} - {player.allrounder ? 'Allrounder' : ''} - {player.number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManagePlayers;
