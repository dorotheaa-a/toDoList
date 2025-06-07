import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/DashboardScreen.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Note from "./pages/NotePage.jsx";
import ProjectDetails from "./pages/ProjectDetails.jsx";
import Reset from "./pages/PasswordChange.jsx";
import Landing from "./pages/LandingPage.jsx";
import Setting from "./pages/Settings.jsx";
import AddMember from "./pages/UserCard.jsx";
import NotePage from "./pages/NotePage.jsx";

import "./styles/global.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/reset" element={<Reset />} />
      <Route path="/note" element={<Note />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/settings" element={<Setting />} />
      <Route path="/members" element={<AddMember />} />
      <Route path="/project/:id" element={<ProjectDetails />} />
      <Route path="/note/:id" element={<NotePage />} />
      <Route path="/dashboard/notes" element={<Dashboard />} />
      <Route path="/dashboard/projects" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
