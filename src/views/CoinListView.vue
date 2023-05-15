<template>
  <!-- <div style="height: 95%"><CoinListTable /></div>
  <div style="height: 5%"><el-pagination layout="prev, pager, next" :total="50" /></div> -->
  <CoinListTable></CoinListTable>
  <el-pagination layout="prev, pager, next" :total="50" />
</template>

<script setup lang="ts">
import CoinListTable from '../components/CoinListTable.vue'
</script>

<style scoped></style>
