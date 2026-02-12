import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";

export default function Tasks() {
  const { state, dispatch } = useContext(AppContext);

  const [title, setTitle] = useState("");
  const [assignedBy, setAssignedBy] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [dueDate, setDueDate] = useState("");

  const addTask = () => {
    if (!title || !assignedBy || !assignedTo || !dueDate) {
      alert("Fill all fields");
      return;
    }

    dispatch({
      type: "ADD_TASK",
      payload: {
        id: Date.now(),
        title,
        assignedBy,
        assignedTo,
        dueDate,
        completed: false
      }
    });

    setTitle("");
    setAssignedBy("");
    setAssignedTo("");
    setDueDate("");
  };

  return (
    <div className="container mt-3">
      <h2>Task & Follow-up Module</h2>

      {/* TASK FORM */}
      <div className="card p-3 mb-3 shadow-sm">

        {/* Task Title */}
        <input
          className="form-control mb-2"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Assigned By Dropdown */}
        <select
          className="form-control mb-2"
          value={assignedBy}
          onChange={(e) => setAssignedBy(e.target.value)}
        >
          <option value="">Select Assigned By</option>
          <option value="Admin">Admin</option>
          <option value="Manager">Manager</option>
        </select>

        {/* Assigned To (Leads Dropdown) */}
        <select
          className="form-control mb-2"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
        >
          <option value="">Select Lead</option>
          {state.leads?.map((lead) => (
            <option key={lead.id} value={lead.name}>
              {lead.name}
            </option>
          ))}
        </select>

        {/* Due Date */}
        <input
          type="date"
          className="form-control mb-2"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <button className="btn btn-primary" onClick={addTask}>
          Create Task
        </button>
      </div>

      {/* TASK LIST */}
      <div className="card shadow-sm p-3">
        <h5>Task List</h5>

        {state.tasks?.length === 0 && <p>No tasks found</p>}

        {state.tasks?.map(task => (
          <div
            key={task.id}
            className="border p-2 mb-2 rounded d-flex justify-content-between align-items-center"
          >
            <div>
              <strong>{task.title}</strong><br />
              Assigned By: {task.assignedBy}<br />
              Assigned To: {task.assignedTo}<br />
              Due: {task.dueDate}
            </div>

            <button
              className={`btn ${task.completed ? "btn-success" : "btn-outline-success"}`}
              onClick={() =>
                dispatch({ type: "TOGGLE_TASK", payload: task.id })
              }
            >
              {task.completed ? "Completed" : "Mark Complete"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
