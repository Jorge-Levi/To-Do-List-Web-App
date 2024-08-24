// Variables
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");
const errorMessage = document.getElementById("error-message");
const pendingCount = document.getElementById("pending-count");
const completedCount = document.getElementById("completed-count");
const completeAllBtn = document.getElementById("complete-all-btn");
const deleteAllBtn = document.getElementById("delete-all-btn");

// Filtros y ordenamiento
const filterButtons = document.querySelectorAll(".filter-btn");
const sortTasksSelect = document.getElementById("sort-tasks");

// Modo oscuro
const toggleDarkModeBtn = document.getElementById("toggle-dark-mode");

// Estado de la aplicación
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";
let currentSort = "name";
let isDarkMode = JSON.parse(localStorage.getItem("darkMode")) || false;

// Inicializar modo oscuro
if (isDarkMode) {
  document.body.classList.add("dark-mode");
  toggleDarkModeBtn.textContent = "Modo Claro";
}

// Funciones
function renderTasks() {
  // Filtrar y ordenar tareas
  const filteredTasks = getFilteredTasks();
  const sortedTasks = sortTasks(filteredTasks);

  // Limpiar la lista de tareas
  taskList.innerHTML = "";

  // Renderizar cada tarea
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

  updateCounts(); // Actualizar contadores de tareas
}

function getFilteredTasks() {
  switch (currentFilter) {
    case "pending":
      return tasks.filter((task) => !task.completed);
    case "completed":
      return tasks.filter((task) => task.completed);
    default:
      return tasks;
  }
}

function sortTasks(taskArray) {
  return taskArray.sort((a, b) => {
    if (currentSort === "name") return a.name.localeCompare(b.name);
    return a.completed - b.completed;
  });
}

function addTask() {
  const taskName = taskInput.value.trim();

  // Validación de entrada
  if (taskName === "") {
    showError("El campo de tarea no puede estar vacío.");
    return;
  }

  // Verificar duplicados
  if (
    tasks.some((task) => task.name.toLowerCase() === taskName.toLowerCase())
  ) {
    showError("Esta tarea ya existe.");
    return;
  }

  // Agregar la tarea
  tasks.push({ name: taskName, completed: false });
  updateTasks();

  // Limpiar la entrada
  taskInput.value = "";
  clearError();
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

function updateCounts() {
  const pendingTasks = tasks.filter((task) => !task.completed).length;
  const completedTasks = tasks.filter((task) => task.completed).length;

  pendingCount.textContent = `Tareas pendientes: ${pendingTasks}`;
  completedCount.textContent = `Tareas completadas: ${completedTasks}`;
}

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.style.display = "block";
  setTimeout(clearError, 3000);
}

function clearError() {
  errorMessage.textContent = "";
  errorMessage.style.display = "none";
}

// Eventos para filtros y ordenamiento
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    currentFilter = btn.id.replace("filter-", "");
    filterButtons.forEach((button) => button.classList.remove("active"));
    btn.classList.add("active");
    renderTasks();
  });
});

sortTasksSelect.addEventListener("change", (e) => {
  currentSort = e.target.value;
  renderTasks();
});

// Manejo de modo oscuro
toggleDarkModeBtn.addEventListener("click", () => {
  isDarkMode = !isDarkMode;
  document.body.classList.toggle("dark-mode", isDarkMode);
  toggleDarkModeBtn.textContent = isDarkMode ? "Modo Claro" : "Modo Oscuro";
  localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
});

// Manejo de acciones en todas las tareas
completeAllBtn.addEventListener("click", () => {
  tasks.forEach((task) => (task.completed = true));
  updateTasks();
});

deleteAllBtn.addEventListener("click", () => {
  const confirmation = confirm(
    "¿Estás seguro de que deseas eliminar todas las tareas?"
  );
  if (confirmation) {
    tasks = [];
    updateTasks();
  }
});

// Iniciar la aplicación
addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

renderTasks();
