import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Sidebar.css";
import pfp from "../assets/girl.jpg";
import settingsIcon from "../assets/settings.png";

export default function Sidebar({
  collapsed = false,
  onToggle,
  variant,
  onSelect,
  selectedPage = "",
  onPageChange,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;
  const autoVariant =
    currentPath.startsWith("/settings") ? "expanded" :
    currentPath === "/note" ? "default" :
    "collapsible";

  const sidebarVariant = variant || autoVariant;
  const isCollapsible = sidebarVariant === "collapsible";
  const isExpanded = sidebarVariant === "expanded";

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

      {/* Navigation links */}
      <nav className="nav-links">
        <button
          onClick={() => navigate("/dashboard")}
          className={`nav-item ${currentPath === "/dashboard" ? "active" : ""}`}
        >
          Home
        </button>
        {isExpanded && (
          <>
            <button
              className={`nav-item ${selectedPage === "notifications" ? "active" : ""}`}
              onClick={() => onSelect("notifications")}
            >
              Notifications
            </button>
            <button
              className={`nav-item ${selectedPage === "security" ? "active" : ""}`}
              onClick={() => onSelect("security")}
            >
              Security
            </button>
          </>
        )}
      </nav>

      {/* Settings at the bottom */}
      {isCollapsible && (
        <div className="sidebar-footer">
          <div className="settings-link">
            <img src={settingsIcon} alt="Settings" className="settings-icon" />
            {!collapsed && <span>Settings</span>}
          </div>
        </div>
      )}
    </aside>
  );
}
