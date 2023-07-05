<template>
  <el-select v-model="coinStore.VSCurr" filterable class="w-24">
    <el-option v-for="item in options" :key="options.indexOf(item)" :value="item" />
  </el-select>
</template>

<script setup lang="ts">
const options = ref<string[]>([])

getVsCurrList().then(({ data }) => {
  options.value = data
})

const coinStore = useCoinStore()
</script>

<style scoped></style>
