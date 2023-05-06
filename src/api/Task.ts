import axios from "axios";
import { Task } from "@/services/TaskService";

export default {
  async getAll(): Promise<Task[]> {
    const response = await axios.get("/api/tasks");
    return response.data;
  },

  async get(id: number): Promise<Task> {
    const response = await axios.post(`/api/tasks/${id}`);
    return response.data;
  },

  async create(task: Task): Promise<Task> {
    const response = await axios.post("/api/tasks", task);
    return response.data;
  },

  async update(task: Task): Promise<Task> {
    const response = await axios.put(`/api/tasks/${task.id}`, task);
    return response.data;
  },

  async delete(id: number): Promise<{ message: string }> {
    const response = await axios.delete(`/api/tasks/${id}`);
    return response.data;
  },
};
