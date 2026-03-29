import {Router} from "express"
import { TaskController } from "../controllers/TaskController.js"
import { TaskService } from "../services/TaskService.js"
import { TaskRepository } from "../repositories/TaskRepository.js"

const router = Router()

const repository = new TaskRepository()
const service = new TaskService(repository)
const controller = new TaskController(service)

router.get("/tasks", controller.index.bind(controller))
router.post("/tasks", controller.create.bind(controller))

export default router