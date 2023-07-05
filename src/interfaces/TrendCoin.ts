export interface ITrendCoins {
  coins: Item
  exchanges: any[]
}

export interface Item {
  item: Item
}

export interface ITrendCoin {
  id: string
  coin_id: number
  name: string
  symbol: string
  market_cap_rank: number
  thumb: string
  small: string
  large: string
  slug: string
  price_btc: number
  score: number
}
