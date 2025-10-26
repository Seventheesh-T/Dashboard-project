import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaEye, FaPlus } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoMdSettings } from "react-icons/io";
import { GrProductHunt } from "react-icons/gr";
import { IoPieChartSharp } from "react-icons/io5";
import "bootstrap/dist/css/bootstrap.min.css";

function Sidebar() {
  const location = useLocation();
  const [customerOpen, setCustomerOpen] = useState(location.pathname.startsWith("/customers"));
  const [productOpen, setProductOpen] = useState(location.pathname.startsWith("/products"));

  const linkClass = (path) =>
    `d-flex align-items-center gap-3 px-4 py-3 rounded transition-all
     ${location.pathname === path ? "bg-light text-success fw-bold shadow-sm" : "text-white"} 
     text-decoration-none sidebar-link`;

  return (
    <div
      className="bg-success text-white d-flex flex-column p-4 shadow-lg"
      style={{
        width: "260px",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        overflowY: "auto",
        fontSize: "1.1rem", // Medium size text
      }}
    >
      <h3 className="text-center mb-4 fw-bold border-bottom pb-3"> ADMIN </h3>

      <ul className="list-unstyled">

        {/* Dashboard */}
        <li className="mb-3">
          <Link to="/dashboard" className={linkClass("/dashboard")}>
            <FaHome size={22} /> Dashboard
          </Link>
        </li>

        {/* Charts */}
        <li className="mb-3">
          <Link to="/PieCharts" className={linkClass("/PieCharts")}>
            <IoPieChartSharp size={22} /> Charts
          </Link>
        </li>

        {/* Customers */}
        <li className="mb-3">
          <button
            className="btn btn-success w-100 text-start d-flex justify-content-between align-items-center px-4 py-3 rounded"
            onClick={() => setCustomerOpen(!customerOpen)}
          >
            <span className="d-flex align-items-center gap-3">
              <CgProfile size={22} /> Customers
            </span>
          </button>

          {customerOpen && (
            <ul className="list-unstyled mt-2 ms-4 animate__animated animate__fadeIn">
              <li className="mb-2">
                <Link to="/customers/create" className={linkClass("/customers/create")}>
                  <FaPlus size={20} /> Create
                </Link>
              </li>
              <li>
                <Link to="/customers" className={linkClass("/customers")}>
                  <FaEye size={20} /> View
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Products */}
        <li className="mb-3">
          <button
            className="btn btn-success w-100 text-start d-flex justify-content-between align-items-center px-4 py-3 rounded"
            onClick={() => setProductOpen(!productOpen)}
          >
            <span className="d-flex align-items-center gap-3">
              <GrProductHunt size={22} /> Products
            </span>
          </button>

          {productOpen && (
            <ul className="list-unstyled mt-2 ms-4 animate__animated animate__fadeIn">
              <li className="mb-2">
                <Link to="/products/create" className={linkClass("/products/create")}>
                  <FaPlus size={20} /> Create
                </Link>
              </li>
              <li>
                <Link to="/products" className={linkClass("/products")}>
                  <FaEye size={20} /> View
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Settings */}
        <li>
          <Link to="/settings" className={linkClass("/settings")}>
            <IoMdSettings size={22} /> Settings
          </Link>
        </li>
      </ul>

      {/* Hover effect */}
      <style>
        {`
          .sidebar-link:hover {
            background-color: rgba(255, 255, 255, 0.25);
            transform: translateX(5px);
            transition: all 0.25s ease;
          }
        `}
      </style>
    </div>
  );
}

export default Sidebar;
