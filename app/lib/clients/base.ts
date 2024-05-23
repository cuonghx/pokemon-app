import axios, { type AxiosError } from "axios";
import {
  type AxiosCacheInstance,
  type CacheAxiosResponse,
  type CacheOptions,
  type InternalCacheRequestConfig,
  setupCache,
} from "axios-cache-interceptor";

import {
  handleRequest,
  handleRequestError,
  handleResponse,
  handleResponseError,
} from "../config/logger";
import { BASE_URL, type ENDPOINTS } from "../constants";

type ObjectValue<T> = T[keyof T];
type Endpoint = ObjectValue<typeof ENDPOINTS>;

/**
 * ## Client Args
 * Used to pass optional configuration for logging and cache to the clients.
 */
export interface ClientArgs {
  /**
   * ## Enable logs
   */
  logs?: boolean;
  /**
   * ## Axios Cache Options
   * Options for cache.
   * @see https://axios-cache-interceptor.js.org/
   */
  cacheOptions?: CacheOptions;
  /**
   * ## Base URL
   * Location of the PokéAPI. Leave empty to use the official PokéAPI instance.
   */
  baseURL?: string;
}

/**
 * ### Base Client
 */
export class BaseClient {
  private api: AxiosCacheInstance;

  constructor(clientOptions?: ClientArgs) {
    this.api = setupCache(
      axios.create({
        baseURL: clientOptions?.baseURL ?? BASE_URL.REST,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      clientOptions?.cacheOptions
    );

    this.api.interceptors.request.use(
      (config: InternalCacheRequestConfig) =>
        handleRequest(config, clientOptions?.logs),
      (error: AxiosError<string>) =>
        handleRequestError(error, clientOptions?.logs)
    );

    this.api.interceptors.response.use(
      (response: CacheAxiosResponse) =>
        handleResponse(response, clientOptions?.logs),
      (error: AxiosError<string>) =>
        handleResponseError(error, clientOptions?.logs)
    );
  }
  protected async getResource<T>(
    endpoint: string,
    identifier?: string | number
  ): Promise<T> {
    return (
      await this.api.get<T>(
        `${endpoint}/${identifier || identifier === 0 ? identifier : ""}`
      )
    ).data;
  }

  protected async getListResource<T>(
    endpoint: Endpoint,
    offset = 0,
    limit = 20
  ): Promise<T> {
    return (
      await this.api.get<T>(`${endpoint}?offset=${offset}&limit=${limit}`)
    ).data;
  }
}
