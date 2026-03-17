const fs = require("fs");
const path = require("path");
const DATA_FILE = path.join(__dirname, "../data/tasks.json");

/* function readTasks() {
  return JSON.parse(fs.readFileSync(DATA_FILE));
} */

function readTasks() {
  try {
    const data = fs.readFileSync(DATA_FILE);
    return JSON.parse(data || "[]");
  } catch {
    return [];
  }
}

function writeTasks(tasks) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
}

exports.getAllTasks = () => {
  return readTasks();
};

exports.addTask = (text) => {

  const tasks = readTasks();

  const task = {
    id: Date.now().toString(),
    text: text
  };

  tasks.push(task);

  writeTasks(tasks);

  return task;
};

exports.removeTask = (id) => {

  let tasks = readTasks();

  tasks = tasks.filter(task => task.id !== id);

  writeTasks(tasks);
};
