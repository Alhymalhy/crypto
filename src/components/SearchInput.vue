<template>
  <el-select
    class="w-full"
    clerable
    filterable
    placeholder="Поиск..."
    remote
    size="large"
    :remote-method="dbRemoteMethod"
    :loading="loading"
  >
    <el-option v-for="item in options" :key="item.id">
      <RouterLink :to="'/coin/' + item.id">
        <div style="display: flex; align-items: center; width: 100%">
          <el-image style="width: 20px; height: 20px" :src="item.large" />
          <div class="ml-5 grow">
            {{ item.name }}
          </div>
          <div class="text-right">#{{ item.market_cap_rank }}</div>
        </div>
      </RouterLink>
    </el-option>
  </el-select>
</template>

<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'

import { searchByQuery } from '@/requests/coingecko'
import type { ISearchedCoin } from '@/interfaces/SearchedCoin'

const options = ref<ISearchedCoin[]>([])
const loading = ref(false)

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
