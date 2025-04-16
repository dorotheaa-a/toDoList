"use client";
import React from "react";
import Header from "./DashboardScreen/Header";
import WelcomeBanner from "./DashboardScreen/WelcomeBanner";
import NotesList from "./DashboardScreen/NotesList";
import TodoSection from "./DashboardScreen/ToDoSection";
import styles from "../styles/DashboardScreen/DashboardScreen.module.css";

const DashboardScreen = () => {
  return (
    <main className={styles.dashboardScreen}>
      <div className={styles.container}>
        <Header />
        <WelcomeBanner />
        <NotesList />
        <TodoSection />
      </div>
    </main>
  );
};

export default DashboardScreen;
