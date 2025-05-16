import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/user-context";
import { LANDING_PAGE, USERDASH } from "../constants/routes";
import {
  login,
  register,
  postForgotPassword,
  putResetPassword,
} from "../services";
import Swal from "sweetalert2";
import "../styles/login.css";

export default function Login() {
  const [formData, setFormData] = useState("");
  const { loading, isLoggedIn } = useUser();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/");
  };

  useEffect(() => {
    if (!loading) {
      if (isLoggedIn) {
      } else {
        navigate(LANDING_PAGE);
      }
    }
  }, [isLoggedIn, loading]);

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h1>Log In</h1>
        <p className="subtitle">Log in to adopt a pet.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="submit-button">
            Log In
          </button>
        </form>
        <p className="signup-link">
          Don't have an account? <a href="/create-account">Create Account</a>
        </p>
      </div>
    </div>
  );
}
