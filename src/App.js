
// import { render } from 'ejs';

import React, { useState } from 'react';
import Header from './app.jsx';

const handleSignUp = async (event) => {
  event.preventDefault();

  const email = document.getElementById('newUsername').value;
  const password = document.getElementById('newPassword').value;
  const username = email.split('@')[0]; // Example logic to derive a username

  try {
    const response = await fetch('http://localhost:5001/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message);
    } else {
      console.error(data);
      alert(`Sign-up failed: ${data.message}`);
    }
  } catch (error) {
    console.error('Error during sign-up:', error);
    alert('Sign-up failed: Could not connect to the server.');
  }
};

function App() {
  // Keeps track of whether the user clicks sign in or log in
  const [mode, setMode] = useState("normal");

  return (
    <div className="App">
      {/* Pass mode and setMode to Header */}
      <Header mode={mode} setMode={setMode} />

      {/* Render content based on the mode */}
      <div className="content">
        {mode === "normal" && <h1 id = "welcomePrem">Welcome to Premier League Fantasy!</h1>}
       
      <div>
        {mode === "signingIn" && (
          <div className="fullscreen-container">
            <h1 id="login-title">Sign Up</h1>
            <form className="form">
              <div className="input-group">
                <label htmlFor="newUsername"><b>New Username</b></label>
                <input
                  type="text"
                  placeholder="Enter New Username"
                  id="newUsername"
                  required
                />
                <span className="msg">Username is required</span>
              </div>

              <div className="input-group">
                <label htmlFor="newPassword"><b>New Password</b></label>
                <input type="password" placeholder="Enter New Password" id="newPassword" required />
                <span className="msg">Password must be strong</span>
              </div>

              <button type="submit" className="login-button" onClick={handleSignUp}>Sign Up</button>
            </form>
           
          </div>
        )}

        {mode === "loggingIn" && (
          <div className="fullscreen-container">

            <h1 id="login-title">Welcome</h1>

            <form className="form">

              <div className="input-group">

                <label htmlFor="email"><b>Email</b></label>

                <input type="email" placeholder="Enter Email" id="email" required/>

                <span className="msg">Valid Email</span>

              </div>

              <div className="input-group">
                <label htmlFor="password"><b>Password</b></label>
                <input type="password" placeholder="Enter Password" id="password" required/>
                <span className="msg">Incorrect Password</span>
              </div>

              <button type="submit" className="login-button">Log In</button>

            </form>
            
          </div>
          
        )}

        </div>
      </div>
    </div>
  );
}

export default App;