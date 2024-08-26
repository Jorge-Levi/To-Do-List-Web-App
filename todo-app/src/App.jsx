import React, { useReducer, useEffect, useMemo } from "react"; // Asegúrate de importar useReducer
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import Filters from "./components/Filters";
import { taskReducer, initialState } from "./store/reducers/taskReducer";

export default function App() {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      dispatch({ type: "LOAD_TASKS", payload: JSON.parse(savedTasks) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(state.tasks));
  }, [state.tasks]);

  useEffect(() => {
    if (state.feedbackMessage) {
      const timer = setTimeout(() => {
        dispatch({ type: "CLEAR_FEEDBACK" });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [state.feedbackMessage]);

  // Aplicar filtros y ordenación
  const filteredTasks = useMemo(() => {
    return state.tasks.filter(task => {
      if (state.filter === "all") return true;
      if (state.filter === "completed") return task.completed;
      if (state.filter === "pending") return !task.completed;
      return true;
    });
  }, [state.tasks, state.filter]);

  const sortedTasks = useMemo(() => {
    return filteredTasks.slice().sort((a, b) => {
      if (state.sort === "name") {
        return a.name.localeCompare(b.name);
      } else if (state.sort === "status") {
        return a.completed - b.completed;
      }
      return 0;
    });
  }, [filteredTasks, state.sort]);

  const addTask = (taskName) => {
    dispatch({ type: "ADD_TASK", payload: taskName });
  };

  const toggleTask = (index) => {
    dispatch({ type: "TOGGLE_TASK", payload: index });
  };

  const deleteTask = (index) => {
    dispatch({ type: "DELETE_TASK", payload: index });
  };

  return (
    <div className="container max-w-lg p-6 mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="mb-6 text-4xl font-semibold text-gray-800">To-Do List</h1>
      {state.feedbackMessage && (
        <div className="p-2 mb-4 text-green-700 bg-green-100 rounded">
          {state.feedbackMessage}
        </div>
      )}
      <TaskForm addTask={addTask} tasks={state.tasks} />
      <Filters
        filter={state.filter}
        setFilter={(filter) => dispatch({ type: "SET_FILTER", payload: filter })}
        sort={state.sort}
        setSort={(sort) => dispatch({ type: "SET_SORT", payload: sort })}
      />
      <TaskList
        tasks={sortedTasks}
        toggleTask={toggleTask}
        deleteTask={deleteTask}
      />
    </div>
  );
}
