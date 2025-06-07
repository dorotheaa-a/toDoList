import React, { useState } from "react";
import "../../styles/Settings/NotifSecurity.css";
import { useNavigate } from "react-router-dom";

export default function SecuritySettings() {
  const navigate = useNavigate();

  return (
    <div className="wrapper">
      <p>You will be redirected to a page to change your password</p>
      <button onClick={() => navigate("/reset")}>Change Password</button>
    </div>
  );
}
