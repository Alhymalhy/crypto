import type { ISearchedCoin } from '@/interfaces'
import type { ITrendCoin } from '@/interfaces/TrendCoin'

export const useSearchStore = defineStore('search', () => {
  const options = ref<ISearchedCoin[]>([])
  const trends = ref<ITrendCoin[]>([])
  const loading = ref(false)
  const trendsShow = ref(true)

  const dbRemoteMethod = useDebounceFn((query) => {
    if (query) {
      loading.value = true
      CGApi.getCoinsByQuery(query)
        .then(({ data }) => {
          options.value = data.coins
        })
        .then(() => {
          loading.value = false
        })
      trendsShow.value = false
    } else {
      options.value = []
      trendsShow.value = true
    }
  }, 1000)

  const fetchTrendCoins = () => {
    CGApi.getTrendingCoins().then(({ data }) => {
      trends.value = data
    })
  }

  fetchTrendCoins()

  return { options, loading, dbRemoteMethod, trends, fetchTrendCoins, trendsShow }
})
