import type { Task } from "../models/Task.js"
import { TaskRepository } from "../repositories/TaskRepository.js"

export class TaskService {
    constructor(private repository: TaskRepository) {}

    async getAllTasks(){
        return await this.repository.findAll()
    }

    async getTask(id: number){
        return await this.repository.findById(id)
    }
    async createTask(task: Omit<Task, "id">){
        return await this.repository.create(task)
    }
    async deleteTask(id: number){
        const task = await this.repository.findById(id)
        if(!task){
            throw new Error("Tarefa não encontrada.");
        }
        return await this.repository.deleteById(id)
    }


}

