import { TaskApi } from '../api/Task'

export interface ITask {
  id?: number;
  name: string;
  description: string;
  dueDate: string;
  completed: boolean;
}

export class TaskService {
  async createTask(name: string, description: string, dueDate: string): Promise<ITask> {
    const task: ITask = {
      name,
      description,
      dueDate,
      completed: false,
    };
    return await TaskApi.create(task)
  }

  async getTasks(): Promise<ITask[]> {
    return await TaskApi.getAll();
  }

  async getTaskById(id: number): Promise<ITask> | undefined {
    return await TaskApi.get(id);
  }

  async updateTask(
    id: number,
    name: string,
    description: string,
    dueDate: string,
    completed: boolean
  ): Promise<ITask> {
    const task = await this.getTaskById(id);
    if (task) {
      task.name = name;
      task.description = description;
      task.dueDate = dueDate;
      task.completed = completed;
    } else {
      throw new Error("Task not found")
    }
    return await TaskApi.update(task);
  }

  async deleteTask(id: number): Promise<{ message: string }> {
    return await TaskApi.delete(id);
  }
}
