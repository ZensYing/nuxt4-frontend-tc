// composables/useApi.ts
import axios from 'axios'
import type { IAPIOption } from '~/types/api'

export const useApi = async <T>(endpoint: string, options: IAPIOption) => {
  const config = useRuntimeConfig()

  // ✅ server-only private keys
  const baseUrl = config.DIRECTUS_URL
  const token   = config.DIRECTUS_TOKEN

  if (!baseUrl) throw new Error('Missing DIRECTUS_URL in runtimeConfig')

  try {
    const response = await axios<T>(baseUrl + endpoint, {
      ...options,
      headers: {
        Authorization: `Bearer ${token}`,
        ...(options?.headers || {})
      }
    })
    return response.data
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}
