<template>
  <div class="h-screen">
    <div class="h-[64px] pt-3">
      <div class="border-y h-full">
        <div class="w-11/12 max-w-7xl mx-auto">header</div>
      </div>
    </div>
    <div class="w-11/12 max-w-7xl mx-auto" style="height: calc(100vh - 64px)">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<style scoped></style>
