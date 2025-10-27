import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "", confirm: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirm) {
      alert("❌ Passwords do not match!");
      return;
    }

    const user = { email: form.email, password: form.password };
    localStorage.setItem("user", JSON.stringify(user));

    alert("✅ Registration successful! Please login.");
    navigate("/login");
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(135deg, #74ebd5 0%, #ACB6E5 100%)",
      }}
    >
      <div
        className="card p-5 shadow-lg border-0"
        style={{
          width: "400px",
          borderRadius: "20px",
          background: "white",
        }}
      >
        <div className="text-center mb-4">
          <i
            className="bi bi-person-plus-fill text-success"
            style={{ fontSize: "3.5rem" }}
          ></i>
          <h3 className="mt-2 fw-bold text-success">Create Account</h3>
          <p className="text-muted mb-0">Register to get started</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              name="email"
              className="form-control form-control-lg"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              name="password"
              className="form-control form-control-lg"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Confirm Password</label>
            <input
              type="password"
              name="confirm"
              className="form-control form-control-lg"
              placeholder="Re-enter your password"
              value={form.confirm}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-success btn-lg w-100 shadow-sm mt-2"
          >
            Register
          </button>

          <p className="text-center mt-3 mb-0">
            Already have an account?{" "}
            <span
              className="text-primary"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
