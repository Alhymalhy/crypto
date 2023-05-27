<template>
  <el-button circle @click="toggleDark()">
    <el-icon>
      <Sunny v-if="isDark" />
      <Moon v-else />
    </el-icon>
  </el-button>
</template>

<script setup lang="ts">
import { Moon, Sunny } from '@element-plus/icons-vue'
const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<style scoped></style>
