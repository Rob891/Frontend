import './App.css';
import React from 'react';

export default function Header({ mode, setMode, username, setLoggedInUser }) {
  const isLoggedIn = mode === "dashboard"; // Check if the user is logged in

  return (
    <div className="Head1">
      <link rel="stylesheet" href="App.css"></link>

      <nav>
        <h1 className="logo-name">Premier League Fantasy</h1>

        <div className="menu" id="nav-menu">
          <ul className="links">
            <li><a href="#" onClick={() => setMode("normal")}>Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#" onClick={() => setMode("team")}>Team</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Connect</a></li>
          </ul>

          <div className="logo-container">
            <link
              className="logo"
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.1/css/all.min.css"
            />
            <div className="logorsignin">
              {isLoggedIn ? (
                <>
                  <span>Welcome, {username || "User"}!</span>
                  <button role="button" id="see-team" onClick={() => setMode("team")}>
                    See Team
                  </button>
                  <button
                    role="button"
                    id="sign-out"
                    onClick={() => {
                      setLoggedInUser(null); // Clear user state
                      setMode("normal"); // Go back to home
                    }}
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <i className="fa-solid fa-circle-user"></i>
                  <button role="button" id="SignIn" onClick={() => setMode("signingIn")}>
                    Sign in
                  </button>
                  <button role="button" id="login-button" onClick={() => setMode("loggingIn")}>
                    Log in
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
