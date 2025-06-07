import React, { useState } from "react";
import Header from "../components/Header";
import WelcomeBanner from "../components/DashboardScreen/WelcomeBanner";
import NotesList from "../components/DashboardScreen/NotesList";
import TodoSection from "../components/DashboardScreen/ToDoSection";
import styles from "../styles/DashboardScreen/DashboardScreen.module.css";
import Project from "../components/DashboardScreen/Project";

const DashboardScreen = () => {
  const [selectedPage, setSelectedPage] = useState("dashboard");

  return (
    <main className={styles.dashboardScreen}>
      <div className={styles.container}>
        <Header
          selectedPage={selectedPage}
          onPageChange={setSelectedPage}
          variant="dashboard"
        />
        {selectedPage === "dashboard" && (
          <>
            <WelcomeBanner />
            <NotesList />
            <TodoSection />
          </>
        )}
        {selectedPage === "notes" && (
          <>
            <NotesList selectedPage={selectedPage} />
          </>
        )}
        {selectedPage === "projects" && (
          <>
            <Project selectedPage={selectedPage} />
          </>
        )}
      </div>
    </main>
  );
};

export default DashboardScreen;
