import React from "react";
import StandingsWidget from "./Standings"; // Import the standings widget

function Dashboard({ username }) {
  return (
    <div className="dashboard">
      {/* Top Right: Standings Widget */}
      <div className="standings-container">
        <StandingsWidget />
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h1>Welcome to the Dashboard, {username}!</h1>
        <p>Here you can manage your team and see updates.</p>
      </div>
    </div>
  );
}

export default Dashboard;
