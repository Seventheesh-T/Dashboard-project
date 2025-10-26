// src/Pages/CustomersDB.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { FaUserCircle, FaArrowLeft, FaEdit, FaEnvelope, FaPhoneAlt, FaUserTag } from "react-icons/fa";

function CustomersDB() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await axios.get(`https://dummyjson.com/users/${id}`);
      setUser(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching user:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location.state?.updatedUser) {
      setUser(location.state.updatedUser);
      setLoading(false);
    } else {
      fetchUser();
    }
  }, [id, location.state]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading Customer...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4 mb-5">
      <button className="btn btn-outline-dark mb-3" onClick={() => navigate(-1)}>
        <FaArrowLeft className="me-2" /> Back
      </button>

      <div className="card shadow-lg border-0 rounded-4 p-4 animate__animated animate__fadeIn bg-light">
        <div className="row g-4 align-items-center">
          
          {/* Profile Section */}
          <div className="col-md-4 text-center border-end">
            <FaUserCircle size={110} className="text-secondary mb-3" />
            <h4 className="fw-bold text-primary">
              {user.firstName} {user.lastName}
            </h4>
            <span className={`badge px-3 py-2 ${user.gender === "male" ? "bg-primary" : "bg-danger"}`}>
              {user.gender}
            </span>

            <div className="mt-3">
              <button
                className="btn btn-warning btn-sm px-4"
                onClick={() =>
                  navigate(`/customers/edit/${user.id}`, {
                    state: { from: "details" },
                  })
                }
              >
                <FaEdit className="me-2" />
                Edit Customer
              </button>
            </div>
          </div>

          {/* Details Section */}
          <div className="col-md-8">
            <div className="row g-3">
              <div className="col-md-6">
                <p className="mb-2">
                  <FaEnvelope className="me-2 text-secondary" />
                  <strong>Email:</strong> {user.email}
                </p>
                <p className="mb-2">
                  <FaPhoneAlt className="me-2 text-secondary" />
                  <strong>Phone:</strong> {user.phone}
                </p>
                <p className="mb-2">
                  <FaUserTag className="me-2 text-secondary" />
                  <strong>Username:</strong> {user.username}
                </p>
                <p className="mb-2">
                  <strong>Age:</strong> {user.age}
                </p>
              </div>

              <div className="col-md-6">
                <p className="mb-2">
                  <strong>Company:</strong> {user.company?.name || "N/A"}
                </p>
                <p className="mb-2">
                  <strong>Address:</strong><br />
                  {user.address?.address || "N/A"}, {user.address?.city || ""}<br />
                  {user.address?.state || ""}, {user.address?.postalCode || ""}
                </p>
              </div>
            </div>

            <hr />
            <div className="text-end text-muted">
              <small>Customer ID: #{user.id}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomersDB;
