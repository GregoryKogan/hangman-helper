<template>
  <v-app>
    <v-main>
      <HomeView />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HomeView from "./views/HomeView.vue"; 

export default defineComponent({
  name: "App",
  components: {
    HomeView,
  },
});
</script>

<style>
* {
  color: #c0caf5;
}
body {
  background-color: #24283b;
}
</style>