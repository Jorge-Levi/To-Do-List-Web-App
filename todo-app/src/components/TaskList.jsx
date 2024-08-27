import React, { useRef } from "react";
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
      {tasks.map((task) => {
        const nodeRef = useRef(null);

        return (
          <CSSTransition
            key={task.id}
            timeout={300}
            classNames="task"
            nodeRef={nodeRef} // Pasar el ref al CSSTransition
          >
            <TaskItem
              ref={nodeRef} // Pasar el mismo ref al TaskItem
              task={task}
              toggleTask={toggleTask}
              deleteTask={deleteTask}
              editTask={editTask}
            />
          </CSSTransition>
        );
      })}
    </TransitionGroup>
  );
}
