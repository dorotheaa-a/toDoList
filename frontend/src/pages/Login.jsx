import React from "react";
import Header from "../components/Header.jsx";
import Footer from "../components/footer.js";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      alert("Invalid email format");
      return;
    }

    navigate("/dashboard");
  };

  return (
    <div className="login-container">
      <Header variant="login" />
      <main className="login-main">
        <h1 className="login-title">Login</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Email"
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              required
            />
          </div>
          <div className="button-container">
            <button type="submit">Login</button>
          </div>
        </form>
      </main>
      {/* <Footer /> */}
    </div>
  );
}
