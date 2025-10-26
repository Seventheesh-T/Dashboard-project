import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (
      storedUser &&
      storedUser.email === form.email &&
      storedUser.password === form.password
    ) {
      alert("✅ Login successful");
      navigate("/dashboard");
    } else {
      alert("❌ Invalid credentials");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(135deg, #6a11cb, #2575fc)",
      }}
    >
      <div
        className="card shadow-lg p-4"
        style={{
          width: "380px",
          borderRadius: "15px",
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div className="text-center mb-4">
          <i
            className="bi bi-person-circle"
            style={{ fontSize: "3rem", color: "#6a11cb" }}
          ></i>
          <h3 className="mt-2">Welcome Back</h3>
          <p className="text-muted">Login to your account</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3 input-group">
            <span className="input-group-text bg-light">
              <i className="bi bi-envelope-fill"></i>
            </span>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3 input-group">
            <span className="input-group-text bg-light">
              <i className="bi bi-lock-fill"></i>
            </span>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="text-end">
            <Link
              to="/Forgotpassword"
              className="text-decoration-none"
              style={{ color: "#6a11cb" }}
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="btn w-100 mt-3"
            style={{
              background: "linear-gradient(135deg, #6a11cb, #2575fc)",
              color: "white",
              fontWeight: "bold",
            }}
          >
            <i className="bi bi-box-arrow-in-right me-2"></i> Login
          </button>
        </form>

        <p className="mt-3 text-center">
          Don't have an account?{" "}
          <span
            className="fw-bold"
            role="button"
            style={{ color: "#6a11cb" }}
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
