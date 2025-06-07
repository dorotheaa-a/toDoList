import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/Settings.css";
import Notif from "../components/Settings/Notification";
import Security from "../components/Settings/Security";
import User from "../components/Settings/UserProfile";

export default function Setting() {
  const [selectedPage, setSelectedPage] = useState("user");

  const renderContent = () => {
    if (selectedPage === "notifications") {
      return <Notif />;
    }
    if (selectedPage === "security") {
      return <Security />;
    }
    return <User />;
  };

  return (
    <div className="app-container">
      <Sidebar
        variant="expanded"
        onSelect={setSelectedPage}
        selectedPage={selectedPage}
      />
      <div className="main-content">
        <h1 className="header-title">Settings Page</h1>
        <div className="content">{renderContent()}</div>
      </div>
    </div>
  );
}
