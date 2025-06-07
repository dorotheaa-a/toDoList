"use client";
import React from "react";
import styles from "../../styles/DashboardScreen/WelcomeBanner.module.css";
import banner from './duck.jpg';

const WelcomeBanner = () => {

  const getCurrentDate = () => {
    const options = { year: 'numeric', month: 'long', day:'numeric'};
    return new Date().toLocaleDateString('en-US', options);
  }

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
            <p className={styles.date}>Today is {getCurrentDate()}</p>
            <button className={styles.newNoteButton}>Make a New Note</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeBanner;
