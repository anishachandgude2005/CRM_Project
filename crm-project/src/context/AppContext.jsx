import React, { createContext, useReducer, useEffect } from "react";

import { users } from "../data/users";
import { leads } from "../data/leads";
import { customers } from "../data/customers";
import { employees } from "../data/employees";
import { tasks } from "../data/tasks";
import { notifications } from "../data/notifications";

export const AppContext = createContext();

// ✅ Load from localStorage
const savedNotifications =
  JSON.parse(localStorage.getItem("crm_notifications")) || notifications;

const initialState = {
  users,
  leads,
  customers,
  tasks,
  employees,
  notifications: savedNotifications
};

function reducer(state, action) {
  console.log("ACTION:", action); // ✅ DEBUG

  switch (action.type) {

    case "ADD_LEAD":
      return {
        ...state,
        leads: [action.payload, ...state.leads]
      };

    case "UPDATE_LEAD":
      return {
        ...state,
        leads: state.leads.map(l =>
          l.id === action.payload.id ? action.payload : l
        )
      };

    case "DELETE_LEAD":
      return {
        ...state,
        leads: state.leads.filter(l => l.id !== action.payload)
      };

    // 🔁 Convert Lead → Customer
    case "CONVERT_LEAD": {
      const lead = action.payload;

      const newCustomer = {
        id: Date.now(),
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        company: "",
        status: "Active",
        leadId: lead.id
      };

      return {
        ...state,
        customers: [newCustomer, ...state.customers],
        leads: state.leads.filter(l => l.id !== lead.id)
      };
    }

    case "ADD_CUSTOMER":
      return {
        ...state,
        customers: [...state.customers, action.payload]
      };

    case "DELETE_CUSTOMER":
      return {
        ...state,
        customers: state.customers.filter(c => c.id !== action.payload)
      };

    case "ADD_EMPLOYEE":
      return {
        ...state,
        employees: [action.payload, ...state.employees]
      };

    case "UPDATE_EMPLOYEE":
      return {
        ...state,
        employees: state.employees.map(emp =>
          emp.id === action.payload.id ? action.payload : emp
        )
      };

    case "DELETE_EMPLOYEE":
      return {
        ...state,
        employees: state.employees.filter(
          (emp) => emp.id !== action.payload
        )
      };

    case "ADD_TASK":
        return {
          ...state,
          tasks: [...state.tasks, action.payload]
        };
      
      case "UPDATE_TASK":
        return {
          ...state,
          tasks: state.tasks.map((task) =>
            task.id === action.payload.id ? action.payload : task
          )
        };
      
      case "DELETE_TASK":
        return {
          ...state,
          tasks: state.tasks.filter((task) => task.id !== action.payload)
        };

    // 🔔 NOTIFICATIONS (FIXED)
    case "ADD_NOTIFICATION":
      return {
        ...state,
        notifications: [
          {
            ...action.payload,
            id: Date.now() + Math.random() // ✅ FIX
          },
          ...state.notifications
        ]
      };

    case "DELETE_NOTIFICATION":
      return {
        ...state,
        notifications: state.notifications.filter(
          n => n.id !== action.payload
        )
      };

    case "CLEAR_NOTIFICATIONS":
      return {
        ...state,
        notifications: []
      };

    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Save leads
  useEffect(() => {
    localStorage.setItem("crm_leads", JSON.stringify(state.leads));
  }, [state.leads]);

  // Save notifications
  useEffect(() => {
    localStorage.setItem(
      "crm_notifications",
      JSON.stringify(state.notifications)
    );
  }, [state.notifications]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}