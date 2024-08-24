// Variables
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");
const errorMessage = document.getElementById("error-message");
const pendingCount = document.getElementById("pending-count");
const completeAllBtn = document.getElementById("complete-all-btn");
const deleteAllBtn = document.getElementById("delete-all-btn");

// Filtros
const filterAllBtn = document.getElementById("filter-all");
const filterPendingBtn = document.getElementById("filter-pending");
const filterCompletedBtn = document.getElementById("filter-completed");

// Ordenar
const sortTasksSelect = document.getElementById("sort-tasks");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all"; // Estado del filtro actual
let currentSort = "name"; // Criterio de ordenamiento actual

// Funciones
function renderTasks() {
  taskList.innerHTML = "";
  const filteredTasks = getFilteredTasks();
  const sortedTasks = sortTasks(filteredTasks);

  sortedTasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = `task-item ${task.completed ? "completed" : ""}`;
    li.innerHTML = `
      <span>${task.name}</span>
      <div>
        <button onclick="toggleTask(${index})">✔</button>
        <button onclick="editTask(${index})">✎</button>
        <button onclick="deleteTask(${index})">🗑</button>
      </div>
    `;
    taskList.appendChild(li);
  });

  updatePendingCount(); // Actualizar contador al renderizar
}

function getFilteredTasks() {
  if (currentFilter === "pending") {
    return tasks.filter((task) => !task.completed);
  } else if (currentFilter === "completed") {
    return tasks.filter((task) => task.completed);
  }
  return tasks; // 'all'
}

function sortTasks(taskArray) {
  if (currentSort === "name") {
    return taskArray.sort((a, b) => a.name.localeCompare(b.name));
  } else if (currentSort === "status") {
    return taskArray.sort((a, b) => a.completed - b.completed);
  }
  return taskArray;
}

function addTask() {
  const taskName = taskInput.value.trim();

  // Validaciones
  if (taskName === "") {
    showError("El campo de tarea no puede estar vacío.");
    return;
  }

  if (
    tasks.some((task) => task.name.toLowerCase() === taskName.toLowerCase())
  ) {
    showError("Esta tarea ya existe.");
    return;
  }

  tasks.push({ name: taskName, completed: false });
  updateTasks();
  clearError(); // Limpiar cualquier mensaje de error anterior
  taskInput.value = ""; // Limpiar el campo de entrada
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  updateTasks();
}

function editTask(index) {
  const newTaskName = prompt("Editar tarea:", tasks[index].name);
  if (newTaskName !== null) {
    tasks[index].name = newTaskName.trim();
    updateTasks();
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  updateTasks();
}

function updateTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function updatePendingCount() {
  const pendingTasks = tasks.filter((task) => !task.completed).length;
  pendingCount.textContent = `Tareas pendientes: ${pendingTasks}`;
}

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.style.display = "block";
}

function clearError() {
  errorMessage.textContent = "";
  errorMessage.style.display = "none";
}

// Manejo de filtros
function setFilter(filter) {
  currentFilter = filter;
  updateFilterButtons();
  renderTasks();
}

function updateFilterButtons() {
  filterAllBtn.classList.remove("active");
  filterPendingBtn.classList.remove("active");
  filterCompletedBtn.classList.remove("active");

  if (currentFilter === "all") {
    filterAllBtn.classList.add("active");
  } else if (currentFilter === "pending") {
    filterPendingBtn.classList.add("active");
  } else if (currentFilter === "completed") {
    filterCompletedBtn.classList.add("active");
  }
}

// Manejo de ordenamiento
function setSort(sortCriteria) {
  currentSort = sortCriteria;
  renderTasks();
}

// Nuevas funciones para manejar acciones en todas las tareas
function completeAllTasks() {
  tasks = tasks.map((task) => ({ ...task, completed: true }));
  updateTasks();
}

function deleteAllTasks() {
  tasks = [];
  updateTasks();
}

// Eventos
addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

completeAllBtn.addEventListener("click", completeAllTasks);
deleteAllBtn.addEventListener("click", deleteAllTasks);

// Eventos de filtros
filterAllBtn.addEventListener("click", () => setFilter("all"));
filterPendingBtn.addEventListener("click", () => setFilter("pending"));
filterCompletedBtn.addEventListener("click", () => setFilter("completed"));

// Evento de ordenamiento
sortTasksSelect.addEventListener("change", (e) => setSort(e.target.value));

// Inicializar
renderTasks();
