import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import TaskItem from "./TaskItem";
import "./TaskList.css"; // Archivo CSS para animaciones

export default function TaskList({ tasks, toggleTask, deleteTask }) {
  return (
    <TransitionGroup
      component="ul"
      className="mt-4 space-y-2 list-none"
      role="list"
      aria-live="polite"
    >
      {tasks.map((task, index) => (
        <CSSTransition
          key={task.name}
          timeout={300}
          classNames="task"
        >
          <TaskItem
            key={index}
            task={task}
            index={index}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
          />
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
}
