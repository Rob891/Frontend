import React, { useEffect, useRef } from "react";

function Dashboard({ username }) {
  const widgetRef = useRef(null);

  useEffect(() => {
    const existingScript = document.querySelector(
      "script[src='https://widgets.api-sports.io/2.0.3/widgets.js']"
    );
    if (existingScript) existingScript.remove();

    const script = document.createElement("script");
    script.src = "https://widgets.api-sports.io/2.0.3/widgets.js";
    script.type = "module";
    script.async = true;
    document.body.appendChild(script);

    return () => document.body.removeChild(script);
  }, []);

  return (
    <div className="dashboard">
      <h1>Welcome to the Dashboard!</h1>
      <p>Hello, {username}! We're glad to have you back.</p>
      <h2>Premier League Standings</h2>
      <div
        ref={widgetRef}
        id="wg-api-football-standings"
        data-host="v3.football.api-sports.io"
        data-key="0e1766168ec6bd20c8a1475ff6a75cab"
        data-league="39"
        data-season="2023"
        data-show-errors="true"
        data-show-logos="true"
        className="wg_loader"
      ></div>
    </div>
  );
}

export default Dashboard;
