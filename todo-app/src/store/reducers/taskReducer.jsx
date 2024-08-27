import {
  ADD_TASK,
  TOGGLE_TASK,
  DELETE_TASK,
  SET_FILTER,
  SET_SORT,
  CLEAR_FEEDBACK,
  LOAD_TASKS,
  EDIT_TASK
} from "../actions/taskActions";

export const initialState = {
  tasks: [],
  filter: "all",
  sort: "name",
  feedbackMessage: "",
  feedbackType: "", // Nuevo campo para el tipo de mensaje
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
        feedbackType: "success", // Tipo de mensaje de éxito
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
        feedbackType: "info", // Tipo de mensaje de información
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
        feedbackMessage: "Tarea eliminada",
        feedbackType: "error", // Tipo de mensaje de error (relacionado con la eliminación)
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
        feedbackType: "", // Limpiar también el tipo de mensaje
      };
    case LOAD_TASKS:
      return {
        ...state,
        tasks: action.payload,
      };
    case EDIT_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? { ...task, name: action.payload.newName }
            : task
        ),
        feedbackMessage: "Tarea actualizada con éxito",
        feedbackType: "success", // Tipo de mensaje de éxito
      };
    default:
      return state;
  }
}
