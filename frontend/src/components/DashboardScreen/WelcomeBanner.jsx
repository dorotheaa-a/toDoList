"use client";
import React from "react";
import styles from "../../styles/DashboardScreen/WelcomeBanner.module.css";

const WelcomeBanner = () => {
  return (
    <section className={styles.welcomeSection}>
      <div className={styles.overlay}>
        <div className={styles.content}>
          <h2 className={styles.title}>Welcome Back!</h2>
          <p className={styles.date}>
            Today is{" "}
            {new Date().toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
          <button className={styles.newNoteButton}>Make a New Note</button>
        </div>
      </div>
    </section>
  );
};

export default WelcomeBanner;
