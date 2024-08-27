import React, { useState } from "react";

function TaskItem({ task, toggleTask, deleteTask, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(task.name);

  const handleEdit = () => {
    if (newName.trim()) {
      editTask(task.id, newName);
      setIsEditing(false);
    }
  };

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
      {isEditing ? (
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="flex-grow p-1 mr-2 border border-gray-300 rounded focus:outline-none"
        />
      ) : (
        <span
          className={`flex-grow ${
            task.completed ? "line-through text-gray-500" : ""
          }`}
          aria-label={`Nombre de la tarea: ${task.name}`}
        >
          {task.name}
        </span>
      )}

      <div className="space-x-2">
        {isEditing ? (
          <>
            <button
              onClick={handleEdit}
              aria-label="Guardar cambios"
              className="mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              💾
            </button>
            <button
              onClick={() => setIsEditing(false)}
              aria-label="Cancelar edición"
              className="mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              ❌
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              aria-label="Editar tarea"
              className="mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              ✎
            </button>
            <button
              onClick={() => toggleTask(task.id)}
              aria-label={
                task.completed
                  ? "Marcar como pendiente"
                  : "Marcar como completada"
              }
              className="mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              ✔
            </button>
            <button
              onClick={() => deleteTask(task.id)}
              aria-label="Eliminar tarea"
              className="mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              🗑
            </button>
          </>
        )}
      </div>
    </li>
  );
}

export default React.memo(TaskItem);
