import React, { useReducer, useEffect, useMemo, useRef, useContext, Suspense } from "react";
import ThemeContext from "./context/ThemeContext";
import { taskReducer, initialState } from "./store/reducers/taskReducer";
import {
  ADD_TASK,
  TOGGLE_TASK,
  DELETE_TASK,
  SET_FILTER,
  SET_SORT,
  CLEAR_FEEDBACK,
  LOAD_TASKS,
  EDIT_TASK,
} from "./store/actions/taskActions";
import FeedbackMessage from "./components/FeedbackMessage";

// Lazy load components
const TaskList = React.lazy(() => import('./components/TaskList'));
const TaskForm = React.lazy(() => import('./components/TaskForm'));
const Filters = React.lazy(() => import('./components/Filters'));

export default function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const previousTasksRef = useRef(state.tasks);

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      dispatch({ type: LOAD_TASKS, payload: JSON.parse(savedTasks) });
    }
  }, []);

  useEffect(() => {
    if (previousTasksRef.current !== state.tasks) {
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
      previousTasksRef.current = state.tasks;
    }
  }, [state.tasks]);

  useEffect(() => {
    if (state.feedbackMessage) {
      const timer = setTimeout(() => {
        dispatch({ type: CLEAR_FEEDBACK });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [state.feedbackMessage]);

  const filteredTasks = useMemo(() => {
    return state.tasks.filter((task) => {
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
    dispatch({ type: ADD_TASK, payload: taskName });
  };

  const toggleTask = (id) => {
    dispatch({ type: TOGGLE_TASK, payload: id });
  };

  const deleteTask = (id) => {
    dispatch({ type: DELETE_TASK, payload: id });
  };

  const editTask = (id, newName) => {
    dispatch({ type: EDIT_TASK, payload: { id, newName } });
  };

  return (
    <div className="relative max-w-lg p-6 mx-auto transition-colors duration-500 bg-white rounded-lg shadow-lg dark:bg-gray-900 dark:text-gray-100">
      {/* Botón de cambio de tema */}
      <button
        onClick={toggleTheme}
        className="absolute p-2 text-gray-800 transition duration-500 ease-in-out transform bg-blue-500 rounded-full shadow-lg top-4 right-4 dark:bg-blue-600 dark:text-white hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Cambiar tema"
      >
        {theme === "dark" ? (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="5" strokeLinecap="round" strokeLinejoin="round" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.17 15.44A9 9 0 018.56 2.83 7 7 0 1018.18 17.01a9.007 9.007 0 012.99-1.57z"
            />
          </svg>
        )}
      </button>

      <h1 className="mb-6 text-4xl font-semibold text-gray-800 dark:text-white">
        To-Do List
      </h1>

      {state.feedbackMessage && (
        <FeedbackMessage
          message={state.feedbackMessage}
          type={state.feedbackType || "info"}
        />
      )}

      <Suspense fallback={<div>Loading...</div>}>
        <TaskForm addTask={addTask} tasks={state.tasks} />
        <Filters
          filter={state.filter}
          setFilter={(filter) => dispatch({ type: SET_FILTER, payload: filter })}
          sort={state.sort}
          setSort={(sort) => dispatch({ type: SET_SORT, payload: sort })}
        />
        <TaskList
          tasks={sortedTasks}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
          editTask={editTask}
        />
      </Suspense>
    </div>
  );
}
