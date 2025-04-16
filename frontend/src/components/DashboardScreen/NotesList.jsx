import React from "react";
import NoteCard from "./NoteCard";
import styles from "../../styles/DashboardScreen/NotesList.module.css";

const NotesList = () => {
  const notes = [
    {
      title: "Meeting Notes",
      items: ["Discuss project updates.", "Review action items."],
    },
    {
      title: "Meeting Notes",
      items: ["Discuss project updates.", "Review action items."],
    },
    {
      title: "Meeting Notes",
      items: ["Discuss project updates.", "Review action items."],
    },
  ];

  return (
    <section className={styles.notesSection}>
      <h2 className={styles.sectionTitle}>Notes List</h2>
      <div className={styles.notesGrid}>
        {notes.map((note, index) => (
          <div key={index} className={styles.noteWrapper}>
            <NoteCard {...note} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default NotesList;
