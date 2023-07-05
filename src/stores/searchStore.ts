import type { ISearchedCoin } from '@/interfaces'
import type { ITrendCoin } from '@/interfaces/TrendCoin'

export const useSearchStore = defineStore('search', () => {
  const options = ref<ISearchedCoin[]>([])
  const trends = ref<ITrendCoin[]>([])
  const loading = ref(false)
  const trendsShow = ref(true)

  const dbRemoteMethod = useDebounceFn(async (query) => {
    if (query) {
      loading.value = true
      const { data } = await getCoinsByQuery(query)
      options.value = data.coins
      trendsShow.value = loading.value = false
    } else {
      options.value = []
      trendsShow.value = true
    }
  }, 1000)

  const fetchTrendCoins = async () => {
    const { data } = await getTrendingCoins()
    trends.value = data
  }

  fetchTrendCoins()

  return { options, loading, dbRemoteMethod, trends, fetchTrendCoins, trendsShow }
})
