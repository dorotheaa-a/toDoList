import React, { useState } from "react";
import NoteCard from "./NoteCard";
import styles from "../../styles/DashboardScreen/NotesList.module.css";

const NotesList = ({ selectedPage }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const isNotesPage = selectedPage === "notes";

  const notes = [
    {
      id: "181202",
      title: "Make Projects and Notes Seperate Pages",
      items: [
        "dashboard/notes",
        "dashboard/projects",
        "Make it so that can use the header",
      ],
    },
    {
      id: "1",
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
      id: "2",
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
      id: "3",
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
      id: "4",
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
      id: "5",
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

  const filteredNotes = isNotesPage
    ? notes.filter(
        (note) =>
          note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          note.items.some((item) =>
            item.toLowerCase().includes(searchQuery.toLowerCase())
          )
      )
    : notes.slice(0, 3);

  return (
    <section
      className={styles.notesSection}
      style={isNotesPage ? { marginTop: "50px" } : {}}
    >
      <h2 className={styles.sectionTitle}>Notes List</h2>
      {isNotesPage && (
        <div className={styles.headerRow}>
          <input
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      )}
      <div className={styles.notesGrid}>
        {filteredNotes.map((note) => (
          <div key={note.id} className={styles.noteWrapper}>
            <NoteCard {...note} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default NotesList;
