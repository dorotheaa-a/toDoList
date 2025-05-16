import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/DashboardScreen/WelcomeBanner.module.css";

const WelcomeBanner = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.welcomeSection}>
      <div className={styles.overlay}>
        <div className={styles.content}>
          <h2 className={styles.title}>Welcome!</h2>
          <p className={styles.date}>
            Today is{" "}
            {new Date().toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
          <button
            className={styles.newNoteButton}
            onClick={() => navigate("/note")}
          >
            Make a New Note
          </button>
        </div>
      </div>
    </section>
  );
};

export default WelcomeBanner;
