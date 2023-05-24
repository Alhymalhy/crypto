import type { ISearchedCoin } from '@/interfaces'

export const useSearchStore = defineStore('search', () => {
  const options = ref<ISearchedCoin[]>([])
  const loading = ref(false)

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
    } else {
      options.value = []
    }
  }, 1000)

  return { options, loading, dbRemoteMethod }
})
