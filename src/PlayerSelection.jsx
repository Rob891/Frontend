import React, { useState, useEffect } from "react";

function PlayerSelection({ onPlayerAdded, fantasyTeamId, selectedPlayers, onFinishSelection }) {
  const [allPlayers, setAllPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchAllPlayers = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5001/players");
      if (!response.ok) {
        throw new Error("Failed to fetch all players");
      }
      const data = await response.json();
      setAllPlayers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePlayerSelect = (player) => {
    if (selectedPlayers.length >= 11) {
      setError("You can only select up to 11 players for your team.");
      return;
    }

    onPlayerAdded(player);
  };

  const getButtonText = (player) => {
    if (selectedPlayers.some((selectedPlayer) => selectedPlayer.player_id === player.player_id)) {
      return "Submitted";
    }
    return "Select";
  };

  useEffect(() => {
    fetchAllPlayers();
  }, []);

  const handleFinishSelection = () => {
    if (selectedPlayers.length === 11) {
      onFinishSelection();
    } else {
      setError("Please select 11 players to complete your team.");
    }
  };

  return (
    <div className="player-selection">
      {loading && <p>Loading players...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {allPlayers.length > 0 && (
        <div className="player-grid">
          {allPlayers.map((player) => (
            <div key={player.player_id} className="player-card">
              <img
                src={`https://resources.premierleague.com/premierleague/photos/players/110x140/p${player.fpl_player_id}.png`}
                alt={player.name}
              />
              <h3>{player.name}</h3>
              <p>Position: {player.position}</p>
              <button
                onClick={() => handlePlayerSelect(player)}
                disabled={selectedPlayers.some((selectedPlayer) => selectedPlayer.player_id === player.player_id)}
              >
                {getButtonText(player)}
              </button>
            </div>
          ))}
        </div>
      )}

      {selectedPlayers.length === 11 && (
        <button onClick={handleFinishSelection} className="finish-selection-button">
          Finish Selection
        </button>
      )}
    </div>
  );
}

export default PlayerSelection;
