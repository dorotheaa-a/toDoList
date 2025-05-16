import React from "react";
import NoteCard from "./NoteCard";
import styles from "../../styles/DashboardScreen/NotesList.module.css";

const NotesList = ({ selectedPage }) => {
  const isNotesPage = selectedPage === "notes";
  const notes = [
    {
      title: "Project Page",
      items: [
        'Finish the "All Projects" tab',
        "Make add project right side sidebar",
        "Uh might need to make all the project buttons unless I can href?",
      ],
    },
    {
      title: "Landing Page?",
      items: ["Do we need one? Maybe?", "Probably need to make one"],
    },
    {
      title: "Improve Public Speaking Skills",
      items: [
        "Join a speaking club",
        "Record practice sessions",
        "Learn from TED Talks",
      ],
    },
    {
      title: "Build a Healthy Morning Routine",
      items: [
        "Wake up early",
        "Exercise for 30 minutes",
        "Learn from wellness podcasts",
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
