import type { ICategory, ICoin, ICoinInfo, ISearchedCoin } from '@/interfaces'
import type { ITrendCoin, Item } from '@/interfaces/TrendCoin'

const cgApiInst = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3'
})

interface SearchRes {
  coins: ISearchedCoin[]
}

export const CGApi = {
  getCoinsByQuery(q: string) {
    return cgApiInst<SearchRes>({
      url: `/search`,
      params: {
        query: q
      }
    })
  },

  getTrendingCoins() {
    return cgApiInst<ITrendCoin[]>({
      url: `/search/trending`,
      transformResponse: [
        (data) => {
          return JSON.parse(data).coins.map((e: Item) => {
            return e.item
          })
        }
      ]
    })
  },

  getVsCurrList() {
    return cgApiInst<string[]>({
      url: '/simple/supported_vs_currencies'
    })
  },

  getCoinList(vsCurr: string, page: number, category?: string) {
    return cgApiInst<ICoin[]>({
      url: '/coins/markets',
      params: {
        vs_currency: vsCurr,
        locale: 'ru',
        page: page,
        category: category
      }
    })
  },

  getCoinInfo(id: string | string[]) {
    return cgApiInst<ICoinInfo>({
      url: `/coins/${id}`,
      params: {
        locale: 'ru'
      }
    })
  },

  getCategories() {
    return cgApiInst<ICategory[]>({
      url: '/coins/categories/list'
    })
  }
}
