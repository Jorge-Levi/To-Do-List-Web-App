import React, { useState } from "react";
import { AiOutlineExclamationCircle } from "react-icons/ai";

export default function TaskForm({ addTask, tasks }) {
  const [taskName, setTaskName] = useState("");
  const [error, setError] = useState({ type: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (taskName.trim() === "") {
      setError({
        type: "empty",
        message: "El nombre de la tarea no puede estar vacío",
      });
      return;
    }

    if (tasks.some((task) => task.name.toLowerCase() === taskName.toLowerCase())) {
      setError({
        type: "duplicate",
        message: "La tarea ya existe.",
      });
      return;
    }

    addTask(taskName);
    setTaskName("");
    setError({ type: "", message: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col mb-6 space-y-4 sm:space-y-0 sm:flex-row sm:space-x-4"
      aria-labelledby="task-form"
    >
      <div className="flex-grow">
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
          <label htmlFor="task-input" className="sr-only">
            Nueva tarea
          </label>
          <input
            id="task-input"
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className={`flex-grow p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
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
            className="p-3 mt-2 text-white transition-transform transform bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:flex-shrink-0 hover:scale-105"
          >
            Agregar
          </button>
        </div>
        <div className="min-h-[24px] mt-2">
          {error.message && (
            <div
              id="task-error"
              className="flex items-center text-red-600 dark:text-red-400 animate-fade-in"
              role="alert"
            >
              <AiOutlineExclamationCircle className="w-5 h-5 mr-2" />
              <p>{error.message}</p>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
