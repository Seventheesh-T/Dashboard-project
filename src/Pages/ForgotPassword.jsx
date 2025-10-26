// src/Pages/ForgotPassword.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`🔐 Reset link sent to ${email}`);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        {/* ✅ Small Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="btn btn-outline-secondary btn-sm mb-3"
          style={{ width: "fit-content" }}
        >
          ← Back
        </button>

        <h4 className="text-center mb-3">Forgot Password</h4>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Enter your email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
