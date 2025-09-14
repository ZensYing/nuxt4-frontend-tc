<!-- layouts/default.vue -->
<template>
  <div>
    <!-- Your main layout content here -->
    <div v-if="authStore?.user">
      <!-- Header/Navigation for authenticated users -->
      <header class="bg-white text-gray-900 shadow-sm border-b">
        <div class="container mx-auto px-4 py-4 flex items-center justify-between">
          <div class="text-xl font-bold">
            <NuxtLink to="/" class="hover:text-blue-600 transition-colors">
              Multi-Vendor Store
            </NuxtLink>
          </div>
          
          <div class="flex items-center space-x-6">
            <!-- User Profile Section -->
            <div class="flex items-center space-x-4">
              <!-- User Avatar/Name Link -->
              <NuxtLink 
                :to="`/users/${authStore.user.id}`"
                class="flex items-center space-x-2 hover:text-blue-600 transition-colors group"
              >
                <!-- Avatar -->
                <div class="relative">
                  <img
                    v-if="authStore.user?.avatar"
                    :src="useImg(authStore.user.avatar)"
                    :alt="`${authStore.user.first_name} ${authStore.user.last_name}`"
                    class="w-8 h-8 rounded-full border-2 border-gray-200 group-hover:border-blue-300 transition-colors object-cover"
                  />
                  <div
                    v-else
                    class="w-8 h-8 rounded-full border-2 border-gray-200 group-hover:border-blue-300 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center transition-colors"
                  >
                    <span class="text-xs font-semibold text-white">
                      {{ authStore.user?.first_name?.charAt(0) }}{{ authStore.user?.last_name?.charAt(0) }}
                    </span>
                  </div>
                </div>
                
                <!-- User Info -->
                <div class="flex flex-col">
                  <span class="text-sm font-medium">
                    {{ authStore.user.first_name }} {{ authStore.user.last_name }}
                  </span>
                  <span class="text-xs text-gray-500 capitalize">
                    {{ authStore.user.role.name }}
                  </span>
                </div>
              </NuxtLink>

              <!-- Profile Dropdown Alternative (Optional) -->
              <!-- You can uncomment this if you prefer a dropdown menu -->
              <!--
              <div class="relative group">
                <button class="flex items-center space-x-2 hover:text-blue-600 transition-colors">
                  <img
                    v-if="authStore.user?.avatar"
                    :src="useImg(authStore.user.avatar)"
                    :alt="`${authStore.user.first_name} ${authStore.user.last_name}`"
                    class="w-8 h-8 rounded-full border-2 border-gray-200 group-hover:border-blue-300 transition-colors object-cover"
                  />
                  <div
                    v-else
                    class="w-8 h-8 rounded-full border-2 border-gray-200 group-hover:border-blue-300 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center transition-colors"
                  >
                    <span class="text-xs font-semibold text-white">
                      {{ authStore.user?.first_name?.charAt(0) }}{{ authStore.user?.last_name?.charAt(0) }}
                    </span>
                  </div>
                  <Icon name="lucide:chevron-down" class="w-4 h-4" />
                </button>
                
                <div class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-50">
                  <div class="py-1">
                    <NuxtLink 
                      :to="`/users/${authStore.user.id}`"
                      class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <Icon name="lucide:user" class="w-4 h-4 mr-3" />
                      My Profile
                    </NuxtLink>
                    <NuxtLink 
                      to="/dashboard"
                      class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <Icon name="lucide:home" class="w-4 h-4 mr-3" />
                      Dashboard
                    </NuxtLink>
                    <hr class="my-1 border-gray-200">
                    <button 
                      @click="handleLogout"
                      class="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <Icon name="lucide:log-out" class="w-4 h-4 mr-3" />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
              -->
            </div>

            <!-- Actions -->
            <div class="flex items-center space-x-3">
              <UiColorModeButton />
              
              <button 
                @click="handleLogout"
                class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors flex items-center space-x-2"
              >
                <Icon name="lucide:log-out" class="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>
    </div>
    
    <!-- Main content -->
    <main>
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/useAuthStore'

const authStore = useAuthStore()

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
</script>

<style scoped>
/* Custom styles for dropdown hover effect if using the dropdown version */
.group:hover .group-hover\:opacity-100 {
  opacity: 1;
}

.group:hover .group-hover\:visible {
  visibility: visible;
}
</style>