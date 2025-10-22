<template>
  <div v-if="authStore?.user">
    <!-- Main Navigation -->
    <header class="bg-white border-b border-stone-200 sticky top-0 z-50">
      <div class="container mx-auto px-4">
        <!-- Top Bar -->
        <div class="flex items-center justify-between h-16">
          <!-- Logo Section -->
          <div class="flex items-center space-x-8">
            <NuxtLink to="/" class="flex items-center space-x-3 group">
              <div class="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z"/>
                </svg>
              </div>
              <div class="hidden md:block">
                <h1 class="text-lg font-bold text-stone-900 group-hover:text-amber-600 transition-colors">
                  KhGlobal
                </h1>
                <p class="text-xs text-stone-500 -mt-0.5">Multi-Vendor Store</p>
              </div>
            </NuxtLink>
          </div>

          <!-- Search Bar -->
          <div class="hidden lg:flex flex-1 max-w-xl mx-8">
            <div class="relative w-full">
              <input
                type="text"
                placeholder="Search products, stores, or categories..."
                class="w-full pl-4 pr-12 py-2.5 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              />
              <button class="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-stone-400 hover:text-amber-600 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Right Section -->
          <div class="flex items-center space-x-4">
            <!-- Mobile Search Button -->
            <button class="lg:hidden p-2 text-stone-600 hover:text-amber-600 transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            <!-- Notifications -->
            <div class="relative">
              <button class="p-2 text-stone-600 hover:text-amber-600 transition-colors relative">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM4 19.5v-15A2.5 2.5 0 016.5 2h11A2.5 2.5 0 0120 4.5v11.086M9 12h6" />
                </svg>
                <span class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
              </button>
            </div>

            <!-- Cart -->
            <div class="relative">
              <button class="p-2 text-stone-600 hover:text-amber-600 transition-colors relative">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v8a2 2 0 01-2 2H9a2 2 0 01-2-2v-8" />
                </svg>
                <span class="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-white text-xs rounded-full flex items-center justify-center">2</span>
              </button>
            </div>

            <!-- Color Mode Toggle -->
            <UiColorModeButton />

            <!-- User Profile Dropdown -->
            <div class="relative" @mouseenter="showProfileMenu = true" @mouseleave="showProfileMenu = false">
              <button class="flex items-center space-x-2 p-1 rounded-lg hover:bg-stone-50 transition-colors">
                <div class="relative">
                  <img
                    v-if="authStore.user?.avatar"
                    :src="useImg(authStore.user.avatar)"
                    :alt="`${authStore.user.first_name} ${authStore.user.last_name}`"
                    class="w-8 h-8 rounded-full border-2 border-stone-200 object-cover"
                  />
                  <div
                    v-else
                    class="w-8 h-8 rounded-full border-2 border-stone-200 bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center"
                  >
                    <span class="text-xs font-semibold text-white">
                      {{ authStore.user?.first_name?.charAt(0) }}{{ authStore.user?.last_name?.charAt(0) }}
                    </span>
                  </div>
                </div>
                <div class="hidden md:block text-left">
                  <p class="text-sm font-medium text-stone-900">
                    {{ authStore.user.first_name }} {{ authStore.user.last_name }}
                  </p>
                  <p class="text-xs text-stone-500 capitalize">
                    {{ authStore.user.role.name }}
                  </p>
                </div>
                <svg class="w-4 h-4 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <!-- Profile Dropdown Menu -->
              <Transition
                enter-active-class="transition ease-out duration-200"
                enter-from-class="opacity-0 translate-y-1"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition ease-in duration-150"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 translate-y-1"
              >
                <div
                  v-show="showProfileMenu"
                  class="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-stone-200 z-50"
                >
                  <!-- User Info Header -->
                  <div class="px-4 py-3 border-b border-stone-100">
                    <div class="flex items-center space-x-3">
                      <img
                        v-if="authStore.user?.avatar"
                        :src="useImg(authStore.user.avatar)"
                        :alt="`${authStore.user.first_name} ${authStore.user.last_name}`"
                        class="w-10 h-10 rounded-full object-cover"
                      />
                      <div
                        v-else
                        class="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center"
                      >
                        <span class="text-sm font-semibold text-white">
                          {{ authStore.user?.first_name?.charAt(0) }}{{ authStore.user?.last_name?.charAt(0) }}
                        </span>
                      </div>
                      <div>
                        <p class="font-medium text-stone-900">
                          {{ authStore.user.first_name }} {{ authStore.user.last_name }}
                        </p>
                        <p class="text-sm text-stone-500">{{ authStore.user.email }}</p>
                        <p class="text-xs text-amber-600 capitalize font-medium">
                          {{ authStore.user.role.name }}
                        </p>
                      </div>
                    </div>
                  </div>

                  <!-- Menu Items -->
                  <div class="py-2">
                    <NuxtLink 
                      :to="`/users/${authStore.user.id}`"
                      class="flex items-center px-4 py-2 text-sm text-stone-700 hover:bg-stone-50 transition-colors"
                    >
                      <svg class="w-4 h-4 mr-3 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      My Profile
                    </NuxtLink>
                    
                    <NuxtLink 
                      to="/dashboard"
                      class="flex items-center px-4 py-2 text-sm text-stone-700 hover:bg-stone-50 transition-colors"
                    >
                      <svg class="w-4 h-4 mr-3 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                      </svg>
                      Dashboard
                    </NuxtLink>

                    <NuxtLink 
                      to="/orders"
                      class="flex items-center px-4 py-2 text-sm text-stone-700 hover:bg-stone-50 transition-colors"
                    >
                      <svg class="w-4 h-4 mr-3 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      My Orders
                    </NuxtLink>

                    <NuxtLink 
                      to="/wishlist"
                      class="flex items-center px-4 py-2 text-sm text-stone-700 hover:bg-stone-50 transition-colors"
                    >
                      <svg class="w-4 h-4 mr-3 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      Wishlist
                    </NuxtLink>

                    <NuxtLink 
                      to="/settings"
                      class="flex items-center px-4 py-2 text-sm text-stone-700 hover:bg-stone-50 transition-colors"
                    >
                      <svg class="w-4 h-4 mr-3 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Settings
                    </NuxtLink>

                    <hr class="my-2 border-stone-100">
                    
                    <button 
                      @click="handleLogout"
                      class="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Sign Out
                    </button>
                  </div>
                </div>
              </Transition>
            </div>
          </div>
        </div>

        <!-- Navigation Menu -->
        <nav class="border-t border-stone-100">
          <div class="flex items-center space-x-8 h-12">
            <!-- Categories Dropdown -->
            <div class="relative" @mouseenter="showCategoriesMenu = true" @mouseleave="showCategoriesMenu = false">
              <button class="flex items-center space-x-1 text-sm font-medium text-stone-700 hover:text-amber-600 transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <span>Categories</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <!-- Categories Mega Menu -->
              <Transition
                enter-active-class="transition ease-out duration-200"
                enter-from-class="opacity-0 translate-y-1"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition ease-in duration-150"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 translate-y-1"
              >
                <div
                  v-show="showCategoriesMenu"
                  class="absolute left-0 mt-2 w-96 bg-white rounded-lg shadow-lg border border-stone-200 z-50"
                >
                  <div class="p-4">
                    <div class="grid grid-cols-2 gap-4">
                      <div>
                        <h3 class="font-medium text-stone-900 mb-3">Electronics</h3>
                        <ul class="space-y-2">
                          <li><NuxtLink to="/categories/smartphones" class="text-sm text-stone-600 hover:text-amber-600">Smartphones</NuxtLink></li>
                          <li><NuxtLink to="/categories/laptops" class="text-sm text-stone-600 hover:text-amber-600">Laptops</NuxtLink></li>
                          <li><NuxtLink to="/categories/cameras" class="text-sm text-stone-600 hover:text-amber-600">Cameras</NuxtLink></li>
                          <li><NuxtLink to="/categories/headphones" class="text-sm text-stone-600 hover:text-amber-600">Headphones</NuxtLink></li>
                        </ul>
                      </div>
                      <div>
                        <h3 class="font-medium text-stone-900 mb-3">Fashion</h3>
                        <ul class="space-y-2">
                          <li><NuxtLink to="/categories/mens-clothing" class="text-sm text-stone-600 hover:text-amber-600">Men's Clothing</NuxtLink></li>
                          <li><NuxtLink to="/categories/womens-clothing" class="text-sm text-stone-600 hover:text-amber-600">Women's Clothing</NuxtLink></li>
                          <li><NuxtLink to="/categories/shoes" class="text-sm text-stone-600 hover:text-amber-600">Shoes</NuxtLink></li>
                          <li><NuxtLink to="/categories/accessories" class="text-sm text-stone-600 hover:text-amber-600">Accessories</NuxtLink></li>
                        </ul>
                      </div>
                    </div>
                    <div class="mt-4 pt-4 border-t border-stone-100">
                      <NuxtLink to="/categories" class="text-sm font-medium text-amber-600 hover:text-amber-700">
                        View All Categories →
                      </NuxtLink>
                    </div>
                  </div>
                </div>
              </Transition>
            </div>

            <!-- Main Navigation Links -->
            <NuxtLink to="/store" class="text-sm font-medium text-stone-700 hover:text-amber-600 transition-colors">
              Stores
            </NuxtLink>
            
            <NuxtLink to="/deals" class="text-sm font-medium text-stone-700 hover:text-amber-600 transition-colors">
              Deals
            </NuxtLink>
            
            <NuxtLink to="/new-arrivals" class="text-sm font-medium text-stone-700 hover:text-amber-600 transition-colors">
              New Arrivals
            </NuxtLink>
            
            <NuxtLink to="/help" class="text-sm font-medium text-stone-700 hover:text-amber-600 transition-colors">
              Help
            </NuxtLink>
          </div>
        </nav>
      </div>
    </header>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/useAuthStore'

