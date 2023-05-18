<template>
  <el-container style="height: 100hv">
    <el-aside style="height: 100hv">
      <el-menu router style="height: 100%">
        <el-menu-item index="/">Home</el-menu-item>
        <el-menu-item index="/coinList">coins</el-menu-item>
      </el-menu>
    </el-aside>
    <el-container style="height: 100vh">
      <el-main style="padding: 0; height: 100hv">
        <RouterView />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<style scoped></style>
