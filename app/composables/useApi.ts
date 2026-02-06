import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'

/**
 * Composable for making API calls with axios
 * Provides a configured axios instance with error handling
 */
export function useApi() {
  const config = useRuntimeConfig()

  /**
   * Create axios instance with default configuration
   */
  const createInstance = (baseURL?: string): AxiosInstance => {
    return axios.create({
      baseURL: baseURL || config.public.apiBaseUrl || '',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  /**
   * Make a GET request
   */
  const get = async <T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const instance = createInstance()
    const response = await instance.get<T>(url, config)
    return response.data
  }

  /**
   * Make a POST request
   */
  const post = async <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const instance = createInstance()
    const response = await instance.post<T>(url, data, config)
    return response.data
  }

  /**
   * Make a PUT request
   */
  const put = async <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const instance = createInstance()
    const response = await instance.put<T>(url, data, config)
    return response.data
  }

  /**
   * Make a DELETE request
   */
  const del = async <T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const instance = createInstance()
    const response = await instance.delete<T>(url, config)
    return response.data
  }

  return {
    axios: createInstance(),
    get,
    post,
    put,
    delete: del
  }
}
