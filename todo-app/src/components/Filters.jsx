import React from "react";
import FilterButton from "./FilterButton";
import {
  FILTER_ALL,
  FILTER_PENDING,
  FILTER_COMPLETED,
} from "../constants/taskConstants";

function Filters({ filter, setFilter, sort, setSort }) {
  return (
    <div className="flex flex-col mb-6 space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 sm:items-center">
      <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2" aria-label="Filtros de tareas">
        <FilterButton
          label="Todas"
          isActive={filter === FILTER_ALL}
          onClick={() => setFilter(FILTER_ALL)}
          className="px-3 py-1 text-sm sm:px-4 sm:py-2"
        />
        <FilterButton
          label="Pendientes"
          isActive={filter === FILTER_PENDING}
          onClick={() => setFilter(FILTER_PENDING)}
          className="px-3 py-1 text-sm sm:px-4 sm:py-2"
        />
        <FilterButton
          label="Completadas"
          isActive={filter === FILTER_COMPLETED}
          onClick={() => setFilter(FILTER_COMPLETED)}
          className="px-3 py-1 text-sm sm:px-4 sm:py-2"
        />
      </div>
      <div className="relative mt-4 sm:mt-0">
        <label htmlFor="sort-tasks" className="sr-only">
          Ordenar tareas
        </label>
        <select
          id="sort-tasks"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="block w-full p-2 pr-8 bg-white border border-gray-300 rounded-md shadow-sm appearance-none dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          aria-label="Ordenar tareas"
        >
          <option value="name">Nombre</option>
          <option value="status">Estado</option>
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M6 9l6 6 6-6"></path>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Filters);
