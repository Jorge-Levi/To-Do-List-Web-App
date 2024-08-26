import React, { useState, useEffect } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import Filters from "./components/Filters";

export default function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("name");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (taskName) => {
    setTasks([...tasks, { name: taskName, completed: false }]);
  };

  const toggleTask = (index) => {
    const newTasks = tasks.slice();
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    const newTasks = tasks.slice();
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const filteredTasks = tasks.filter((task) => 
    filter === "all" ? true : filter === "completed" ? task.completed : !task.completed
  );

  const sortedTasks = filteredTasks.sort((a, b) => {
    if (sort === "name") return a.name.localeCompare(b.name);
    return a.completed - b.completed;
  });

  return (
    <div className="container max-w-lg p-6 mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="mb-6 text-4xl font-semibold text-gray-800">To-Do List</h1>
      <TaskForm tasks={tasks} addTask={addTask} />
      <Filters filter={filter} setFilter={setFilter} sort={sort} setSort={setSort} />
      <TaskList tasks={sortedTasks} toggleTask={toggleTask} deleteTask={deleteTask} />
    </div>
  );
}
