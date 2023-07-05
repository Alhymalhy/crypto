const simpleInst = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3/simple'
})

export const getVsCurrList = () =>
  simpleInst<string[]>({
    url: '/supported_vs_currencies'
  })
