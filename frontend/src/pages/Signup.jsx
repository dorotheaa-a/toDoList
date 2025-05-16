import React from "react";
import Header from "../components/Header.jsx";
import Footer from "../components/footer.js";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

export default function Signup() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const passwordRe = e.target.passwordRe.value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      alert("Invalid email format");
      return;
    }

    if (password !== passwordRe) {
      alert("Passwords do not match");
      return;
    }

    navigate("/dashboard");
  };

  return (
    <div className="login-container">
      <Header variant="signup" />
      <main className="login-main">
        <h1 className="login-title">Sign up</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter Name"
              required
            />
          </div>
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
              placeholder="Enter Password"
              required
            />
          </div>
          <div>
            <label htmlFor="passwordRe">Confirm Password</label>
            <input
              type="password"
              id="passwordRe"
              name="passwordRe"
              placeholder="Confirm Password"
              required
            />
          </div>
          <div className="button-container">
            <button type="submit">Create Account</button>
          </div>
        </form>
      </main>

      {/* <Footer /> */}
    </div>
  );
}
