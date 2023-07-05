import type { ICategory, ICoin } from '@/interfaces'

export const useCoinStore = defineStore('coin', () => {
  const categoryStroe = useCategoryStore()

  const dataTable = ref<ICoin[]>([])
  const currPage = ref<number>(0)
  const VSCurr = ref<string>('usd')

  const fetchCoins = (categ?: ICategory) => {
    CGApi.getCoinList(VSCurr.value, currPage.value, categ?.category_id).then(({ data }) => {
      dataTable.value = [...dataTable.value, ...data]
    })
  }

  const load = () => {
    currPage.value++
    categoryStroe.category.category_id == 'all' ? fetchCoins() : fetchCoins(categoryStroe.category)
  }

  watch(VSCurr, () => {
    dataTable.value = []
    currPage.value = 0
    load()
  })
  return { dataTable, load, currPage, VSCurr }
})
