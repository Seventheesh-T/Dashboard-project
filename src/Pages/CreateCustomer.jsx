// src/Pages/CreateCustomer.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateCustomer() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "", lastName: "", email: "", phone: "", age: "", gender: "", username: ""
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://dummyjson.com/users/add", user);
      alert("✅ Customer created successfully!");
      navigate("/customers", {
        state: { newCustomer: res.data }
      });
    } catch (err) {
      console.error("Error creating customer:", err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg border-0 rounded-4 p-4">
        <h3 className="text-center mb-4">Create New Customer</h3>
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-6">
            <label className="form-label">First Name</label>
            <input type="text" className="form-control" name="firstName" value={user.firstName} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Last Name</label>
            <input type="text" className="form-control" name="lastName" value={user.lastName} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" name="email" value={user.email} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Phone</label>
            <input type="text" className="form-control" name="phone" value={user.phone} onChange={handleChange} required />
          </div>
          <div className="col-md-4">
            <label className="form-label">Age</label>
            <input type="number" className="form-control" name="age" value={user.age} onChange={handleChange} required />
          </div>
          <div className="col-md-4">
            <label className="form-label">Gender</label>
            <select className="form-select" name="gender" value={user.gender} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label">Username</label>
            <input type="text" className="form-control" name="username" value={user.username} onChange={handleChange} required />
          </div>
          <div className="text-center mt-3">
            <button className="btn btn-success px-4" type="submit">Create Customer</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateCustomer;
 
