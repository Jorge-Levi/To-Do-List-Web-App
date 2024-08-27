import React, { useReducer, useEffect, useMemo, useRef,useContext  } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import Filters from "./components/Filters";
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

export default function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [state, dispatch] = useReducer(taskReducer, initialState);

  // **Nuevo código**: Crear una referencia mutable para el estado anterior de las tareas
  const previousTasksRef = useRef(state.tasks);

  useEffect(() => {
    // Cargar tareas desde localStorage cuando la aplicación se monta
    try {
      const savedTasks = localStorage.getItem("tasks");
      if (savedTasks) {
        dispatch({ type: LOAD_TASKS, payload: JSON.parse(savedTasks) });
      }
    } catch (error) {
      console.error("Error loading tasks from localStorage:", error);
      dispatch({
        type: CLEAR_FEEDBACK,
        payload:
          "No se pudieron cargar las tareas. Verifica tu almacenamiento local.",
      });
    }
  }, []);

  // **Nuevo código**: Guardar tareas en localStorage solo si han cambiado
  useEffect(() => {
    // Comparar el estado anterior con el actual
    if (previousTasksRef.current !== state.tasks) {
      try {
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
        // Actualizar la referencia del estado anterior
        previousTasksRef.current = state.tasks;
      } catch (error) {
        console.error("Error saving tasks to localStorage:", error);
        dispatch({ type: CLEAR_FEEDBACK });
      }
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
    <div className="container max-w-lg p-6 mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="mb-6 text-4xl font-semibold text-gray-800">To-Do List</h1>
      <button
        onClick={toggleTheme}
        className="p-2 transition-colors duration-300 bg-gray-200 rounded focus:outline-none dark:bg-gray-600 dark:text-white"
      >
        {theme === "dark" ? "☀️ Modo Día" : "🌙 Modo Noche"}
      </button>
      {state.feedbackMessage && (
        <div className="p-2 mb-4 text-green-700 bg-green-100 rounded">
          {state.feedbackMessage}
        </div>
      )}
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
        editTask={editTask} //
      />
    </div>
  );
}
