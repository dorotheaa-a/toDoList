import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../styles/NotePage/NotePage.css";
import coverImage from "../assets/NotePageBanner.jpg";

const toolbarOptions = [
  [{ header: [1, 2, 3, false] }],
  [{ size: ["small", false, "large", "huge"] }],
  ["bold", "italic", "underline", "strike"],
  [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
  [{ script: "sub" }, { script: "super" }],
  [{ direction: "rtl" }],
  [{ color: [] }, { background: [] }],
  [{ font: [] }],
  [{ align: [] }],
  ["link"],
  ["clean"],
];

export default function NotePage() {
  const { id } = useParams();
  const [editorContent, setEditorContent] = useState("");
  const [title, setTitle] = useState("Untitled Note");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [noteData, setNoteData] = useState(null);

  useEffect(() => {
    const savedNote = JSON.parse(localStorage.getItem("selectedNote"));
    if (id === "new") {
      const today = new Date();
      const formattedDate = today.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });

      const defaultTitle = `New Note - ${formattedDate}`;
      const html = `<p>${formattedDate} <br>Add your notes by typing here...</p>`;

      setNoteData({ id: "new", title: defaultTitle, items: [] });
      setTitle(defaultTitle);
      setEditorContent(html);
    } else if (savedNote && savedNote.id === id) {
      const html = `<ul>${savedNote.items
        .map((item) => `<li>${item}</li>`)
        .join("")}</ul>`;
      setNoteData(savedNote);
      setTitle(savedNote.title);
      setEditorContent(html);
    }
  }, [id]);

  if (!noteData) {
    return <div className="main-content">Note not found or expired.</div>;
  }

  return (
    <div
      className={`app-container ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}
    >
      <Sidebar
        variant="collapsible"
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed((prev) => !prev)}
      />

      <main className="main-content">
        <header className="page-header">
          <button
            className="collapse-btn"
            onClick={() => setSidebarCollapsed((prev) => !prev)}
          >
            {sidebarCollapsed ? "▶" : "◀"}
          </button>
          <input
            className="header-title-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title..."
          />
        </header>

        <div className="note-cover">
          <img src={coverImage} alt="Note cover" className="cover-img" />
        </div>

        <div className="page-wrapper">
          <div className="custom-quill">
            <ReactQuill
              theme="snow"
              value={editorContent}
              onChange={setEditorContent}
              modules={{ toolbar: toolbarOptions }}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
