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
import {
  FILTER_ALL,
  FILTER_PENDING,
  FILTER_COMPLETED,
  SORT_BY_NAME,
  SORT_BY_STATUS,
} from "../../constants/taskConstants";

export const initialState = {
  tasks: [],
  filter: FILTER_ALL,
  sort: SORT_BY_NAME,
  feedbackMessage: "",
};

export function taskReducer(state, action) {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, { name: action.payload, completed: false }],
        feedbackMessage: "Tarea agregada exitosamente",
      };
    case TOGGLE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task, index) =>
          index === action.payload
            ? { ...task, completed: !task.completed }
            : task
        ),
        feedbackMessage: "Estado de la tarea actualizado",
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((_, index) => index !== action.payload),
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
