import * as api from '../api/Task'
export interface Task {
  id?: number;
  name: string;
  description: string;
  dueDate: string;
  status: "New" | "Completed";
}

export class TaskService {
  private tasks: Task[] = [];

  async createTask(name: string, description: string, dueDate: string): Promise<Task> {
    const task: Task = {
      name,
      description,
      dueDate,
      status: "New",
    };
    this.tasks.push(task);
    return await api.default.create(task)
  }

  async getTasks(): Promise<Task[]> {
    return await api.default.getAll();
  }

  async getTaskById(id: number): Promise<Task> | undefined {
    return await api.default.get(id);
  }

  async updateTask(
    id: number,
    name: string,
    description: string,
    dueDate: string,
    status: "New" | "Completed"
  ): Promise<Task> {
    const task = await this.getTaskById(id);
    if (task) {
      task.name = name;
      task.description = description;
      task.dueDate = dueDate;
      task.status = status;
    }
    return await api.default.update(task);
  }

  async deleteTask(id: number): Promise<{ message: string }> {
    return await api.default.delete(id);
  }
}
