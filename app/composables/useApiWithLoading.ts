// composables/useApiWithLoading.ts
export const useApiWithLoading = () => {
  const { showLoading, hideLoading } = useGlobalLoading()

  const apiCall = async <T>(
    url: string,
    options: any = {},
    loadingMessage: string = 'Loading...'
  ): Promise<T> => {
    try {
      showLoading(loadingMessage)
      const response = await useApi<T>(url, options)
      return response
    } catch (error) {
      throw error
    } finally {
      hideLoading()
    }
  }

  const lazyApiCall = async <T>(
    key: string,
    url: string,
    options: any = {},
    loadingMessage: string = 'Loading...'
  ) => {
    try {
      showLoading(loadingMessage)
      const response = await useLazyAsyncData<T>(key, () => useApi<T>(url, options))
      return response
    } catch (error) {
      throw error
    } finally {
      hideLoading()
    }
  }

  return {
    apiCall,
    lazyApiCall
  }
}