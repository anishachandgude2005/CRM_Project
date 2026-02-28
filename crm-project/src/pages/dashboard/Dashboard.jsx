import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";

export default function Dashboard() {
  const { state } = useContext(AppContext);
  const user = JSON.parse(localStorage.getItem("user"));

  const totalLeads = state.leads.length;
  const totalCustomers = state.customers.length;

  const pendingTasks = state.tasks.filter(t => !t.completed).length;
  const completedTasks = state.tasks.filter(t => t.completed).length;

  const progressPercent = state.tasks.length
    ? (completedTasks / state.tasks.length) * 100
    : 0;

  // Lead status counts
  const statusCounts = {
    New: 0,
    Contacted: 0,
    Qualified: 0,
    Lost: 0
  };

  state.leads.forEach(l => {
    if (statusCounts[l.status] !== undefined)
      statusCounts[l.status]++;
  });

  const leadChartData = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        data: Object.values(statusCounts),
        backgroundColor: [
          "#4e73df",
          "#f6c23e",
          "#1cc88a",
          "#e74a3b"
        ]
      }
    ]
  };

  const taskChartData = {
    labels: ["Completed", "Pending"],
    datasets: [
      {
        data: [completedTasks, pendingTasks],
        backgroundColor: ["#1cc88a", "#e74a3b"]
      }
    ]
  };

  return (
    <div className="container-fluid">
      <h2 className="mb-2">Dashboard Overview</h2>

      {user && (
        <p className="text-muted mb-4">
          Welcome back, <b>{user.email}</b>
        </p>
      )}

      {/* STAT CARDS */}
      <div className="row g-3">
        <StatCard title="Total Leads" value={totalLeads} icon="👤"
          gradient="linear-gradient(135deg,#4e73df,#224abe)" />

        <StatCard title="Customers" value={totalCustomers} icon="👥"
          gradient="linear-gradient(135deg,#1cc88a,#13855c)" />

        <StatCard title="Pending Tasks" value={pendingTasks} icon="📋"
          gradient="linear-gradient(135deg,#f6c23e,#dda20a)" />

        <StatCard title="Completed Tasks" value={completedTasks} icon="✅"
          gradient="linear-gradient(135deg,#e74a3b,#be2617)" />
      </div>

      {/* RECENT LEADS */}
      <div className="card shadow-sm p-3 mt-4">
        <h5>Recent Leads</h5>
        <table className="table mt-2">
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Assigned To</th>
            </tr>
          </thead>

          <tbody>
            {state.leads.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center">
                  No leads available
                </td>
              </tr>
            ) : (
              state.leads.slice(0, 5).map(lead => (
                <tr key={lead.id}>
                  <td>{lead.name}</td>
                  <td>{lead.status}</td>
                  <td>{lead.assignedTo || "Not Assigned"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* TASK PROGRESS */}
      <div className="card shadow-sm p-3 mt-4">
        <h5>Task Progress</h5>
        <div className="progress mt-3" style={{ height: "22px" }}>
          <div
            className="progress-bar bg-success"
            style={{ width: `${progressPercent}%` }}
          >
            {completedTasks} Completed
          </div>
        </div>
      </div>

      {/* CHARTS */}
      {/* CHARTS */}
<div className="row mt-4">
  <div className="col-md-6 mb-4">
    <div className="card shadow-sm p-3 text-center">
      <h5>Lead Status Distribution</h5>

      <div style={{ height: "260px" }}>
        <Pie
          data={leadChartData}
          options={{ maintainAspectRatio: false }}
        />
      </div>
    </div>
  </div>

  <div className="col-md-6 mb-4">
    <div className="card shadow-sm p-3 text-center">
      <h5>Task Completion</h5>

      <div style={{ height: "260px" }}>
        <Pie
          data={taskChartData}
          options={{ maintainAspectRatio: false }}
        />
      </div>
    </div>
  </div>
</div>

    </div>
  );
}

/* Reusable Card */
function StatCard({ icon, title, value, gradient }) {
  return (
    <div className="col-md-6 mb-4">
      <div
        className="card shadow border-0 p-4 text-white"
        style={{
          borderRadius: "14px",
          minHeight: "130px",
          background: gradient
        }}
      >
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h6>{title}</h6>
            <h2>{value}</h2>
          </div>
          <div style={{ fontSize: "32px", opacity: 0.9 }}>
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
}
