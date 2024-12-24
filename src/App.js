import './App.css';
import React, { useState } from 'react';
import Header from './app.jsx';
import LoginForm from './Loginform.jsx';
import SignUpForm from './SignUpForm.jsx';
import Dashboard from './Dashboard.jsx';
import TeamPage from './TeamPage.jsx';
import LoadingSpinner from './LoadingSpinner.jsx';

function App() {
  const [mode, setMode] = useState("normal");
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [loggedInUser, setLoggedInUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("https://backend-1-oq10.onrender.com/users/login", {
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
    } finally {
      setTimeout(() => {}, 1000);
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("https://backend-1-oq10.onrender.com/users/register", {
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
        setFormData({ email: "", username: "", password: "" });
        setSuccessMessage("Registration successful! Redirecting to dashboard...");
        setMode("dashboard");
      } else {
        const error = await response.json();
        setErrorMessage(error.error || "Failed to register.");
      }
    } catch (err) {
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setTimeout(() => {}, 1000);
      setIsLoading(false);
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
      {isLoading && <LoadingSpinner />}
      
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

        {["about", "services", "connect"].includes(mode) && (
          <div>
            <h2>{mode.charAt(0).toUpperCase() + mode.slice(1)} Page</h2>
            <p>This page is under construction.</p>
          </div>
        )}
      </div>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    </div>
  );
}

export default App;
