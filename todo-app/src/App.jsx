import React, { useReducer, useEffect, useMemo, useCallback } from "react";
import { CSSTransition } from "react-transition-group";
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
import "./components/Feedback.css";

export default function App() {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      dispatch({ type: LOAD_TASKS, payload: JSON.parse(savedTasks) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(state.tasks));
  }, [state.tasks]);

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

  const closeFeedback = useCallback(() => {
    dispatch({ type: CLEAR_FEEDBACK });
  }, [dispatch]);

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
      <header role="banner">
        <h1 className="mb-6 text-4xl font-semibold text-gray-800">To-Do List</h1>
      </header>
      <main role="main">
        <CSSTransition
          in={!!state.feedbackMessage}
          timeout={300}
          classNames="feedback"
          unmountOnExit
        >
          <div className="relative p-2 mb-4 text-green-700 bg-green-100 rounded">
            <p>{state.feedbackMessage}</p>
            <button
              onClick={closeFeedback}
              className="absolute top-0 right-0 px-2 py-1 text-sm text-green-700"
              aria-label="Cerrar mensaje de feedback"
            >
              ×
            </button>
          </div>
        </CSSTransition>
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
      </main>
    </div>
  );
}
