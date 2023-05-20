<template>
  <el-row>
    <el-col :span="24">
      <h1 class="text-4xl">{{ coinInfo?.localization.ru }} - {{ coinInfo?.name }}</h1>
    </el-col>
  </el-row>
  <el-row :gutter="20" align="middle">
    <el-col :span="3">
      <div style="display: flex; align-items: center">
        <el-image :src="coinInfo?.image.large" style="width: 90px; height: 90px"> </el-image>
      </div>
    </el-col>
    <el-col :span="21">
      <div class="flex gap-32">
        <div>
          <p class="text-2xl">1 {{ coinInfo?.symbol }} =</p>
          <p class="text-6xl">${{ coinInfo?.market_data.current_price.usd }}</p>
        </div>
        <div class="flex align-middle self-center"></div>
      </div>
    </el-col>
  </el-row>
  <el-row :span="24">
    <ul>
      <li>Рыночн. кап.: {{ coinInfo?.market_data.market_cap.usd }} $</li>
      <li>Всего в обращении: {{ coinInfo?.market_data.ath.btc }} BTC</li>
      <li>Максимум: {{ coinInfo?.market_data.high_24h.usd }} BTC</li>
      <li>Объём (24ч): {{ coinInfo?.market_data.market_cap_change_24h }} $</li>
      <li>Изм. (7 д.): -8,57%</li>
    </ul>
  </el-row>
</template>

<script setup lang="ts">
// import { useRoute } from 'vue-router'

import type { ICoinInfo } from '@/interfaces/CoinInfo'

const route = useRoute()
const coinInfo = ref<ICoinInfo>()

CGApi.getCoinInfo(route.params.id).then(({ data }) => {
  coinInfo.value = data
})
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}

.el-row:last-child {
  margin-bottom: 0;
}
</style>
