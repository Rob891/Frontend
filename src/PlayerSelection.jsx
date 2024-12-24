import React, { useState, useEffect } from "react";

function PlayerSelection({ onPlayerAdded, fantasyTeamId, onTeamSelected }) {

  const [allPlayers, setAllPlayers] = useState([]);
  const [allTeams, setAllTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  useEffect(() => {
    fetchAllTeams(); // Fetch teams on component 
  }, []);
  

  const fetchAllPlayers = async (teamId) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5001/players/team/${teamId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch players");
      }
      const data = await response.json();
      setAllPlayers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
  }
};


  const fetchAllTeams = async () => {
    console.log("Fetching all teams...");
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5001/teams");
      if (!response.ok) {
        throw new Error("Failed to fetch teams");
      }
      const data = await response.json();
      setAllTeams(data);
    } catch (err) {
      setError(err.message);
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
          is_captain: false,
          points: 0,
        }),
      });

      if (response.ok) {
        onPlayerAdded(player);
      } else {
        const error = await response.json();
        setError(`Error adding player: ${error.error || "Unknown error"}`);
      }
    } catch (err) {
      setError(`Error adding player: ${err.message}`);
    }
  };

  const handleTeamSelect = (team) => {
    setSelectedTeam(team);
    fetchAllPlayers(team.team_id);
    if (onTeamSelected) {
      onTeamSelected(team);
    }
  };

  return (
    <div className="player-selection">
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <div className="team-selection">
        <h3>Select a Team</h3>
        {loading ? (
          <p>Loading teams...</p>
        ) : (
          <div className="team-grid">
            {allTeams.map((team) => (
              <div
                key={team.team_id}
                className={`team-card ${selectedTeam?.team_id === team.team_id ? "selected" : ""}`}
                onClick={() => handleTeamSelect(team)}
              >
                <h4>{team.name}</h4>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedTeam && (
        <div className="player-selection-list">
          <h3>Players from {selectedTeam.name}</h3>
          {loading ? (
            <p>Loading players...</p>
          ) : (
            <div className="player-grid">
              {allPlayers.map((player) => (
                <div key={player.player_id} className="player-card">
                  <h4>{player.name}</h4>
                  <p>Position: {player.position}</p>
                  <button onClick={() => handlePlayerSelect(player)}>Select</button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default PlayerSelection;
