import React, { useState } from "react";
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

const today = new Date();
const formattedDate = today.toLocaleDateString("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

export default function NotePage() {
  const [editorContent, setEditorContent] = useState(`
    <h1>${formattedDate}</h1>
    <p>Add your notes by typing here...</p>
  `);

  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

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
          <h1 className="header-title">Temporary Title</h1>
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
