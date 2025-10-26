// src/Pages/Customers.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { FaEye, FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function Customers() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const fetchUsers = async () => {
    try {
      const res = await axios.get("https://dummyjson.com/users");
      setUsers(res.data.users);
      setFilteredUsers(res.data.users);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching users:", err);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://dummyjson.com/users/${id}`);
      const updatedList = users.filter(user => user.id !== id);
      setUsers(updatedList);
      setFilteredUsers(updatedList);
      alert(`🗑️ Customer ID ${id} deleted successfully.`);
    } catch (err) {
      console.error("Error deleting customer:", err);
      alert("❌ Failed to delete customer.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const updatedUser = location.state?.updatedUser;
    const newCustomer = location.state?.newCustomer;

    if (updatedUser) {
      const updatedList = users.map(u =>
        u.id === updatedUser.id ? { ...u, ...updatedUser } : u
      );
      setUsers(updatedList);
      setFilteredUsers(updatedList);
    } else if (newCustomer) {
      const updatedList = [newCustomer, ...users];
      setUsers(updatedList);
      setFilteredUsers(updatedList);
    }

    window.history.replaceState({}, document.title);
  }, [location.state]);

  // Filter logic
  useEffect(() => {
    const filtered = users.filter(user => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      return (
        fullName.includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone.includes(searchTerm)
      );
    });
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  if (loading) return <h4 className="text-center mt-5">Loading Customers...</h4>;

  return (
    <div className="container mt-4 mb-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="text-center mb-0">Customers List</h2>
        <button className="btn btn-success" onClick={() => navigate("/customers/create")}>
          ➕ Create Customer
        </button>
      </div>

      {/* Filter/Search Bar */}
      <div className="row mb-4">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name, email, or phone"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <button className="btn btn-secondary w-100" onClick={() => setSearchTerm("")}>
            Filter
          </button>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-bordered align-middle text-center">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map(user => (
                <tr key={user.id}>
                  <td>{`${user.firstName} ${user.lastName}`}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() => navigate(`/customers/${user.id}`)}
                      title="View"
                    >
                      <FaEye />
                    </button>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => navigate(`/customers/edit/${user.id}`)}
                      title="Edit"
                    >
                      <FaRegEdit />
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(user.id)}
                      title="Delete"
                    >
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No customers found matching the search.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Customers;
