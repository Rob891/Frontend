
// import { render } from 'ejs';

import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './app.jsx';

import Team from './pages/Team';

import LoginForm from './Loginform.jsx';
import SignUpForm from './SignUpForm.jsx';
import Dashboard from './Dashboard.jsx';

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

  // Handle Login
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

  // Handle Sign Up
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

  // Handle Input Changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Handle Logout
  const handleLogout = () => {
    setLoggedInUser(null);
    setMode("normal");
    setSuccessMessage("You have been logged out.");
  };

  return (
    <BrowserRouter>
      <div className="App">
        {/* Header is rendered only once */}

        <Header
          mode={mode}
          setMode={setMode}
          username={loggedInUser?.username || "User"}
          setLoggedInUser={setLoggedInUser}
          handleLogout={handleLogout}
        />

        {/* Main content */}
        <div className="content">
          {/* Conditional rendering for authentication modes */}
          {mode === "normal" && <h1 className='welcomePrem'>Welcome to Premier League Fantasy!</h1>}
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
        </div>

        {/* Routing */}
        <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/team" element={<Team />} />
        </Routes>

        {/* Error and success messages */}
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      </div>

    </BrowserRouter>
  );
}

export default App;