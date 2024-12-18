import './App.css';
import React, { useState } from 'react';
import Header from './app.jsx';
import LoginForm from './Loginform.jsx';
import SignUpForm from './SignUpForm.jsx';
import Dashboard from './Dashboard.jsx';
import TeamPage from './TeamPage.jsx'; // Import TeamPage component

function App() {
  const [mode, setMode] = useState("normal"); // Modes: normal, signingIn, loggingIn, dashboard, teamPage
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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
        setLoggedInUser(data.user);
        setSuccessMessage(`Welcome back, ${data.user.username}!`);
        setMode("dashboard");
      } else {
        const error = await response.json();
        setErrorMessage(error.error || "Failed to log in.");
      }
    } catch (err) {
      setErrorMessage("An error occurred. Please try again.");
    }
  };

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
        const data = await response.json();
        setLoggedInUser(data.user);
        setSuccessMessage("Registration successful! Redirecting to dashboard...");
        setMode("dashboard");
      } else {
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

  const handleLogout = () => {
    setLoggedInUser(null);
    setMode("normal");
    setSuccessMessage("You have been logged out.");
  };

  return (
    <div className="App">
      <Header 
        mode={mode} 
        setMode={setMode} 
        username={loggedInUser?.username || "User"} 
        setLoggedInUser={setLoggedInUser} 
        handleLogout={handleLogout}
      />

      <div className="content">
        {mode === "normal" && <h2>Welcome to Premier League Fantasy!</h2>}

        {mode === "signingIn" && (
          <SignUpForm
            formData={formData}
            handleInputChange={handleInputChange}
            handleSignUp={handleSignUp}
            setMode={setMode}
          />
        )}

        {mode === "loggingIn" && (
          <LoginForm
            formData={formData}
            handleInputChange={handleInputChange}
            handleLogin={handleLogin}
            setMode={setMode}
          />
        )}

        {mode === "dashboard" && (
          <Dashboard
            username={loggedInUser?.username || "User"}
            userId={loggedInUser?.user_id || null}
          />
        )}

        {mode === "teamPage" && (
          <TeamPage
            username={loggedInUser?.username || "User"}
            userId={loggedInUser?.user_id || null}
          />
        )}
      </div>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    </div>
  );
}

export default App;
