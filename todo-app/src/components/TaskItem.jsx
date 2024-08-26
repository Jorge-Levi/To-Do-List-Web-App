import React from "react";

function TaskItem({ task, index, toggleTask, deleteTask }) {
  return (
    <li
      className={`flex justify-between items-center p-3 bg-gray-100 rounded ${
        task.completed ? "bg-green-100" : ""
      }`}
      aria-label={`Tarea: ${task.name}, ${
        task.completed ? "completada" : "pendiente"
      }`}
      tabIndex="0"
    >
      <span
        className={`flex-grow ${
          task.completed ? "line-through text-gray-500" : ""
        }`}
        aria-label={`Nombre de la tarea: ${task.name}`}
      >
        {task.name}
      </span>
      <div className="space-x-2">
        <button
          onClick={() => toggleTask(index)}
          aria-label={
            task.completed ? "Marcar como pendiente" : "Marcar como completada"
          }
          className="mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          ✔
        </button>
        <button
          onClick={() => editTask(index)}
          aria-label="Editar tarea"
          className="mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          ✎
        </button>
        <button
          onClick={() => deleteTask(index)}
          aria-label="Eliminar tarea"
          className="mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          🗑
        </button>
      </div>
    </li>
  );
}

export default React.memo(TaskItem);
