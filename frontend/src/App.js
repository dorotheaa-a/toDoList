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

import PrivateRoute from "./components/PrivateRoute.jsx";
import "./styles/global.css";

function App() {
  return (
    <Routes>
      {/*Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/reset" element={<Reset />} />

      {/*Protected ones */}
      <Route path="/note" element={<PrivateRoute><Note /></PrivateRoute>} />
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/settings" element={<PrivateRoute><Setting /></PrivateRoute>} />
      <Route path="/members" element={<PrivateRoute><AddMember /></PrivateRoute>} />
      <Route path="/project/:id" element={<PrivateRoute><ProjectDetails /></PrivateRoute>} />
      <Route path="/note/:id" element={<PrivateRoute><NotePage /></PrivateRoute>} />
      <Route path="/dashboard/notes" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/dashboard/projects" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
   </Routes>
  );
}

export default App;
