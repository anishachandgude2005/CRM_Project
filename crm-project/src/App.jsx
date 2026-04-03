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
import Notifications from "./pages/notification/Notification";
import NotificationPopup from "./components/NotificationPopup";

function App() {
  return (
    <BrowserRouter>

      {/* 🔔 GLOBAL POPUP (IMPORTANT PLACE) */}
      <NotificationPopup />

      <Routes>

        {/* 🔓 Public Route */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />  {/* ✅ FIXED */}

        {/* 🔐 Protected Layout */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
<<<<<<< HEAD
          {/* 📊 Pages */}
=======
          
>>>>>>> 7b12cd6caf90e60bd7ac1b33729edaef1f2f41e3
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/leads" element={<Leads />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/notification" element={<Notifications />} />
          <Route path="/settings" element={<Settings />} />

          {/* 👨‍💼 Admin Only */}
          <Route
            path="/employees"
            element={
              <RoleRoute roles={["Admin"]}>
                <Employees />
              </RoleRoute>
            }
          />

          {/* 📊 Admin + Manager */}
          <Route
            path="/reports"
            element={
              <RoleRoute roles={["Admin", "Manager"]}>
                <Reports />
              </RoleRoute>
            }
          />
        </Route>

        {/* 🔁 Redirects */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;