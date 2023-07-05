import type { ICategory, ICoin, ICoinInfo } from '@/interfaces'

const coinsInst = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3/coins'
})

export const getCoinList = (vsCurr: string, page: number, category?: string) =>
  coinsInst<ICoin[]>({
    url: `/markets`,
    method: 'GET',
    params: {
      vs_currency: vsCurr,
      locale: 'ru',
      page: page,
      category: category
    }
  })

export const getCoinInfo = (id: string | string[]) =>
  coinsInst<ICoinInfo>({
    url: `/${id}`,
    method: 'GET',
    params: {
      locale: 'ru'
    }
  })

export const getCategories = () =>
  coinsInst<ICategory[]>({
    url: `/categories/list`,
    method: 'GET'
  })
