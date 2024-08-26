// src/App.js
import React, { useReducer, useEffect, useMemo, useCallback } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import Filters from "./components/Filters";
import { taskReducer, initialState } from "./store/reducers/taskReducer";
import {
  ADD_TASK,
  TOGGLE_TASK,
  DELETE_TASK,
  SET_FILTER,
  SET_SORT,
  CLEAR_FEEDBACK,
  LOAD_TASKS,
} from "./store/actions/taskActions";
import {
  FILTER_ALL,
  FILTER_PENDING,
  FILTER_COMPLETED,
  SORT_BY_NAME,
  SORT_BY_STATUS,
} from "./constants/taskConstants";

export default function App() {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  useEffect(() => {
    // Cargar tareas desde localStorage
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      dispatch({ type: LOAD_TASKS, payload: JSON.parse(savedTasks) });
    }
  }, []);

  useEffect(() => {
    // Guardar tareas en localStorage
    localStorage.setItem("tasks", JSON.stringify(state.tasks));
  }, [state.tasks]);

  // Funciones manejadoras
  const addTask = useCallback(
    (taskName) => {
      dispatch({ type: ADD_TASK, payload: taskName });
    },
    [dispatch]
  );

  const toggleTask = useCallback(
    (index) => {
      dispatch({ type: TOGGLE_TASK, payload: index });
    },
    [dispatch]
  );

  const deleteTask = useCallback(
    (index) => {
      dispatch({ type: DELETE_TASK, payload: index });
    },
    [dispatch]
  );

  const filteredTasks = useMemo(() => {
    return state.tasks.filter((task) => {
      if (state.filter === FILTER_ALL) return true;
      if (state.filter === FILTER_COMPLETED) return task.completed;
      if (state.filter === FILTER_PENDING) return !task.completed;
      return true;
    });
  }, [state.tasks, state.filter]);

  const sortedTasks = useMemo(() => {
    return filteredTasks.slice().sort((a, b) => {
      if (state.sort === SORT_BY_NAME) {
        return a.name.localeCompare(b.name);
      } else if (state.sort === SORT_BY_STATUS) {
        return a.completed - b.completed;
      }
      return 0;
    });
  }, [filteredTasks, state.sort]);

  return (
    <div className="container max-w-lg p-6 mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="mb-6 text-4xl font-semibold text-gray-800">To-Do List</h1>
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
      />
    </div>
  );
}
