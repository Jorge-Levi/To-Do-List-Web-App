import React, { useRef } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import TaskItem from "./TaskItem";
import "./TaskList.css";

export default function TaskList({ tasks, toggleTask, deleteTask, editTask }) {
  const refs = useRef(new Map());

  return (
    <TransitionGroup
      component="ul"
      className="mt-6 space-y-4 list-none sm:space-y-3"
      role="list"
      aria-live="polite"
    >
      {tasks.map((task) => {
        if (!refs.current.has(task.id)) {
          refs.current.set(task.id, React.createRef());
        }

        return (
          <CSSTransition
            key={task.id}
            timeout={300}
            classNames="task"
            nodeRef={refs.current.get(task.id)}
          >
            <TaskItem
              ref={refs.current.get(task.id)}
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
