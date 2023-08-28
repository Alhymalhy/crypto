/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType
} from 'axios'
import axios from 'axios'

export type QueryParamsType = Record<string | number, any>

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, 'data' | 'params' | 'url' | 'responseType'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean
  /** request path */
  path: string
  /** content type of request body */
  type?: ContentType
  /** query params */
  query?: QueryParamsType
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType
  /** request body */
  body?: unknown
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, 'data' | 'cancelToken'> {
  securityWorker?: (
    securityData: SecurityDataType | null
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void
  secure?: boolean
  format?: ResponseType
}

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain'
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance
  private securityData: SecurityDataType | null = null
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker']
  private secure?: boolean
  private format?: ResponseType

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || 'https://api.coingecko.com/api/v3'
    })
    this.secure = secure
    this.format = format
    this.securityWorker = securityWorker
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data
  }

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method)

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {})
      }
    }
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === 'object' && formItem !== null) {
      return JSON.stringify(formItem)
    } else {
      return `${formItem}`
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key]
      const propertyContent: any[] = property instanceof Array ? property : [property]

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem))
      }

      return formData
    }, new FormData())
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {}
    const requestParams = this.mergeRequestParams(params, secureParams)
    const responseFormat = format || this.format || undefined

    if (type === ContentType.FormData && body && body !== null && typeof body === 'object') {
      body = this.createFormData(body as Record<string, unknown>)
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== 'string') {
      body = JSON.stringify(body)
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {})
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path
    })
  }
}

