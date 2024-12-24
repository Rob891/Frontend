import React, { useState, useEffect } from "react";
import axios from "axios";

function StandingsWidget() {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        const response = await axios.get("https://backend-1-oq10.onrender.com/api/fpl/teams/standings");
        console.log("API Response:", response.data);
        if (response.data && Array.isArray(response.data)) {
          setStandings(response.data);
        } else {
          throw new Error("Unexpected data format");
        }
      } catch (err) {
        console.error("Error fetching standings:", err.message);
        setError("Failed to fetch Premier League standings.");
      } finally {
        setLoading(false);
      }
    };

    fetchStandings();
  }, []);

  if (loading) {
    return <p>Loading standings...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (standings.length === 0) {
    return <p>No standings available.</p>;
  }

  return (
    <div className="standings-container">
      <h2>Premier League Standings (2022 Season)</h2>
      <table className="standings-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Team</th>
            <th>MP</th>
            <th>W</th>
            <th>D</th>
            <th>L</th>
            <th>GF</th>
            <th>GA</th>
            <th>GD</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((team) => (
            <tr key={team.team?.id || team.rank}>
              <td>{team.rank || "N/A"}</td>
              <td>
                {team.team?.logo && (
                  <img
                    src={team.team.logo}
                    alt={`${team.team?.name || "Team"} logo`}
                    style={{ width: "20px", marginRight: "8px" }}
                  />
                )}
                {team.team?.name || "Unknown"}
              </td>
              <td>{team.all?.played || 0}</td>
              <td>{team.all?.win || 0}</td>
              <td>{team.all?.draw || 0}</td>
              <td>{team.all?.lose || 0}</td>
              <td>{team.all?.goals?.for || 0}</td>
              <td>{team.all?.goals?.against || 0}</td>
              <td>{team.goalsDiff || 0}</td>
              <td>{team.points || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StandingsWidget;
