import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import Leads from "./pages/leads/Leads";

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

        {/* Main Layout */}
        <Route element={<MainLayout />}>

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/Leads" element={<Leads />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/reports" element={<Reports />} />
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

