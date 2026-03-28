import type { Request, Response } from "express"
import { TaskService } from "../services/TaskService.js"
import type {Task } from "../models/Task.js"

export class TaskController {
  constructor(private service: TaskService) {}

  async index(req: Request, res: Response) {
    const tasks = await this.service.getAllTasks()
    return res.json(tasks)
  }

  async create(req: Request, res: Response) {
    const { title, description, status } = req.body

    // Validação de dados
    if (!title || typeof title !== "string" || title.trim() === "") {
      return res.status(400).json({ error: "título é obrigatório e deve ser uma string" })
    }

    if (!description || typeof description !== "string" || description.trim() === "") {
      return res.status(400).json({ error: "descrição é obrigatória e deve ser uma string" })
    }

    const validStatuses = ["pending", "in-progress", "completed"]
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({ error: "status deve ser: pending, in-progress ou completed" })
    }

    const task: Omit<Task, "id"> = {
      title: title.trim(),
      description: description.trim(),
      status,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const newTask = await this.service.createTask(task)

    return res.status(201).json(newTask)
  }
}