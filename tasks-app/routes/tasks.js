const express = require("express");
const router = express.Router();
const path = require("path");
const tasksController = require(path.join(__dirname, "../controllers/tasksController"));

router.get("/", tasksController.getTasks);

router.post("/", tasksController.addTask);

router.delete("/:id", tasksController.deleteTask);

module.exports = router;
