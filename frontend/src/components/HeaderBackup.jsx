import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Header.module.css";
import logo from "../assets/logo_clear.png";
import pfp from "../assets/duck.jpg";
import search from "../assets/magnifying_glass_black.png";

const Header = ({ variant = "dashboard", selectedPage, onPageChange }) => {
  const navigate = useNavigate();

  const renderAuthButtons = () => (
    <div className={styles.userSection}>
      {variant === "signup" ? (
        <button
          className={styles.loginButton}
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      ) : variant === "login" ? (
        <button
          className={styles.signButton}
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </button>
      ) : null}
    </div>
  );

  const renderDashboardNav = () => (
    <>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <a href="/dashboard" className={styles.logoButton}>
            <img src={logo} alt="Yoda Logo" className={styles.logo} />
          </a>
          <nav className={styles.navigation}>
            <ul className={styles.navList}>
              <li className={styles.navItem}>
                <button
                  className={`${styles.navLink} ${
                    selectedPage === "dashboard" ? styles.active : ""
                  }`}
                  onClick={() => onPageChange("dashboard")}
                >
                  Dashboard
                </button>
              </li>
              <li className={styles.navItem}>
                <button
                  className={`${styles.navLink} ${
                    selectedPage === "notes" ? styles.active : ""
                  }`}
                  onClick={() => onPageChange("notes")}
                >
                  Notes
                </button>
              </li>
              <li className={styles.navItem}>
                <button
                  className={`${styles.navLink} ${
                    selectedPage === "projects" ? styles.active : ""
                  }`}
                  onClick={() => onPageChange("projects")}
                >
                  Projects
                </button>
              </li>
            </ul>
          </nav>
        </div>
        <div className={styles.userSection}>
          <button className={styles.searchButton}>
            <img src={search} alt="Search" className={styles.searchButton} />
          </button>
          <img
            src={pfp}
            alt="User profile"
            className={styles.userAvatar}
            onClick={() => navigate("/settings")}
          />
        </div>
      </header>
    </>
  );

  return (
    <header
      className={variant === "dashboard" ? styles.header : styles.headerLogin}
    >
      <div
        className={
          variant === "dashboard"
            ? styles.headerContent
            : styles.headerContentLogin
        }
      >
        {variant === "clean" ? (
          <a href="/dashboard" className={styles.logoButton}>
            <img src={logo} alt="Yoda Logo" className={styles.logo} />
          </a>
        ) : (
          <a href="/" className={styles.logoButton}>
            <img src={logo} alt="Yoda Logo" className={styles.logo} />
          </a>
        )}
        {variant === "dashboard"
          ? renderDashboardNav()
          : variant === "clean"
          ? null
          : renderAuthButtons()}
      </div>
    </header>
  );
};

export default Header;
