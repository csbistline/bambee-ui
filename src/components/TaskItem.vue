<template>
  <v-card
    class="mx-auto"
    outlined
    shaped
    elevation="2"
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="text-overline mb-4">
          {{ task.status }}
        </div>
        <v-list-item-title class="text-h5 mb-1">
          {{ task.name }}
        </v-list-item-title>
        <v-list-item-subtitle>{{ task.description }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-card-actions>
      <v-btn
        outlined
        rounded
        text
      >
        {{ task.status }}
      </v-btn>
    </v-card-actions>
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