/**
 * @title CoinGecko API V3
 * @version 3.0.0
 * @baseUrl https://api.coingecko.com/api/v3
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  ping = {
    /**
     * @description Check API server status
     *
     * @tags ping
     * @name PingList
     * @summary Check API server status
     * @request GET:/ping
     */
    pingList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/ping`,
        method: 'GET',
        ...params
      })
  }
  simple = {
    /**
     * @description Note: to check if a price is stale, please flag `include_last_updated_at=true` to get the latest updated time. You may also flag `include_24hr_change=true` to check if it returns 'null' value. Cache / Update Frequency: every 60 seconds  (every 30 seconds for Pro API)
     *
     * @tags simple
     * @name PriceList
     * @summary Get the current price of any cryptocurrencies in any other supported currencies that you need.
     * @request GET:/simple/price
     */
    priceList: (
      query: {
        /**
         * id of coins, comma-separated if querying more than 1 coin
         * *refers to <b>`coins/list`</b>
         */
        ids: string
        /**
         * vs_currency of coins, comma-separated if querying more than 1 vs_currency
         * *refers to <b>`simple/supported_vs_currencies`</b>
         */
        vs_currencies: string
        /** <b>true/false</b> to include market_cap, <b>default: false</b> */
        include_market_cap?: string
        /** <b>true/false</b> to include 24hr_vol, <b>default: false</b> */
        include_24hr_vol?: string
        /** <b>true/false</b> to include 24hr_change, <b>default: false</b> */
        include_24hr_change?: string
        /** <b>true/false</b> to include last_updated_at of price, <b>default: false</b> */
        include_last_updated_at?: string
        /** <b>full</b> or any value between 0 - 18 to specify decimal place for currency price value */
        precision?: string
      },
      params: RequestParams = {}
    ) =>
      this.request<void, any>({
        path: `/simple/price`,
        method: 'GET',
        query: query,
        ...params
      }),

    /**
     * @description Cache / Update Frequency: every 60 seconds  (every 30 seconds for Pro API)
     *
     * @tags simple
     * @name TokenPriceDetail
     * @summary Get current price of tokens (using contract addresses) for a given platform in any other currency that you need.
     * @request GET:/simple/token_price/{id}
     */
    tokenPriceDetail: (
      id: string,
      query: {
        /** The contract address of tokens, comma separated */
        contract_addresses: string
        /**
         * vs_currency of coins, comma-separated if querying more than 1 vs_currency
         * *refers to <b>`simple/supported_vs_currencies`</b>
         */
        vs_currencies: string
        /** <b>true/false</b> to include market_cap, <b>default: false</b> */
        include_market_cap?: string
        /** <b>true/false</b> to include 24hr_vol, <b>default: false</b> */
        include_24hr_vol?: string
        /** <b>true/false</b> to include 24hr_change, <b>default: false</b> */
        include_24hr_change?: string
        /** <b>true/false</b> to include last_updated_at of price, <b>default: false</b> */
        include_last_updated_at?: string
        /** <b>full</b> or any value between 0 - 18 to specify decimal place for currency price value */
        precision?: string
      },
      params: RequestParams = {}
    ) =>
      this.request<void, any>({
        path: `/simple/token_price/${id}`,
        method: 'GET',
        query: query,
        ...params
      }),

    /**
     * @description Cache / Update Frequency: every 60 seconds
     *
     * @tags simple
     * @name SupportedVsCurrenciesList
     * @summary Get list of supported_vs_currencies.
     * @request GET:/simple/supported_vs_currencies
     */
    supportedVsCurrenciesList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/simple/supported_vs_currencies`,
        method: 'GET',
        ...params
      })
  }
  coins = {
    /**
     * @description <li>All the coins that show up on this <strong>/coins/list</strong> endpoint are Active coins that listed by CoinGecko team on CoinGecko.com</li><li>If a coin is inactive or deactivated, it will be removed from <strong>/coins/list</strong></li> Cache / Update Frequency: every 5 minutes
     *
     * @tags coins
     * @name ListList
     * @summary List all supported coins id, name and symbol (no pagination required)
     * @request GET:/coins/list
     */
    listList: (
      query?: {
        /**
         * flag to include platform contract addresses (eg. 0x.... for Ethereum based tokens).
         *  valid values: true, false
         */
        include_platform?: boolean
      },
      params: RequestParams = {}
    ) =>
      this.request<void, any>({
        path: `/coins/list`,
        method: 'GET',
        query: query,
        ...params
      }),

    /**
     * @description Use this to obtain all the coins market data (price, market cap, volume), per page.<br>Note: when both 'category' and 'ids' parameters are supplied, the 'category' parameter takes precedence over the 'ids' parameter. Cache / Update Frequency: every 45 seconds
     *
     * @tags coins
     * @name MarketsList
     * @summary List all supported coins price, market cap, volume, and market related data
     * @request GET:/coins/markets
     */
    marketsList: (
      query: {
        /** The target currency of market data (usd, eur, jpy, etc.) */
        vs_currency: string
        /** The ids of the coin, comma separated crytocurrency symbols (base). refers to `/coins/list`. */
        ids?: string
        /** filter by coin category. Refer to /coin/categories/list */
        category?: string
        /**
         * valid values: <b>market_cap_asc, market_cap_desc, volume_asc, volume_desc, id_asc, id_desc</b>
         * sort results by field.
         * @default "market_cap_desc"
         */
        order?: string
        /**
         * valid values: 1..250
         *  Total results per page
         * @default 100
         */
        per_page?: number
        /**
         * Page through results
         * @default 1
         */
        page?: number
        /**
         * Include sparkline 7 days data (eg. true, false)
         * @default false
         */
        sparkline?: boolean
        /** Include price change percentage in <b>1h, 24h, 7d, 14d, 30d, 200d, 1y</b> (eg. '`1h,24h,7d`' comma-separated, invalid values will be discarded) */
        price_change_percentage?: string
        /**
         * valid values: <b>ar, bg, cs, da, de, el, en, es, fi, fr, he, hi, hr, hu, id, it, ja, ko, lt, nl, no, pl, pt, ro, ru, sk, sl, sv, th, tr, uk, vi, zh, zh-tw</b>
         * @default "en"
         */
        locale?: string
        /** <b>full</b> or any value between 0 - 18 to specify decimal place for currency price value */
        precision?: string
      },
      params: RequestParams = {}
    ) =>
      this.request<void, any>({
        path: `/coins/markets`,
        method: 'GET',
        query: query,
        ...params
      }),

    /**
     * @description Get current data (name, price, market, ... including exchange tickers) for a coin.<br><br> **IMPORTANT**: Ticker object is limited to 100 items, to get more tickers, use `/coins/{id}/tickers` Ticker `is_stale` is true when ticker that has not been updated/unchanged from the exchange for more than 8 hours. Ticker `is_anomaly` is true if ticker's price is outliered by our system. You are responsible for managing how you want to display these information (e.g. footnote, different background, change opacity, hide) Note: to check if a price is stale, please refer to `last_updated` of the price. Dictionary:<li><strong>last</strong>: latest unconverted price in the respective pair target currency</li><li><strong>volume</strong>: unconverted 24h trading volume in the respective pair target currency</li><li><strong>converted_last</strong>: latest converted price in BTC, ETH, and USD</li><li><strong>converted_volume</strong>: converted 24h trading volume in BTC, ETH, and USD</li> Cache / Update Frequency: every 60 seconds
     *
     * @tags coins
     * @name CoinsDetail
     * @summary Get current data (name, price, market, ... including exchange tickers) for a coin
     * @request GET:/coins/{id}
     */
    coinsDetail: (
      id: string,
      query?: {
        /** Include all localized languages in response (true/false) <b>[default: true]</b> */
        localization?: string
        /** Include tickers data (true/false) <b>[default: true]</b> */
        tickers?: boolean
        /** Include market_data (true/false) <b>[default: true]</b> */
        market_data?: boolean
        /** Include community_data data (true/false) <b>[default: true]</b> */
        community_data?: boolean
        /** Include developer_data data (true/false) <b>[default: true]</b> */
        developer_data?: boolean
        /** Include sparkline 7 days data (eg. true, false) <b>[default: false]</b> */
        sparkline?: boolean
      },
      params: RequestParams = {}
    ) =>
      this.request<void, any>({
        path: `/coins/${id}`,
        method: 'GET',
        query: query,
        ...params
      }),

    /**
     * @description Get coin tickers (paginated to 100 items)<br><br> **IMPORTANT**: Ticker `is_stale` is true when ticker that has not been updated/unchanged from the exchange for more than 8 hours. Ticker `is_anomaly` is true if ticker's price is outliered by our system. You are responsible for managing how you want to display these information (e.g. footnote, different background, change opacity, hide) Dictionary:<li><strong>last</strong>: latest unconverted price in the respective pair target currency</li><li><strong>volume</strong>: unconverted 24h trading volume in the respective pair target currency</li><li><strong>converted_last</strong>: latest converted price in BTC, ETH, and USD</li><li><strong>converted_volume</strong>: converted 24h trading volume in BTC, ETH, and USD</li> Cache / Update Frequency: every 2 minutes
     *
     * @tags coins
     * @name TickersDetail
     * @summary Get coin tickers (paginated to 100 items)
     * @request GET:/coins/{id}/tickers
     */
    tickersDetail: (
      id: string,
      query?: {
        /** filter results by exchange_ids (ref: v3/exchanges/list) */
        exchange_ids?: string
        /** flag to show exchange_logo. valid values: true, false */
        include_exchange_logo?: string
        /** Page through results */
        page?: number
        /** valid values: <b>trust_score_desc (default), trust_score_asc and volume_desc</b> */
        order?: string
        /** flag to show 2% orderbook depth. i.e., cost_to_move_up_usd and cost_to_move_down_usd. valid values: true, false */
        depth?: string
      },
      params: RequestParams = {}
    ) =>
      this.request<void, any>({
        path: `/coins/${id}/tickers`,
        method: 'GET',
        query: query,
        ...params
      }),

    /**
     * @description Get historical data (price, market cap, 24hr volume, ..) at a given date for a coin. The data returned is at 00:00:00 UTC. The last completed UTC day (00:00) is available 35 minutes after midnight on the next UTC day (00:35).
     *
     * @tags coins
     * @name HistoryDetail
     * @summary Get historical data (price, market cap, 24hr volume, ..) at a given date for a coin.
     * @request GET:/coins/{id}/history
     */
    historyDetail: (
      id: string,
      query: {
        /** The date of data snapshot in dd-mm-yyyy eg. 30-12-2022 */
        date: string
        /** Set to false to exclude localized languages in response */
        localization?: string
      },
      params: RequestParams = {}
    ) =>
      this.request<void, any>({
        path: `/coins/${id}/history`,
        method: 'GET',
        query: query,
        ...params
      }),

    /**
     * @description Get historical market data include price, market cap, and 24h volume (granularity auto) <b><ul><li>Data granularity is automatic (cannot be adjusted)</li><li>1 day from current time = 5 minute interval data</li><li>1 - 90 days from current time = hourly data</li><li>above 90 days from current time = daily data (00:00 UTC)</li></ul></b> Cache / Update Frequency: every 5 minutes. The last completed UTC day (00:00) is available 35 minutes after midnight on the next UTC day (00:35).
     *
     * @tags coins
     * @name MarketChartDetail
     * @summary Get historical market data include price, market cap, and 24h volume (granularity auto)
     * @request GET:/coins/{id}/market_chart
     */
    marketChartDetail: (
      id: string,
      query: {
        /** The target currency of market data (usd, eur, jpy, etc.) */
        vs_currency: string
        /** Data up to number of days ago (eg. 1,14,30,max) */
        days: string
        /** Data interval. Possible value: daily */
        interval?: string
        /** <b>full</b> or any value between 0 - 18 to specify decimal place for currency price value */
        precision?: string
      },
      params: RequestParams = {}
    ) =>
      this.request<void, any>({
        path: `/coins/${id}/market_chart`,
        method: 'GET',
        query: query,
        ...params
      }),

    /**
     * @description Get historical market data include price, market cap, and 24h volume within a range of timestamp (granularity auto) <b><ul><li>Data granularity is automatic (cannot be adjusted)</li><li>1 day from current time = 5 minute interval data</li><li>1 - 90 days from current time = hourly data</li><li>above 90 days from current time = daily data (00:00 UTC)</li></ul></b> Cache / Update Frequency: every 5 minutes The last completed UTC day (00:00) is available 35 minutes after midnight on the next UTC day (00:35).
     *
     * @tags coins
     * @name MarketChartRangeDetail
     * @summary Get historical market data include price, market cap, and 24h volume within a range of timestamp (granularity auto)
     * @request GET:/coins/{id}/market_chart/range
     */
    marketChartRangeDetail: (
      id: string,
      query: {
        /** The target currency of market data (usd, eur, jpy, etc.) */
        vs_currency: string
        /** From date in UNIX Timestamp (eg. 1392577232) */
        from: string
        /** To date in UNIX Timestamp (eg. 1422577232) */
        to: string
        /** <b>full</b> or any value between 0 - 18 to specify decimal place for currency price value */
        precision?: string
      },
      params: RequestParams = {}
    ) =>
      this.request<void, any>({
        path: `/coins/${id}/market_chart/range`,
        method: 'GET',
        query: query,
        ...params
      }),

    /**
     * @description Get coin info from contract address Cache / Update Frequency: every 60 seconds
     *
     * @tags contract
     * @name ContractDetail
     * @summary Get coin info from contract address
     * @request GET:/coins/{id}/contract/{contract_address}
     */
    contractDetail: (id: string, contractAddress: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/coins/${id}/contract/${contractAddress}`,
        method: 'GET',
        ...params
      }),

    /**
     * @description Get historical market data include price, market cap, and 24h volume (granularity auto) <b><ul><li>Data granularity is automatic (cannot be adjusted)</li><li>1 day from current time = 5 minute interval data</li><li>1 - 90 days from current time = hourly data</li><li>above 90 days from current time = daily data (00:00 UTC)</li></ul></b> Cache / Update Frequency: every 5 minutes. The last completed UTC day (00:00) is available 35 minutes after midnight on the next UTC day (00:35).
     *
     * @tags contract
     * @name ContractMarketChartDetail
     * @summary Get historical market data include price, market cap, and 24h volume (granularity auto) from a contract address
     * @request GET:/coins/{id}/contract/{contract_address}/market_chart/
     */
    contractMarketChartDetail: (
      id: string,
      contractAddress: string,
      query: {
        /** The target currency of market data (usd, eur, jpy, etc.) */
        vs_currency: string
        /** Data up to number of days ago (eg. 1,14,30,max) */
        days: string
        /** <b>full</b> or any value between 0 - 18 to specify decimal place for currency price value */
        precision?: string
      },
      params: RequestParams = {}
    ) =>
      this.request<void, any>({
        path: `/coins/${id}/contract/${contractAddress}/market_chart/`,
        method: 'GET',
        query: query,
        ...params
      }),

    /**
     * @description Get historical market data include price, market cap, and 24h volume within a range of timestamp (granularity auto) <b><ul><li>Data granularity is automatic (cannot be adjusted)</li><li>1 day from current time = 5 minute interval data</li><li>1 - 90 days from current time = hourly data</li><li>above 90 days from current time = daily data (00:00 UTC)</li></ul></b> Cache / Update Frequency: every 5 minutes The last completed UTC day (00:00) is available 35 minutes after midnight on the next UTC day (00:35).
     *
     * @tags contract
     * @name ContractMarketChartRangeDetail
     * @summary Get historical market data include price, market cap, and 24h volume within a range of timestamp (granularity auto) from a contract address
     * @request GET:/coins/{id}/contract/{contract_address}/market_chart/range
     */
    contractMarketChartRangeDetail: (
      id: string,
      contractAddress: string,
      query: {
        /** The target currency of market data (usd, eur, jpy, etc.) */
        vs_currency: string
        /** From date in UNIX Timestamp (eg. 1392577232) */
        from: string
        /** To date in UNIX Timestamp (eg. 1422577232) */
        to: string
        /** <b>full</b> or any value between 0 - 18 to specify decimal place for currency price value */
        precision?: string
      },
      params: RequestParams = {}
    ) =>
      this.request<void, any>({
        path: `/coins/${id}/contract/${contractAddress}/market_chart/range`,
        method: 'GET',
        query: query,
        ...params
      }),

    /**
     * @description Candle's body - data granularity is automatic (cannot be adjusted for public api users): <ul><li>1 - 2 days: 30 minutes</li><li>3 - 30 days: 4 hours</li><li>31 days and beyond: 4 days</li></ul> <p>Daily candle interval parameter is available for paid plan users only (Analyst/Lite/Pro/Enterprise), use <b><i>interval=daily</i></b> parameter in your request:</p> <ul><li>'daily' interval: available for 1/7/14/30/90/180 days</li></ul> Cache / Update Frequency: every 30 minutes The last completed UTC day (00:00) is available 35 minutes after midnight on the next UTC day (00:35).
     *
     * @tags coins
     * @name OhlcDetail
     * @summary Get coin's OHLC
     * @request GET:/coins/{id}/ohlc
     */
    ohlcDetail: (
      id: string,
      query: {
        /** The target currency of market data (usd, eur, jpy, etc.) */
        vs_currency: string
        /**  Data up to number of days ago (1/7/14/30/90/180/365/max) */
        days: string
        /** <b>full</b> or any value between 0 - 18 to specify decimal place for currency price value */
        precision?: string
      },
      params: RequestParams = {}
    ) =>
      this.request<number[], any>({
        path: `/coins/${id}/ohlc`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params
      }),

    /**
     * @description List all categories Cache / Update Frequency: every 5 minutes
     *
     * @tags categories
     * @name CategoriesListList
     * @summary List all categories
     * @request GET:/coins/categories/list
     */
    categoriesListList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/coins/categories/list`,
        method: 'GET',
        ...params
      }),

    /**
     * @description List all categories with market data Cache / Update Frequency: every 5 minutes
     *
     * @tags categories
     * @name CategoriesList
     * @summary List all categories with market data
     * @request GET:/coins/categories
     */
    categoriesList: (
      query?: {
        /** valid values: <b>market_cap_desc (default), market_cap_asc, name_desc, name_asc, market_cap_change_24h_desc and market_cap_change_24h_asc</b> */
        order?: string
      },
      params: RequestParams = {}
    ) =>
      this.request<void, any>({
        path: `/coins/categories`,
        method: 'GET',
        query: query,
        ...params
      })
  }
  assetPlatforms = {
    /**
     * @description List all asset platforms
     *
     * @tags asset_platforms
     * @name AssetPlatformsList
     * @summary List all asset platforms (Blockchain networks)
     * @request GET:/asset_platforms
     */
    assetPlatformsList: (
      query?: {
        /**
         * apply relevant filters to results
         *  valid values: "nft" (asset_platform nft-support)
         */
        filter?: string
      },
      params: RequestParams = {}
    ) =>
      this.request<void, any>({
        path: `/asset_platforms`,
        method: 'GET',
        query: query,
        ...params
      })
  }
  exchanges = {
    /**
     * @description List all exchanges Cache / Update Frequency: every 60 seconds
     *
     * @tags exchanges
     * @name ExchangesList
     * @summary List all exchanges (Active with trading volumes)
     * @request GET:/exchanges
     */
    exchangesList: (
      query?: {
        /**
         * Valid values: 1...250
         * Total results per page
         * Default value:: 100
         */
        per_page?: number
        /** page through results */
        page?: string
      },
      params: RequestParams = {}
    ) =>
      this.request<void, any>({
        path: `/exchanges`,
        method: 'GET',
        query: query,
        ...params
      }),

    /**
     * @description Use this to obtain all the markets' id in order to make API calls Cache / Update Frequency: every 5 minutes
     *
     * @tags exchanges
     * @name ListList
     * @summary List all supported markets id and name (no pagination required)
     * @request GET:/exchanges/list
     */
    listList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/exchanges/list`,
        method: 'GET',
        ...params
      }),

    /**
     * @description Get exchange volume in BTC and tickers.<br>For derivatives (e.g. bitmex, binance_futures), please use `/derivatives/exchange/{id}` endpoint.<br><br> **IMPORTANT**: Ticker object is limited to 100 items, to get more tickers, use `/exchanges/{id}/tickers` Ticker `is_stale` is true when ticker that has not been updated/unchanged from the exchange for more than 8 hours. Ticker `is_anomaly` is true if ticker's price is outliered by our system. You are responsible for managing how you want to display these information (e.g. footnote, different background, change opacity, hide) Dictionary:<li><strong>last</strong>: latest unconverted price in the respective pair target currency</li><li><strong>volume</strong>: unconverted 24h trading volume in the respective pair target currency</li><li><strong>converted_last</strong>: latest converted price in BTC, ETH, and USD</li><li><strong>converted_volume</strong>: converted 24h trading volume in BTC, ETH, and USD</li> Cache / Update Frequency: every 60 seconds
     *
     * @tags exchanges
     * @name ExchangesDetail
     * @summary Get exchange volume in BTC and top 100 tickers only
     * @request GET:/exchanges/{id}
     */
    exchangesDetail: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/exchanges/${id}`,
        method: 'GET',
        ...params
      }),

    /**
     * @description Get exchange tickers (paginated)<br><br> **IMPORTANT**: Ticker `is_stale` is true when ticker that has not been updated/unchanged from the exchange for more than 8 hours. Ticker `is_anomaly` is true if ticker's price is outliered by our system. You are responsible for managing how you want to display these information (e.g. footnote, different background, change opacity, hide) Dictionary:<li><strong>last</strong>: latest unconverted price in the respective pair target currency</li><li><strong>volume</strong>: unconverted 24h trading volume in the respective pair target currency</li><li><strong>converted_last</strong>: latest converted price in BTC, ETH, and USD</li><li><strong>converted_volume</strong>: converted 24h trading volume in BTC, ETH, and USD</li> Cache / Update Frequency: every 60 seconds
     *
     * @tags exchanges
     * @name TickersDetail
     * @summary Get exchange tickers (paginated, 100 tickers per page)
     * @request GET:/exchanges/{id}/tickers
     */
    tickersDetail: (
      id: string,
      query?: {
        /** filter tickers by coin_ids (ref: v3/coins/list) */
        coin_ids?: string
        /** flag to show exchange_logo. valid values: true, false */
        include_exchange_logo?: string
        /** Page through results */
        page?: number
        /** flag to show 2% orderbook depth. i.e., cost_to_move_up_usd and cost_to_move_down_usd. valid values: true, false */
        depth?: string
        /** valid values: <b>trust_score_desc (default), trust_score_asc and volume_desc</b> */
        order?: string
      },
      params: RequestParams = {}
    ) =>
      this.request<void, any>({
        path: `/exchanges/${id}/tickers`,
        method: 'GET',
        query: query,
        ...params
      }),

    /**
     * @description Get volume_chart data (in BTC) for a given exchange. <b>Data granularity is automatic (cannot be adjusted)</b><ul><li>1 day = 10-minutely</li><li>2-90 days = hourly</li><li>91 days above = daily</li></ul> <p>Note: exclusive endpoint is available for paid users to query more than 1 year of historical data</p> Cache / Update Frequency: every 60 seconds
     *
     * @tags exchanges
     * @name VolumeChartDetail
     * @summary Get volume_chart data (in BTC) for a given exchange
     * @request GET:/exchanges/{id}/volume_chart
     */
    volumeChartDetail: (
      id: string,
      query: {
        /**  Data up to number of days ago (1/7/14/30/90/180/365) */
        days: number
      },
      params: RequestParams = {}
    ) =>
      this.request<void, any>({
        path: `/exchanges/${id}/volume_chart`,
        method: 'GET',
        query: query,
        ...params
      })
  }
  derivatives = {
    /**
     * @description List all derivative tickers.<br>Note: 'open_interest' and 'volume_24h' data are in USD Cache / Update Frequency: every 30 seconds
     *
     * @tags derivatives
     * @name DerivativesList
     * @summary List all derivative tickers
     * @request GET:/derivatives
     */
    derivativesList: (
      query?: {
        /** ['all', 'unexpired'] - expired to show unexpired tickers, all to list all tickers, defaults to unexpired */
        include_tickers?: string
      },
      params: RequestParams = {}
    ) =>
      this.request<void, any>({
        path: `/derivatives`,
        method: 'GET',
        query: query,
        ...params
      }),

    /**
     * @description List all derivative exchanges. Cache / Update Frequency: every 60 seconds
     *
     * @tags derivatives
     * @name ExchangesList
     * @summary List all derivative exchanges
     * @request GET:/derivatives/exchanges
     */
    exchangesList: (
      query?: {
        /** order results using following params name_asc，name_desc，open_interest_btc_asc，open_interest_btc_desc，trade_volume_24h_btc_asc，trade_volume_24h_btc_desc */
        order?: string
        /** Total results per page */
        per_page?: number
        /** Page through results */
        page?: number
      },
      params: RequestParams = {}
    ) =>
      this.request<void, any>({
        path: `/derivatives/exchanges`,
        method: 'GET',
        query: query,
        ...params
      }),

    /**
     * @description show derivative exchange data Dictionary:<li><strong>last</strong>: latest unconverted price in the respective pair target currency</li><li><strong>volume</strong>: unconverted 24h trading volume in the respective pair target currency</li><li><strong>converted_last</strong>: latest converted price in BTC, ETH, and USD</li><li><strong>converted_volume</strong>: converted 24h trading volume in BTC, ETH, and USD</li> Cache / Update Frequency: every 30 seconds
     *
     * @tags derivatives
     * @name ExchangesDetail
     * @summary show derivative exchange data
     * @request GET:/derivatives/exchanges/{id}
     */
    exchangesDetail: (
      id: string,
      query?: {
        /** ['all', 'unexpired'] - expired to show unexpired tickers, all to list all tickers, leave blank to omit tickers data in response */
        include_tickers?: string
      },
      params: RequestParams = {}
    ) =>
      this.request<void, any>({
        path: `/derivatives/exchanges/${id}`,
        method: 'GET',
        query: query,
        ...params
      }),

    /**
     * @description List all derivative exchanges name and identifier. Cache / Update Frequency: every 5 minutes
     *
     * @tags derivatives
     * @name ExchangesListList
     * @summary List all derivative exchanges name and identifier
     * @request GET:/derivatives/exchanges/list
     */
    exchangesListList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/derivatives/exchanges/list`,
        method: 'GET',
        ...params
      })
  }
  nfts = {
    /**
     * @description Use this to obtain all the NFT ids in order to make API calls, paginated to 100 items. Cache / Update Frequency: every 5 minutes
     *
     * @tags nfts (beta)
     * @name ListList
     * @summary List all supported NFT ids, paginated by 100 items per page, paginated to 100 items
     * @request GET:/nfts/list
     */
    listList: (
      query?: {
        /** valid values: <b>h24_volume_native_asc, h24_volume_native_desc, floor_price_native_asc, floor_price_native_desc, market_cap_native_asc, market_cap_native_desc, market_cap_usd_asc, market_cap_usd_desc</b> */
        order?: string
        /** The id of the platform issuing tokens (See asset_platforms endpoint for list of options) */
        asset_platform_id?: string
        /**
         * Valid values: 1..250<br>Total results per page
         * @example 100
         */
        per_page?: number
        /**
         * Page through results
         * @example 1
         */
        page?: number
      },
      params: RequestParams = {}
    ) =>
      this.request<void, any>({
        path: `/nfts/list`,
        method: 'GET',
        query: query,
        ...params
      }),

    /**
     * @description Get current data (name, price_floor, volume_24h ...) for an NFT collection. native_currency (string) is only a representative of the currency. Cache / Update Frequency: every 60 seconds
     *
     * @tags nfts (beta)
     * @name NftsDetail
     * @summary Get current data (name, price_floor, volume_24h ...) for an NFT collection
     * @request GET:/nfts/{id}
     */
    nftsDetail: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/nfts/${id}`,
        method: 'GET',
        ...params
      }),

    /**
     * @description Get current data (name, price_floor, volume_24h ...) for an NFT collection. *Solana NFT & Art Blocks are not supported for this endpoint, please use <b>`/nfts/{id}`</b> endpoint instead. Cache / Update Frequency: every 60 seconds
     *
     * @tags nfts (beta)
     * @name ContractDetail
     * @summary Get current data (name, price_floor, volume_24h ...) for an NFT collection.
     * @request GET:/nfts/{asset_platform_id}/contract/{contract_address}
     */
    contractDetail: (
      assetPlatformId: string,
      contractAddress: string,
      params: RequestParams = {}
    ) =>
      this.request<void, any>({
        path: `/nfts/${assetPlatformId}/contract/${contractAddress}`,
        method: 'GET',
        ...params
      })
  }
  exchangeRates = {
    /**
     * @description Get BTC-to-Currency exchange rates Cache / Update Frequency: every 60 seconds
     *
     * @tags exchange_rates
     * @name ExchangeRatesList
     * @summary Get BTC-to-Currency exchange rates
     * @request GET:/exchange_rates
     */
    exchangeRatesList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/exchange_rates`,
        method: 'GET',
        ...params
      })
  }
  search = {
    /**
     * @description Search for coins, categories and markets listed on CoinGecko ordered by largest Market Cap first. Cache / Update Frequency: every 15 minutes
     *
     * @tags search
     * @name SearchList
     * @summary Search for coins, categories and markets on CoinGecko
     * @request GET:/search
     */
    searchList: (
      query: {
        /** Search string */
        query: string
      },
      params: RequestParams = {}
    ) =>
      this.request<
        {
          coins?: {
            item?: {
              id?: string
              name?: string
              symbol?: string
              market_cap_rank?: number
            }
          }
          exchanges?: {
            item?: {
              id?: string
              name?: string
              market_type?: string
            }
          }
          categories?: {
            item?: {
              id?: number
              name?: string
            }
          }
        },
        any
      >({
        path: `/search`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params
      }),

    /**
     * @description Top-7 trending coins on CoinGecko as searched by users in the last 24 hours (Ordered by most popular first). Cache / Update Frequency: every 10 minutes
     *
     * @tags trending
     * @name TrendingList
     * @summary Get trending search coins (Top-7) on CoinGecko in the last 24 hours
     * @request GET:/search/trending
     */
    trendingList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/search/trending`,
        method: 'GET',
        ...params
      })
  }
  global = {
    /**
     * @description Get cryptocurrency global data Cache / Update Frequency: every 10 minutes
     *
     * @tags global
     * @name GlobalList
     * @summary Get cryptocurrency global data
     * @request GET:/global
     */
    globalList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/global`,
        method: 'GET',
        ...params
      }),

    /**
     * @description Get Top 100 Cryptocurrency Global Eecentralized Finance(defi) data Cache / Update Frequency: every 60 minutes
     *
     * @tags global
     * @name DecentralizedFinanceDefiList
     * @summary Get cryptocurrency global decentralized finance(defi) data
     * @request GET:/global/decentralized_finance_defi
     */
    decentralizedFinanceDefiList: (params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/global/decentralized_finance_defi`,
        method: 'GET',
        ...params
      })
  }
  companies = {
    /**
     * @description Get public companies bitcoin or ethereum holdings (Ordered by total holdings descending)
     *
     * @tags companies (beta)
     * @name PublicTreasuryDetail
     * @summary Get public companies data
     * @request GET:/companies/public_treasury/{coin_id}
     */
    publicTreasuryDetail: (coinId?: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/companies/public_treasury/${coinId}`,
        method: 'GET',
        ...params
      })
  }
}
