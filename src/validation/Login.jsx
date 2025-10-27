import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function Login({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      alert("❌ No user found. Please register first.");
      return;
    }

    if (storedUser.email !== form.email) {
      alert("❌ Email does not match.");
      return;
    }

    if (storedUser.password !== form.password) {
      alert("❌ Password does not match.");
      return;
    }

    localStorage.setItem("isAuthenticated", "true");
    setIsAuthenticated(true);
    alert("✅ Login Successful!");
    navigate("/dashboard");
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
            className="bi bi-person-circle text-primary"
            style={{ fontSize: "3.5rem" }}
          ></i>
          <h3 className="mt-2 fw-bold text-primary">Welcome Back</h3>
          <p className="text-muted mb-0">Login to access your dashboard</p>
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

          <div className="mb-3 position-relative">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              name="password"
              className="form-control form-control-lg pe-5"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <i
              className="bi bi-lock-fill position-absolute"
              style={{
                right: "15px",
                top: "50%",
                transform: "translateY(20%)",
                color: "#6c757d",
              }}
            ></i>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg w-100 shadow-sm mt-2"
          >
            Login
          </button>

          <p className="text-center mt-3 mb-0">
            Don’t have an account?{" "}
            <span
              className="text-success"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
