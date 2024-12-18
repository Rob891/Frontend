import React, { useState, useEffect } from "react";
import PlayerSelection from "./PlayerSelection"; // Import the PlayerSelection component

function TeamPage({ userId }) {
  const [teamName, setTeamName] = useState("");
  const [fantasyTeam, setFantasyTeam] = useState(null);
  const [fantasyTeamPlayers, setFantasyTeamPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [showPlayerSelection, setShowPlayerSelection] = useState(false);

  // Fetch existing fantasy team for the user
  useEffect(() => {
    const fetchFantasyTeam = async () => {
      try {
        const response = await fetch(`http://localhost:5001/fantasy-team/user/${userId}`);
        if (response.ok) {
          const data = await response.json();
          const team = data[0]; // Assuming only one team per user
          setFantasyTeam(team);

          // Fetch players in the fantasy team
          if (team) {
            const playersResponse = await fetch(
              `http://localhost:5001/fantasy-team-players/${team.fantasy_team_id}`
            );
            if (playersResponse.ok) {
              const playersData = await playersResponse.json();
              setFantasyTeamPlayers(playersData.data);
            } else {
              console.log("No players found for the fantasy team.");
            }
          }
        } else {
          console.log("No fantasy team found for the user.");
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
      const response = await fetch("http://localhost:5001/fantasy-team", {
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

  const handlePlayerSelect = async (player) => {
    try {
      const response = await fetch(`http://localhost:5001/fantasy-team-players/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fantasy_team_id: fantasyTeam.fantasy_team_id,
          player_id: player.player_id,
        }),
      });

      if (response.ok) {
        setFantasyTeamPlayers((prev) => [...prev, player]);
        setMessage(`${player.name} added to your team.`);
      } else {
        const error = await response.json();
        setMessage(`Error: ${error.message}`);
      }
    } catch (err) {
      setMessage(`Error: ${err.message}`);
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
              <PlayerSelection onPlayerSelect={handlePlayerSelect} />
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
