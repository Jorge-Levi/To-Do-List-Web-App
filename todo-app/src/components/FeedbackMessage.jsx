import React from "react";
import { AiOutlineCheckCircle, AiOutlineWarning, AiOutlineInfoCircle } from "react-icons/ai";

function FeedbackMessage({ message, type = "info" }) {
  // Selección del icono basado en el tipo de mensaje
  const icon = {
    success: <AiOutlineCheckCircle className="w-6 h-6" />,
    error: <AiOutlineWarning className="w-6 h-6" />,
    info: <AiOutlineInfoCircle className="w-6 h-6" />,
  }[type];

  // Selección de estilos basado en el tipo de mensaje
  const styles = {
    success: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    error: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    info: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  }[type];

  return (
    <div
      className={`flex items-center p-4 mb-4 text-sm sm:text-base sm:p-5 rounded-lg shadow-md transform-gpu transition-transform duration-300 ease-in-out ${styles}`}
      role="alert"
    >
      <div className="mr-3">{icon}</div>
      <span>{message}</span>
    </div>
  );
}

export default FeedbackMessage;
