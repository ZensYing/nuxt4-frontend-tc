<!-- app/pages/store/index.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
    <!-- Header Section -->
    <div class="bg-white border-b border-gray-200 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center space-x-4">
            <button
              @click="navigateTo('/')"
              class="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Icon name="lucide:arrow-left" class="w-5 h-5 mr-2" />
              Back to Dashboard
            </button>
          </div>
          <h1 class="text-2xl font-bold text-gray-900">All Stores</h1>
          <div class="w-24"></div> <!-- Spacer for centering -->
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Search and Filter Section -->
      <div class="mb-8">
        <div class="flex flex-col md:flex-row gap-4 items-center justify-between">
          <!-- Search Bar -->
          <div class="flex-1 max-w-lg">
            <div class="relative">
              <Icon name="lucide:search" class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search stores by name, owner, or location..."
                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <!-- Filter Dropdown -->
          <div class="flex gap-3">
            <select
              v-model="sortBy"
              class="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="name">Sort by Name</option>
              <option value="date_created">Sort by Date Created</option>
              <option value="owner">Sort by Owner</option>
            </select>

            <select
              v-model="sortOrder"
              class="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>

        <!-- Stats Section -->
        <div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Icon name="lucide:store" class="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Total Stores</p>
                <p class="text-2xl font-semibold text-gray-900">{{ stores.length }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Icon name="lucide:users" class="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Active Vendors</p>
                <p class="text-2xl font-semibold text-gray-900">{{ uniqueVendors }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Icon name="lucide:map-pin" class="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Locations</p>
                <p class="text-2xl font-semibold text-gray-900">{{ uniqueLocations }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex items-center justify-center py-12">
        <div class="text-center">
          <Icon name="lucide:loader-2" class="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p class="text-gray-600">Loading stores...</p>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else-if="filteredStores.length === 0 && !isLoading" class="text-center py-12">
        <div class="max-w-md mx-auto">
          <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon name="lucide:store" class="w-12 h-12 text-gray-400" />
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">No stores found</h3>
          <p class="text-gray-600 mb-6">
            {{ searchQuery ? 'No stores match your search criteria.' : 'No stores are currently available.' }}
          </p>
          <button
            v-if="searchQuery"
            @click="searchQuery = ''"
            class="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
          >
            Clear Search
          </button>
        </div>
      </div>

      <!-- Stores Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="store in filteredStores"
          :key="store.id"
          class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group"
        >
          <!-- Store Image -->
          <div class="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600 overflow-hidden">
            <img
              v-if="store.image"
              :src="useImg(store.image)"
              :alt="store.name"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div
              v-else
              class="w-full h-full flex items-center justify-center"
            >
              <Icon name="lucide:store" class="w-16 h-16 text-white opacity-80" />
            </div>
            
            <!-- Status Badge -->
            <div class="absolute top-4 right-4">
              <span
                :class="[
                  'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium',
                  store.status === 'active' 
                    ? 'bg-green-100 text-green-800 border border-green-200' 
                    : 'bg-red-100 text-red-800 border border-red-200'
                ]"
              >
                <div 
                  :class="[
                    'w-2 h-2 rounded-full mr-1',
                    store.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                  ]"
                ></div>
                {{ store.status === 'active' ? 'Active' : 'Inactive' }}
              </span>
            </div>
          </div>

          <!-- Store Info -->
          <div class="p-6">
            <!-- Store Name and Owner -->
            <div class="mb-4">
              <h3 class="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {{ store.name || 'Unnamed Store' }}
              </h3>
              
              <!-- Owner Info -->
              <div class="flex items-center space-x-3 mb-3">
                <div class="relative">
                  <img
                    v-if="store.owner?.avatar"
                    :src="useImg(store.owner.avatar)"
                    :alt="`${store.owner.first_name} ${store.owner.last_name}`"
                    class="w-8 h-8 rounded-full object-cover border-2 border-gray-200"
                  />
                  <div
                    v-else
                    class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center border-2 border-gray-200"
                  >
                    <span class="text-xs font-semibold text-white">
                      {{ store.owner?.first_name?.charAt(0) }}{{ store.owner?.last_name?.charAt(0) }}
                    </span>
                  </div>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-900">
                    {{ store.owner?.first_name }} {{ store.owner?.last_name }}
                  </p>
                  <p class="text-xs text-gray-500">Store Owner</p>
                </div>
              </div>

              <!-- Store Description -->
              <p v-if="store.description" class="text-gray-600 text-sm mb-4 line-clamp-3">
                {{ store.description }}
              </p>
            </div>

            <!-- Store Details -->
            <div class="space-y-2 mb-4">
              <!-- Location -->
              <div v-if="store.location || store.address" class="flex items-center text-sm text-gray-600">
                <Icon name="lucide:map-pin" class="w-4 h-4 mr-2 flex-shrink-0" />
                <span>{{ store.location || store.address || 'Location not specified' }}</span>
              </div>

              <!-- Phone -->
              <div v-if="store.phone" class="flex items-center text-sm text-gray-600">
                <Icon name="lucide:phone" class="w-4 h-4 mr-2 flex-shrink-0" />
                <span>{{ store.phone }}</span>
              </div>

              <!-- Email -->
              <div v-if="store.email" class="flex items-center text-sm text-gray-600">
                <Icon name="lucide:mail" class="w-4 h-4 mr-2 flex-shrink-0" />
                <span>{{ store.email }}</span>
              </div>

              <!-- Member Since -->
              <div class="flex items-center text-sm text-gray-600">
                <Icon name="lucide:calendar" class="w-4 h-4 mr-2 flex-shrink-0" />
                <span>Opened {{ formatDate(store.date_created) }}</span>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex space-x-2">
              <button
                @click="viewStore(store)"
                class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                View Store
              </button>
              
              <button
                @click="contactStore(store)"
                class="px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <Icon name="lucide:message-circle" class="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// Define page meta
// definePageMeta({
//   middleware: 'auth'
// })


const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
}
// Vendor role ID
const VENDOR_ROLE_ID = '827fc9e6-9d85-4176-b638-13c31213c9cb'

