<!-- eslint-disable vue/valid-v-slot -->
<template>
  <div>
    <v-container>
      <h1 class="text-center">Task Manager</h1>
      <p></p>
      <v-row justify="center">
        <v-col cols="6" class="text-center">
          <v-btn color="success" class="mb-4" rounded @click="dialogOpen = true">CREATE NEW TASK</v-btn>
          <!-- Rows of Tasks here -->
          <div class="mx-auto mb-2" max-width="800" v-for="(task, index) in tasks" :key="index">
            <!-- Task Card Goes Here -->
            <v-card>
              <TaskItem :task="task" @selectTask="editTask" @deleteTask="deleteTask" @checked="changeTaskStatus" />
            </v-card>
          </div>
        </v-col>
      </v-row>

      <!-- Edit Dialog -->
      <v-dialog width="500" transition="dialog-bottom-transition" v-model="dialogOpen">
        <v-card>
          <v-card-title>{{ task.name }}</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="submitTask">
              <v-text-field label="Task Name" v-model="task.name" required>{{ task.name }}</v-text-field>
              <v-textarea label="Description" v-model="task.description" required></v-textarea>
              <v-row>
                <v-col>
                  <div>
                    <v-date-picker v-model="task.dueDate" label="Due Date" required></v-date-picker>
                  </div>
                  <div>
                    <v-btn color="primary" type="submit">{{ isEditing ? 'Update Task' : 'Add Task' }}</v-btn>
                  </div>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-container>
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
    completed: false,
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

  public async changeTaskStatus(task: ITask) {
    await this.taskService.updateTask(
      task.id,
      task.name,
      task.description,
      task.dueDate,
      !task.completed
    );
    this.getTasks();
  }

  public async submitTask() {
    if (this.isEditing) {
      await this.taskService.updateTask(
        this.task.id,
        this.task.name,
        this.task.description,
        this.task.dueDate,
        this.task.completed
      );
    } else {
      await this.taskService.createTask(
        this.task.name,
        this.task.description,
        this.task.dueDate
      );
    }
    this.isEditing = false;
    this.dialogOpen = false;
    this.resetForm();
    this.getTasks();
  }

  public async deleteTask(task: ITask) {
    await this.taskService.deleteTask(task.id);
    this.getTasks();
  }

  public async editTask(task: ITask) {
    this.task = { ...task };
    this.isEditing = true;
    this.dialogOpen = true;
  }

  public resetForm() {
    this.task = { name: "", description: "", dueDate: "", completed: false };
  }
}
</script>
