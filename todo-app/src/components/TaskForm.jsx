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
      className="flex flex-col mb-4 space-y-2"
      aria-labelledby="task-form"
    >
      <div className="flex space-x-2">
        <label htmlFor="task-input" className="sr-only">
          Nueva tarea
        </label>
        <input
          id="task-input"
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          className={`flex-grow p-2 border ${
            error.type ? "border-red-500" : "border-gray-300"
          } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
          placeholder="Agregar nueva tarea..."
          aria-label="Campo para agregar nueva tarea"
          aria-required="true"
          aria-invalid={error.type ? "true" : "false"}
          aria-describedby="task-error"
        />
        <button
          type="submit"
          className="p-2 text-white bg-blue-500 rounded shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Agregar
        </button>
      </div>
      {error.message && (
        <p
          id="task-error"
          className="text-sm text-red-500"
          role="alert"
        >
          {error.message}
        </p>
      )}
    </form>
  );
}
