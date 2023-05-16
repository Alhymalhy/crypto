<script setup lang="ts">
import { RouterView } from 'vue-router'
import { Calendar, Search } from '@element-plus/icons-vue'
import { ref } from 'vue'

const input = ref('')
</script>

<template>
  <el-container style="height: 100hv">
    <el-aside style="height: 100hv">
      <el-menu router style="height: 100%">
        <el-menu-item index="/">Home</el-menu-item>
        <el-menu-item index="/coinList">coins</el-menu-item>
      </el-menu>
    </el-aside>
    <el-container style="height: 100vh">
      <el-header height="100px">
        <el-input
          class="w-50 m-2"
          v-model="input"
          placeholder=""
          clearable
          :prefix-icon="Search"
          size="large"
        ></el-input>
      </el-header>
      <el-main style="padding: 0; width: 100%">
        <RouterView />
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped></style>
