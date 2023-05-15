import axios from 'axios'

// axios.defaults.baseURL = 'https://api.coingecko.com/api/v3/coins'

const cgApiInst = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3/coins'
})

export const getCoinList = (vsCurr: string, page: number) =>
  cgApiInst({
    url: '/markets',
    params: {
      vs_currency: vsCurr,
      locale: 'ru',
      page: page
    }
  })
