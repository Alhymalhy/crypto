<template>
  <el-dropdown trigger="click">
    <el-button>
      {{ categoryStore.category?.name }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
    </el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-scrollbar height="400px">
          <el-dropdown-item
            v-for="category in data"
            :key="category.category_id"
            @click="categoryStore.categoryClick(category)"
          >
            {{ category.name }}
          </el-dropdown-item>
        </el-scrollbar>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { ArrowDown } from '@element-plus/icons-vue'
import { coingeckoApi } from '@/services/api'

import { useQuery } from '@tanstack/vue-query'

const categoryStore = useCategoryStore()

const { data } = useQuery({
  queryKey: ['category'],
  queryFn: async () => {
    const { data } = await coingeckoApi.coins.getCategories()
    return [{ name: 'Все', category_id: 'all' }, ...data]
  }
})
</script>

<style scoped></style>
