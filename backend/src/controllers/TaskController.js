const { TaskService } = require("../services/TaskService");

class TaskController {
  constructor(service) {
    this.service = service;
  }

  async index(req, res) {
    const tasks = await this.service.getAllTasks()
    return res.json(tasks)
  }

  async create(req, res) {
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

    const task = {
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

module.exports = { TaskController };
