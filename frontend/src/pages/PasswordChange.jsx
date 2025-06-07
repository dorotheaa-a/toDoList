import React from "react";
import Header from "../components/Header.jsx";
import Footer from "../components/footer.js";
import { useNavigate } from "react-router-dom";

import "../styles/Login.css";

export default function ChangePassword() {
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <Header variant="clean" />

      <main className="login-main">
        <h1 className="login-title">Change Password</h1>
        <form className="login-form">
          <div>
            <label htmlFor="password">Current Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              required
            />
          </div>
          <div>
            <label htmlFor="password">New Password</label>
            <input
              type="password"
              id="passwordNew"
              placeholder="Enter New Password"
              required
            />
          </div>
          <div>
            <label htmlFor="password">Confirm Password</label>
            <input
              type="password"
              id="passwordConfirm"
              placeholder="Confirm New Password"
              required
            />
          </div>
          <div className="button-container">
            <button type="submit" onClick={() => navigate("/settings")}>
              Change Password
            </button>
          </div>
        </form>
      </main>

      {/*<Footer />*/}
    </div>
  );
}
