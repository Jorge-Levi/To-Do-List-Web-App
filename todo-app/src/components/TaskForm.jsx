import React, { useState } from "react";

export default function TaskForm({ addTask, tasks }) {
  const [taskName, setTaskName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskName.trim()) {
      if (
        tasks.some((task) => task.name.toLowerCase() === taskName.toLowerCase())
      ) {
        setError("La tarea ya existe.");
      } else {
        addTask(taskName);
        setTaskName("");
        setError("");
      }
    } else {
      setError("El nombre de la tarea no puede estar vacío");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col mb-4 space-y-2">
      <div className="flex space-x-2">
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          className="flex-grow p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Agregar nueva tarea..."
        />
        <button
          type="submit"
          className="p-2 text-white bg-blue-500 rounded shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Agregar
        </button>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </form>
  );
}
