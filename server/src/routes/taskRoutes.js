const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

// Rota para criar uma nova tarefa
router.post("/tasks", taskController.createTask);

router.get("/tasks", taskController.getAllTasks);

router.delete("/tasks/:id", taskController.deleteOneTask);

module.exports = router;
