import React, { useState } from "react";

export default function TaskForm({ addTask }) {
  const [taskName, setTaskName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskName.trim()) {
      addTask(taskName);
      setTaskName("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex mb-4 space-x-2">
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        className="flex-grow p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Agregar nueva tarea..."
      />
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded shadow hover:bg-blue-600"
      >
        Agregar
      </button>
    </form>
  );
}
