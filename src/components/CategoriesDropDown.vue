<template>
  <el-dropdown trigger="click" size="large">
    <el-button size="large">
      {{ categoryStore.category?.name }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
    </el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-scrollbar height="400px">
          <el-dropdown-item
            v-for="e in categoryStore.categories"
            :key="e.category_id"
            @click="categoryStore.categoryClick(e)"
          >
            {{ e.name }}
          </el-dropdown-item>
        </el-scrollbar>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { ArrowDown } from '@element-plus/icons-vue'

const categoryStore = useCategoryStore()

categoryStore.fetchCategories()
</script>

<style scoped></style>
