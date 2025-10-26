// src/layouts/Layouts.jsx
import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Layouts() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="d-flex">
      {/* Sidebar */}
      {isSidebarOpen && (
        <div
          style={{
            flexShrink: 0,
            width: "260px",
            transition: "all 0.3s ease-in-out",
            zIndex: 1000,
          }}
        >
          <Sidebar />
        </div>
      )}

      {/* Main Content Area */}
      <div
        className="flex-grow-1 d-flex flex-column"
        style={{
          minHeight: "100vh",
          background: "linear-gradient(to bottom, #f8f9fa, #e9ecef)",
          transition: "margin-left 0.3s ease-in-out",
          marginLeft: isSidebarOpen ? "0" : "0",
        }}
      >
        {/* Header */}
        <Header onToggleSidebar={toggleSidebar} />

        {/* Page Content */}
        <main className="flex-grow-1 p-4">
          <div
            className="p-4 bg-white shadow-sm rounded"
            style={{ minHeight: "calc(100vh - 160px)" }}
          >
            <Outlet />
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default Layouts;
