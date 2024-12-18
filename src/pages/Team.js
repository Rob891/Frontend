
import React, { useState } from 'react';

import './Team.css'; // Optional: Custom styles for this page.
import { useNavigate } from 'react-router-dom';

function Team() {
  const [showSlots, setShowSlots] = useState(false); // State to control showing slots
  const [players, setPlayers] = useState(Array(11).fill("")); // Array to hold player names
  const navigate = useNavigate();
  
  const positions = ["LW", "ST", "ST", "RW", "LM", "CM", "CM", "RM", "CB", "GK", "CB"];

  // Handler to update player slots
  const handlePlayerChange = (index, value) => {

    const updatedPlayers = [...players];
    updatedPlayers[index] = value;
    setPlayers(updatedPlayers);

  };

  return (
    <div className="team-page">

      <h1 className="teamPageHead">Create Your Team</h1>

      
      {/* New Team Button */}
      {!showSlots && (
        <button className="new-team-btn" onClick={() => setShowSlots(true)}>
          Create New Team
        </button>
      )}

      {/* Display 11 Player Slots */}
      {showSlots && (
        <div className="player-slots">
          {/* <h2 >Add Your Players</h2> <br></br> */}

          {players.map((player, index) => (

            <div key={index} className="player-slot">
              <label>{positions[index]}:</label> {/* Dynamic position label */}
              <input
                type="text"
                placeholder={`Enter ${positions[index]}`}
                value={player}
                onChange={(e) => handlePlayerChange(index, e.target.value)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Team;