<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <TaskManager />
</template>

<script lang="ts">
import Vue from "vue";
// import HelloWorld from "../components/HelloWorld.vue";
import TaskManager from "../components/TaskManager.vue";
export default Vue.extend({
  // eslint-disable-next-line
  name: "Home",

  components: {
    TaskManager,
  },
});
</script>
