const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const searchInput = document.getElementById("searchInput");

// Charger les tâches enregistrées
window.addEventListener("DOMContentLoaded", loadTasks);

// Ajouter tâche avec bouton
addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    addTask(taskText);
    taskInput.value = "";
  }
});

// Ajouter tâche avec touche "Entrée"
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
      addTask(taskText);
      taskInput.value = "";
    }
  }
});

// Barre de recherche
searchInput.addEventListener("input", () => {
  const searchText = searchInput.value.toLowerCase();
  const items = taskList.querySelectorAll("li");

  items.forEach((li) => {
    const text = li.querySelector(".task-text").textContent.toLowerCase();
    li.style.display = text.includes(searchText) ? "flex" : "none";
  });
});

// Fonction pour ajouter une tâche
function addTask(taskText, date = null, completed = false) {
  const li = document.createElement("li");
  const now = new Date();
  const dateText = date || now.toLocaleString("fr-FR");

  li.innerHTML = `
    <span class="task-text">${taskText}</span>
    <div class="task-meta">
      <small>🕒 ${dateText}</small>
      <button class="complete-btn">✔️</button>
      <button class="delete-btn">🗑️</button>
    </div>
  `;

  if (completed) li.classList.add("completed");

  // Marquer comme terminé
  li.querySelector(".complete-btn").addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTasks();
  });

  // Supprimer la tâche
  li.querySelector(".delete-btn").addEventListener("click", () => {
    li.remove();
    saveTasks();
  });

  taskList.appendChild(li);
  saveTasks();
}

// Sauvegarder les tâches dans localStorage
function saveTasks() {
  const tasks = [];
  taskList.querySelectorAll("li").forEach((li) => {
    const text = li.querySelector(".task-text").textContent;
    const date = li.querySelector("small").textContent.replace("🕒 ", "");
    const completed = li.classList.contains("completed");
    tasks.push({ text, date, completed });
  });
  localStorage.setItem("myTasks", JSON.stringify(tasks));
}

// Charger les tâches enregistrées
function loadTasks() {
  const saved = localStorage.getItem("myTasks");
  if (saved) {
    const tasks = JSON.parse(saved);
    tasks.forEach(task => addTask(task.text, task.date, task.completed));
  }
}