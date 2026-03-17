/* const taskService = require("../services/taskService");

exports.getTasks = (req, res) => {
  const tasks = taskService.getAllTasks();
  res.json(tasks);
};

exports.createTask = (req, res) => {

  const task = taskService.addTask(req.body.text);

  const io = req.app.get("io");
  io.emit("tasksUpdated");

  res.json(task);
};

exports.deleteTask = (req, res) => {

  const id = req.params.id;

  taskService.removeTask(id);

  const io = req.app.get("io");
  io.emit("tasksUpdated");

  res.json({ status: "deleted" });
}; */
const path = require("path");
const taskService = require(path.join(__dirname, "../services/taskService"));

exports.getTasks = (req, res) => {
  const tasks = taskService.getAllTasks();
  res.json(tasks);
};

exports.addTask = (req, res) => {

  if (!req.body || !req.body.text) {
    return res.status(400).json({ error: "Task text required" });
  }

  console.log("BODY:", req.body);

  const text = req.body.text;

  const task = taskService.addTask(text);

  const io = req.app.get("io");
  io.emit("tasksUpdated");

  res.json(task);
};

exports.deleteTask = (req, res) => {

  const id = req.params.id;

  taskService.removeTask(id);

  const io = req.app.get("io");
  io.emit("tasksUpdated");

  res.json({ success: true });
};
