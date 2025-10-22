// composables/useGlobalLoading.ts
export const useGlobalLoading = () => {
  const isLoading = useState('global.loading', () => false)
  const loadingMessage = useState('global.loading.message', () => 'Loading...')
  const loadingCount = useState('global.loading.count', () => 0)

  const showLoading = (message: string = 'Loading...') => {
    loadingMessage.value = message
    loadingCount.value++
    isLoading.value = true
  }

  const hideLoading = () => {
    loadingCount.value = Math.max(0, loadingCount.value - 1)
    if (loadingCount.value === 0) {
      isLoading.value = false
      loadingMessage.value = 'Loading...'
    }
  }

  const forceHideLoading = () => {
    loadingCount.value = 0
    isLoading.value = false
    loadingMessage.value = 'Loading...'
  }

  return {
    isLoading: readonly(isLoading),
    loadingMessage: readonly(loadingMessage),
    showLoading,
    hideLoading,
    forceHideLoading
  }
}