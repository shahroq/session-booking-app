// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import TherapistDashboard from "./pages/TherapistDashboard";
import ClientDashboard from "./pages/ClientDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      {/* Global Navigation */}
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes for Therapists */}
        <Route element={<ProtectedRoute roles={["therapist"]} />}>
          <Route path="/therapist" element={<TherapistDashboard />} />
        </Route>

        {/* Protected Routes for Clients */}
        <Route element={<ProtectedRoute roles={["client"]} />}>
          <Route path="/client" element={<ClientDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
