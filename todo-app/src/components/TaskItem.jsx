import React from "react";

export default function TaskItem({ task, index, toggleTask, deleteTask }) {
  return (
    <li className={`flex justify-between items-center p-3 bg-gray-100 rounded ${task.completed ? "bg-green-100" : ""}`}>
      <span className={`flex-grow ${task.completed ? "line-through text-gray-500" : ""}`}>
        {task.name}
      </span>
      <div className="space-x-2">
        <button className="text-green-500" onClick={() => toggleTask(index)}>✔</button>
        <button className="text-red-500" onClick={() => deleteTask(index)}>🗑</button>
      </div>
    </li>
  );
}
