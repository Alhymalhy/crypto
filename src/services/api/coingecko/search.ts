import type { ITrendCoin, Item } from '@/interfaces/TrendCoin'
import type { ISearchedCoin } from '@/interfaces'

const searchInst = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3/search'
})

export const getCoinsByQuery = (q: string) =>
  searchInst<{
    coins: ISearchedCoin[]
  }>({
    params: {
      query: q
    }
  })

export const getTrendingCoins = () =>
  searchInst<ITrendCoin[]>({
    url: `/trending`,
    transformResponse: [
      (data) => {
        return JSON.parse(data).coins.map((e: Item) => {
          return e.item
        })
      }
    ]
  })
