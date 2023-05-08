<template>
  <v-card class="mx-auto" outlined shaped elevation="4">
    <v-row no-gutters>
      <v-col cols="1">
        <!-- Completed Checkbox -->
        <div class="text-overline pl-3 pt-1 mb-0">
          <v-checkbox :input-value="task.completed" @change="$emit('checked', task)" />
        </div>

      </v-col>
      <v-col>
        <!-- Name and Description of task -->
          <v-card-title>{{ task.name }}</v-card-title>
          <v-card-subtitle class="text-left">{{ task.description }}</v-card-subtitle>
      </v-col>
      <v-col cols="3">
        <!-- Due Date -->
          <div class="text-overline d-flex align-end flex-column pr-3 pt-3">
            DUE BY: {{ task.dueDate }}
          </div>
          <div class="d-flex align-end flex-column pr-2">

            <v-btn color="primary" rounded small class="ma-2 white--text" @click="$emit('selectTask', task)">
              Edit
              <v-icon right dark>
                mdi-note-edit
              </v-icon>
            </v-btn>
            <v-btn color="red" rounded small class="ma-2 white--text" @click="$emit('deleteTask', task)">
              Delete
              <v-icon right dark>
                mdi-note-edit
              </v-icon>
            </v-btn>
          </div>

      </v-col>
    </v-row>

  </v-card>
</template>
<script lang="ts">
import { Vue } from "vue-property-decorator";

export default Vue.extend({
  name: "TaskItem",

  data: () => ({}),
  props: ["task"],
});
</script>