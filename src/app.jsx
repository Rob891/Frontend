import './App.css';
import React from 'react';

export default function Header({ mode, setMode, username, setLoggedInUser }) {
  const isLoggedIn = mode === "dashboard" || mode === "teamPage"; // Check if the user is logged in or on the team page

  return (
    <div className="Head1">
      <nav>
        {/* Logo */}
        <h1 className="logo-name">Premier League Fantasy</h1>

        <div className="menu" id="nav-menu">
          {/* Navigation Links */}
          <ul className="links">
            <li>
              <a href="#" onClick={() => setMode("normal")}>Home</a>
            </li>
            <li>
              <a href="#" onClick={() => setMode("about")}>About</a>
            </li>
            <li>
              <a href="#" onClick={() => setMode("teamPage")}>Team</a>
            </li>
            <li>
              <a href="#" onClick={() => setMode("services")}>Services</a>
            </li>
            <li>
              <a href="#" onClick={() => setMode("connect")}>Connect</a>
            </li>
          </ul>

          {/* User Section */}
          <div className="logo-container">
            <div className="logorsignin">
              {isLoggedIn ? (
                <>
                  <span>Welcome, {username || "User"}!</span>
                  <button
                    className="header-button"
                    onClick={() => setMode("teamPage")}
                  >
                    See Team
                  </button>
                  <button
                    className="header-button"
                    onClick={() => {
                      setLoggedInUser(null); // Log out user
                      setMode("normal"); // Return to home
                    }}
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <i className="fa-solid fa-circle-user"></i>
                  <button
                    className="header-button"
                    onClick={() => setMode("signingIn")}
                  >
                    Sign In
                  </button>
                  <button
                    className="header-button"
                    onClick={() => setMode("loggingIn")}
                  >
                    Log In
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
