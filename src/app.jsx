
import './App.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Team from './pages/Team'; // Correct import for the `Team.js` file


export default function Header({ mode, setMode , username, setLoggedInUser}) {
  const navigate = useNavigate(); // Hook for navigation
  const isLoggedIn = mode === "dashboard"; // Check if the user is logged in

    return (
      <div className="Head1">

        
        <link rel="stylesheet" href="App.css"></link>
  
        <nav>

          <h1 className="logo-name">Premier League Fantasy</h1>
  
          <div className="menu" id="nav-menu">

            <ul className="links">
              
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/team">Team</Link></li>
              
            </ul>


            <div className = "logo-container">

            <link className = "logo" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.1/css/all.min.css"/>
            

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

                  <button role="button" id="GoBack" onClick={() => navigate(-1)}>Go Back</button>

                </>
              )}
  

            </div>

            </div>

          </div>
        </nav>
      </div>
    );
  }
    


