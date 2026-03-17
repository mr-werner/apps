const BASE_PATH = window.location.pathname.replace(/\/$/, "");

const API_BASE = `${BASE_PATH}/api/tasks`;

const socket = io({
  path: `${BASE_PATH}/socket.io`
});

socket.on("tasksUpdated", () => {
  loadTasks();
});

async function loadTasks() {

  const response = await fetch(API_BASE);
  const tasks = await response.json();

  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach(task => {

    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between";

    const span = document.createElement("span");
    span.textContent = task.text;

    const btn = document.createElement("button");
    btn.className = "btn btn-danger btn-sm";
    btn.textContent = "Delete";

    btn.onclick = () => deleteTask(task.id);

    li.appendChild(span);
    li.appendChild(btn);

    list.appendChild(li);

  });
}

async function addTask() {

  const input = document.getElementById("taskInput");

  await fetch(API_BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      text: input.value
    })
  });

  input.value = "";
}

async function deleteTask(id) {

  await fetch(`${API_BASE}/${id}`, {
    method: "DELETE"
  });

}

loadTasks();
