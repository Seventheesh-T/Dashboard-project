// src/Pages/EditCustomer.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { FaUserEdit } from "react-icons/fa";

function EditCustomer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState({
    firstName: "", lastName: "", email: "", phone: "", age: "",
    gender: "", username: "",
    address: { address: "", city: "", postalCode: "", state: "" }
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`https://dummyjson.com/users/${id}`);
        const data = res.data;
        setUser({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          age: data.age,
          gender: data.gender,
          username: data.username,
          address: {
            address: data.address?.address || "",
            city: data.address?.city || "",
            postalCode: data.address?.postalCode || "",
            state: data.address?.state || ""
          }
        });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in user.address) {
      setUser({ ...user, address: { ...user.address, [name]: value } });
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://dummyjson.com/users/${id}`, user);
      alert("✅ Customer updated successfully!");

      const updatedData = { id: Number(id), ...user };

      if (location.state?.from === "details") {
        navigate(`/customers/${id}`, {
          state: { updatedUser: updatedData }
        });
      } else {
        navigate("/customers", {
          state: { updatedUser: updatedData }
        });
      }
    } catch (err) {
      console.error("Error updating customer:", err);
    }
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  return (
      <>
      <button className="btn btn-secondary" onClick={() => {navigate(-1)}}>Back</button>
    
    <div className="container mt-5 mb-4">
      <div className="card shadow-lg p-4">
        <div className="text-center mb-4">
          <h3 className="fw-bold"><FaUserEdit className="me-2" />Edit Customer</h3>
        </div>
        

        <form onSubmit={handleSubmit} className="row g-4">
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
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label">Username</label>
            <input type="text" className="form-control" name="username" value={user.username} onChange={handleChange} required />
          </div>

          {/* ✅ Address Section */}
          <div className="col-md-6">
            <label className="form-label">Street Address</label>
            <input type="text" className="form-control" name="address" value={user.address.address} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">City</label>
            <input type="text" className="form-control" name="city" value={user.address.city} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Postal Code</label>
            <input type="text" className="form-control" name="postalCode" value={user.address.postalCode} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">State</label>
            <input type="text" className="form-control" name="state" value={user.address.state} onChange={handleChange} required />
          </div>

          <div className="text-center mt-4">
            <button className="btn btn-success px-5 py-2 rounded-pill" type="submit">
              Update Customer
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}

export default EditCustomer;
