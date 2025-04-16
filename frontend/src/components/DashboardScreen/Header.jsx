import React from "react";
import styles from "../../styles/DashboardScreen/Header.module.css";
import pfp from "../../assets/duck.jpg";
import search from "../../assets/magnifying_glass_black.png";
import logo from "../../assets/logo_clear.png";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <a href="/" className={styles.logoButton}>
          <img src={logo} alt="Yoda Logo" className={styles.logo} />
        </a>
        <nav className={styles.navigation}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <a href="#" className={`${styles.navLink} ${styles.active}`}>
                Dashboard
                <div className={styles.activeIndicator} />
              </a>
            </li>
            <li className={styles.navItem}>
              <a href="#" className={styles.navLink}>
                Notes
              </a>
            </li>
            <li className={styles.navItem}>
              <a href="#" className={styles.navLink}>
                Projects
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className={styles.userSection}>
        <button className={styles.searchButton}>
          <img src={search} alt="Search" className={styles.searchButton} />
        </button>
        <img src={pfp} alt="User profile" className={styles.userAvatar} />
      </div>
    </header>
  );
};

export default Header;
