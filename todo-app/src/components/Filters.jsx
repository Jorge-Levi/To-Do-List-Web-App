import React from "react";

export default function Filters({ filter, setFilter, sort, setSort }) {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="space-x-2">
        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-1 rounded ${filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
        >
          Todas
        </button>
        <button
          onClick={() => setFilter("pending")}
          className={`px-3 py-1 rounded ${filter === "pending" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
        >
          Pendientes
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`px-3 py-1 rounded ${filter === "completed" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
        >
          Completadas
        </button>
      </div>
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="name">Nombre</option>
        <option value="status">Estado</option>
      </select>
    </div>
  );
}
