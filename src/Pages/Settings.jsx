// src/Pages/Settings.jsx
import React, { useState, useEffect } from "react";

export default function Settings() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [language, setLanguage] = useState(localStorage.getItem("language") || "English");

  // Apply theme to <html> and persist + broadcast
  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
    window.dispatchEvent(new CustomEvent("app-theme-change", { detail: theme }));
  }, [theme]);

  // Persist language + broadcast
  useEffect(() => {
    localStorage.setItem("language", language);
    window.dispatchEvent(new CustomEvent("app-language-change", { detail: language }));
  }, [language]);

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen transition-all">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Settings</h1>

      <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow mb-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Theme</h2>
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          Switch to {theme === "light" ? "Dark" : "Light"} Mode
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Language</h2>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="p-2 border rounded dark:bg-gray-700 dark:text-white"
        >
          <option value="English">English</option>
          <option value="Tamil">Tamil</option>
          <option value="Hindi">Hindi</option>
          <option value="Telugu">Telugu</option>
          <option value="Malayalam">Malayalam</option>
        </select>
      </div>
    </div>
  );
}
