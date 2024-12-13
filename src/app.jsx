import './App.css';
import React, { useState } from 'react';


export default function Header({ mode, setMode }) {
    return (
      <div className="Head1">
        
        <link rel="stylesheet" href="App.css"></link>
  
        <nav>
          <h1 className="logo-name">Premier League Fantasy</h1>
  
          <div className="menu" id="nav-menu">
            <ul className="links">
              <li><a href="#">Home</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Team</a></li>
              <li><a href="#">Services</a></li>
              <li><a href="#">Connect</a></li>
            </ul>


            <div class = "logo-container">
            <link className = "logo" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.1/css/all.min.css"/>
            <div className="logorsignin">
              <i className="fa-solid fa-circle-user"></i>
  
              <button role="button" id="SignIn" onClick={() => setMode("signingIn")}>
                Sign in
              </button>
              <button role="button" id="login-button" onClick={() => setMode("loggingIn")}>
                Log in
              </button>
              <button role="button" id="GoBack" onClick={() => setMode("normal")}>
                Go Back
              </button>
            </div>
            </div>

          </div>
        </nav>
      </div>
    );
  }
    