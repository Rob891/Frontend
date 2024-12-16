import './App.css';
import React, { useState } from 'react';
import Header from './app.jsx';

function App() {
  const [mode, setMode] = useState("normal"); 
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  }); 
  const [errorMessage, setErrorMessage] = useState(""); 
  const [successMessage, setSuccessMessage] = useState(""); 

  // handles login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier: formData.email, 
          password: formData.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage(`Welcome back, ${data.user.username}!`);
        setMode("normal"); 
      } else {
        const error = await response.json();
        setErrorMessage(error.error || "Failed to log in.");
      }
    } catch (err) {
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  // handles regestration
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          username: formData.username,
          password: formData.password,
        }),
      });

      if (response.ok) {
        setSuccessMessage("Registration successful! Please log in.");
        setMode("loggingIn"); 
        const error = await response.json();
        setErrorMessage(error.error || "Failed to register.");
      }
    } catch (err) {
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value, 
    }));
  };

  return (
    <div className="App">
      <Header mode={mode} setMode={setMode} />

      <div className="content">
        {mode === "normal" && <h2>Welcome to Premier League Fantasy!</h2>}

        {mode === "signingIn" && (
          <div className="fullscreen-container">
            <h1 className="login-title">Sign Up</h1>
            <form className="form" onSubmit={handleSignUp}>
              <div className="input-group">
                <label htmlFor="email"><b>Email</b></label>
                <input
                  type="email"
                  placeholder="Enter Email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="username"><b>Username</b></label>
                <input
                  type="text"
                  placeholder="Enter Username"
                  id="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="password"><b>Password</b></label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  id="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <button type="submit" className="login-button">Sign Up</button>
            </form>
            <button type="button" onClick={() => setMode("normal")}>
              Go Back
            </button>
          </div>
        )}

        {mode === "loggingIn" && (
          <div className="fullscreen-container">
            <h1 className="login-title">Log In</h1>
            <form className="form" onSubmit={handleLogin}>
              <div className="input-group">
                <label htmlFor="email"><b>Email or Username</b></label>
                <input
                  type="text"
                  placeholder="Enter Email or Username"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="password"><b>Password</b></label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  id="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <button type="submit" className="login-button">Log In</button>
            </form>
            <button type="button" onClick={() => setMode("normal")}>
              Go Back
            </button>
          </div>
        )}
      </div>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    </div>
  );
}

export default App;
