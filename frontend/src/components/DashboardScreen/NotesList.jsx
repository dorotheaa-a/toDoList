import React from "react";
import NoteCard from "./NoteCard";
import styles from "../../styles/DashboardScreen/NotesList.module.css";

const NotesList = ({ selectedPage }) => {
  const isNotesPage = selectedPage === "notes";
  const notes = [
    {
      title: "Weekly Team Meeting Agenda",
      items: [
        "Project updates from each team",
        "Review pending blockers",
        "Client feedback discussion",
        "Plan next sprint tasks",
        "Open Q&A",
      ],
    },
    {
      title: "Onboarding Checklist",
      items: [
        "Set up company email and accounts",
        "Read team handbook",
        "Attend intro meetings with team leads",
        "Access codebase and tools",
        "Complete first task in project board",
      ],
    },
    {
      title: "Bug Fix Priorities",
      items: [
        "Login page not redirecting",
        "Broken image on dashboard",
        "Notifications not syncing on mobile",
        "CSV export producing empty file",
        "Fix typo in onboarding modal",
      ],
    },
    {
      title: "Quarterly Goals",
      items: [
        "Launch new dashboard feature",
        "Improve system response time by 20%",
        "Increase customer satisfaction score to 90%",
        "Hire 2 new backend engineers",
        "Document all critical processes",
      ],
    },
    {
      title: "Client Presentation Prep",
      items: [
        "Update slides with latest metrics",
        "Add case study section",
        "Rehearse with team twice",
        "Confirm meeting time and platform",
        "Send deck to client ahead of time",
      ],
    },
  ];

  return (
    <section
      className={styles.notesSection}
      style={isNotesPage ? { marginTop: "50px" } : {}}
    >
      <h2 className={styles.sectionTitle}>Notes List</h2>
      <div className={styles.notesGrid}>
        {(isNotesPage ? notes : notes.slice(0, 3)).map((note, index) => (
          <div key={index} className={styles.noteWrapper}>
            <NoteCard {...note} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default NotesList;
