import React, { useState } from "react";



function PlayerSelection({ onPlayerAdded, fantasyTeamId }) {
    const [allPlayers, setAllPlayers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
  
    const fetchAllPlayers = async () => {
      console.log("Fetching all players...");
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5001/players");
        console.log("Response received for all players:", response);
        if (!response.ok) {
          throw new Error("Failed to fetch all players");
        }
        const data = await response.json();
        console.log("All players data:", data);
        setAllPlayers(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching all players:", err);
      } finally {
        setLoading(false);
      }
    };
  
    const handlePlayerSelect = async (player) => {
      try {
        const response = await fetch("http://localhost:5001/fantasy-team-players/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fantasy_team_id: fantasyTeamId,
            player_id: player.player_id,
            is_captain: false, // Explicitly set default
            points: 0,         // Explicitly set default
          }),
        });
  
        if (response.ok) {
          const result = await response.json();
          console.log("Player added:", result);
          onPlayerAdded(player); // Notify parent component
        } else {
          const error = await response.json();
          console.error("Error adding player:", error);
          setError(`Error adding player: ${error.error || "Unknown error"}`);
        }
      } catch (err) {
        console.error("Error adding player:", err);
        setError(`Error adding player: ${err.message}`);
      }
    };
  
    return (
      <div className="player-selection">
        <button onClick={fetchAllPlayers} className="fetch-all-players-button">
          Show Players
        </button>
  
        {loading && <p>Loading players...</p>}
        {error && <p style={{ color: "red" }}>Error: {error}</p>}
  
        {allPlayers.length > 0 && (
          <div className="player-grid">
            {allPlayers.map((player) => (
              <div key={player.player_id} className="player-card">
                <h3>{player.name}</h3>
                <p>Position: {player.position}</p>
                <button onClick={() => handlePlayerSelect(player)}>Select</button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
  
  export default PlayerSelection;
  