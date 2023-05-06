<template>
  <div id="app">
    <TaskManager />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TaskManager from "@/components/TaskManager.vue";

@Component({
  components: {
    TaskManager,
  },
})
export default class App extends Vue {}
</script>
