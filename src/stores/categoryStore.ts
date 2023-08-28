import type { ICategory } from '@/interfaces'

export const useCategoryStore = defineStore('category', () => {
  const coinStore = useCoinStore()

  const AllCategory = { name: 'Все', category_id: 'all' }
  const category = ref<ICategory>(AllCategory)
  const categories = ref<ICategory[]>([])

  const categoryClick = (categ: ICategory) => {
    category.value = categ
  }

  watch(category, () => {
    coinStore.dataTable = []
    coinStore.currPage = 0
    coinStore.load()
  })

  return { category, categories, categoryClick }
})
