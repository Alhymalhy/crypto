<template>
  <CoinListTable :data="dataTable" />
  <el-pagination layout="prev, pager, next" :total="50" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

import CoinListTable from '@/components/CoinListTable.vue'

import type { ICoin } from '@/interfaces/Coin'

import { getCoinList } from '@/requests/coingecko'

const dataTable = ref<ICoin[]>([])

getCoinList('usd', 1).then(({ data }) => {
  dataTable.value = data
})
</script>

<style scoped></style>
