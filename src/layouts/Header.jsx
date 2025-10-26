import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUserCircle, FaBars } from 'react-icons/fa';
import { useState, useEffect } from "react";

function Header({ onToggleSidebar }) {
  const [language, setLanguage] = useState(localStorage.getItem("language") || "English");
  const [fullName, setFullName] = useState(localStorage.getItem("fullName") || "");

  useEffect(() => {
    // Listen for language changes
    const onLangChange = (e) =>
      setLanguage(e.detail || localStorage.getItem("language") || "English");
    window.addEventListener("app-language-change", onLangChange);

    // Listen for user login or profile updates
    const onUserChange = () =>
      setFullName(localStorage.getItem("fullName") || "");
    window.addEventListener("user-login", onUserChange);
    window.addEventListener("user-profile-update", onUserChange);

    // Initial fetch from localStorage
    setFullName(localStorage.getItem("fullName") || "");

    return () => {
      window.removeEventListener("app-language-change", onLangChange);
      window.removeEventListener("user-login", onUserChange);
      window.removeEventListener("user-profile-update", onUserChange);
    };
  }, []);

  return (
    <header
      className="text-black shadow-sm sticky-top"
      style={{
        backdropFilter: "blur(10px)",
        background: "rgba(255, 255, 255, 0.7)",
        zIndex: 1030,
        borderBottom: "1px solid rgba(0,0,0,0.1)"
      }}
    >
      <div className="container-fluid d-flex align-items-center justify-content-between px-3 py-2">

        {/* Sidebar Toggle */}
        <button
          className="btn btn-outline-dark rounded-circle d-flex align-items-center justify-content-center"
          style={{ width: "40px", height: "40px", transition: "all 0.3s" }}
          onClick={onToggleSidebar}
          title="Toggle Menu"
        >
          <FaBars />
        </button>

        {/* App Title */}
        <h2
          className="m-0 fw-bold text-center flex-grow-1"
          style={{
            background: "linear-gradient(45deg, #28a745, #17a2b8)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontSize: "1.8rem",
            letterSpacing: "1px"
          }}
        >
          ByteCraft
        </h2>

        {/* Right Side */}
        <div className="d-flex align-items-center gap-3">
          <span className="fw-semibold small px-2 py-1 rounded bg-light shadow-sm">{language}</span>

          {fullName && (
            <span className="fw-bold text-success">{fullName}</span>
          )}

          <FaUserCircle
            size={32}
            className="text-dark"
            style={{ cursor: "pointer", transition: "transform 0.3s" }}
            onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
            title="User Profile"
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
