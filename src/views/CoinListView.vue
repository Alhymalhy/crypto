<template>
  <div class="h-full flex flex-col">
    <div class="flex items-center p-5 gap-5 grow">
      <CurrencyInput class="m-0" />
      <CategoriesDropDown :categories="categories" :category="category" @handle="categoryClick" />
    </div>
    <CoinListTable :dataTable="dataTable" @load="load" />
  </div>
</template>

<script setup lang="ts">
import type { ICategory } from '@/interfaces/Category'
import type { ICoin } from '@/interfaces/Coin'
import { getCategories, getCoinList } from '@/requests/coingecko'

const categories = ref<ICategory[]>([])
const category = ref<ICategory>({ name: 'Все', category_id: 'all' })
const dataTable = ref<ICoin[]>([])
const currPage = ref<number>(0)

getCategories().then(({ data }) => {
  categories.value = [{ name: 'Все', category_id: 'all' }].concat(data)
})

const categoryClick = (categ: ICategory) => {
  category.value = categ
}

watch(category, () => {
  console.log(category.value?.name)
  dataTable.value = []
  currPage.value = 0
  load()
})

const load = () => {
  console.log('load')
  currPage.value++
  if (category.value.category_id == 'all') {
    getCoinList('usd', currPage.value).then(({ data }) => {
      dataTable.value = [...dataTable.value, ...data]
    })
  } else {
    getCoinList('usd', currPage.value, category.value.category_id).then(({ data }) => {
      dataTable.value = [...dataTable.value, ...data]
    })
  }
}

// const dataTable = ref<ICoin[]>([])
// const currPage = ref<number>(0)
// const totalPage = ref<number>(10)
// const disableScroll = ref<boolean>(false)
// const load = () => {
//   currPage.value++

//   if (currPage.value <= totalPage.value) {
//     getCoinList('usd', currPage.value).then(({ data }) => {
//       dataTable.value = dataTable.value.concat(data)
//     })
//   } else if (currPage.value === totalPage.value) {
//     disableScroll.value = true
//   }
// }
</script>

<style scoped></style>
