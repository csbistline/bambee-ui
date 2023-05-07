import axios from "axios";
import { ITask } from "@/services/TaskService";

const TaskApi = {
  async create(task: ITask): Promise<ITask> {
    const response = await axios.post("/api/tasks", task);
    return response.data;
  },

  async getAll(): Promise<ITask[]> {
    const response = await axios.get("/api/tasks");
    return response.data;
  },

  async get(id: number): Promise<ITask> {
    const response = await axios.get(`/api/tasks/${id}`);
    return response.data;
  },

  async update(task: ITask): Promise<ITask> {
    const response = await axios.put(`/api/tasks/${task.id}`, task);
    return response.data;
  },

  async delete(id: number): Promise<{ message: string }> {
    const response = await axios.delete(`/api/tasks/${id}`);
    return response.data;
  },
};

export { TaskApi };
