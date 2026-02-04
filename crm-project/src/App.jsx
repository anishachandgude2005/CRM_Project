import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import Leads from "./pages/leads/Leads";
import Profile from "./pages/profile/Profile";
import ProtectedRoute from "./routes/ProtectedRoute";
import RoleRoute from "./routes/RoleRoute";

// Temporary placeholder pages (Phase 1)

const Customers = () => <h1>Customers Page</h1>;
const Employees = () => <h1>Employees Page</h1>;
const Tasks = () => <h1>Tasks Page</h1>;
const Reports = () => <h1>Reports Page</h1>;
const Settings = () => <h1>Settings Page</h1>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
      {/* Login Page */}
      <Route path="/login" element={<Login />} />
      {/* Protected Layout */}
      <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/Leads" element={<Leads />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/profile" element={<Profile />} />
          {/* Admin Only */}
          <Route
            path="/employees"
            element={
              <RoleRoute roles={["Admin"]}>
                <Employees />
              </RoleRoute>
            }
          />

          {/* Admin + Manager */}
          <Route
            path="/reports"
            element={
              <RoleRoute roles={["Admin", "Manager"]}>
                <Reports />
              </RoleRoute>
            }
          />

          <Route path="/settings" element={<Settings />} />
        </Route>
        
        {/* Default */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

