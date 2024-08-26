import React from "react";

function Filters({ filter, setFilter, sort, setSort }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="space-x-2" aria-label="Filtros de tareas">
        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-1 rounded ${
            filter === "all"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
          aria-pressed={filter === "all"}
          aria-label="Mostrar todas las tareas"
        >
          Todas
        </button>
        <button
          onClick={() => setFilter("pending")}
          className={`px-3 py-1 rounded ${
            filter === "pending"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
          aria-pressed={filter === "pending"}
          aria-label="Mostrar tareas pendientes"
        >
          Pendientes
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`px-3 py-1 rounded ${
            filter === "completed"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
          aria-pressed={filter === "completed"}
          aria-label="Mostrar tareas completadas"
        >
          Completadas
        </button>
      </div>
      <label htmlFor="sort-tasks" className="sr-only">Ordenar tareas</label>
      <select
        id="sort-tasks"
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Ordenar tareas"
      >
        <option value="name">Nombre</option>
        <option value="status">Estado</option>
      </select>
    </div>
  );
}

export default React.memo(Filters);
