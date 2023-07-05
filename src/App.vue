<template>
  <div class="mx-auto h-screen w-11/12 max-w-7xl">
    <NavigationHeader />
    <div style="height: calc(100vh - 80px)" id="view">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<style scoped></style>
