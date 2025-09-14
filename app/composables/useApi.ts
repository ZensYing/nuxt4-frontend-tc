// composables/useApi.ts
import axios, { AxiosError } from 'axios';
import { useAuthStore } from '~/store/useAuthStore';
import type { IAPIOption } from '~/types/api';
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string,
    public originalError?: AxiosError
  ) {
    super(message)
    this.name = 'ApiError'
  }
}
export const useApi = async <T>(endpoint: string, options: IAPIOption): Promise<T> => {
  const baseUrl = useRuntimeConfig().public.API_BASE_URL;
  const authStore = useAuthStore();

  // Helper function to make the actual API call
const makeRequest = async (token?: string): Promise<T> => {
  const headers = {
    ...options.headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  try {
    const response = await axios<T>(baseUrl + endpoint, {
      ...options,
      headers,
      params: options.params, // Add this line
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

  // First attempt with current token
  try {
    const token = authStore.accessToken;
    return await makeRequest(token || undefined);
  } catch (error) {
    const axiosError = error as AxiosError;
    
    // If it's a 401 unauthorized error and we have a refresh token, try to refresh
    if (axiosError.response?.status === 401 && localStorage.getItem('refresh_token')) {
      try {
        console.log('Access token expired, attempting to refresh...');
        const refreshSuccess = await authStore.refresh();
        
        if (refreshSuccess) {
          // Retry the request with the new token
          const newToken = authStore.accessToken;
          return await makeRequest(newToken || undefined);
        } else {
          // Refresh failed, redirect to login
          console.log('Token refresh failed, redirecting to login');
          await navigateTo('/auth');
          throw new Error('Authentication failed');
        }
      } catch (refreshError) {
        console.error('Error during token refresh:', refreshError);
        await navigateTo('/auth');
        throw refreshError;
      }
    }
    
    // For other errors or if we don't have a refresh token, just throw the original error
    throw error;
  }
};
// Transform axios errors to ApiError
function transformError(error: AxiosError): ApiError {
  if (error.response?.data) {
    const data = error.response.data as any
    
    // Handle Directus error format
    if (data.errors && Array.isArray(data.errors) && data.errors.length > 0) {
      const firstError = data.errors[0]
      return new ApiError(
        firstError.message,
        error.response.status || 500,
        firstError.extensions?.code,
        error
      )
    }
    
    // Handle generic error response
    if (typeof data === 'object' && 'message' in data) {
      return new ApiError(
        data.message,
        error.response.status || 500,
        undefined,
        error
      )
    }

    // Handle string error messages
    if (typeof data === 'string') {
      return new ApiError(
        data,
        error.response.status || 500,
        undefined,
        error
      )
    }
  }

  return new ApiError(
    error.message || 'Network error occurred',
    error.response?.status || 500,
    error.code || 'NETWORK_ERROR',
    error
  )
}
async function showErrorNotification(error: ApiError) {
  const toast = useToast?.()
  
  if (toast) {
    toast.add({
      title: 'Error',
      description: error.message,
      color: 'error',
      duration: 5000
    })
  } else {
    console.error('API Error:', error.message)
  }
}

// Optional: Create a separate composable for public API calls that don't need auth
export const usePublicApi = async <T>(endpoint: string, options: IAPIOption): Promise<T> => {
  const baseUrl = useRuntimeConfig().public.API_BASE_URL;

  try {
    const response = await axios<T>(baseUrl + endpoint, options);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const useApiPost = async <T = any>(
  endpoint: string,
  data?: any,
  options: Omit<IAPIOption, 'method' | 'data'> = {}
) => {
  return useApi<T>(endpoint, { ...options, method: 'POST', data })
}

export const useApiPut = async <T = any>(
  endpoint: string,
  data?: any,
  options: Omit<IAPIOption, 'method' | 'data'> = {}
) => {
  return useApi<T>(endpoint, { ...options, method: 'PUT', data })
}

export const useApiPatch = async <T = any>(
  endpoint: string,
  data?: any,
  options: Omit<IAPIOption, 'method' | 'data'> = {}
) => {
  return useApi<T>(endpoint, { ...options, method: 'PATCH', data })
}

export const useApiDelete = async <T = any>(
  endpoint: string,
  options: Omit<IAPIOption, 'method'> = {}
) => {
  return useApi<T>(endpoint, { ...options, method: 'DELETE' })
}

export const useApiUpload = async (
  file: File,
  options: Omit<IAPIOption, 'method' | 'data' | 'headers'> = {}
) => {
  const formData = new FormData()
  formData.append('file', file)
  
  return useApi<{ id: string; filename_download: string }>('/files', {
    ...options,
    method: 'POST',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const useApiBatch = async <T = any>(
  requests: Array<{
    endpoint: string
    options?: IAPIOption
  }>
): Promise<T[]> => {
  try {
    const responses = await Promise.allSettled(
      requests.map(({ endpoint, options }) =>
  useApi<T>(endpoint, options ?? { method: 'GET' } as IAPIOption)
)

    )
    
    const results: T[] = []
    const errors: ApiError[] = []
    
    responses.forEach((response, index) => {
      if (response.status === 'fulfilled') {
        results[index] = response.value
      } else {
        errors.push(response.reason)
        results[index] = null as T
      }
    })
    
    if (errors.length > 0) {
      console.warn(`${errors.length} out of ${requests.length} requests failed:`, errors)
    }
    
    return results
  } catch (error) {
    throw new ApiError(
      'Batch request failed',
      500,
      'BATCH_REQUEST_FAILED'
    )
  }
}

export const useDirectusQuery = () => {
  const buildQuery = (params: {
    fields?: string[]
    filter?: Record<string, any>
    sort?: string[]
    limit?: number
    offset?: number
    search?: string
  }) => {
    const query = new URLSearchParams()
    
    if (params.fields) {
      query.set('fields', params.fields.join(','))
    }
    
    if (params.filter) {
      Object.entries(params.filter).forEach(([key, value]) => {
        query.set(`filter[${key}]`, String(value))
      })
    }
    
    if (params.sort) {
      query.set('sort', params.sort.join(','))
    }
    
    if (params.limit) {
      query.set('limit', String(params.limit))
    }
    
    if (params.offset) {
      query.set('offset', String(params.offset))
    }
    
    if (params.search) {
      query.set('search', params.search)
    }
    
    return query.toString()
  }
  
  return { buildQuery }
}