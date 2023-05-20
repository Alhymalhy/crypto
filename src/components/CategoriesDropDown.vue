<template>
  <el-dropdown trigger="click" size="large">
    <el-button size="large">
      {{ category?.name }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
    </el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-scrollbar height="400px">
          <el-dropdown-item
            v-for="e in categories"
            :key="e.category_id"
            @click="$emit('handle', e)"
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
import type { ICategory } from '@/interfaces/Category'

interface Props {
  category: ICategory
  categories: ICategory[]
}

defineProps<Props>()

defineEmits<{
  (e: 'handle', cat: ICategory): void
}>()
</script>

<style scoped></style>
