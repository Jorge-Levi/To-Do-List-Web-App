// src/components/Filters.js
import React from "react";
import FilterButton from "./FilterButton";
import {
  FILTER_ALL,
  FILTER_PENDING,
  FILTER_COMPLETED,
} from "../constants/taskConstants";

function Filters({ filter, setFilter, sort, setSort }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="space-x-2" aria-label="Filtros de tareas">
        <FilterButton
          label="Todas"
          isActive={filter === FILTER_ALL}
          onClick={() => setFilter(FILTER_ALL)}
        />
        <FilterButton
          label="Pendientes"
          isActive={filter === FILTER_PENDING}
          onClick={() => setFilter(FILTER_PENDING)}
        />
        <FilterButton
          label="Completadas"
          isActive={filter === FILTER_COMPLETED}
          onClick={() => setFilter(FILTER_COMPLETED)}
        />
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
