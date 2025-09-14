import { useAuthStore } from "~/store/useAuthStore"

// app/middleware/guest.ts
export default defineNuxtRouteMiddleware((to, from) => {
  // Skip middleware during server-side rendering
  if (process.server) return

  // Ensure we're on client side
  if (!process.client) return

  // Simple check first - if no refresh token, allow access to guest pages
  const hasRefreshToken = localStorage.getItem('refresh_token')
  if (!hasRefreshToken) {
    return // Allow access to guest pages
  }

  // If we have a token, check store state
  try {
    const { $pinia } = useNuxtApp()
    
    // If Pinia isn't available yet, allow access (will be checked later)
    if (!$pinia) {
      return
    }

    const authStore = useAuthStore()
    
    // If user is already authenticated, redirect to home
    if (authStore.user && authStore.accessToken) {
      return navigateTo('/')
    }

    // If we have a refresh token but no user data, 
    // let the user through to auth page where checkAuth will be called
  } catch (error) {
    console.log('Guest middleware error:', error)
    // On error, allow access to guest pages
  }
})