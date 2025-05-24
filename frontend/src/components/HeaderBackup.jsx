import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Header.module.css";
import logo from "../assets/logo_clear.png";
import pfp from "../assets/girl.jpg";
import search from "../assets/magnifying_glass_black.png";

const Header = ({ variant = "dashboard", selectedPage, onPageChange }) => {
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const handleSearchToggle = () => {
    if (searchOpen && query.trim()) {
      handleSearch();
    } else if (searchOpen && !query.trim()) {
      setSearchOpen(false);
    } else {
      setSearchOpen(true);
    }
  };

  const handleSearch = () => {
    alert(`Searching for: ${query}`);
    setSearchOpen(false);
    setQuery("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

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
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Type to search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className={`${styles.searchInput} ${
                searchOpen ? styles.open : ""
              }`}
            />
            <button
              onClick={handleSearchToggle}
              className={styles.searchButton}
            >
              <img src={search} alt="Search" className={styles.searchIcon} />
            </button>
          </div>
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

  const renderLandingButtons = () => (
    <div className={styles.userSection}>
      <button className={styles.signButton} onClick={() => navigate("/signup")}>
        Sign Up
      </button>
      <button className={styles.loginButton} onClick={() => navigate("/login")}>
        Login
      </button>
    </div>
  );

  return (
    <header
      className={
        variant === "dashboard"
          ? styles.header
          : variant === "landing"
          ? styles.headerLanding
          : styles.headerLogin
      }
    >
      <div
        className={
          variant === "dashboard"
            ? styles.headerContent
            : variant === "landing"
            ? styles.headerContentLanding
            : styles.headerContentLogin
        }
      >
        <a
          href={
            variant === "dashboard" || variant === "clean" ? "/dashboard" : "/"
          }
          className={styles.logoButton}
        >
          <img src={logo} alt="Yoda Logo" className={styles.logo} />
        </a>
        {variant === "dashboard"
          ? renderDashboardNav()
          : variant === "clean"
          ? null
          : variant === "landing"
          ? renderLandingButtons()
          : renderAuthButtons()}
      </div>
    </header>
  );
};

export default Header;
