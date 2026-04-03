import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import Leads from "./pages/leads/Leads";
import Profile from "./pages/profile/Profile";
import ProtectedRoute from "./routes/ProtectedRoute";
import RoleRoute from "./routes/RoleRoute";
import Customers from "./pages/Customer/Customers";
import Tasks from "./pages/tasks/Tasks";
import Employees from "./pages/employees/Employees";
import Reports from "./pages/reports/Reports";
import Settings from "./pages/Settings";
import Notifications from './pages/notification/Notification';
import NotificationPopup from "./components/NotificationPopup";
// Temporary placeholder pages (Phase 1)

//  const Reports = () => <h1>Reports Page</h1>;


function App() {
  return (
    <BrowserRouter>

      {/* ✅ CORRECT PLACE */}
      <NotificationPopup />

      <Routes>
        {/* Login Page */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />  {/* ✅ FIXED */}

        {/* Protected Layout */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/leads" element={<Leads />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/notification" element={<Notifications />} />

          <Route
            path="/employees"
            element={
              <RoleRoute roles={["Admin"]}>
                <Employees />
              </RoleRoute>
            }
          />

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

