<script setup lang="ts">
import { RouterView } from 'vue-router'

import { getCoinList } from '@/requests/coingecko'

getCoinList('usd', 1).then(({ data }) => {
  // После запроса нам приходит объект из которого мы достаем поле data
  console.log(data)
  // И присваиваем его к нашим тудушкам
})
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
      <el-header height="100px"> head </el-header>
      <el-main style="padding: 0; width: 100%">
        <RouterView />
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped></style>
