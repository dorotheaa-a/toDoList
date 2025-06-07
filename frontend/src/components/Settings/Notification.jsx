import React, { useState } from "react";
import "../../styles/Settings/NotifSecurity.css"

export default function NotificationSettings() {
  return (
    <div className="wrapper">
      <p>Select your notification type:</p>
      <select>
        <option value="email">Email</option>
        <option value="text">Text</option>
      </select>
    </div>
  );
}
