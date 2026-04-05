const { TaskRepository } = require("../repositories/TaskRepository");

class TaskService {
    constructor(repository) {
        this.repository = repository;
    }

    async getAllTasks() {
        return await this.repository.findAll()
    }

    async getTask(id) {
        return await this.repository.findById(id)
    }

    async createTask(task) {
        return await this.repository.create(task)
    }

    async deleteTask(id) {
        const task = await this.repository.findById(id)
        if (!task) {
            throw new Error("Tarefa não encontrada.");
        }
        return await this.repository.deleteById(id)
    }
}

module.exports = { TaskService };
