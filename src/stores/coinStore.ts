import type { ICategory, ICoin } from '@/interfaces'

export const useCoinStore = defineStore('coin', () => {
  const categoryStroe = useCategoryStore()

  const dataTable = ref<ICoin[]>([])
  const currPage = ref<number>(0)

  const fetchCoins = (categ?: ICategory) => {
    CGApi.getCoinList('usd', currPage.value, categ?.category_id).then(({ data }) => {
      dataTable.value = [...dataTable.value, ...data]
    })
  }

  const load = () => {
    currPage.value++
    categoryStroe.category.category_id == 'all' ? fetchCoins() : fetchCoins(categoryStroe.category)
  }
  return { dataTable, load, currPage }
})
