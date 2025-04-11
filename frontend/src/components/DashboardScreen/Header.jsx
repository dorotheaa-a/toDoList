import React from "react";
import styles from "../../styles/DashboardScreen/Header.module.css";
import pfp from './duck.jpg';
import search from './search.png';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <h1 className={styles.logo}>Yoda</h1>
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
        <button className={styles.notificationButton}>
          <img
            src={search}
            alt="Search"
            className={styles.notificationIcon}
          />
        </button>
        <img src={pfp} alt="User profile" className={styles.userAvatar} />
      </div>
    </header>
  );
};

export default Header;
