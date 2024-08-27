import React, { useState, forwardRef } from "react";
import { MdEdit, MdDelete, MdCheck, MdCancel, MdSave } from "react-icons/md";

const TaskItem = forwardRef(({ task, toggleTask, deleteTask, editTask }, ref) => {
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
      ref={ref}
      className={`flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 rounded-lg transition-colors duration-500 ${
        task.completed
          ? "bg-green-100 dark:bg-green-900"
          : "bg-gray-100 dark:bg-gray-800"
      } text-gray-800 dark:text-gray-100`}
      aria-label={`Tarea: ${task.name}, ${
        task.completed ? "completada" : "pendiente"
      }`}
      tabIndex="0"
    >
      {isEditing ? (
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="flex-grow p-2 mb-4 mr-2 bg-white border border-gray-300 rounded-md sm:mb-0 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      ) : (
        <span
          className={`flex-grow mb-4 sm:mb-0 ${
            task.completed
              ? "line-through text-gray-500 dark:text-gray-400"
              : ""
          }`}
          aria-label={`Nombre de la tarea: ${task.name}`}
        >
          {task.name}
        </span>
      )}

      <div className="flex justify-end space-x-2">
        {isEditing ? (
          <>
            <button
              onClick={handleEdit}
              aria-label="Guardar cambios"
              className="p-2 text-white transition-transform transform bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:scale-105"
            >
              <MdSave size={20} />
            </button>
            <button
              onClick={() => setIsEditing(false)}
              aria-label="Cancelar edición"
              className="p-2 text-white transition-transform transform bg-red-500 rounded-lg shadow-md hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 hover:scale-105"
            >
              <MdCancel size={20} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              aria-label="Editar tarea"
              className="p-2 text-white transition-transform transform bg-yellow-500 rounded-lg shadow-md hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 hover:scale-105"
            >
              <MdEdit size={20} />
            </button>
            <button
              onClick={() => toggleTask(task.id)}
              aria-label={
                task.completed ? "Marcar como pendiente" : "Marcar como completada"
              }
              className="p-2 text-white transition-transform transform bg-green-500 rounded-lg shadow-md hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 hover:scale-105"
            >
              <MdCheck size={20} />
            </button>
            <button
              onClick={() => deleteTask(task.id)}
              aria-label="Eliminar tarea"
              className="p-2 text-white transition-transform transform bg-red-500 rounded-lg shadow-md hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 hover:scale-105"
            >
              <MdDelete size={20} />
            </button>
          </>
        )}
      </div>
    </li>
  );
});

export default React.memo(TaskItem);