const authStore = useAuthStore()

// Reactive state for dropdowns
const showProfileMenu = ref(false)
const showCategoriesMenu = ref(false)

const handleLogout = async () => {
  try {
    await authStore.logout()
  } catch (error) {
    console.error('Logout error:', error)
    // Force navigation to auth even if logout fails
    navigateTo('/auth')
  }
}

// Initialize auth check on layout mount
onMounted(async () => {
  if (process.client && !authStore.user) {
    await authStore.checkAuth()
  }
})

// Close dropdowns when clicking outside
onMounted(() => {
  const handleClickOutside = (event: Event) => {
    const target = event.target as Element
    if (!target.closest('.relative')) {
      showProfileMenu.value = false
      showCategoriesMenu.value = false
    }
  }
  
  document.addEventListener('click', handleClickOutside)
  
  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
  })
})
</script>

<style scoped>
/* Ensure proper dropdown positioning */
.relative {
  position: relative;
}

/* Custom hover states for better UX */
.group:hover .group-hover\:text-amber-600 {
  color: #d97706;
}

/* Smooth transitions for all interactive elements */
button, a {
  transition: all 0.2s ease;
}

/* Focus styles for accessibility */
button:focus-visible,
a:focus-visible {
  outline: 2px solid #d97706;
  outline-offset: 2px;
}
</style>