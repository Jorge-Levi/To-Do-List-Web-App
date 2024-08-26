import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import Filters from "./components/Filters";
import React, { useState, useEffect, useCallback, useMemo } from "react";

export default function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("name");
  const [feedbackMessage, setFeedbackMessage] = useState(""); // Nuevo estado para el mensaje de retroalimentación

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = useCallback((taskName) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      { name: taskName, completed: false },
    ]);
    setFeedbackMessage("Tarea agregada exitosamente");
    clearFeedbackMessage();
  }, []);

  const toggleTask = useCallback((index) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
    setFeedbackMessage("Estado de la tarea actualizado");
    clearFeedbackMessage();
  }, []);

  const deleteTask = useCallback((index) => {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
    setFeedbackMessage("Tarea eliminada");
    clearFeedbackMessage();
  }, []);

  const clearFeedbackMessage = () => {
    setTimeout(() => {
      setFeedbackMessage(""); // Limpiar el mensaje después de 3 segundos
    }, 3000);
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) =>
      filter === "all"
        ? true
        : filter === "completed"
        ? task.completed
        : !task.completed
    );
  }, [tasks, filter]);

  const sortedTasks = useMemo(() => {
    return filteredTasks.slice().sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      return a.completed - b.completed;
    });
  }, [filteredTasks, sort]);

  return (
    <div className="container max-w-lg p-6 mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="mb-6 text-4xl font-semibold text-gray-800">To-Do List</h1>
      {feedbackMessage && (
        <div
          className="p-2 mb-4 text-green-700 bg-green-100 rounded"
          aria-live="assertive"
        >
          {feedbackMessage}
        </div>
      )}

      <TaskForm addTask={addTask} tasks={tasks} />
      <Filters
        filter={filter}
        setFilter={setFilter}
        sort={sort}
        setSort={setSort}
      />
      <TaskList
        tasks={sortedTasks}
        toggleTask={toggleTask}
        deleteTask={deleteTask}
      />
    </div>
  );
}
