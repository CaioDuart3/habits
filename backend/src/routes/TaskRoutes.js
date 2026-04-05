const { Router } = require("express");
const { TaskController } = require("../controllers/TaskController");
const { TaskService } = require("../services/TaskService");
const { TaskRepository } = require("../repositories/TaskRepository");

const router = Router();

const repository = new TaskRepository();
const service = new TaskService(repository);
const controller = new TaskController(service);

router.get("/tasks", controller.index.bind(controller));
router.post("/tasks", controller.create.bind(controller));

module.exports = router;