// State
const stores = ref<any[]>([])
const isLoading = ref(true)
const searchQuery = ref('')
const sortBy = ref('name')
const sortOrder = ref('asc')

// Computed properties
const filteredStores = computed(() => {
  let filtered = [...stores.value]

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(store => 
      store.name?.toLowerCase().includes(query) ||
      store.description?.toLowerCase().includes(query) ||
      store.location?.toLowerCase().includes(query) ||
      store.address?.toLowerCase().includes(query) ||
      `${store.owner?.first_name} ${store.owner?.last_name}`.toLowerCase().includes(query)
    )
  }

  // Apply sorting
  filtered.sort((a, b) => {
    let aValue, bValue

    switch (sortBy.value) {
      case 'name':
        aValue = a.name || ''
        bValue = b.name || ''
        break
      case 'date_created':
        aValue = new Date(a.date_created)
        bValue = new Date(b.date_created)
        break
      case 'owner':
        aValue = `${a.owner?.first_name} ${a.owner?.last_name}` || ''
        bValue = `${b.owner?.first_name} ${b.owner?.last_name}` || ''
        break
      default:
        aValue = a.name || ''
        bValue = b.name || ''
    }

    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase()
      bValue = bValue.toLowerCase()
    }

    if (sortOrder.value === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
    }
  })

  return filtered
})

const uniqueVendors = computed(() => {
  const vendors = new Set(stores.value.map(store => store.owner?.id).filter(Boolean))
  return vendors.size
})

const uniqueLocations = computed(() => {
  const locations = new Set(
    stores.value
      .map(store => store.location || store.address)
      .filter(Boolean)
      .map(loc => loc.split(',')[0].trim()) // Get city part
  )
  return locations.size
})

// Methods
const fetchStores = async () => {
  isLoading.value = true
  
  try {
    // Fetch all users with vendor role using useApi
    const response = await useApi<{ data: any[] }>('/users', {
      method: 'GET',
      params: {
        'filter[role][_eq]': VENDOR_ROLE_ID,
        'fields': 'id,first_name,last_name,email,phone,avatar,date_created,status,title,address,store_name,thumbnail',
        'sort': 'date_created'
      }
    })

    // Transform users into store format
    // Note: You might want to create a separate stores table in Directus
    // For now, we're treating each vendor as having one store
    stores.value = response.data.map((vendor: any) => ({
      id: vendor.id,
      name: vendor.title || `${vendor.first_name}'s Store`,
      description: `Welcome to ${vendor.first_name}'s marketplace store`,
      store_name: vendor.store_name,
      location: vendor.address?.city && vendor.address?.state 
        ? `${vendor.address.city}, ${vendor.address.state}` 
        : null,
      address: vendor.address ? 
        [vendor.address.street, vendor.address.city, vendor.address.state].filter(Boolean).join(', ') 
        : null,
      phone: vendor.phone,
      email: vendor.email,
      status: vendor.status || 'active',
      date_created: vendor.date_created,
      owner: {
        id: vendor.id,
        first_name: vendor.first_name,
        last_name: vendor.last_name,
        avatar: vendor.avatar
      },
      image: vendor.avatar // Using vendor avatar as store image for now
    }))

  } catch (error: any) {
    console.error('Error fetching stores:', error)
    
    const toast = useToast()
    toast?.add({
      title: 'Error Loading Stores',
      description: error.message || 'Unable to load stores. Please try again.',
      color: 'error'
    })
  } finally {
    isLoading.value = false
  }
}

const viewStore = (store: any) => {
  const { getStoreUrl, formatStoreSlug } = useStoreUrl()
  const url = getStoreUrl(store)
  
  console.log('Store data:', store)
  console.log('Generated URL:', url)
  console.log('Store name used:', store.store_name || store.name || `${store.first_name}s Store`)
  console.log('Generated slug:', formatStoreSlug(store.store_name || store.name || `${store.first_name}s Store`))
  
  navigateTo(url)
}

const contactStore = (store: any) => {
  // Open contact modal or navigate to contact page
  const toast = useToast()
  toast?.add({
    title: 'Contact Feature',
    description: 'Contact functionality coming soon!',
    color: 'info'
  })
}

// Initialize
onMounted(async () => {
  await fetchStores()
})
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.bg-grid-pattern {
  background-image: 
    linear-gradient(rgba(0,0,0,.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,0,0,.03) 1px, transparent 1px);
  background-size: 20px 20px;
}
</style>