import React, { useContext, useMemo, useState } from "react";
import { AppContext } from "../../context/AppContext";
import {
  FaFileExport,
  FaUsers,
  FaUserCheck,
  FaUserTimes,
  FaChartLine,
  FaSearch,
  FaFilter
} from "react-icons/fa";

export default function Reports() {
  const { state } = useContext(AppContext);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [employee, setEmployee] = useState("");
  const [search, setSearch] = useState("");

  /* ---------- FILTER LEADS ---------- */
  const filteredLeads = state.leads.filter((lead) => {
    const leadDate = lead.createdAt ? new Date(lead.createdAt) : null;

    if (fromDate && leadDate && leadDate < new Date(fromDate)) return false;
    if (toDate && leadDate && leadDate > new Date(toDate)) return false;
    if (employee && lead.assignedTo !== employee) return false;

    if (
      search &&
      !lead.name.toLowerCase().includes(search.toLowerCase()) &&
      !lead.email.toLowerCase().includes(search.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  /* ---------- STATUS COUNT ---------- */
  const statusCounts = {
    New: 0,
    Contacted: 0,
    Qualified: 0,
    Lost: 0
  };

  filteredLeads.forEach((lead) => {
    if (statusCounts[lead.status] !== undefined) {
      statusCounts[lead.status]++;
    }
  });

  /* ---------- ANALYTICS ---------- */
  const totalLeads = filteredLeads.length;
  const qualifiedLeads = statusCounts.Qualified;
  const lostLeads = statusCounts.Lost;
  const conversionRate = totalLeads
    ? ((qualifiedLeads / totalLeads) * 100).toFixed(1)
    : 0;

  const assignedLeads = filteredLeads.filter((l) => l.assignedTo).length;
  const unassignedLeads = filteredLeads.filter((l) => !l.assignedTo).length;

  /* ---------- TOP PERFORMING EMPLOYEE (BASED ON QUALIFIED LEADS) ---------- */
  const topEmployeeData = useMemo(() => {
    const counts = {};

    filteredLeads.forEach((lead) => {
      if (lead.assignedTo && lead.status === "Qualified") {
        counts[lead.assignedTo] = (counts[lead.assignedTo] || 0) + 1;
      }
    });

    let top = "-";
    let max = 0;

    Object.entries(counts).forEach(([name, count]) => {
      if (count > max) {
        top = name;
        max = count;
      }
    });

    return { name: top, count: max };
  }, [filteredLeads]);

  /* ---------- EXPORT CSV ---------- */
  const exportCSV = () => {
    const rows = [
      ["Name", "Email", "Phone", "Status", "Assigned To", "Created Date"],
      ...filteredLeads.map((l) => [
        l.name,
        l.email,
        l.phone || "-",
        l.status,
        l.assignedTo || "-",
        l.createdAt || "-"
      ])
    ];

    const csv =
      "data:text/csv;charset=utf-8," +
      rows.map((r) => r.join(",")).join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = "lead_report.csv";
    link.click();
  };

  /* ---------- RESET FILTER ---------- */
  const resetFilters = () => {
    setFromDate("");
    setToDate("");
    setEmployee("");
    setSearch("");
  };

  /* ---------- BADGE COLOR ---------- */
  const badgeColor = (status) => {
    switch (status) {
      case "New":
        return "primary";
      case "Contacted":
        return "warning";
      case "Qualified":
        return "success";
      case "Lost":
        return "danger";
      default:
        return "secondary";
    }
  };

  return (
    <div className="container-fluid py-3">
      <h2 className="fw-bold mb-4">Reports & Analytics</h2>

      {/* TOP SUMMARY CARDS */}
      <div className="row g-4 mb-4">
        <SummaryCard
          title="Total Leads"
          value={totalLeads}
          icon={<FaUsers />}
          gradient="linear-gradient(135deg,#4e73df,#224abe)"
        />
        <SummaryCard
          title="Qualified Leads"
          value={qualifiedLeads}
          icon={<FaUserCheck />}
          gradient="linear-gradient(135deg,#1cc88a,#13855c)"
        />
        <SummaryCard
          title="Lost Leads"
          value={lostLeads}
          icon={<FaUserTimes />}
          gradient="linear-gradient(135deg,#e74a3b,#be2617)"
        />
        <SummaryCard
          title="Conversion Rate"
          value={`${conversionRate}%`}
          icon={<FaChartLine />}
          gradient="linear-gradient(135deg,#f6c23e,#dda20a)"
        />
      </div>

      {/* FILTER SECTION */}
      <div
        className="card shadow-sm border-0 p-4 mb-4"
        style={{ borderRadius: "16px" }}
      >
        <div className="d-flex align-items-center mb-3">
          <FaFilter className="me-2 text-primary" />
          <h5 className="fw-bold mb-0">Filter Reports</h5>
        </div>

        <div className="row g-3">
          <div className="col-md-3">
            <label className="form-label fw-semibold">From Date</label>
            <input
              type="date"
              className="form-control"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>

          <div className="col-md-3">
            <label className="form-label fw-semibold">To Date</label>
            <input
              type="date"
              className="form-control"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>

          <div className="col-md-3">
            <label className="form-label fw-semibold">Employee</label>
            <select
              className="form-control"
              value={employee}
              onChange={(e) => setEmployee(e.target.value)}
            >
              <option value="">All Employees</option>
              {state.employees.map((emp) => (
                <option key={emp.id} value={emp.name}>
                  {emp.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-3">
            <label className="form-label fw-semibold">Search</label>
            <div className="input-group">
              <span className="input-group-text bg-white">
                <FaSearch />
              </span>
              <input
                className="form-control"
                placeholder="Name or Email"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="mt-3 d-flex gap-2 flex-wrap">
          <button className="btn btn-outline-secondary" onClick={resetFilters}>
            Reset Filters
          </button>

          <button className="btn btn-success" onClick={exportCSV}>
            <FaFileExport className="me-2" />
            Export CSV
          </button>
        </div>
      </div>

      {/* STATUS SUMMARY */}
      <div
        className="card shadow-sm border-0 p-4 mb-4"
        style={{ borderRadius: "16px" }}
      >
        <h5 className="fw-bold mb-4">Lead Status Summary</h5>

        <div className="row g-3 text-center">
          {Object.entries(statusCounts).map(([status, count]) => (
            <div key={status} className="col-md-3">
              <div
                className="p-4 border rounded-4 h-100"
                style={{
                  background: "#f8f9fa",
                  transition: "0.3s"
                }}
              >
                <h6 className="fw-semibold">{status}</h6>
                <h3 className={`text-${badgeColor(status)} mt-2`}>
                  {count}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* EXTRA INSIGHTS */}
      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div
            className="card shadow-sm border-0 p-4 h-100"
            style={{ borderRadius: "16px" }}
          >
            <h6 className="text-muted">Top Performing Employee</h6>
            <h4 className="fw-bold text-primary mt-2">
              {topEmployeeData.name}
            </h4>
            <small className="text-muted">
              {topEmployeeData.count} Qualified Lead(s)
            </small>
          </div>
        </div>

        <div className="col-md-4">
          <div
            className="card shadow-sm border-0 p-4 h-100"
            style={{ borderRadius: "16px" }}
          >
            <h6 className="text-muted">Assigned Leads</h6>
            <h4 className="fw-bold text-success mt-2">{assignedLeads}</h4>
          </div>
        </div>

        <div className="col-md-4">
          <div
            className="card shadow-sm border-0 p-4 h-100"
            style={{ borderRadius: "16px" }}
          >
            <h6 className="text-muted">Unassigned Leads</h6>
            <h4 className="fw-bold text-danger mt-2">{unassignedLeads}</h4>
          </div>
        </div>
      </div>

      {/* REPORT TABLE */}
      <div
        className="card shadow-sm border-0 p-4"
        style={{ borderRadius: "16px" }}
      >
        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
          <h5 className="fw-bold mb-0">Lead Report Table</h5>
          <span className="text-muted">
            Showing {filteredLeads.length} record(s)
          </span>
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Assigned To</th>
                <th>Created Date</th>
              </tr>
            </thead>

            <tbody>
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center text-muted py-4">
                    No data found
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr key={lead.id}>
                    <td className="fw-semibold">{lead.name}</td>
                    <td>{lead.email}</td>
                    <td>{lead.phone || "-"}</td>
                    <td>
                      <span className={`badge bg-${badgeColor(lead.status)}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td>{lead.assignedTo || "-"}</td>
                    <td>{lead.createdAt || "-"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* REUSABLE SUMMARY CARD */
function SummaryCard({ title, value, icon, gradient }) {
  return (
    <div className="col-md-6 col-lg-3">
      <div
        className="card border-0 shadow text-white p-4 h-100"
        style={{
          borderRadius: "16px",
          minHeight: "130px",
          background: gradient
        }}
      >
        <div className="d-flex justify-content-between align-items-center h-100">
          <div>
            <h6 className="mb-2">{title}</h6>
            <h2 className="fw-bold">{value}</h2>
          </div>
          <div style={{ fontSize: "30px", opacity: 0.9 }}>{icon}</div>
        </div>
      </div>
    </div>
  );
}