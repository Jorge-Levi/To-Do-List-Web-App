import React from "react";

function FilterButton({ label, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 ease-in-out ${
        isActive
          ? "bg-blue-500 text-white dark:bg-blue-600 dark:text-white"
          : "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
      }`}
      aria-pressed={isActive}
      aria-label={label}
    >
      {label}
    </button>
  );
}

export default React.memo(FilterButton);
