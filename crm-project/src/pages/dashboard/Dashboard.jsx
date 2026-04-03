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
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { state } = useContext(AppContext);
  const navigate = useNavigate();

  const totalLeads = state.leads.length;
  const totalCustomers = state.customers.length;
  const totalEmployees = state.employees?.length || 0;

  const pendingTasks = state.tasks.filter((t) => !t.completed).length;
  const completedTasks = state.tasks.filter((t) => t.completed).length;

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

  state.leads.forEach((l) => {
    if (statusCounts[l.status] !== undefined) {
      statusCounts[l.status]++;
    }
  });

  const leadChartData = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        data: Object.values(statusCounts),
        backgroundColor: ["#4e73df", "#f6c23e", "#1cc88a", "#e74a3b"]
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
    <div className="container-fluid py-3">
      {/* SUMMARY CARDS */}
      <div className="row g-4">
        <StatCard
          title="Total Leads"
          value={totalLeads}
          icon="👤"
          gradient="linear-gradient(135deg,#4e73df,#224abe)"
        />

        <StatCard
          title="Customers"
          value={totalCustomers}
          icon="👥"
          gradient="linear-gradient(135deg,#1cc88a,#13855c)"
        />

        <StatCard
          title="Pending Tasks"
          value={pendingTasks}
          icon="📋"
          gradient="linear-gradient(135deg,#f6c23e,#dda20a)"
        />

        <StatCard
          title="Completed Tasks"
          value={completedTasks}
          icon="✅"
          gradient="linear-gradient(135deg,#e74a3b,#be2617)"
        />
      </div>

      {/* QUICK ACTIONS */}
      <div
        className="card shadow-sm border-0 p-4 mt-4"
        style={{ borderRadius: "16px" }}
      >
        <h5 className="fw-bold mb-3">Quick Actions</h5>
        <div className="d-flex flex-wrap gap-3">
          <button
            className="btn btn-primary"
            onClick={() => navigate("/leads")}
          >
            + Add Lead
          </button>

          <button
            className="btn btn-success"
            onClick={() => navigate("/customers")}
          >
            + Add Customer
          </button>

          <button
            className="btn btn-warning text-dark"
            onClick={() => navigate("/tasks")}
          >
            + Create Task
          </button>

          <button
            className="btn btn-dark"
            onClick={() => navigate("/employees")}
          >
            + Add Employee
          </button>
        </div>
      </div>

      {/* CHARTS */}
      <div className="row mt-4">
        <div className="col-md-6 mb-4">
          <div
            className="card shadow-sm border-0 p-4 text-center h-100"
            style={{ borderRadius: "16px" }}
          >
            <h5 className="fw-bold mb-3">Lead Status Distribution</h5>
            <div style={{ height: "280px" }}>
              <Pie
                data={leadChartData}
                options={{ maintainAspectRatio: false }}
              />
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div
            className="card shadow-sm border-0 p-4 text-center h-100"
            style={{ borderRadius: "16px" }}
          >
            <h5 className="fw-bold mb-3">Task Completion</h5>
            <div style={{ height: "280px" }}>
              <Pie
                data={taskChartData}
                options={{ maintainAspectRatio: false }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* TASK PROGRESS + EMPLOYEE INFO */}
      <div className="row mt-2">
        <div className="col-md-8 mb-4">
          <div
            className="card shadow-sm border-0 p-4 h-100"
            style={{ borderRadius: "16px" }}
          >
            <h5 className="fw-bold">Task Progress</h5>
            <div
              className="progress mt-4"
              style={{ height: "24px", borderRadius: "20px" }}
            >
              <div
                className="progress-bar bg-success fw-bold"
                style={{ width: `${progressPercent}%` }}
              >
                {completedTasks} Completed
              </div>
            </div>

            <div className="mt-3 d-flex gap-4 flex-wrap">
              <span><b>Pending:</b> {pendingTasks}</span>
              <span><b>Completed:</b> {completedTasks}</span>
              <span><b>Total Tasks:</b> {state.tasks.length}</span>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div
            className="card shadow-sm border-0 p-4 h-100 text-center"
            style={{ borderRadius: "16px" }}
          >
            <h5 className="fw-bold">Employee Summary</h5>
            <h1 className="mt-3 text-primary">{totalEmployees}</h1>
            <p className="text-muted">Total Employees</p>
          </div>
        </div>
      </div>

      {/* RECENT LEADS */}
      <div
        className="card shadow-sm border-0 p-4 mt-2"
        style={{ borderRadius: "16px" }}
      >
        <h5 className="fw-bold mb-3">Recent Leads</h5>

        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Assigned To</th>
              </tr>
            </thead>

            <tbody>
              {state.leads.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center text-muted">
                    No leads available
                  </td>
                </tr>
              ) : (
                state.leads.slice(0, 5).map((lead) => (
                  <tr key={lead.id}>
                    <td>{lead.name}</td>
                    <td>
                      <span className="badge bg-info text-dark">
                        {lead.status}
                      </span>
                    </td>
                    <td>{lead.assignedTo || "Not Assigned"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* RECENT ACTIVITY */}
      <div
        className="card shadow-sm border-0 p-4 mt-4"
        style={{ borderRadius: "16px" }}
      >
        <h5 className="fw-bold mb-3">Recent Activity</h5>

        {state.notifications?.length > 0 ? (
          <ul className="list-group list-group-flush">
            {state.notifications.slice(-5).reverse().map((note) => (
              <li key={note.id} className="list-group-item px-0">
                <div className="fw-semibold">{note.message}</div>
                <small className="text-muted">{note.time}</small>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted mb-0">No recent activity available.</p>
        )}
      </div>
    </div>
  );
}

/* REUSABLE CARD */
function StatCard({ icon, title, value, gradient }) {
  return (
    <div className="col-md-6 col-lg-3">
      <div
        className="card shadow border-0 p-4 text-white h-100"
        style={{
          borderRadius: "16px",
          minHeight: "140px",
          background: gradient
        }}
      >
        <div className="d-flex justify-content-between align-items-center h-100">
          <div>
            <h6 className="mb-2">{title}</h6>
            <h2 className="fw-bold">{value}</h2>
          </div>
          <div style={{ fontSize: "34px", opacity: 0.9 }}>
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
}