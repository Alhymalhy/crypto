<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <el-container>
    <el-aside width="200px">
      <el-menu router>
        <el-menu-item index="/">Home</el-menu-item>

        <el-menu-item index="/coinList"> coins </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main><RouterView /></el-main>
    </el-container>
  </el-container>
</template>

<style scoped></style>
