import axios from 'axios'

// axios.defaults.baseURL = 'https://api.coingecko.com/api/v3/coins'

const cgApiInst = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3'
})

export const getCoinList = (vsCurr: string, page: number, category?: string) =>
  cgApiInst({
    url: '/coins/markets',
    params: {
      vs_currency: vsCurr,
      locale: 'ru',
      page: page,
      category: category
    }
  })

export const getCoinInfo = (id: string | string[]) =>
  cgApiInst({
    url: `/coins/${id}`,
    params: {
      locale: 'ru'
    }
  })

export const getCategories = () =>
  cgApiInst({
    url: '/coins/categories/list'
  })

export const searchByQuery = (q: string) =>
  cgApiInst({
    url: `/search`,
    params: {
      query: q
    }
  })
