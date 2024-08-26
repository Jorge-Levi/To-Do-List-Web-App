// src/store/reducers/taskReducer.js

import {
  ADD_TASK,
  TOGGLE_TASK,
  DELETE_TASK,
  SET_FILTER,
  SET_SORT,
  CLEAR_FEEDBACK,
  LOAD_TASKS,
} from "../actions/taskActions";

export const initialState = {
  tasks: [],
  filter: "all",
  sort: "name",
  feedbackMessage: "",
};

export function taskReducer(state, action) {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        tasks: [
          ...state.tasks,
          { id: Date.now(), name: action.payload, completed: false },
        ],
        feedbackMessage: "Tarea agregada exitosamente",
      };
    case TOGGLE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        ),
        feedbackMessage: "Estado de la tarea actualizado",
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
        feedbackMessage: "Tarea eliminada",
      };
    case SET_FILTER:
      return {
        ...state,
        filter: action.payload,
      };
    case SET_SORT:
      return {
        ...state,
        sort: action.payload,
      };
    case CLEAR_FEEDBACK:
      return {
        ...state,
        feedbackMessage: "",
      };
    case LOAD_TASKS:
      return {
        ...state,
        tasks: action.payload,
      };
    default:
      return state;
  }
}
