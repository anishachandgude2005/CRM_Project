import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";

export default function Reports() {
  const { state } = useContext(AppContext);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [employee, setEmployee] = useState("");
  const [search, setSearch] = useState("");

  /* ---------- FILTER LEADS ---------- */
  const filteredLeads = state.leads.filter((lead) => {
    const leadDate = lead.createdAt
      ? new Date(lead.createdAt)
      : null;

    if (fromDate && leadDate && leadDate < new Date(fromDate))
      return false;

    if (toDate && leadDate && leadDate > new Date(toDate))
      return false;

    if (employee && lead.assignedTo !== employee)
      return false;

    if (
      search &&
      !lead.name.toLowerCase().includes(search.toLowerCase()) &&
      !lead.email.toLowerCase().includes(search.toLowerCase())
    )
      return false;

    return true;
  });

  /* ---------- STATUS COUNT ---------- */
  const statusCounts = {
    New: 0,
    Contacted: 0,
    Qualified: 0,
    Lost: 0,
  };

  filteredLeads.forEach((lead) => {
    if (statusCounts[lead.status] !== undefined)
      statusCounts[lead.status]++;
  });

  /* ---------- EXPORT CSV ---------- */
  const exportCSV = () => {
    const rows = [
      ["Name", "Email", "Status", "Employee"],
      ...filteredLeads.map((l) => [
        l.name,
        l.email,
        l.status,
        l.assignedTo || "-"
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

  /* ---------- STATUS BADGE ---------- */
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
    <div className="container-fluid">
      <h2>Reports</h2>

      {/* FILTER CARD */}
      <div className="card shadow-sm p-3 mt-3">
        <h5>Filters</h5>

        <div className="row mt-2 g-2">
          <div className="col-md-3">
            <label>From Date</label>
            <input
              type="date"
              className="form-control"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>

          <div className="col-md-3">
            <label>To Date</label>
            <input
              type="date"
              className="form-control"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>

          <div className="col-md-3">
            <label>Employee</label>
            <select
              className="form-control"
              value={employee}
              onChange={(e) => setEmployee(e.target.value)}
            >
              <option value="">All</option>
              {state.employees.map((emp) => (
                <option key={emp.id} value={emp.name}>
                  {emp.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-3">
            <label>Search</label>
            <input
              className="form-control"
              placeholder="Name or Email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* STATUS SUMMARY */}
      <div className="card shadow-sm p-3 mt-4">
        <h5>Status Summary</h5>

        <div className="row text-center">
          {Object.entries(statusCounts).map(([status, count]) => (
            <div key={status} className="col-md-3">
              <div className="border rounded p-3">
                <h6>{status}</h6>
                <h4>{count}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* REPORT TABLE */}
      <div className="card shadow-sm p-3 mt-4">
        <div className="d-flex justify-content-between">
          <h5>Lead Report</h5>
          <button
            className="btn btn-success btn-sm"
            onClick={exportCSV}
          >
            Export CSV
          </button>
        </div>

        <table className="table table-hover mt-2">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Assigned To</th>
            </tr>
          </thead>

          <tbody>
            {filteredLeads.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center">
                  No data found
                </td>
              </tr>
            ) : (
              filteredLeads.map((lead) => (
                <tr key={lead.id}>
                  <td>{lead.name}</td>
                  <td>{lead.email}</td>
                  <td>
                    <span
                      className={`badge bg-${badgeColor(
                        lead.status
                      )}`}
                    >
                      {lead.status}
                    </span>
                  </td>
                  <td>{lead.assignedTo || "-"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
