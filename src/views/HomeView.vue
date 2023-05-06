<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
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
export default class HomeView extends Vue {}
</script>
