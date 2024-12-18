
import React from "react";

function SignUpForm({ formData, handleInputChange, handleSignUp, setMode }) {
  return (
    <div className="fullscreen-container">
      <h1 className="login-title">Sign Up</h1>
      <form className="form" onSubmit={handleSignUp}>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Enter your username"
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
        <button type="submit" className="login-button">Sign Up</button>
      </form>
      <button type="button" onClick={() => setMode("normal")}>
        Go Back
      </button>
    </div>
  );
}

export default SignUpForm;
