import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";

export default function Dashboard() {

  const { state } = useContext(AppContext);
  const user = JSON.parse(localStorage.getItem("user"));

  const totalLeads = state.leads.length;
  const totalCustomers = state.customers.length;
  const pendingTasks = state.tasks.filter(task => !task.completed).length;

  
  return (
    <div className="container-fluid">


      <h2 className="mb-4">Dashboard Overview</h2>

      <div className="row">
        <div className="col-md-4 mb-3">
          <div className="card shadow-sm p-3">
            <h5>Total Leads</h5>
            <h3>{totalLeads}</h3>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card shadow-sm p-3">
            <h5>Total Customers</h5>
            <h3>{totalCustomers}</h3>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card shadow-sm p-3">
            <h5>Tasks Pending</h5>
            <h3>{pendingTasks}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}