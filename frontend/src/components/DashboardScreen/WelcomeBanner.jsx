"use client";
import React from "react";
import styles from "../../styles/DashboardScreen/WelcomeBanner.module.css";
import banner from './duck.jpg';

const WelcomeBanner = () => {
  return (
    <section className={styles.welcomeSection}>
      <div className={styles.bannerContainer}>
        <img
          src={banner}
          alt="Welcome background"
          className={styles.backgroundImage}
        />
        <div className={styles.overlay}>
          <div className={styles.content}>
            <h2 className={styles.title}>Welcome Back!</h2>
            <p className={styles.date}>Today is October 12, 2023</p>
            <button className={styles.newNoteButton}>Make a New Note</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeBanner;
