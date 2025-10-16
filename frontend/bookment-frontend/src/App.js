import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import AdminPanel from "./pages/AdminPanel";
import { useAuth } from "./contexts/AuthContext";

function App() {
  const { token } = useAuth();

  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={ token ? <Dashboard /> : <Navigate to="/login" /> } />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={ token ? <AdminPanel /> : <Navigate to="/login" /> } />
        </Routes>
      </div>
    </>
  );
}

export default App;
