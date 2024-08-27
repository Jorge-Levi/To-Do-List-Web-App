import React, { useState } from "react";

export default function TaskForm({ addTask, tasks }) {
  const [taskName, setTaskName] = useState("");
  const [error, setError] = useState({ type: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar campo vacío
    if (taskName.trim() === "") {
      setError({
        type: "empty",
        message: "El nombre de la tarea no puede estar vacío",
      });
      return;
    }

    // Validar tarea duplicada
    if (tasks.some((task) => task.name.toLowerCase() === taskName.toLowerCase())) {
      setError({
        type: "duplicate",
        message: "La tarea ya existe.",
      });
      return;
    }

    // Si no hay errores, agregar la tarea
    addTask(taskName);
    setTaskName("");
    setError({ type: "", message: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col mb-6 space-y-4"
      aria-labelledby="task-form"
    >
      <div className="flex space-x-4">
        <input
          id="task-input"
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          className={`flex-grow p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ease-in-out ${
            error.type
              ? "border-red-500 dark:border-red-400"
              : "border-gray-300 dark:border-gray-600"
          } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400`}
          placeholder="Agregar nueva tarea..."
          aria-label="Campo para agregar nueva tarea"
          aria-required="true"
          aria-invalid={error.type ? "true" : "false"}
          aria-describedby="task-error"
        />
        <button
          type="submit"
          className="p-3 text-white transition-transform transform bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:scale-105"
        >
          Agregar
        </button>
      </div>
      {error.message && (
        <p
          id="task-error"
          className="text-sm text-red-500 dark:text-red-400"
          role="alert"
        >
          {error.message}
        </p>
      )}
    </form>
  );
}
