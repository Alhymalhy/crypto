<template>
  <div>
    <el-table
      v-el-table-infinite-scroll="load"
      :infinite-scroll-disabled="disableScroll"
      :data="dataTable"
      height="980"
    >
      <el-table-column prop="market_cap_rank" label="#" sortable width="60" align="center" />

      <el-table-column align="center" width="46">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-image style="width: 20px; height: 20px" :src="scope.row.image" />
          </div>
        </template>
      </el-table-column>

      <el-table-column label="Название" sortable>
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <RouterLink :to="'/coin/' + scope.row.id">
              <el-link type="info">
                {{ scope.row.name }}
              </el-link>
            </RouterLink>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="symbol" label="Тикер" sortable width="100">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <p>{{ scope.row.symbol.toUpperCase() }}</p>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="current_price" label="Цена (usd)" sortable align="right" />

      <el-table-column label="Рыночный капитал" sortable align="right">
        <template #default="scope">
          <p>{{ shrtedNum(scope.row.market_cap) }}</p>
        </template>
      </el-table-column>

      <el-table-column label="Объем (24ч.)" sortable align="right">
        <template #default="scope">
          <p>{{ shrtedNum(scope.row.total_volume) }}</p>
        </template>
      </el-table-column>

      <el-table-column label="Изменение (24ч.)" sortable align="right">
        <template #default="scope">
          <p
            v-bind:class="{
              low: scope.row.price_change_percentage_24h < 0,
              hig: scope.row.price_change_percentage_24h > 0
            }"
          >
            {{ scope.row.price_change_percentage_24h + '%' }}
          </p>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { default as vElTableInfiniteScroll } from 'el-table-infinite-scroll'

import { shrtedNum } from '@/utils'
import { getCoinList } from '@/requests/coingecko'
import type { ICoin } from '@/interfaces/Coin'

const dataTable = ref<ICoin[]>([])
const currPage = ref<number>(0)
const totalPage = ref<number>(10)
const disableScroll = ref<boolean>(false)

const load = () => {
  currPage.value++

  if (currPage.value <= totalPage.value) {
    getCoinList('usd', currPage.value).then(({ data }) => {
      dataTable.value = dataTable.value.concat(data)
    })
  } else if (currPage.value === totalPage.value) {
    disableScroll.value = true
  }
}
</script>

<style scoped>
.low {
  color: rgb(220 38 38);
}

.hig {
  color: rgb(101 163 13);
}
</style>
