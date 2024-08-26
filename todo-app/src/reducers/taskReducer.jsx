// Definir el estado inicial
export const initialState = {
  tasks: [],
  filter: "all",
  sort: "name",
  feedbackMessage: "",
};

export function taskReducer(state, action) {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        tasks: [...state.tasks, { name: action.payload, completed: false }],
        feedbackMessage: "Tarea agregada exitosamente",
      };
    case "TOGGLE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task, index) =>
          index === action.payload
            ? { ...task, completed: !task.completed }
            : task
        ),
        feedbackMessage: "Estado de la tarea actualizado",
      };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((_, index) => index !== action.payload),
        feedbackMessage: "Tarea eliminada",
      };
    case "SET_FILTER":
      return {
        ...state,
        filter: action.payload,
      };
    case "SET_SORT":
      return {
        ...state,
        sort: action.payload,
      };
    case "CLEAR_FEEDBACK":
      return {
        ...state,
        feedbackMessage: "",
      };
    default:
      return state;
  }
}
