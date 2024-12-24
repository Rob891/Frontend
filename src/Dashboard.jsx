import React from "react";
import StandingsWidget from "./Standings";

function Dashboard({ username }) {
  return (
    <div className="dashboard">
      <div className="standings-container">
        <StandingsWidget />
      </div>

      <div className="main-content">
        <h1>Welcome to the Dashboard, {username}!</h1>
        <p>Here you can manage your team and see updates.</p>
      </div>
    </div>
  );
}

export default Dashboard;
