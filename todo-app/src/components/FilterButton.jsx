import React from "react";

function FilterButton({ label, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded ${
        isActive ? "bg-blue-900 text-white" : "bg-gray-200 text-gray-700"
      } focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2`}
      aria-pressed={isActive}
      aria-label={label}
    >
      {label}
    </button>
  );
}

export default React.memo(FilterButton);
