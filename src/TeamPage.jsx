import React, { useState, useEffect } from "react";
import PlayerSelection from "./PlayerSelection";

function TeamPage({ userId }) {
  const [teamName, setTeamName] = useState("");
  const [fantasyTeam, setFantasyTeam] = useState(null);
  const [fantasyTeamPlayers, setFantasyTeamPlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [showPlayerSelection, setShowPlayerSelection] = useState(false);

  useEffect(() => {
    const fetchFantasyTeam = async () => {
      try {
        const response = await fetch(`https://backend-1-oq10.onrender.com/fantasy-team/user/${userId}`);
        if (response.ok) {
          const data = await response.json();
          const team = data[0];
          setFantasyTeam(team);

          if (team) {
            const playersResponse = await fetch(
              `https://backend-1-oq10.onrender.com/fantasy-team-players/${team.fantasy_team_id}`
            );
            if (playersResponse.ok) {
              const playersData = await playersResponse.json();
              setFantasyTeamPlayers(playersData.data);
            }
          }
        }
      } catch (err) {
        console.error("Error fetching fantasy team:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFantasyTeam();
  }, [userId]);

  const handleTeamSubmit = async () => {
    if (!teamName) {
      setMessage("Please provide a team name.");
      return;
    }

    try {
      const response = await fetch("https://backend-1-oq10.onrender.com/fantasy-team", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          team_name: teamName,
          user_id: userId,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage("Team created successfully!");
        setFantasyTeam(data.team);
        setShowPlayerSelection(true);
      } else {
        const error = await response.json();
        setMessage(`Error: ${error.message}`);
      }
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  };

  const handlePlayerSelect = (player) => {
    if (selectedPlayers.length >= 11) {
      setMessage("You can only select up to 11 players for your team.");
      return;
    }

    setSelectedPlayers((prevPlayers) => [...prevPlayers, player]);
  };

  const handleFinishSelection = () => {
    if (selectedPlayers.length === 11) {
      setMessage("Team finalized!");
      setShowPlayerSelection(false);
    } else {
      setMessage("Please select 11 players to finalize your team.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="team-page">
      {fantasyTeam ? (
        <div>
          <h2>Team: {fantasyTeam.team_name}</h2>
          <p>Budget Remaining: ${fantasyTeam.budget}</p>
          {fantasyTeamPlayers.length === 0 ? (
            showPlayerSelection ? (
              <PlayerSelection
                onPlayerAdded={handlePlayerSelect}
                fantasyTeamId={fantasyTeam.fantasy_team_id}
                selectedPlayers={selectedPlayers}
                onFinishSelection={handleFinishSelection}
              />
            ) : (
              <button onClick={() => setShowPlayerSelection(true)}>Select Players</button>
            )
          ) : (
            <div>
              <h3>Players:</h3>
              <ul>
                {fantasyTeamPlayers.map((player) => (
                  <li key={player.player_id}>{player.name}</li>
                ))}
              </ul>
            </div>
          )}

          {selectedPlayers.length === 11 && (
            <div>
              <h3>Your Final Team:</h3>
              <ul>
                {selectedPlayers.map((player) => (
                  <li key={player.player_id}>{player.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h2>Create Your Team</h2>
          <form>
            <label>
              Team Name:
              <input
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
              />
            </label>
            <button
              type="button"
              onClick={handleTeamSubmit}
              disabled={!teamName}
            >
              Confirm Team
            </button>
          </form>
        </div>
      )}

      {message && <p style={{ color: "red" }}>{message}</p>}
    </div>
  );
}

export default TeamPage;
