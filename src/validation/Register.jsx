import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

function Register() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    password: "",
    confirmPassword: "",
    gender: "",
    dob: "",
    terms: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("❌ Passwords do not match!");
      return;
    }

    if (!form.terms) {
      alert("❌ You must accept the Terms & Conditions!");
      return;
    }

    localStorage.setItem("user", JSON.stringify(form));
    alert("✅ Registration successful! Please log in.");
    navigate("/"); // Redirect to login
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
          width: "450px",
          borderRadius: "15px",
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div className="text-center mb-3">
          <i
            className="bi bi-person-plus-fill"
            style={{ fontSize: "3rem", color: "#6a11cb" }}
          ></i>
          <h3 className="mt-2">Create Account</h3>
          <p className="text-muted">Fill in your details to register</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-2 input-group">
            <span className="input-group-text bg-light">
              <i className="bi bi-person-fill"></i>
            </span>
            <input
              type="text"
              name="fullName"
              className="form-control"
              placeholder="Full Name"
              value={form.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2 input-group">
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

          <div className="mb-2 input-group">
            <span className="input-group-text bg-light">
              <i className="bi bi-telephone-fill"></i>
            </span>
            <input
              type="tel"
              name="phone"
              className="form-control"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2 input-group">
            <span className="input-group-text bg-light">
              <i className="bi bi-geo-alt-fill"></i>
            </span>
            <input
              type="text"
              name="location"
              className="form-control"
              placeholder="Location"
              value={form.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2 input-group">
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

          <div className="mb-2 input-group">
            <span className="input-group-text bg-light">
              <i className="bi bi-lock-fill"></i>
            </span>
            <input
              type="password"
              name="confirmPassword"
              className="form-control"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <select
              name="gender"
              className="form-select"
              value={form.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="mb-2">
            <label className="form-label">Date of Birth</label>
            <input
              type="date"
              name="dob"
              className="form-control"
              value={form.dob}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-check mb-3">
            <input
              type="checkbox"
              name="terms"
              className="form-check-input"
              checked={form.terms}
              onChange={handleChange}
            />
            <label className="form-check-label">
              I agree to the Terms & Conditions
            </label>
          </div>

          <button
            type="submit"
            className="btn w-100"
            style={{
              background: "linear-gradient(135deg, #6a11cb, #2575fc)",
              color: "white",
              fontWeight: "bold",
            }}
          >
            <i className="bi bi-check-circle-fill me-2"></i> Register
          </button>
        </form>

        <p className="mt-3 text-center">
          Already have an account?{" "}
          <span
            className="fw-bold"
            role="button"
            style={{ color: "#6a11cb" }}
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;
