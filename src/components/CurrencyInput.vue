<template>
  <!-- <el-input
    class="w-50 m-2"
    v-model="input"
    placeholder=""
    clearable
    :prefix-icon="Search"
    size="large"
  /> -->

  <el-select
    class="w-full"
    v-model="value"
    clerable
    filterable
    placeholder="Поиск..."
    remote
    size="large"
    :remote-method="dbRemoteMethod"
    :loading="loading"
  >
    <el-option v-for="item in options" :key="item.id">
      <div style="display: flex; align-items: center">
        <RouterLink :to="'/coin/' + item.id">
          <el-link type="info">
            {{ item.name }}
          </el-link>
        </RouterLink>
      </div>
    </el-option>
  </el-select>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
const input = ref('')
import { searchByQuery } from '@/requests/coingecko'

const options = ref([])
const loading = ref(false)

const value = ref('')

import { useDebounceFn } from '@vueuse/core'

const dbRemoteMethod = useDebounceFn((query) => {
  console.log(query)
  if (query) {
    loading.value = true
    searchByQuery(query)
      .then(({ data }) => {
        options.value = data.coins
      })
      .then(() => {
        loading.value = false
      })
  } else {
    options.value = []
  }
}, 1000)
</script>

<style scoped></style>
