import { useAuthStore } from "~/store/useAuthStore"

// app/middleware/auth.ts
export default defineNuxtRouteMiddleware(async (to, from) => {
  // Skip during SSR
  if (process.server) return

  // Ensure we're on client side and have access to localStorage
  if (!process.client) return

  // Check for refresh token first (simple check)
  const hasRefreshToken = localStorage.getItem('refresh_token')
  if (!hasRefreshToken) {
    return navigateTo('/auth')
  }

  // Only access Pinia store after confirming we're on client with proper context
  try {
    const { $pinia } = useNuxtApp()
    
    // If Pinia isn't available yet, redirect to auth as fallback
    if (!$pinia) {
      console.warn('Pinia not yet available in auth middleware')
      return navigateTo('/auth')
    }

    const authStore = useAuthStore()
    
    // Check if we already have user data
    if (authStore.user && authStore.accessToken) {
      return // User is already authenticated
    }

    // Try to refresh the token
    const isAuthenticated = await authStore.checkAuth()
    
    if (!isAuthenticated) {
      return navigateTo('/auth')
    }
  } catch (error) {
    console.error('Auth middleware error:', error)
    return navigateTo('/auth')
  }
})