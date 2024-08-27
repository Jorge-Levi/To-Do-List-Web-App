// src/store/actions/taskActions.js

export const ADD_TASK = "ADD_TASK";
export const TOGGLE_TASK = "TOGGLE_TASK";
export const DELETE_TASK = "DELETE_TASK";
export const SET_FILTER = "SET_FILTER";
export const SET_SORT = "SET_SORT";
export const CLEAR_FEEDBACK = "CLEAR_FEEDBACK";
export const LOAD_TASKS = "LOAD_TASKS";
export const EDIT_TASK = "EDIT_TASK";

export const editTask = (id, newName) => ({
  type: EDIT_TASK,
  payload: { id, newName },
});
