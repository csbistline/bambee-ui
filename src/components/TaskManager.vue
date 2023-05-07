<!-- eslint-disable vue/valid-v-slot -->
<template>
<div>
  <v-container>
    <h1 class="text-center">Task Manager</h1>
    <p></p>

      <!-- Rows of Tasks here -->
      <v-row justify="center" v-for="(task, index) in tasks" :key="index" cols="12" sm="6" md="4">
        <v-col cols="10">
          <!-- Task Card Goes Here -->
          <v-card @click="selectTask(task)">
            <TaskItem :task="task"/>
            <!-- <v-card-title>{{ task.name }}</v-card-title>
            <v-card-text>{{ task.description }}</v-card-text> -->
          </v-card>
        </v-col>
      </v-row>

      <v-dialog 
        v-if="selectedTask" 
        v-model="dialogOpen"
        width="auto"
        transition="dialog-bottom-transition"
      >

      <v-card>
        <v-card-title>{{ task.name }}</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="submitTask">
          <v-text-field label="Task Name" v-model="task.name" required></v-text-field>
          <v-textarea label="Description" v-model="task.description" required></v-textarea>
          <v-date-picker v-model="task.dueDate" label="Due Date" required></v-date-picker>
          <v-btn color="primary" type="submit">{{ isEditing ? 'Update Task' : 'Add Task' }}</v-btn>
        </v-form>
        </v-card-text>

      </v-card>
        <!-- <h2>{{ selectedTask.name }}</h2>
        <p>{{ selectedTask.description }}</p>
        <p>Due Date: {{ selectedTask.dueDate }}</p>
        <p>Status: {{ selectedTask.status }}</p> -->
      </v-dialog>
  </v-container>
  <!-- <div>
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
  </div>-->
</div> 
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ITask, TaskService } from "@/services/TaskService";
import TaskItem from "./TaskItem.vue";

@Component({
  components: {
    TaskItem,
  },
})
export default class TaskManager extends Vue {
  public taskService: TaskService = new TaskService();
  public tasks: ITask[] = [];
  public task: ITask = {
    name: "",
    description: "",
    dueDate: "",
    status: "New",
  };
  public selectedTask: ITask | null = null;
  public isEditing = false;
  public headers = ["Name", "Description", "Due Date", "Status", "Actions"];
  public dialogOpen = false;

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

  public async deleteTask(task: ITask) {
    await this.taskService.deleteTask(task.id);
    this.getTasks();
  }

  public async editTask(task: ITask) {
    this.task = { ...task };
    this.selectedTask = null;
    this.isEditing = true;
  }

  public selectTask(task: ITask) {
    this.task = { ...task };
    this.selectedTask = this.task;
    this.isEditing = true;
    this.dialogOpen = true;
  }
  public resetForm() {
    this.task = { name: "", description: "", dueDate: "", status: "New" };
  }
}
</script>
