// src/components/TaskList.js

import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import TaskItem from "./TaskItem";
import "./TaskList.css";

export default function TaskList({ tasks, toggleTask, deleteTask, editTask }) {
  return (
    <TransitionGroup
      component="ul"
      className="mt-4 space-y-2 list-none"
      role="list"
      aria-live="polite"
    >
      {tasks.map((task) => (
        <CSSTransition key={task.id} timeout={300} classNames="task">
          <TaskItem
            key={task.id}
            task={task}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
            editTask={editTask} // Pasar la función de edición
          />
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
}
