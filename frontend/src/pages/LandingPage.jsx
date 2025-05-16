import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <main className="login-main">
        <h1 className="login-title">Welcome</h1>
        <div className="button-container">
          <button className="loginButton" onClick={() => navigate("/login")}>
            Login
          </button>
          <button className="signButton" onClick={() => navigate("/signup")}>
            Signup
          </button>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
