// Variables
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");
const errorMessage = document.getElementById("error-message");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Funciones
function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
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

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.style.display = "block";
}

function clearError() {
  errorMessage.textContent = "";
  errorMessage.style.display = "none";
}

// Eventos
addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

// Inicializar
renderTasks();
