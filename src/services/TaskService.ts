import { TaskApi } from '../api/Task'

export interface Task {
  id?: number;
  name: string;
  description: string;
  dueDate: string;
  status: "New" | "Completed";
}

export class TaskService {
  async createTask(name: string, description: string, dueDate: string): Promise<Task> {
    const task: Task = {
      name,
      description,
      dueDate,
      status: "New",
    };
    return await TaskApi.create(task)
  }

  async getTasks(): Promise<Task[]> {
    return await TaskApi.getAll();
  }

  async getTaskById(id: number): Promise<Task> | undefined {
    return await TaskApi.get(id);
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
    } else {
      throw new Error("Task not found")
    }
    return await TaskApi.update(task);
  }

  async deleteTask(id: number): Promise<{ message: string }> {
    return await TaskApi.delete(id);
  }
}
