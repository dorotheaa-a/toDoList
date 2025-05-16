import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Sidebar.css";
import pfp from "../assets/duck.jpg";
import settingsIcon from "../assets/settings.png";

export default function Sidebar({
  collapsed = false,
  onToggle,
  variant = "default",
  onSelect,
  selectedPage,
}) {
  const navigate = useNavigate();
  const isCollapsible = variant === "collapsible";
  const isExpanded = variant === "expanded";

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : "expanded"}`}>
      {/* Sidebar header */}
      <div className="sidebar-top">
        <div className="username">
          <img src={pfp} alt="User profile" className="userAvatar" />
          {!collapsed && <span className="username-label">Username</span>}
        </div>
        {isCollapsible && (
          <button className="collapse-btn" onClick={onToggle}>
            {collapsed ? "▶" : "◀"}
          </button>
        )}
      </div>

      <nav className="nav-links">
        <div
          onClick={() => navigate("/dashboard")}
          className="nav-item"
          style={{ cursor: "pointer" }}
        >
          Home
        </div>
        {isExpanded && (
          <>
            <div
              className={`nav-item ${
                selectedPage === "user" ? "active" : ""
              }`}
              style={{ cursor: "pointer" }}
              onClick={() => onSelect("user")}
            >
              User Profile
            </div>
            <div
              className={`nav-item ${
                selectedPage === "notifications" ? "active" : ""
              }`}
              style={{ cursor: "pointer" }}
              onClick={() => onSelect("notifications")}
            >
              Notifications
            </div>
            <div
              className={`nav-item ${
                selectedPage === "security" ? "active" : ""
              }`}
              style={{ cursor: "pointer" }}
              onClick={() => onSelect("security")}
            >
              Security
            </div>
            <div
              className={`nav-item ${selectedPage === "log" ? "active" : ""}`}
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              Log Out
            </div>
          </>
        )}
      </nav>

      {isCollapsible && (
        <div className="sidebar-footer">
          <div className="settings-link">
            <img
              src={settingsIcon}
              alt="Settings"
              className="settings-icon"
              onClick={() => navigate("/settings")}
            />
            {!collapsed && (
              <span onClick={() => navigate("/settings")}>Settings</span>
            )}
          </div>
        </div>
      )}
    </aside>
  );
}
