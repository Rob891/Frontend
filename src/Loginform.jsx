// LoginForm.jsx
import React from "react";

function LoginForm({ formData, handleInputChange, handleLogin, setMode }) {
  return (
    <div className="fullscreen-container">
      <h1 className="login-title">Log In</h1>
      <form className="form" onSubmit={handleLogin}>
        <div className="input-group">
          <label htmlFor="email">Email or Username</label>
          <input
            type="text"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email or username"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" className="login-button">Log In</button>
      </form>
      <button type="button" onClick={() => setMode("normal")}>
        Go Back
      </button>
    </div>
  );
}

export default LoginForm;
