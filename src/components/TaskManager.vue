<template>
  <div>
    <h1>Task Manager</h1>
    <form @submit.prevent="submitTask">
      <div>
        <label for="name">Task Name:</label>
        <input type="text" id="name" v-model="task.name" required />
      </div>
      <div>
        <label for="description">Description:</label>
        <textarea id="description" v-model="task.description" required></textarea>
      </div>
      <div>
        <label for="due-date">Due Date:</label>
        <input type="date" id="due-date" v-model="task.dueDate" required />
      </div>
      <button type="submit">{{ isEditing ? 'Update Task' : 'Add Task' }}</button>
    </form>
    <h2>Tasks</h2>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Due Date</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(task, index) in tasks" :key="index">
          <td>{{ task.name }}</td>
          <td>{{ task.description }}</td>
          <td>{{ task.dueDate }}</td>
          <td>{{ task.status }}</td>
          <td>
            <button @click="editTask(task)">Edit</button>
            <button @click="deleteTask(task)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="selectedTask">
      <h2>{{ selectedTask.name }}</h2>
      <p>{{ selectedTask.description }}</p>
      <p>Due Date: {{ selectedTask.dueDate }}</p>
      <p>Status: {{ selectedTask.status }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Task, TaskService } from "@/services/TaskService";

@Component
export default class TaskManager extends Vue {
  public taskService: TaskService = new TaskService();
  public tasks: Task[] = [];
  public task: Task = { name: "", description: "", dueDate: "", status: "New" };
  public selectedTask: Task | null = null;
  public isEditing = false;

  mounted() {
    this.getTasks();
  }

  public async getTasks() {
    this.tasks = await this.taskService.getTasks();
  }

  public async submitTask() {
    if (this.isEditing) {
      await this.taskService.updateTask(
        this.task.id,
        this.task.name,
        this.task.description,
        this.task.dueDate,
        this.task.status
      );
      this.isEditing = false;
    } else {
      await this.taskService.createTask(
        this.task.name,
        this.task.description,
        this.task.dueDate
      );
    }
    this.resetForm();
    this.getTasks();
  }

  public async deleteTask(task: Task) {
    await this.taskService.deleteTask(task.id);
    this.getTasks();
  }

  public async editTask(task: Task) {
    this.task = { ...task };
    this.selectedTask = null;
    this.isEditing = true;
  }

  public resetForm() {
    this.task = { name: "", description: "", dueDate: "", status: "New" };
  }
}
</script>
