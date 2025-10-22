export default defineNuxtPlugin(() => {
  const { showLoading, hideLoading } = useGlobalLoading()
  let activeRequests = 0

  // Intercept $fetch requests
  const originalFetch = $fetch
  
  globalThis.$fetch = new Proxy(originalFetch, {
    apply(target, thisArg, argumentsList) {
      const [url, options = {}] = argumentsList
      
      // Skip loading for certain URLs (like auth checks)
      const skipLoading = options.skipLoading || 
                         url.includes('/auth/check') || 
                         url.includes('/heartbeat')
      
      if (!skipLoading) {
        activeRequests++
        if (activeRequests === 1) {
          showLoading(options.loadingMessage || 'Loading...')
        }
      }

      return target.apply(thisArg, argumentsList).finally(() => {
        if (!skipLoading) {
          activeRequests = Math.max(0, activeRequests - 1)
          if (activeRequests === 0) {
            hideLoading()
          }
        }
      })
    }
  })
})