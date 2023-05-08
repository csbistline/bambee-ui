<template>
  <v-card>
    <v-card-title>{{ task.name }}</v-card-title>
    <v-card-text>
      <v-form @submit.prevent="submitTask">
        <v-text-field label="Task Name" v-model="task.name" required></v-text-field>
        <v-textarea label="Description" v-model="task.description" required></v-textarea>
        <v-row>
          <v-col cols="6">
            <v-date-picker v-model="task.dueDate" label="Due Date" required></v-date-picker>
          </v-col>
          <v-col cols="6">
            <v-btn color="primary" type="submit">{{ isEditing ? 'Update Task' : 'Add Task' }}</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>

  </v-card>
</template>
<script lang="ts">
import { Vue } from "vue-property-decorator";

export default Vue.extend({
  name: "TaskEditor",

  data: () => ({}),
  props: ["task, isEditing", "dialogOpen"],
});
</script>