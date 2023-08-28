import type { ICategory, ICoin, ICoinInfo } from '@/interfaces'
import apiInstance from './base'
import type { AxiosPromise } from 'axios'

const BASE_URL = '/coins'

export interface getCoinListParams {
  vs_currency: string
  page: number
  category?: string
}

export const getCoinList = (params: getCoinListParams): AxiosPromise<ICoin[]> =>
  apiInstance.get(`${BASE_URL}/markets`, {
    params
  })

export const getCoinInfo = (id: string): AxiosPromise<ICoinInfo> =>
  apiInstance.get(`${BASE_URL}/${id}`)

export const getCategories = (): AxiosPromise<ICategory[]> =>
  apiInstance.get(`${BASE_URL}/categories/list`)
