import React, { createContext, useReducer, useEffect } from "react";

import { users } from "../data/users";
import { leads } from "../data/leads";
import { customers } from "../data/customers";
import { employees } from "../data/employees";
import { tasks } from "../data/tasks";
import { notifications } from "../data/notifications";

export const AppContext = createContext();

const initialState = {
  users,
  leads,
  customers,
  tasks,
  employees,
  notifications
};

function reducer(state, action) {
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

    case "ADD_CUSTOMER":
      return { ...state, customers: [...state.customers, action.payload] };

    case "DELETE_CUSTOMER":
       return {
    ...state,
    customers: state.customers.filter(c => c.id !== action.payload)
  };

    case "ADD_TASK":
       return { ...state, tasks: [...state.tasks, action.payload] };

    case "TOGGLE_TASK":
  return {
    ...state,
    tasks: state.tasks.map(task =>
      task.id === action.payload
        ? { ...task, completed: !task.completed }
        : task
    )
  };

    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Save leads to localStorage
  useEffect(() => {
    localStorage.setItem("crm_leads", JSON.stringify(state.leads));
  }, [state.leads]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}
