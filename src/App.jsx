// src/App.jsx
import React, { useState } from "react";
import Login from "./components/Login";
import ClubDirectory from "./components/ClubDirectory";
import ClubDashboard from "./components/ClubDashboard";

export default function App() {
  const [role, setRole] = useState(null); // role: "admin" or "student"

  if (!role) {
    return <Login onLogin={(role) => setRole(role)} />;
  }

  if (role === "admin") {
    return <ClubDashboard />;
  }

  if (role === "student") {
    return <ClubDirectory />;
  }

  return <div>Invalid role</div>;
}
