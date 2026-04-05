const pool = require('../config/postgres');

class TaskRepository {
    async findAll() {
        const result = await pool.query('SELECT * FROM tasks')
        return result.rows
    }

    async findById(id) {
        const result = await pool.query('SELECT * FROM tasks WHERE id = $1', [id])
        return result.rows[0] || null
    }

    async create(task) {
        const result = await pool.query(
            'INSERT INTO tasks (title, description, status, created_at, updated_at) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [task.title, task.description, task.status, task.createdAt, task.updatedAt]
        )
        return result.rows[0]
    }

    async update(task) {
        const result = await pool.query(
            'UPDATE tasks SET title = $1, description = $2, status = $3, updated_at = $4 WHERE id = $5 RETURNING *',
            [task.title, task.description, task.status, task.updatedAt, task.id]
        )
        return result.rows[0]
    }

    async deleteById(id) {
        await pool.query('DELETE FROM tasks WHERE id = $1', [id])
    }
}

module.exports = { TaskRepository };
